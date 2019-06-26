function updateStatus(config, nextEnabled){
  console.log(`next -> ${nextEnabled}`)
  if (nextEnabled) {
    browser.browserAction.setBadgeText({text: 'ON'});
    browser.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
  } else {
    browser.browserAction.setBadgeText({text: 'OFF'});
    browser.browserAction.setBadgeBackgroundColor({color: '#aaa'});
  }
  browser.storage.local.set({config: {...config, enable: nextEnabled}});
}

browser.runtime.onInstalled.addListener(function() {
  const config  = {debug: true, enable: true};
  browser.storage.local.set({config: config}, function() {
    console.log(`config set ${config}`);
    updateStatus(config, config.enable);
  });
});

browser.browserAction.onClicked.addListener(function (tab){
  browser.storage.local.get("config", function(data) {
    const config = data.config;
    const nextEnabled = !config.enable;
    updateStatus(config, nextEnabled);
    // todo: refresh page?
  });
});
