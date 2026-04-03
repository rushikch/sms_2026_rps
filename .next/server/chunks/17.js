"use strict";exports.id=17,exports.ids=[17],exports.modules={6333:(e,t,o)=>{o.d(t,{Z:()=>r});let r=(0,o(5709).Z)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},4019:(e,t,o)=>{o.d(t,{Z:()=>r});let r=(0,o(5709).Z)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},434:(e,t,o)=>{o.d(t,{default:()=>n.a});var r=o(9404),n=o.n(r)},381:(e,t,o)=>{o.d(t,{x7:()=>ec,ZP:()=>eu});var r,n=o(7577);let s={data:""},i=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s},a=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let o="",r="",n="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?o=s+" "+i+";":r+="f"==s[1]?c(i,s):s+"{"+c(i,"k"==s[1]?"":t)+"}":"object"==typeof i?r+=c(i,t?t.replace(/([^,])+/g,e=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=c.p?c.p(s,i):s+":"+i+";")}return o+(t&&n?t+"{"+n+"}":n)+r},u={},p=e=>{if("object"==typeof e){let t="";for(let o in e)t+=o+p(e[o]);return t}return e},m=(e,t,o,r,n)=>{let s=p(e),i=u[s]||(u[s]=(e=>{let t=0,o=11;for(;t<e.length;)o=101*o+e.charCodeAt(t++)>>>0;return"go"+o})(s));if(!u[i]){let t=s!==e?e:(e=>{let t,o,r=[{}];for(;t=a.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(o=t[3].replace(d," ").trim(),r.unshift(r[0][o]=r[0][o]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);u[i]=c(n?{["@keyframes "+i]:t}:t,o?"":"."+i)}let m=o&&u.g?u.g:null;return o&&(u.g=u[i]),((e,t,o,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=o?e+t.data:t.data+e)})(u[i],t,r,m),i},f=(e,t,o)=>e.reduce((e,r,n)=>{let s=t[n];if(s&&s.call){let e=s(o),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+r+(null==s?"":s)},"");function h(e){let t=this||{},o=e.call?e(t.p):e;return m(o.unshift?o.raw?f(o,[].slice.call(arguments,1),t.p):o.reduce((e,o)=>Object.assign(e,o&&o.call?o(t.p):o),{}):o,i(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,y,b,v=h.bind({k:1});function w(e,t){let o=this||{};return function(){let r=arguments;function n(s,i){let a=Object.assign({},s),l=a.className||n.className;o.p=Object.assign({theme:y&&y()},a),o.o=/ *go\d+/.test(l),a.className=h.apply(o,r)+(l?" "+l:""),t&&(a.ref=i);let d=e;return e[0]&&(d=a.as||e,delete a.as),b&&d[0]&&b(a),g(d,a)}return t?t(n):n}}var x=e=>"function"==typeof e,E=(e,t)=>x(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),A=(()=>{let e;return()=>e})(),C="default",P=(e,t)=>{let{toastLimit:o}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,o)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return P(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:n}=t;return{...e,toasts:e.toasts.map(e=>e.id===n||void 0===n?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},N=[],T={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},S={},D=(e,t=C)=>{S[t]=P(S[t]||T,e),N.forEach(([e,o])=>{e===t&&o(S[t])})},$=e=>Object.keys(S).forEach(t=>D(e,t)),R=e=>Object.keys(S).find(t=>S[t].toasts.some(t=>t.id===e)),I=(e=C)=>t=>{D(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},j=(e={},t=C)=>{let[o,r]=(0,n.useState)(S[t]||T),s=(0,n.useRef)(S[t]);(0,n.useEffect)(()=>(s.current!==S[t]&&r(S[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let i=o.toasts.map(t=>{var o,r,n;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(o=e[t.type])?void 0:o.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(n=e[t.type])?void 0:n.style,...t.style}}});return{...o,toasts:i}},F=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(null==o?void 0:o.id)||k()}),L=e=>(t,o)=>{let r=F(t,e,o);return I(r.toasterId||R(r.id))({type:2,toast:r}),r.id},H=(e,t)=>L("blank")(e,t);H.error=L("error"),H.success=L("success"),H.loading=L("loading"),H.custom=L("custom"),H.dismiss=(e,t)=>{let o={type:3,toastId:e};t?I(t)(o):$(o)},H.dismissAll=e=>H.dismiss(void 0,e),H.remove=(e,t)=>{let o={type:4,toastId:e};t?I(t)(o):$(o)},H.removeAll=e=>H.remove(void 0,e),H.promise=(e,t,o)=>{let r=H.loading(t.loading,{...o,...null==o?void 0:o.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let n=t.success?E(t.success,e):void 0;return n?H.success(n,{id:r,...o,...null==o?void 0:o.success}):H.dismiss(r),e}).catch(e=>{let n=t.error?E(t.error,e):void 0;n?H.error(n,{id:r,...o,...null==o?void 0:o.error}):H.dismiss(r)}),e};var W=1e3,M=(e,t="default")=>{let{toasts:o,pausedAt:r}=j(e,t),s=(0,n.useRef)(new Map).current,i=(0,n.useCallback)((e,t=W)=>{if(s.has(e))return;let o=setTimeout(()=>{s.delete(e),a({type:4,toastId:e})},t);s.set(e,o)},[]);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),n=o.map(o=>{if(o.duration===1/0)return;let r=(o.duration||0)+o.pauseDuration-(e-o.createdAt);if(r<0){o.visible&&H.dismiss(o.id);return}return setTimeout(()=>H.dismiss(o.id,t),r)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[o,r,t]);let a=(0,n.useCallback)(I(t),[t]),l=(0,n.useCallback)(()=>{a({type:5,time:Date.now()})},[a]),d=(0,n.useCallback)((e,t)=>{a({type:1,toast:{id:e,height:t}})},[a]),c=(0,n.useCallback)(()=>{r&&a({type:6,time:Date.now()})},[r,a]),u=(0,n.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:n=8,defaultPosition:s}=t||{},i=o.filter(t=>(t.position||s)===(e.position||s)&&t.height),a=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<a&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+n,0)},[o]);return(0,n.useEffect)(()=>{o.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=s.get(e.id);t&&(clearTimeout(t),s.delete(e.id))}})},[o,i]),{toasts:o,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},z=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,_=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Z=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,G=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,V=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,J=w("div")`
  position: absolute;
`,K=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:o,iconTheme:r}=e;return void 0!==t?"string"==typeof t?n.createElement(X,null,t):t:"blank"===o?null:n.createElement(K,null,n.createElement(Y,{...r}),"loading"!==o&&n.createElement(J,null,"error"===o?n.createElement(_,{...r}):n.createElement(V,{...r})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,eo=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,en=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let o=e.includes("top")?1:-1,[r,n]=A()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(o),eo(o)];return{animation:t?`${v(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=n.memo(({toast:e,position:t,style:o,children:r})=>{let s=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ee,{toast:e}),a=n.createElement(en,{...e.ariaProps},E(e.message,e));return n.createElement(er,{className:e.className,style:{...s,...o,...e.style}},"function"==typeof r?r({icon:i,message:a}):n.createElement(n.Fragment,null,i,a))});r=n.createElement,c.p=void 0,g=r,y=void 0,b=void 0;var ea=({id:e,className:t,style:o,onHeightUpdate:r,children:s})=>{let i=n.useCallback(t=>{if(t){let o=()=>{r(e,t.getBoundingClientRect().height)};o(),new MutationObserver(o).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return n.createElement("div",{ref:i,className:t,style:o},s)},el=(e,t)=>{let o=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...r}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:r,children:s,toasterId:i,containerStyle:a,containerClassName:l})=>{let{toasts:d,handlers:c}=M(o,i);return n.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(o=>{let i=o.position||t,a=el(i,c.calculateOffset(o,{reverseOrder:e,gutter:r,defaultPosition:t}));return n.createElement(ea,{id:o.id,key:o.id,onHeightUpdate:c.updateHeight,className:o.visible?ed:"",style:a},"custom"===o.type?E(o.message,o):s?s(o):n.createElement(ei,{toast:o,position:i}))}))},eu=H},6661:(e,t,o)=>{o.d(t,{Y:()=>u});var r=o(7577);let n="printWindow";function s({level:e="error",messages:t,suppressErrors:o=!1}){o||("error"===e?console.error(t):"warning"===e?console.warn(t):console.debug(t))}function i(e,t){if(t||!e){let e=document.getElementById(n);e&&document.body.removeChild(e)}}function a(e){return e instanceof Error?e:Error("Unknown Error")}function l(e,t){let{documentTitle:o,onAfterPrint:r,onPrintError:n,preserveAfterPrint:l,print:d,suppressErrors:c}=t;setTimeout(()=>{if(e.contentWindow){let t=function(){r?.(),i(l)};if(e.contentWindow.focus(),d)d(e).then(t).catch(e=>{n?n("print",a(e)):s({messages:["An error was thrown by the specified `print` function"],suppressErrors:c})});else{if(e.contentWindow.print){let t=e.contentDocument?.title??"",r=e.ownerDocument.title,n="function"==typeof o?o():o;n&&(e.ownerDocument.title=n,e.contentDocument&&(e.contentDocument.title=n)),e.contentWindow.print(),n&&(e.ownerDocument.title=r,e.contentDocument&&(e.contentDocument.title=t))}else s({messages:["Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."],suppressErrors:c});[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(e=>(navigator.userAgent??navigator.vendor??("opera"in window&&window.opera)).match(e))?setTimeout(t,500):t()}}else s({messages:["Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with `react-to-print`. Please file an issue: https://github.com/MatthewHerbst/react-to-print/issues/"],suppressErrors:c})},500)}function d(e){let t=[],o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,null),r=o.nextNode();for(;r;)t.push(r),r=o.nextNode();return t}let c=`
    @page {
        /* Remove browser default header (title) and footer (url) */
        margin: 0;
    }
    @media print {
        body {
            /* Tell browsers to print background colors */
            color-adjust: exact; /* Firefox. This is an older version of "print-color-adjust" */
            print-color-adjust: exact; /* Firefox/Safari */
            -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
        }
    }
`;function u({bodyClass:e,contentRef:t,copyShadowRoots:o,documentTitle:u,fonts:p,ignoreGlobalStyles:m,nonce:f,onAfterPrint:h,onBeforePrint:g,onPrintError:y,pageStyle:b,preserveAfterPrint:v,print:w,printIframeProps:x,suppressErrors:E}){return(0,r.useCallback)(r=>{function k(){let i={bodyClass:e,contentRef:t,copyShadowRoots:o,documentTitle:u,fonts:p,ignoreGlobalStyles:m,nonce:f,onAfterPrint:h,onPrintError:y,pageStyle:b,preserveAfterPrint:v,print:w,suppressErrors:E},g=function(e){let t=document.createElement("iframe");return t.width=`${document.documentElement.clientWidth}px`,t.height=`${document.documentElement.clientHeight}px`,t.style.position="absolute",t.style.top=`-${document.documentElement.clientHeight+100}px`,t.style.left=`-${document.documentElement.clientWidth+100}px`,t.id=n,t.srcdoc="<!DOCTYPE html>",e&&(e.allow&&(t.allow=e.allow),void 0!==e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),void 0!==e.sandbox&&(t.sandbox=e.sandbox)),t}(x),k=function(e,t){let{contentRef:o,fonts:r,ignoreGlobalStyles:n,suppressErrors:i}=t,a=function({contentRef:e,optionalContent:t,suppressErrors:o}){return t&&"function"==typeof t?(e&&s({level:"warning",messages:['"react-to-print" received a `contentRef` option and an optional-content param passed to its callback. The `contentRef` option will be ignored.']}),t()):e?e.current:void s({messages:['"react-to-print" did not receive a `contentRef` option or a optional-content param pass to its callback.'],suppressErrors:o})}({contentRef:o,optionalContent:e,suppressErrors:i});if(!a)return;let l=a.cloneNode(!0),d=document.querySelectorAll("link[rel~='stylesheet'], link[as='style']"),c=l.querySelectorAll("img"),u=l.querySelectorAll("video"),p=r?r.length:0,m=(n?0:d.length)+c.length+u.length+p;return{contentNode:a,clonedContentNode:l,clonedImgNodes:c,clonedVideoNodes:u,numResourcesToLoad:m,originalCanvasNodes:a.querySelectorAll("canvas")}}(r,i);if(!k){s({messages:["There is nothing to print"],suppressErrors:E});return}g.onload=()=>{(function(e,t,o){let{contentNode:r,clonedContentNode:n,clonedImgNodes:i,clonedVideoNodes:u,numResourcesToLoad:p,originalCanvasNodes:m}=t,{bodyClass:f,fonts:h,ignoreGlobalStyles:g,pageStyle:y,nonce:b,suppressErrors:v,copyShadowRoots:w}=o,x=[],E=[];function k(t,r){if(x.includes(t)){s({level:"debug",messages:["Tried to mark a resource that has already been handled",t],suppressErrors:v});return}r?(s({messages:['"react-to-print" was unable to load a resource but will continue attempting to print the page',...r],suppressErrors:v}),E.push(t)):x.push(t),x.length+E.length===p&&l(e,o)}e.onload=null;let A=e.contentDocument??e.contentWindow?.document;if(A){let t=A.body.appendChild(n);w&&function e(t,o,r){let n=d(t),i=d(o);if(n.length!==i.length){s({messages:["When cloning shadow root content, source and target elements have different size. `onBeforePrint` likely resolved too early.",t,o],suppressErrors:r});return}for(let t=0;t<n.length;t++){let o=n[t],s=i[t],a=o.shadowRoot;if(null!==a){let t=s.attachShadow({mode:a.mode});t.innerHTML=a.innerHTML,e(a,t,r)}}}(r,t,!!v),h&&(e.contentDocument?.fonts&&e.contentWindow?.FontFace?h.forEach(t=>{let o=new FontFace(t.family,t.source,{weight:t.weight,style:t.style});e.contentDocument.fonts.add(o),o.loaded.then(()=>{k(o)}).catch(e=>{k(o,["Failed loading the font:",o,"Load error:",a(e)])})}):(h.forEach(e=>{k(e)}),s({messages:['"react-to-print" is not able to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page'],suppressErrors:v})));let o=A.createElement("style");b&&(o.setAttribute("nonce",b),A.head.setAttribute("nonce",b)),o.appendChild(A.createTextNode(y??c)),A.head.appendChild(o),f&&A.body.classList.add(...f.split(" "));let l=A.querySelectorAll("canvas");for(let e=0;e<m.length;++e){let t=m[e],o=l[e];if(void 0===o){s({messages:["A canvas element could not be copied for printing, has it loaded? `onBeforePrint` likely resolved too early.",t],suppressErrors:v});continue}let r=o.getContext("2d");r&&r.drawImage(t,0,0)}for(let e=0;e<i.length;e++){let t=i[e],o=t.getAttribute("src");if(o){let e=new Image;e.onload=()=>{k(t)},e.onerror=(e,o,r,n,s)=>{k(t,["Error loading <img>",t,"Error",s])},e.src=o}else k(t,['Found an <img> tag with an empty "src" attribute. This prevents pre-loading it.',t])}for(let e=0;e<u.length;e++){let t=u[e];t.preload="auto";let o=t.getAttribute("poster");if(o){let e=new Image;e.onload=()=>{k(t)},e.onerror=(e,r,n,s,i)=>{k(t,["Error loading video poster",o,"for video",t,"Error:",i])},e.src=o}else t.readyState>=2?k(t):t.src?(t.onloadeddata=()=>{k(t)},t.onerror=(e,o,r,n,s)=>{k(t,["Error loading video",t,"Error",s])},t.onstalled=()=>{k(t,["Loading video stalled, skipping",t])}):k(t,["Error loading video, `src` is empty",t])}let p="select",x=r.querySelectorAll(p),E=A.querySelectorAll(p);for(let e=0;e<x.length;e++)E[e].value=x[e].value;if(!g){let e=document.querySelectorAll("style, link[rel~='stylesheet'], link[as='style']");for(let t=0,o=e.length;t<o;++t){let o=e[t];if("style"===o.tagName.toLowerCase()){let e=A.createElement(o.tagName),r=o.sheet;if(r){let n="";try{let e=r.cssRules.length;for(let t=0;t<e;++t)"string"==typeof r.cssRules[t].cssText&&(n+=`${r.cssRules[t].cssText}\r
`)}catch(e){s({messages:["A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/MatthewHerbst/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross `crossorigin` attribute, and setting the `Access-Control-Allow-Origin` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.",o,`Original error: ${a(e).message}`],level:"warning"})}e.setAttribute("id",`react-to-print-${t}`),b&&e.setAttribute("nonce",b),e.appendChild(A.createTextNode(n)),A.head.appendChild(e)}}else if(o.getAttribute("href")){if(o.hasAttribute("disabled"))s({messages:["`react-to-print` encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:",o],level:"warning"}),k(o);else{let e=A.createElement(o.tagName);for(let t=0,r=o.attributes.length;t<r;++t){let r=o.attributes[t];r&&e.setAttribute(r.nodeName,r.nodeValue??"")}e.onload=()=>{k(e)},e.onerror=(t,o,r,n,s)=>{k(e,["Failed to load",e,"Error:",s])},b&&e.setAttribute("nonce",b),A.head.appendChild(e)}}else s({messages:["`react-to-print` encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:",o],level:"warning"}),k(o)}}}0===p&&l(e,o)})(g,k,i)},document.body.appendChild(g)}i(v,!0),g?g().then(()=>{k()}).catch(e=>{y?.("onBeforePrint",a(e))}):k()},[e,t,o,u,p,m,f,h,g,y,b,v,x,w,E])}}};