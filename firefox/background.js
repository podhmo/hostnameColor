let browser = chrome || browser;

function updateStatus(config, nextEnabled,  callback){
  if (config.debug) {
    console.log(`next -> ${nextEnabled}`);
  }

  if (nextEnabled) {
    browser.browserAction.setBadgeText({text: 'ON'});
    browser.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
  } else {
    browser.browserAction.setBadgeText({text: 'OFF'});
    browser.browserAction.setBadgeBackgroundColor({color: '#aaa'});
  }
  browser.storage.local.set({config: {...config, enable: nextEnabled}}, callback);
}

browser.runtime.onInstalled.addListener(function() {
  const config  = {debug: false, enable: true};
  browser.storage.local.set({config: config}, function() {
    console.log(`config set ${config}`);
    const nextEnabled = config.enable;
    updateStatus(config, nextEnabled);
  });
});

browser.browserAction.onClicked.addListener(function (tab){
  browser.storage.local.get("config", function(data) {
    const config = data.config;
    const nextEnabled = !config.enable;

    updateStatus(config, nextEnabled, function(){
      if (nextEnabled) {
        browser.tabs.query({currentWindow: true, active: true}, (tabs) =>{
          tabs.forEach((tab) => {
            browser.tabs.sendMessage(tab.id, {"action": "moved"});
          });
        });
      } else {
	      browser.theme.update({});
      }

      browser.tabs.query({currentWindow: true}, (tabs) =>{
        const action = nextEnabled ? "enabled" : "disabled"; // xxx:
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id, {"action": action});
        });
      });
    });
  });
});

browser.tabs.onUpdated.addListener((tabId) => {
  browser.tabs.sendMessage(tabId, {"action": "moved"});
});

browser.runtime.onMessage.addListener(async (request) =>{
  if (!request.action || request.action !== "after-extract") {
    return ;
  }

  const theme = {
    colors: {
      bookmark_text: request.options.fgColor,
      toolbar: request.options.bgColor
    }
  }
	browser.theme.update(theme);
});
