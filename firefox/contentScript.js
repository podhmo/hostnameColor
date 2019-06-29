// with  https://github.com/zenozeng/color-hash
let browser = chrome || browser;

const info = new Info();
const view = new View();

function getHostname(){
  const hostname = window.location.hostname;
  const port = window.location.port;
  if (port === "") {
    return hostname;
  }
  return `${hostname}:${port}`;
}

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
      const {hostname, options} = info.extract(getHostname(), config);
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

  const {hostname, options} = info.extract(getHostname(), config);

  view.refresh();
  view.draw(hostname, options);
});

