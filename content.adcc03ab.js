var e,t;"function"==typeof(e=globalThis.define)&&(t=e,e=null),function(t,o,n,r,a){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof i[r]&&i[r],c=l.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(e,o){if(!c[e]){if(!t[e]){var n="function"==typeof i[r]&&i[r];if(!o&&n)return n(e,!0);if(l)return l(e,!0);if(s&&"string"==typeof e)return s(e);var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}u.resolve=function(o){var n=t[e][1][o];return null!=n?n:o},u.cache={};var m=c[e]=new d.Module(e);t[e][0].call(m.exports,u,m,m.exports,this)}return c[e].exports;function u(e){var t=u.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=t,d.cache=c,d.parent=l,d.register=function(e,o){t[e]=[function(e,t){t.exports=o},{}]},Object.defineProperty(d,"root",{get:function(){return i[r]}}),i[r]=d;for(var m=0;m<o.length;m++)d(o[m]);if(n){var u=d(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof e&&e.amd?e(function(){return u}):a&&(this[a]=u)}}({bnPzj:[function(e,t,o){var n="";async function r(){async function e(e,t=5e3){let o=Date.now()+t;for(;Date.now()<o;){let t=document.querySelector(e);if(t)return t;await new Promise(e=>setTimeout(e,100))}throw Error(`Element ${e} not found within ${t}ms`)}async function t(e,t,o=5e3){let n=Date.now()+o;for(;Date.now()<n;){let o=document.querySelectorAll(e);for(let e of o)if(e.textContent.trim()===t)return e;await new Promise(e=>setTimeout(e,100))}throw Error(`Element with text "${t}" not found within ${o}ms`)}async function o(){let e=document.querySelector("tr.r7");if(!e){console.error("Target div element table not found.");return}let t=0;async function o(){let t=e.querySelector("b");if(t){let e=t.textContent.trim().split(" ")[1],o=e===n;return o?(setTimeout(()=>{chrome.runtime.sendMessage({action:"emailExists",email:n})},5e3),console.log(`Email ${n} found and message sent to background.js.`),setTimeout(()=>{},2e3)):console.log(`Email ${n} not found in forwarded list.`),!0}return!1}let r=new MutationObserver(e=>{for(let t of e)"childList"===t.type&&(console.log("Children have been added or removed in the table."),o())}),a=setInterval(()=>{if(t++,console.log(`Checking for changes... (${t}s)`),t>60){console.log("Maximum time reached. Stopping the monitoring."),clearInterval(a),r.disconnect();return}r.observe(e,{childList:!0,subtree:!0}),o().then(e=>{e&&(d({action:"emailExists"}),d({action:"autoVerifyForwardEmail"}),clearInterval(a),u(),setTimeout(()=>{m("Verifying forward email")},2e3),setTimeout(()=>{u(),window.location.replace("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"),window.location.reload()},1e4),r.disconnect())})},1e3);console.log("Monitoring table for changes...")}m("Adding Forward Email");try{window.location.href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#settings/fwdandpop",await d({action:"redirectSettings"});let r=await e('input[type="button"][value="Add a forwarding address"]');r.click(),await d({action:"clickAddForwardingAddress"});let a=await e('input[type="email"]');a.value=n.replace(/"/g,""),a.blur(),await d({action:"autoFillInputForwardingEmail"});let i=await e('button[data-mdc-dialog-action="ok"]');i.click(),t("button.mUIrbf-I","Continue").then(e=>{console.log("Button found:",e),e.click()}).catch(e=>{console.error(e)}),await d({action:"redirectVerifyMobile"}),o()}catch(e){u(),console.error(e)}}async function a(){async function e(e,t=5e3){let o=Date.now()+t;for(;Date.now()<o;){let t=Array.from(document.querySelectorAll("span")).find(e=>e.textContent.includes("Forwarding:"));if(t){let o=t.closest("td");if(o){let t=o.nextElementSibling;if(t){let o=t.querySelector("select");if(o){let t=Array.from(o.options),n=t.find(t=>t.textContent.trim().startsWith(e));if(n)return console.log(n),!0}}}break}await new Promise(e=>setTimeout(e,100))}return!1}try{window.location.href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#settings/fwdandpop";let t=await e(n);return t}catch(e){return!1}}chrome.runtime.onMessage.addListener(function(e,t,o){if("addForwardEmail"===e.action&&(n=e.forwardEmail,console.log(e.forwardEmail),r().then(e=>{o({status:"Add Forward Email executed",result:e})}).catch(e=>{o({status:"Error",message:e.message})})),"createFilter"===e.action&&(console.log("createFilter action received"),l().then(e=>{o({status:"Create Filter executed",result:e})}).catch(e=>{o({status:"Error",message:e.message})})),"checkForwardEmail"===e.action){let e=a();e.then(e=>{o({status:e})})}if("checkFilterExistence"===e.action){let e=c();e.then(e=>{console.log("checkFilterExistence",e),o({status:e})})}return"accountLogin"===e.action&&(s(),o({status:"Account Login executed"})),"forwardEmailVerified"===e.action&&(chrome.runtime.sendMessage({action:"forwardEmailVerified",success:!0}),o({received:!0})),!0});let i=0;async function l(){if(i++,console.log(`createFilter function has run ${i} times`),i<2){async function e(){let e=document.querySelector('[data-tooltip="Show search options"]');e?(e.click(),await d({action:"clickOnSearchButton"}),console.log("Search options button clicked!")):console.error("Button not found!")}async function t(){let e=document.querySelectorAll('div[role="listbox"]'),t=null;for(let o of e){let e=o.querySelector('div[role="option"]');if(e&&("Choose an address."===e.textContent.trim()||"Choose an address..."===e.textContent.trim())){t=o;break}}if(t){t.focus();let e=new MouseEvent("mousedown",{view:window,bubbles:!0,cancelable:!0});t.dispatchEvent(e),await new Promise(e=>setTimeout(e,500));let o=document.querySelectorAll('div[role="option"]');for(let e of o)if(e.textContent.trim()===n){e.click();break}}}async function o(e,t,o=5e3){let n=Date.now()+o;for(;Date.now()<n;){let o=document.querySelectorAll(e);for(let e of o)if(e.textContent.trim()===t)return e;await new Promise(e=>setTimeout(e,100))}throw Error(`Element with text "${t}" not found within ${o}ms`)}async function r(e,t=15e3){let o=Date.now()+t;for(;Date.now()<o;){let t=document.querySelectorAll("label");for(let o of t)if(o.innerText.trim()===e){let e=o.closest("span").nextElementSibling.querySelector('input[type="text"]');if(e)return e}await new Promise(e=>setTimeout(e,100))}throw Error(`Input element with label text "${e}" not found within ${t}ms`)}async function a(){o("div","Create filter").then(e=>{e.click()}).catch(e=>{console.error(e)}),function(e){let t=new MutationObserver((t,o)=>{for(let o of t)o.addedNodes.length>0&&e(o.addedNodes)});t.observe(document.body,{childList:!0,subtree:!0})}(e=>{e.forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let o=Array.from(e.querySelectorAll("label")).find(e=>e.textContent.includes("Forward it to:"));if(o){let e=o.previousElementSibling;e&&"INPUT"===e.tagName&&"checkbox"===e.type&&(e.click(),e.checked=!0,t())}}})})}async function l(){return new Promise((e,t)=>{let o;(o=new MutationObserver(t=>{for(let r of t)"childList"===r.type&&r.addedNodes.forEach(t=>{if(t.nodeType===Node.ELEMENT_NODE&&"SPAN"===t.tagName){let r=t.querySelector("span");if(r&&"Your filter was created."===r.textContent){console.log("Found the required span!"),o.disconnect(),clearInterval(n),e(!0);return}}})})).observe(document.body,{childList:!0,subtree:!0});let n=setInterval(()=>{console.log("Checking DOM at interval...")},1e3);setTimeout(()=>{console.log("Timeout reached without finding the span."),o.disconnect(),clearInterval(n),e(!1)},6e4)})}async function c(e,t,o=15e3){let n=Date.now()+o;for(;Date.now()<n;){let o=document.querySelectorAll(e);for(let e of o)if(e.innerText.trim()===t)return e;await new Promise(e=>setTimeout(e,100))}throw Error(`Element with text "${t}" not found within ${o}ms`)}m("Creating Filter");try{e(),await d({action:"autoFillInput"}),await d({action:"clickOnCreateFilter"}),await d({action:"checkForwardItToCheckbox"}),await d({action:"selectedRequiredEmailAddress"}),await d({action:"clickOnCreateFilterButton"});let t=await r("From");console.log("fromEmailInput",t),t.value="*@zillow.com,*@rental.zillow.com,*@rentalmanager.zillow.com,*@convo.zillow.com,*@apartments.com,*@trulia.com,*@rental.trulia.com,*@convo.trulia.com,*@zumper.com,*@hotpads.com,*@realtor.com,*@rent.com,*@apartmentfinder.com,*@rentcafe.com,*@apartmentguide.com,*@forrent.com,*@padmapper.com,*@move.com,*@oodle.com,*@livelovely.com,*@rentpath.com,*@rentjungle.com,*@walkscore.com,*@rentalhomesplus.com,*@onradpad.com,*@har.com,*@homes.com,*@avail.co,*@apartmentlist.com,*@dwellsy.com,*@redfin.com,*@craigslist.org,*@propertybase.com,*@rentals.ca,*@kijiji.ca,*@realtor.ca,*@rentfaster.ca,*@rentboard.ca,*@4rent.ca,*@viewit.ca,*@condos.ca,*@gottarent.com,*@rentseeker.ca,*@liv.rent,*@point2homes.com,*@canadarentals.com,*@miportal.ca,*@zoocasa.com,*@zolo.ca,*@bigrent.ca,*@louer.com,*@duproprio.ca,*@rentberry.com,*@sublet.com,*@rentalads.com,*@rentdigs.com",a(),o("div.T-I-atl","Create filter").then(e=>{e.click()}).catch(e=>{console.error(e)});let n=await c("span","Continue");console.log("continueButton",n),n.click(),l().then(e=>(console.log("Filter creation result:",e),e)?(d({action:"gmailVerification"}),console.log("Your filter was created!"),setTimeout(()=>{u()},2e3),!0):(console.log("No filter creation message found."),!1))}catch(e){console.error(e)}}}async function c(){async function e(e,t=5e3){let o=Date.now()+t;for(;Date.now()<o;){let t=Array.from(document.querySelectorAll("span")).find(t=>t.textContent.trim()===e);if(console.log("spanElement",t),t)return!0;await new Promise(e=>setTimeout(e,100))}return!1}try{window.location.href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#settings/filters";let t=await e("from:(*@zillow.com,*@rental.zillow.com,*@rentalmanager.zillow.com,*@convo.zillow.com,*@apartments.com,*@trulia.com,*@rental.trulia.com,*@convo.trulia.com,*@zumper.com,*@hotpads.com,*@realtor.com,*@rent.com,*@apartmentfinder.com,*@rentcafe.com,*@apartmentguide.com,*@forrent.com,*@padmapper.com,*@move.com,*@oodle.com,*@livelovely.com,*@rentpath.com,*@rentjungle.com,*@walkscore.com,*@rentalhomesplus.com,*@onradpad.com,*@har.com,*@homes.com,*@avail.co,*@apartmentlist.com,*@dwellsy.com,*@redfin.com,*@craigslist.org,*@propertybase.com,*@rentals.ca,*@kijiji.ca,*@realtor.ca,*@rentfaster.ca,*@rentboard.ca,*@4rent.ca,*@viewit.ca,*@condos.ca,*@gottarent.com,*@rentseeker.ca,*@liv.rent,*@point2homes.com,*@canadarentals.com,*@miportal.ca,*@zoocasa.com,*@zolo.ca,*@bigrent.ca,*@louer.com,*@duproprio.ca,*@rentberry.com,*@sublet.com,*@rentalads.com,*@rentdigs.com)");return t}catch(e){return!1}}async function s(){console.log("Opening Lethub login page...");let e=window.open("https://lethub-uat.netlify.app/#/","_blank");window.addEventListener("message",function(t){t.source===window&&"USER_ID_FROM_LOCALSTORAGE"===t.data.type&&t.data.userData.userId&&(console.log("Received message with user ID:",t.data.userData.userId),chrome.runtime.sendMessage({type:"USER_ID_FOUND",userId:t.data.userData.userId,userEmail:t.data.userData.userEmail,username:t.data.userData.username,companyName:t.data.userData.companyName,role:t.data.userData.role,windowId:e}),console.log("User ID sent to sidepanel via chrome.runtime.sendMessage."))}),e.addEventListener("load",function(){console.log("Lethub login page loaded, injecting script..."),function(e,t){console.log("Injecting external script:",e);let o=t.document.createElement("script");o.src=chrome.runtime.getURL(e),t.document.head.appendChild(o),o.onload=function(){console.log("Script injected and executed."),o.remove()}}("injectedScript.js",e),function e(){let t=localStorage.getItem("userId");if(console.log("Checking for userId in localStorage:",t),t){let e={userId:t,userEmail:localStorage.getItem("userEmail"),username:localStorage.getItem("username"),companyName:localStorage.getItem("companyName"),role:localStorage.getItem("role")};console.log("User data found in localStorage:",e),window.postMessage({type:"USER_ID_FROM_LOCALSTORAGE",userData:e},"*")}else console.log("User data not found, retrying in 500ms..."),setTimeout(e,500)}()})}let d=e=>new Promise((t,o)=>{chrome.runtime.sendMessage(e,e=>{chrome.runtime.lastError?(console.error("Error sending message:",chrome.runtime.lastError),o(chrome.runtime.lastError)):(console.log("Message response received:",e),t(e))})});function m(e){let t=document.createElement("div");t.id="extension-loading-indicator",t.innerHTML=`
    <div class="loading-spinner"></div>
    <div class="loading-message">${e}</div>
  `,t.style.cssText=`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-family: Arial, sans-serif;
    font-size: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;let o=document.createElement("style");o.textContent=`
    .loading-spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .loading-message {
      margin-top: 20px;
    }
  `,document.head.appendChild(o),document.body.appendChild(t)}function u(){let e=document.getElementById("extension-loading-indicator");e&&e.remove()}function f(){let e=document.querySelectorAll("div.ZY span");e.forEach(e=>{e.textContent.includes("Your filters are forwarding some of your email to")&&(e.closest("div.ZY").style.display="none")})}let g=new MutationObserver(e=>{for(let t of e)("childList"===t.type||"subtree"===t.type)&&f()});g.observe(document.body,{childList:!0,subtree:!0}),f(),window.addEventListener("message",function(e){e.source===window&&"USER_ID_FROM_LOCALSTORAGE"===e.data.type&&(console.log(e.data),e.data?(console.log("User Data: ",e.data.userData),chrome.runtime.sendMessage({action:"userData",success:!0,userData:e.data.userData})):console.log("No userId found in localStorage."))}),function(e){let t=document.createElement("script");t.src=chrome.runtime.getURL(e),(document.head||document.documentElement).appendChild(t),t.onload=function(){t.remove()}}("injectedScript.js")},{}]},["bnPzj"],"bnPzj","parcelRequiree875"),globalThis.define=t;