// with  https://github.com/zenozeng/color-hash
const info = new Info();
const view = new View();

browser.runtime.onMessage.addListener((request) =>{
  if(!request.action) {
    return;
  }
  switch (request.action) {
  case "deactivate":
    view.refresh();
    break;
  case "activate":
    browser.storage.local.get("config", ({config}) =>{
      const {hostname, options} = info.extract(window.location.hostname, config);
      view.draw(hostname, options);
      return;
    })
    break;
  default:
    console.warn("unexpected action: %s", request.action);
  }
});

// main
browser.storage.local.get("config", ({config}) =>{
  if (!config.enable) {
    if (config.debug){
      console.log("hostnameColor is disabled..");
    }
    return;
  }

  const {hostname, options} = info.extract(window.location.hostname, config);

  view.refresh();
  view.draw(hostname, options);
});

