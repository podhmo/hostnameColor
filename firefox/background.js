// function updateStatus(config, nextEnabled){
//   console.log(`next -> ${nextEnabled}`)
//   if (nextEnabled) {
//     chrome.browserAction.setBadgeText({text: 'ON'});
//     chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
//   } else {
//     chrome.browserAction.setBadgeText({text: 'OFF'});
//     chrome.browserAction.setBadgeBackgroundColor({color: '#aaa'});
//   }
//   chrome.storage.local.set({config: {...config, enable: nextEnabled}});
// }

// chrome.runtime.onInstalled.addListener(function() {
//   const config  = {debug: true, enable: true};
//   chrome.storage.local.set({config: config}, function() {
//     console.log(`config set ${config}`);
//     updateStatus(config, config.enable);
//   });
// });

// chrome.browserAction.onClicked.addListener(function (tab){
//   chrome.storage.local.get("config", function(data) {
//     const config = data.config;
//     const nextEnabled = !config.enable;
//     updateStatus(config, nextEnabled);
//     // todo: refresh page?
//   });
// });


