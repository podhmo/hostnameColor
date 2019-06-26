chrome.runtime.onInstalled.addListener(function() {
  const config  = {debug: true};
  chrome.storage.local.set({config: config}, function() {
    console.log(`config set ${config}`);
  });
});
