// with  https://github.com/zenozeng/color-hash

function describe(config, {hostname, options}){
  console.log("----------------------------------------");
  console.log("hostnameColor");
  console.log("----------------------------------------");
  console.log("");
  console.info(`- hostname: ${hostname}`);
  console.info(`- H (HSL): ${options.HSL[0]}`);
  console.info(`- S (HSL): ${options.HSL[1]}`);
  console.info(`- L (HSL): ${options.HSL[2]}`);
  console.info(`- foreground color: ${options.fgColor}`);
  console.info(`- background color: ${options.bgColor}`);
  // console.table(options);
}

chrome.storage.local.get("config", function(data){
  const config = data.config;
  const hostname = window.location.hostname;

  const ch = new ColorHash();

  let options = {HSL: ch.hsl(hostname)};
  options = {
    ...options,
    bgColor: ch.hex(hostname),
    fgColor: options.HSL[2] < 0.5 ? "#ddd" : "#222"
  };

  if (config.debug) {
    describe(config, {hostname: hostname, options: options});
  }

  document.querySelector("body").insertAdjacentHTML("afterbegin", `
<style>
#ext-message {
  position: sticky;
  display: inline-block;
  z-index: 2147483647;
  top: 10px;
  left: 10px;
  font-size: 1.6rem;
  color: ${options.fgColor};
  background-color: ${options.bgColor};
  opacity: 0.75;
  padding: 10px;
}
</style>
<div id="ext-message">${hostname}</div>
`);
  document.querySelector("#ext-message").addEventListener("click", function(ev){
    ev.currentTarget.remove();
  }, {"once": true});
});
