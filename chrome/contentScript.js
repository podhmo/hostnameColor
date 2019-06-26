// with  https://github.com/zenozeng/color-hash

const ch = new ColorHash();

const hostname = window.location.hostname;
const hsl = ch.hsl(hostname);
const bgColor = ch.hex(hostname);
const fgColor = hsl[2] < 0.5 ? "#ddd" : "#222";

document.querySelector("body").insertAdjacentHTML("afterbegin", `
<style>
#ext-message {
  position: sticky;
  display: inline-block;
  z-index: 2147483647;
  top: 10px;
  left: 10px;
  font-size: 1.6rem;
  color: ${fgColor};
  background-color: ${bgColor};
  opacity: 0.75;
  padding: 10px;
}
</style>
<div id="ext-message">${hostname}</div>
`);
document.querySelector("#ext-message").addEventListener("click", function(ev){
  ev.currentTarget.remove();
}, {"once": true});
