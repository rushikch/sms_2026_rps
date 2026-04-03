exports.id=764,exports.ids=[764],exports.modules={331:(e,t,s)=>{Promise.resolve().then(s.bind(s,6968))},6696:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2994,23)),Promise.resolve().then(s.t.bind(s,6114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,9671,23)),Promise.resolve().then(s.t.bind(s,1868,23)),Promise.resolve().then(s.t.bind(s,4759,23))},6968:(e,t,s)=>{"use strict";s.d(t,{default:()=>n});var a=s(326),r=s(2782),i=s(9308),o=s(1810);function n(){let e=(0,r.e)(),t=async()=>{await e.auth.signOut(),window.location.href="/login"};return a.jsx("header",{className:"header-gradient shadow-colored sticky top-0 z-50 animate-slide-in",children:a.jsx("div",{className:"container mx-auto px-4 py-4",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[a.jsx("div",{className:"bg-white/20 backdrop-blur-sm p-2 rounded-xl",children:a.jsx(i.Z,{className:"w-8 h-8 text-white"})}),(0,a.jsxs)("div",{children:[a.jsx("h1",{className:"text-xl md:text-2xl font-bold text-white tracking-tight",children:"Rainbow Public School"}),a.jsx("p",{className:"text-blue-100 text-xs md:text-sm",children:"Management System"})]})]}),(0,a.jsxs)("button",{onClick:t,className:"flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl transition-all duration-300 hover:shadow-xl border border-white/30 group",children:[a.jsx("span",{className:"font-medium text-sm md:text-base",children:"Sign Out"}),a.jsx(o.Z,{className:"w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"})]})]})})})}},3398:(e,t,s)=>{"use strict";s.d(t,{q:()=>r});var a=s(7577);function r(){let[e,t]=(0,a.useState)(null),[s,r]=(0,a.useState)(!0);return{role:e,loading:s}}s(2782)},6333:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});let a=(0,s(5709).Z)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},434:(e,t,s)=>{"use strict";s.d(t,{default:()=>r.a});var a=s(9404),r=s.n(a)},2782:(e,t,s)=>{"use strict";s.d(t,{e:()=>r});var a=s(7097);function r(){return(0,a.createBrowserClient)("https://nggxclguscdndymxwtny.supabase.co","YOUR_SUPABASE_ANON_KEY_HERE")}s(2629)},8424:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u,metadata:()=>c});var a=s(9510),r=s(5384),i=s.n(r);s(7272);var o=s(7901),n=s(1615),l=s(8585);let d=(0,s(8570).createProxy)(String.raw`/workspaces/sms_2026_rps/components/Header.tsx#default`),c={title:"Rainbow Public School Management System",description:"School Management System"};async function u({children:e}){let t=function(){let e=(0,n.cookies)();return(0,o.createServerClient)("https://nggxclguscdndymxwtny.supabase.co","YOUR_SUPABASE_ANON_KEY_HERE",{cookies:{getAll:()=>e.getAll(),setAll(t){try{t.forEach(({name:t,value:s,options:a})=>e.set(t,s,a))}catch{}}}})}(),{data:{session:s}}=await t.auth.getSession();if(s){let{data:e}=await t.from("user_roles").select("role").eq("user_id",s.user.id).single();e&&["admin","superadmin"].includes(e.role)||(0,l.redirect)("/unauthorized")}return a.jsx("html",{lang:"en",children:a.jsx("body",{className:`${i().className} min-h-screen`,children:(0,a.jsxs)("div",{className:"min-h-screen flex flex-col",children:[a.jsx(d,{}),a.jsx("main",{className:"flex-1 animate-fade-in",children:e}),a.jsx("footer",{className:"bg-white/50 backdrop-blur-sm border-t border-gray-200 py-4 mt-auto",children:a.jsx("div",{className:"container mx-auto px-4 text-center text-gray-600 text-sm",children:"\xa9 2026 Rainbow Public School. All rights reserved."})})]})})})}},7272:()=>{},381:(e,t,s)=>{"use strict";s.d(t,{x7:()=>ec,ZP:()=>eu});var a,r=s(7577);let i={data:""},o=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i},n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,c=(e,t)=>{let s="",a="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":a+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=c.p?c.p(i,o):i+":"+o+";")}return s+(t&&r?t+"{"+r+"}":r)+a},u={},m=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+m(e[s]);return t}return e},p=(e,t,s,a,r)=>{let i=m(e),o=u[i]||(u[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!u[o]){let t=i!==e?e:(e=>{let t,s,a=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(s=t[3].replace(d," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);u[o]=c(r?{["@keyframes "+o]:t}:t,s?"":"."+o)}let p=s&&u.g?u.g:null;return s&&(u.g=u[o]),((e,t,s,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(u[o],t,a,p),o},f=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function h(e){let t=this||{},s=e.call?e(t.p):e;return p(s.unshift?s.raw?f(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}h.bind({g:1});let g,x,b,y=h.bind({k:1});function v(e,t){let s=this||{};return function(){let a=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;s.p=Object.assign({theme:x&&x()},n),s.o=/ *go\d+/.test(l),n.className=h.apply(s,a)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),b&&d[0]&&b(n),g(d,n)}return t?t(r):r}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,E=(()=>{let e=0;return()=>(++e).toString()})(),k=(()=>{let e;return()=>e})(),N="default",P=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return P(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},S=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},$=(e,t=N)=>{O[t]=P(O[t]||A,e),S.forEach(([e,s])=>{e===t&&s(O[t])})},_=e=>Object.keys(O).forEach(t=>$(e,t)),C=e=>Object.keys(O).find(t=>O[t].toasts.some(t=>t.id===e)),D=(e=N)=>t=>{$(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=N)=>{let[s,a]=(0,r.useState)(O[t]||A),i=(0,r.useRef)(O[t]);(0,r.useEffect)(()=>(i.current!==O[t]&&a(O[t]),S.push([t,a]),()=>{let e=S.findIndex(([e])=>e===t);e>-1&&S.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:o}},R=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||E()}),H=e=>(t,s)=>{let a=R(t,e,s);return D(a.toasterId||C(a.id))({type:2,toast:a}),a.id},M=(e,t)=>H("blank")(e,t);M.error=H("error"),M.success=H("success"),M.loading=H("loading"),M.custom=H("custom"),M.dismiss=(e,t)=>{let s={type:3,toastId:e};t?D(t)(s):_(s)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let s={type:4,toastId:e};t?D(t)(s):_(s)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,s)=>{let a=M.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?j(t.success,e):void 0;return r?M.success(r,{id:a,...s,...null==s?void 0:s.success}):M.dismiss(a),e}).catch(e=>{let r=t.error?j(t.error,e):void 0;r?M.error(r,{id:a,...s,...null==s?void 0:s.error}):M.dismiss(a)}),e};var L=1e3,T=(e,t="default")=>{let{toasts:s,pausedAt:a}=I(e,t),i=(0,r.useRef)(new Map).current,o=(0,r.useCallback)((e,t=L)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&M.dismiss(s.id);return}return setTimeout(()=>M.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let n=(0,r.useCallback)(D(t),[t]),l=(0,r.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,r.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,r.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}},U=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Z=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Z} 0.15s ease-out forwards;
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
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,K=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=y`
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
}`,J=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
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
`,Q=v("div")`
  position: absolute;
`,V=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ee=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(X,null,t):t:"blank"===s?null:r.createElement(V,null,r.createElement(q,{...a}),"loading"!==s&&r.createElement(Q,null,"error"===s?r.createElement(Y,{...a}):r.createElement(J,{...a})))},et=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,es=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
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
`,er=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[et(s),es(s)];return{animation:t?`${y(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},eo=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=r.createElement(ee,{toast:e}),n=r.createElement(er,{...e.ariaProps},j(e.message,e));return r.createElement(ea,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:o,message:n}):r.createElement(r.Fragment,null,o,n))});a=r.createElement,c.p=void 0,g=a,x=void 0,b=void 0;var en=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let o=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:o,className:t,style:s},i)},el=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=T(s,o);return r.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o=s.position||t,n=el(o,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return r.createElement(en,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?j(s.message,s):i?i(s):r.createElement(eo,{toast:s,position:o}))}))},eu=M}};