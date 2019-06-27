function updateStatus(config, nextEnabled,  callback){
  if (config.debug) {
    console.log(`next -> ${nextEnabled}`);
  }

  if (nextEnabled) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
  } else {
    chrome.browserAction.setBadgeText({text: 'OFF'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#aaa'});
  }
  chrome.storage.local.set({config: {...config, enable: nextEnabled}}, callback);
}

chrome.runtime.onInstalled.addListener(function() {
  const config  = {debug: true, enable: true};
  chrome.storage.local.set({config: config}, function() {
    console.log(`config set ${config}`);
    const nextEnabled = config.enable;
    updateStatus(config, nextEnabled);
  });
});

chrome.browserAction.onClicked.addListener(function (tab){
  chrome.storage.local.get("config", function(data) {
    const config = data.config;
    const nextEnabled = !config.enable;

    updateStatus(config, nextEnabled, function(){
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>{
        const action = nextEnabled ? "activate" : "deactivate"; // xxx:
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, {"action": action});
        });
      });
    });
  });
});


