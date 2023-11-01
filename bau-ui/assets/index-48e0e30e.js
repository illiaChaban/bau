(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const en=(e,t)=>({...e,paths:[...t,e.path]}),vt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...a})=>{const i=en(a,e);return n?[i,...vt({paths:[...e,a.path],routes:n})]:i}),tn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},nn=({routes:e=[],notFoundRoute:t})=>{const n=vt({routes:e}).map(a=>({...a,regex:tn(a)}));return{resolve:({pathname:a})=>{const i=n.find(({regex:r})=>r.test(a));return i?i.action({match:a.match(i.regex)}):t}}};function an({routes:e,notFoundRoute:t,onLocationChange:n}){const a=nn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{i.state!=null&&n({router:a})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,r,s)=>{i.apply(r,s),n({router:a})}}),document.addEventListener("click",i=>{const{target:r}=i,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),i.preventDefault())}),n({router:a}),a}const wt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],rn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],on=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],nt=e=>`var(--color-${e})`,sn=e=>`var(--color-${e}-lightest)`,ln=()=>wt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${nt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${sn(e)};
}
.solid.${e} {
  background-color: ${nt(e)};
}
`).join(`
`),cn=e=>100-e*10,dn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${cn(t)}%);`).join(`
`),yt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),un=([e,{h:t,s:n,l:a}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${a};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...rn.map(([i,r])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...on.map(([i,r])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function hn({createGlobalStyles:e},{colorPalette:t=wt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,a])=>un([n,a])).join(`
`)}
      ${dn()}
      ${yt({})}
      ${ln()}
      
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 30%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.4rem;
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
      --font-color-inverse: var(--color-content-inverse);
      --font-color-secondary: var(--color-content-secondary);
      --font-family: system-ui, -apple-system, Helvetica, Arial, sans-serif;
      --font-family-monospace: Consolas, monospace;
      --font-weight-light: 300;
      --font-weight-normal: 400;
      --font-weight-semibold: 500;
      --font-weight-bold: 700;
      --global-spacing: 1rem;
      --spacing-vertical: var(--global-spacing);
      --spacing-horizontal: var(--global-spacing);
      --transition-fast: 200ms;
      --transition-slow: 400ms;
      --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      --shadow-m: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      --font-size-base: 100%;
      --line-height-base: 1.65;
      --link-color: var(--color-primary);
      --brightness-hover-always: 180%;
      --brightness-active-always: 150%;
      --brightness-hover: 80%;
      --brightness-hover-reverse: 140%;
      --brightness-active: 90%;
      .plain {
        background-color: var(--background-color);
      }
      .outline {
        background-color: var(--background-color);
      }
      .solid {
        color: var(--font-color-inverse);
      }
      .sm {
        font-size: 0.8rem;
      }
      .md {
        font-size: 1.1rem;
      }
      .lg {
        font-size: 1.2rem;
      }
    }
    :root {
      font-family: var(--font-family);
      color-scheme: var(--color-scheme);
      color: var(--color-content);
      font: var(--font-size-base) / var(--line-height-base) var(--font-family);
      background-color: var(--background-color);
    }
    body {
      margin: 0;
    }
  `}function mn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Fe=e=>Object.prototype.toString.call(e??0).slice(8,-1),gn=e=>Fe(e)=="Object",at=e=>Fe(e)=="Function",De=e=>["Object","Array"].includes(Fe(e)),rt=Object.getPrototypeOf,Le=e=>pe(e)?e.val:e,pe=e=>e==null?void 0:e.__isState,fn=["splice","push","pop","shift","unshift","sort","reverse"],Ce=(e,t)=>{const n=new Array(e.length);for(let a=0;a<e.length;a++)n[a]=t(e[a],a);return n};const Q=e=>!pe(e[0])&&gn(e[0])?e:[{},...e];function pn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,a,i=new Set,r=new Set,s=!1,o,l=w=>n.createElement(w),u=(w,C,m)=>{let b=o;o=C;let x=w(m);return o=b,x},c=()=>{a||(a=window.requestAnimationFrame(()=>{i.forEach(w=>{w.bindings=w.bindings.filter(C=>{var m;return(m=C.element)==null?void 0:m.isConnected}),!w.bindings.length&&!w.computed&&i.delete(w)}),a=void 0}))},d=(w,C,m,b,x,$)=>{var M;if(s){r.add(w);return}for(let F of w.bindings){let{deps:L,element:z,renderInferred:j,render:V,renderItem:ee}=F;if(ee&&C)(M=p(z,b,(...oe)=>g(ee(...oe)),m,x,$)[C])==null||M.call();else{let oe=j?j({element:z}):V({element:z,renderItem:ee})(...L.map(Le));oe!==z&&z.replaceWith(F.element=g(oe))}}A(w),c()},h=(w,C,m=[])=>({get(b,x,$){var M;if(o==null||o.add(w),x==="_isProxy")return!0;if(!((M=b[x])!=null&&M._isProxy)&&!pe(b[x])&&De(b[x]))b[x]=new Proxy(b[x],h(w,C,[...m,x]));else if(fn.includes(x)){let F=b[x];return(...L)=>{let z=F.apply(b,L);return d(w,x,z,L,C,m),z}}return Reflect.get(b,x,$)},set(b,x,$,M){let F=Reflect.set(b,x,$,M);return d(w,"setItem",F,{prop:x,value:$},C,[...m,x]),F}}),v=(w,C)=>new Proxy(C,h(w,C)),p=(w,C,m,b,x,$)=>{let M=()=>w.replaceChildren(...Ce(b,m)),F=L=>w[L]&&w.removeChild(w[L]);return{assign:M,sort:M,reverse:M,setItem:()=>{var z;let L=$[0];(z=w.children[L])==null||z.replaceWith(m(x[L],L))},push:()=>w.append(...Ce(C,(L,z)=>m(L,x.length+z))),unshift:()=>w.prepend(...Ce(C,m)),pop:()=>F("lastChild"),shift:()=>F("firstChild"),splice:()=>{let[L,z,...j]=C;const{length:V}=w.children;for(let ee=L>=0?Math.min(L+z-1,V-1):V-1;ee>=(L>=0?L:V+L);ee--)w.children[ee].remove();if(j.length){let ee=j.forEach((oe,me)=>m(oe,L+me));w.children[L]?w.children[L].after(...ee):w.append(...ee)}}}},f=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let C=this;return o==null||o.add(C),C.valProxy??(C.valProxy=De(w)?v(C,w):w,C.valProxy)},set val(C){let m=this,b=m.val;De(C)?(m.valProxy=v(m,C),d(m,"assign",C)):C!==b&&(m.valProxy=C,d(m)),m.oldVal=b}}),g=w=>w==null||w===!1?l("span"):w.nodeType?w:n.createTextNode(w),y=(w,C)=>{let m=new Set;return C.val=u(w,m),m},E=w=>{let C=f(),m=y(w,C);C.computed=!0;for(let b of m)b.listeners.push({computed:w,deps:m,state:C});return C},A=w=>{for(let C of[...w.listeners])y(C.computed,C.state)},k=(w,...C)=>{if(C.length){let m=[];for(let b of C.flat(1/0))b!=null&&m.push(pe(b)?G({deps:[b],render:()=>x=>x}):at(b)?Z({renderInferred:b}):g(b));w.append(...m)}},O={},D=(w,C)=>w&&(Object.getOwnPropertyDescriptor(w,C)??D(rt(w),C)),N=(w,C,m)=>{var b;return O[w+","+C]??(O[w+","+C]=((b=D(m,C))==null?void 0:b.set)??0)},R=(w,C)=>new MutationObserver((m,b)=>{m.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find($=>$===w&&(C({element:w}),b.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),I=w=>new Proxy(function(m,...b){var F;let[x,...$]=Q(b),M=w?n.createElementNS(w,m):l(m);for(let[L,z]of Object.entries(x)){if(L.startsWith("bau"))continue;let j=N(m,L,rt(M))?V=>M[L]=V:V=>M.setAttribute(L,V);z==null||(pe(z)?G({deps:[z],render:()=>()=>(j(z.val),M)}):at(z)&&(!L.startsWith("on")||z.isDerived)?Z({renderInferred:()=>(j(z({element:M})),M)}):z.renderProp?G({deps:z.deps,render:()=>()=>(j(z.renderProp({element:M})(...z.deps.map(Le))),M)}):j(z))}return k(M,...$),(F=x.bauCreated)==null||F.call(x,{element:M}),x.bauMounted&&t.requestAnimationFrame(()=>x.bauMounted({element:M})),x.bauUnmounted&&t.requestAnimationFrame(()=>R(M,x.bauUnmounted)),M},{get:(C,m)=>C.bind(void 0,m)}),H=(w,C,m)=>{w.element=g(m);for(let b of C)pe(b)&&(i.add(b),b.bindings.push(w));return w.element},Z=({renderInferred:w,element:C})=>{let m=new Set,b=u(w,m,{element:C});return H({renderInferred:w},m,b)},G=({deps:w,element:C,render:m,renderItem:b})=>H({deps:w,render:m,renderItem:b},w,m({element:C,renderItem:b})(...w.map(Le))),W=(w,C,m)=>G({deps:[w],render:({renderItem:b})=>x=>(C.append(...Ce(x,b)),C),renderItem:m}),K=w=>{s=!0,w(),s=!1,r.forEach(d),r.clear()};return{tags:I(),tagsNS:I,state:f,bind:G,loop:W,derive:E,stateSet:i,batch:K}}const bn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},vn=(e,t,n,a)=>{const i=e.createElement("style");i.id=n,i.append(a),(t??e.head).append(i)},wn=(e,t)=>e.reduce((n,a,i)=>n+a+(t[i]??""),"");function yn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=a=>(i,...r)=>{const s=wn(i,r),o=bn(s);return!t.getElementById(o)&&vn(t,e==null?void 0:e.target,o,a(o,s)),o};return{css:n((a,i)=>`.${a} { ${i} }`),keyframes:n((a,i)=>`@keyframes ${a} { ${i} }`),createGlobalStyles:n((a,i)=>i)}}function En(e){return{bau:pn(),...yn(),tr:n=>n,window,...e}}function B(...e){return e.filter(t=>t).join(" ")}function te(e,t){const{bau:n,css:a}=e,i={root:a`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      min-height: 2rem;
      border: none;
      border-radius: var(--global-radius);
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: all var(--transition-slow);
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &:hover.solid {
        filter: brightness(var(--brightness-hover-always));
      }
      &.sm {
        padding: 0.3rem;
      }
      &.md {
        padding: 0.5rem;
      }
      &.lg {
        padding: 0.7rem 2rem;
      }
    `,button:a`
      cursor: pointer;
    `,a:a``,disabled:a`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...s){let[{color:o,variant:l,size:u="md",disabled:c,href:d,...h},...v]=Q(s);return(d?n.tags.a:n.tags.button)({...h,class:B("button",i.root,l,u,o,d?i.a:i.button,c&&i.disabled,t==null?void 0:t.class,h.class),disabled:c,href:d,...!d&&{type:"button"}},v)}}const ae=["neutral","primary","success","danger","warning"],xn=["plain","outline","solid"],Sn="light",Cn=()=>ae.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Ue(e,t){const{bau:n,css:a,window:i}=e,{input:r}=n.tags,s=c=>{i.document.documentElement.setAttribute("data-theme",c),localStorage.setItem("theme",c)},o=()=>{try{return localStorage.getItem("theme")}catch{}},l=o();l?s(l):i.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):i.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Sn);const u=a`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      width: 1.7rem;
      height: 1.7rem;
    }
    &.sm::after {
      font-size: 1rem;
    }
    &.md {
      width: 2rem;
      height: 2rem;
    }
    &.md::after {
      font-size: 1.5rem;
    }
    &.lg {
      width: 3rem;
      height: 3rem;
    }
    &.lg::after {
      font-size: 2.3rem;
    }
    ${Cn()}
  `;return function(...d){let[{color:h,variant:v="outline",size:p="md",...f},...g]=Q(d);return r({required:"required",title:"Switch Theme",...f,class:B("theme-switch",h,v,p,u,t==null?void 0:t.class,f.class),type:"checkbox",checked:o()=="dark",onclick:y=>{s(y.target.checked?"dark":"light")}},...g)}}function kn(e){const{tr:t,bau:n,css:a,config:i,states:r}=e,{i:s,header:o,h1:l,div:u,a:c,img:d,b:h,ul:v,li:p}=n.tags,{svg:f,path:g}=n.tagsNS("http://www.w3.org/2000/svg"),y=r.drawerOpen,E=te(e,{class:a`
      background: transparent;
    `}),A=Ue(e),k=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},g({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),O=()=>u({class:a`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},k()),c({href:`${i.base}/`,class:a`
            text-decoration: none;
            font-size: x-large;
          `},h(t("Bau UI")))),D=()=>u({class:a`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},A(),E({class:a``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:a`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${i.base}/github-mark-white.svg`,width:30,height:30})));return function(){return o({class:a`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
        `},O(),D())}}function Tn({tr:e,bau:t,css:n}){const{footer:a,span:i,a:r,ul:s,li:o,p:l}=t.tags;return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},i("version: 0.41.0"))}}function Et(e,t={}){return function({parent:a,animationHide:i,animationShow:r},s){s.style.animation=r;const o=()=>{s.removeEventListener("animationend",o),s.style.animation=""};return s.addEventListener("animationend",o),new MutationObserver((l,u)=>{l.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(d=>{a.style.position="relative";const h=d.cloneNode(!0);return h.style.top=0,h.style.left=0,h.style.position="absolute",h.style.animation=i,c.previousSibling?c.previousSibling.after(h):c.nextSibling?c.nextSibling.before(h):c.target&&c.target.appendChild(h),h.addEventListener("animationend",()=>h.parentNode.removeChild(h)),u.disconnect(),!0}))}).observe(a,{childList:!0,subtree:!0}),s}}function _e(e,t){const{bau:n,css:a}=e,{ul:i}=n.tags,s=a`
    list-style: none;
    padding: 0;
    margin: 0 0;
    &.solid {
      & li:hover {
        filter: brightness(var(--brightness-hover-always));
      }
      & li.active {
        filter: brightness(var(--brightness-active-always));
      }
    }
    & li {
      padding: 0.4rem;
      cursor: pointer;
      background-color: inherit;
      transition: all var(--transition-slow) ease-out;
      display: flex;
      align-items: center;
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
    ${(()=>ae.map(o=>`
`).join(`
`))()}
  `;return function(...l){let[{color:u="neutral",variant:c="plain",size:d,...h},...v]=Q(l);return i({...h,class:B("list",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const ot="0.3s",xt=({parent:e,grandParent:t})=>n=>{const{children:a,...i}=n,r=structuredClone(i);return r.children=a==null?void 0:a.map(xt({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},St=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let a=0;a<t.children.length;a++){const i=St(e)(t.children[a]);if(i)return i}},An=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,showFromLeft:t`
   from {
     transform: translateX(-100%);
     opacity: 0;
   }
   to {
     transform: translateX(0%);
     opacity: 1;
   }
  `,hideToRight:t`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `,showFromRight:t`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `});function We(e,t){const{bau:n,css:a,window:i}=e,{base:r=""}=t,s=({currentTree:G,data:W,onclickBack:K})=>g(k({variant:"plain",href:`${r}${G.parentTree.children[0].data.href}`,onclick:K({currentTree:G}),class:a`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),k({variant:"plain",href:`${r}${W.href}`},W.name)),o=({data:{name:G,href:W},children:K=[]})=>k({href:`${r}${W}`,"data-ischild":K.length==0},G),l=({subTree:G})=>{var W;return i.location.pathname.replace(r,"")===((W=G==null?void 0:G.data)==null?void 0:W.href)},{renderHeader:u=s,renderMenuItem:c=o,isActive:d=l}=t,{ul:h,li:v,nav:p,div:f,header:g,a:y}=n.tags,E=Et(),A=_e(e),k=te(e,{class:a`
      &.button {
        flex-grow: 1;
        justify-content: flex-start;
      }
    `}),{hideToLeft:O,hideToRight:D,showFromRight:N,showFromLeft:R}=An(e),I=a`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      & a {
        padding: 0.6rem;
        border-radius: 0;
      }
    }
    & ul {
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & li {
        padding: 0;
      }
    }
  `,H=({variant:G,color:W,size:K,onclickItem:w,onclickBack:C,currentTree:m,pathnameState:b})=>{const{children:x,parentTree:$,data:M}=m;return f({class:B("drillDownMenu",G,W,K)},$&&u({data:M,currentTree:m,onclickBack:C}),x&&A({class:B(G,W,K)},x.map(F=>v({class:()=>B(F.children&&"has-children",d({pathname:b.val,subTree:F})&&"active"),onclick:F.children&&w({currentTree:F})},c(F)))))},Z=({tree:G,pathname:W})=>{let K=xt({})(G),w=St(W)(K);return w||(console.log("drilldown no sub tree",W),w=K),w};return function(W){const{variant:K="plain",color:w="neutral",size:C="md",tree:m,pathnameState:b=n.state(i.location.pathname),...x}=W,$=({currentTree:z})=>j=>F(j,L,z,!0),M=({currentTree:z})=>j=>F(j,L,z.parentTree,!1),F=(z,j,V,ee)=>{j.firstChild.replaceChildren(E({parent:j,animationHide:`${ee?O:D} ${ot}`,animationShow:`${ee?N:R} ${ot}`},H({variant:K,color:w,size:C,currentTree:V,onclickItem:$,onclickBack:M,pathnameState:b})))},L=p({class:B(I,t==null?void 0:t.class,x.class)},()=>H({variant:K,color:w,size:C,currentTree:Z({tree:m,pathname:b.val}),onclickItem:$,onclickBack:M,pathnameState:b}));return L}}const Mn={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Ct(e){const{tr:t,bau:n,css:a,config:i,states:r,window:s}=e,{div:o,ul:l,li:u,nav:c,a:d,span:h}=n.tags;let v=!1;const p=We(e,{base:i.base});return function(){return o({bauMounted:({element:g})=>{s.innerWidth<=640&&(v=!0,r.drawerOpen.val=!1)},onclick:g=>{v&&!g.target.dataset.buttonback&&!g.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:B(a`
            grid-area: sidebar;
            position: sticky;
            top: calc(var(--header-height));
            align-self: start;
            overflow-y: scroll;
            height: calc(100vh - var(--header-height) - 1rem);
            @media (max-width: 640px) {
              position: fixed;
              width: 100vw;
              z-index: 1;
              display: none;
            }
          `)},p({tree:Mn,pathnameState:r.pathname}))}}const _n=e=>{const{bau:t,css:n,states:a}=e,{div:i}=t.tags,r=kn(e),s=Ct(e),o=Tn(e);return function({componentState:u}){return i({class:n`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "footer";
          }
        `},r(),s(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>u.val&&u.val({})),o())}};function In(e){const{bau:t,css:n,config:a}=e,{div:i,h1:r,h2:s,p:o}=t.tags;te(e);const l=n`
    padding: 0 1rem 1rem 1rem;
    & h1 {
      font-size: 56px;
    }
    & h2 {
      font-size: 48px;
    }
    & p {
      font-size: 24px;
      color: var(--color-emphasis-900);
    }
  `;return function({name:c,text:d,tagLine:h}){return i({class:l},r(c),s(d),o(h))}}function Nn(e){const{bau:t,css:n}=e,{div:a,h1:i,p:r}=t.tags,s=n`
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & .feature {
      background-color: var(--color-emphasis-50);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 0.5rem;
      width: 30%;
      & h1 {
        font-size: 1.1rem;
      }
      & p {
        color: var(--font-color-secondary);
      }
    }
    @media (max-width: 640px) {
      flex-direction: column;
      & .feature {
        width: 90%;
      }
    }
  `,o=({title:l,Content:u})=>a({className:"feature"},i(l),r(u()));return function({featuresContent:u}){return a({class:s},u.map(o))}}function $n(e){const{bau:t,css:n,config:a}=e,{div:i,p:r,a:s}=t.tags,o=In(e),l=Nn(e),u=te(e),c=n``,d=[{title:"UI components for the web",Content:()=>[r("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${a.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),r("3 variant: plain, outline and primary"),r("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[r("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[r("The component bundle size is about 8x smaller compared to popular React UI component library."),r("Faster download time for users."),r("Save in bandwith fees for the operator."),r("Suitable for low bandwith network and low cost device.")]}];return function({}){return i({class:c},o({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:d}))}}const On=()=>ae.map(e=>`
& li.plain.${e} h3::after {
  color: var(--color-${e});
}
& li.outline.${e} h3::after {
  color: var(--color-${e});
}
& h3.solid.${e}:hover {
  filter: brightness(var(--brightness-hover-always));
}
`).join(`
`);function kt(e,t){const{bau:n,css:a}=e,{accordionDefs:i}=t,{div:r,ul:s,li:o,header:l,h3:u,button:c}=n.tags,d=n.state(""),h=f=>g=>{d.val==f?d.val="":d.val=f},v=({element:f,open:g})=>{const y=()=>{f.removeEventListener("transitionend",y)};function E(k){k.addEventListener("transitionend",y),window.requestAnimationFrame(()=>{k.style.height="0px"})}function A(k){k.addEventListener("transitionend",y),k.style.height=k.scrollHeight+"px"}f.scrollHeight!=0&&(g?A(f):E(f))},p=a`
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;

      & li {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        margin: 0.2rem;
        overflow: hidden;
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        background-color: inherit;
        &:hover.solid {
          filter: brightness(var(--brightness-hover-always)) !important;
        }
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
        & h3 {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
          & button {
            width: 100%;
            border: none;
            background-color: inherit;
            text-align: left;
            font-size: large;
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
          &::after {
            content: "\u203A";
            transform: rotate(90deg);
          }
        }
        & .content {
          height: 0px;
          will-change: height;
          transition: height var(--transition-fast) ease-out;
        }
      }
    }
    ${On()}
  `;return function(...g){let[{color:y,variant:E="outline",size:A="md",content:k,...O},...D]=Q(g);const N=R=>{const{Header:I,Content:H,name:Z}=R;return o({class:B(y,E,A),onclick:h(Z)},u({class:()=>B(d.val==Z&&"active")},c({type:"button","aria-controls":`bau-${Z}`,"aria-expanded":({element:G})=>d.val==Z},I(R))),r({class:"content",role:"region",id:`bau-${Z}`,"data-state":({element:G})=>{const W=d.val==Z;return v({element:G,open:W}),W}},H(R)))};return r({class:B("accordion",p,t==null?void 0:t.class,O.class)},s(i.map(N)))}}function Rn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Tt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],a=typeof n;(a==="object"||a==="function")&&!Object.isFrozen(n)&&Tt(n)}),e}class st{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function At(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const a in e)n[a]=e[a];return t.forEach(function(a){for(const i in a)n[i]=a[i]}),n}const Bn="</span>",it=e=>!!e.scope,Dn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((a,i)=>`${a}${"_".repeat(i+1)}`)].join(" ")}return`${t}${e}`};class Ln{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=At(t)}openNode(t){if(!it(t))return;const n=Dn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){it(t)&&(this.buffer+=Bn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const lt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Xe{constructor(){this.rootNode=lt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=lt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(a=>this._walk(t,a)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Xe._collapse(n)}))}}class jn extends Xe{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const a=t.root;n&&(a.scope=`language:${n}`),this.add(a)}toHTML(){return new Ln(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function we(e){return e?typeof e=="string"?e:e.source:null}function Mt(e){return he("(?=",e,")")}function Pn(e){return he("(?:",e,")*")}function zn(e){return he("(?:",e,")?")}function he(...e){return e.map(n=>we(n)).join("")}function Hn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ve(...e){return"("+(Hn(e).capture?"":"?:")+e.map(a=>we(a)).join("|")+")"}function _t(e){return new RegExp(e.toString()+"|").exec("").length-1}function Gn(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Fn=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ke(e,{joinWith:t}){let n=0;return e.map(a=>{n+=1;const i=n;let r=we(a),s="";for(;r.length>0;){const o=Fn.exec(r);if(!o){s+=r;break}s+=r.substring(0,o.index),r=r.substring(o.index+o[0].length),o[0][0]==="\\"&&o[1]?s+="\\"+String(Number(o[1])+i):(s+=o[0],o[0]==="("&&n++)}return s}).map(a=>`(${a})`).join(t)}const Un=/\b\B/,It="[a-zA-Z]\\w*",Ze="[a-zA-Z_]\\w*",Nt="\\b\\d+(\\.\\d+)?",$t="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ot="\\b(0b[01]+)",Wn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Xn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=he(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,a)=>{n.index!==0&&a.ignoreMatch()}},e)},ye={begin:"\\\\[\\s\\S]",relevance:0},Vn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ye]},Kn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ye]},Zn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ie=function(e,t,n={}){const a=ie({scope:"comment",begin:e,end:t,contains:[]},n);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=Ve("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:he(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},qn=Ie("//","$"),Yn=Ie("/\\*","\\*/"),Jn=Ie("#","$"),Qn={scope:"number",begin:Nt,relevance:0},ea={scope:"number",begin:$t,relevance:0},ta={scope:"number",begin:Ot,relevance:0},na={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[ye,{begin:/\[/,end:/\]/,relevance:0,contains:[ye]}]}]},aa={scope:"title",begin:It,relevance:0},ra={scope:"title",begin:Ze,relevance:0},oa={begin:"\\.\\s*"+Ze,relevance:0},sa=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var ke=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Un,IDENT_RE:It,UNDERSCORE_IDENT_RE:Ze,NUMBER_RE:Nt,C_NUMBER_RE:$t,BINARY_NUMBER_RE:Ot,RE_STARTERS_RE:Wn,SHEBANG:Xn,BACKSLASH_ESCAPE:ye,APOS_STRING_MODE:Vn,QUOTE_STRING_MODE:Kn,PHRASAL_WORDS_MODE:Zn,COMMENT:Ie,C_LINE_COMMENT_MODE:qn,C_BLOCK_COMMENT_MODE:Yn,HASH_COMMENT_MODE:Jn,NUMBER_MODE:Qn,C_NUMBER_MODE:ea,BINARY_NUMBER_MODE:ta,REGEXP_MODE:na,TITLE_MODE:aa,UNDERSCORE_TITLE_MODE:ra,METHOD_GUARD:oa,END_SAME_AS_BEGIN:sa});function ia(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function la(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ca(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ia,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function da(e,t){Array.isArray(e.illegal)&&(e.illegal=Ve(...e.illegal))}function ua(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ha(e,t){e.relevance===void 0&&(e.relevance=1)}const ma=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(a=>{delete e[a]}),e.keywords=n.keywords,e.begin=he(n.beforeMatch,Mt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ga=["of","and","for","in","not","or","if","then","parent","list","value"],fa="keyword";function Rt(e,t,n=fa){const a=Object.create(null);return typeof e=="string"?i(n,e.split(" ")):Array.isArray(e)?i(n,e):Object.keys(e).forEach(function(r){Object.assign(a,Rt(e[r],t,r))}),a;function i(r,s){t&&(s=s.map(o=>o.toLowerCase())),s.forEach(function(o){const l=o.split("|");a[l[0]]=[r,pa(l[0],l[1])]})}}function pa(e,t){return t?Number(t):ba(e)?0:1}function ba(e){return ga.includes(e.toLowerCase())}const ct={},ue=e=>{console.error(e)},dt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},fe=(e,t)=>{ct[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ct[`${e}/${t}`]=!0)},Ae=new Error;function Bt(e,t,{key:n}){let a=0;const i=e[n],r={},s={};for(let o=1;o<=t.length;o++)s[o+a]=i[o],r[o+a]=!0,a+=_t(t[o-1]);e[n]=s,e[n]._emit=r,e[n]._multi=!0}function va(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ae;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Ae;Bt(e,e.begin,{key:"beginScope"}),e.begin=Ke(e.begin,{joinWith:""})}}function wa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ae;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Ae;Bt(e,e.end,{key:"endScope"}),e.end=Ke(e.end,{joinWith:""})}}function ya(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ea(e){ya(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),va(e),wa(e)}function xa(e){function t(s,o){return new RegExp(we(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(o?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(o,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,o]),this.matchAt+=_t(o)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const o=this.regexes.map(l=>l[1]);this.matcherRe=t(Ke(o,{joinWith:"|"}),!0),this.lastIndex=0}exec(o){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(o);if(!l)return null;const u=l.findIndex((d,h)=>h>0&&d!==void 0),c=this.matchIndexes[u];return l.splice(0,u),Object.assign(l,c)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(o){if(this.multiRegexes[o])return this.multiRegexes[o];const l=new n;return this.rules.slice(o).forEach(([u,c])=>l.addRule(u,c)),l.compile(),this.multiRegexes[o]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(o,l){this.rules.push([o,l]),l.type==="begin"&&this.count++}exec(o){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let u=l.exec(o);if(this.resumingScanAtSamePosition()&&!(u&&u.index===this.lastIndex)){const c=this.getMatcher(0);c.lastIndex=this.lastIndex+1,u=c.exec(o)}return u&&(this.regexIndex+=u.position+1,this.regexIndex===this.count&&this.considerAll()),u}}function i(s){const o=new a;return s.contains.forEach(l=>o.addRule(l.begin,{rule:l,type:"begin"})),s.terminatorEnd&&o.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&o.addRule(s.illegal,{type:"illegal"}),o}function r(s,o){const l=s;if(s.isCompiled)return l;[la,ua,Ea,ma].forEach(c=>c(s,o)),e.compilerExtensions.forEach(c=>c(s,o)),s.__beforeBegin=null,[ca,da,ha].forEach(c=>c(s,o)),s.isCompiled=!0;let u=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),u=s.keywords.$pattern,delete s.keywords.$pattern),u=u||/\w+/,s.keywords&&(s.keywords=Rt(s.keywords,e.case_insensitive)),l.keywordPatternRe=t(u,!0),o&&(s.begin||(s.begin=/\B|\b/),l.beginRe=t(l.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(l.endRe=t(l.end)),l.terminatorEnd=we(l.end)||"",s.endsWithParent&&o.terminatorEnd&&(l.terminatorEnd+=(s.end?"|":"")+o.terminatorEnd)),s.illegal&&(l.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(c){return Sa(c==="self"?s:c)})),s.contains.forEach(function(c){r(c,l)}),s.starts&&r(s.starts,o),l.matcher=i(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),r(e)}function Dt(e){return e?e.endsWithParent||Dt(e.starts):!1}function Sa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Dt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var Ca="11.8.0";class ka extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const je=At,ut=ie,ht=Symbol("nomatch"),Ta=7,Lt=function(e){const t=Object.create(null),n=Object.create(null),a=[];let i=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let o={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:jn};function l(m){return o.noHighlightRe.test(m)}function u(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const x=o.languageDetectRe.exec(b);if(x){const $=I(x[1]);return $||(dt(r.replace("{}",x[1])),dt("Falling back to no-highlight mode for this block.",m)),$?x[1]:"no-highlight"}return b.split(/\s+/).find($=>l($)||I($))}function c(m,b,x){let $="",M="";typeof b=="object"?($=m,x=b.ignoreIllegals,M=b.language):(fe("10.7.0","highlight(lang, code, ...args) has been deprecated."),fe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),M=m,$=b),x===void 0&&(x=!0);const F={code:$,language:M};w("before:highlight",F);const L=F.result?F.result:d(F.language,F.code,x);return L.code=F.code,w("after:highlight",L),L}function d(m,b,x,$){const M=Object.create(null);function F(T,_){return T.keywords[_]}function L(){if(!P.keywords){X.addText(Y);return}let T=0;P.keywordPatternRe.lastIndex=0;let _=P.keywordPatternRe.exec(Y),U="";for(;_;){U+=Y.substring(T,_.index);const q=re.case_insensitive?_[0].toLowerCase():_[0],ne=F(P,q);if(ne){const[se,Jt]=ne;if(X.addText(U),U="",M[q]=(M[q]||0)+1,M[q]<=Ta&&(Se+=Jt),se.startsWith("_"))U+=_[0];else{const Qt=re.classNameAliases[se]||se;V(_[0],Qt)}}else U+=_[0];T=P.keywordPatternRe.lastIndex,_=P.keywordPatternRe.exec(Y)}U+=Y.substring(T),X.addText(U)}function z(){if(Y==="")return;let T=null;if(typeof P.subLanguage=="string"){if(!t[P.subLanguage]){X.addText(Y);return}T=d(P.subLanguage,Y,!0,S[P.subLanguage]),S[P.subLanguage]=T._top}else T=v(Y,P.subLanguage.length?P.subLanguage:null);P.relevance>0&&(Se+=T.relevance),X.__addSublanguage(T._emitter,T.language)}function j(){P.subLanguage!=null?z():L(),Y=""}function V(T,_){T!==""&&(X.startScope(_),X.addText(T),X.endScope())}function ee(T,_){let U=1;const q=_.length-1;for(;U<=q;){if(!T._emit[U]){U++;continue}const ne=re.classNameAliases[T[U]]||T[U],se=_[U];ne?V(se,ne):(Y=se,L(),Y=""),U++}}function oe(T,_){return T.scope&&typeof T.scope=="string"&&X.openNode(re.classNameAliases[T.scope]||T.scope),T.beginScope&&(T.beginScope._wrap?(V(Y,re.classNameAliases[T.beginScope._wrap]||T.beginScope._wrap),Y=""):T.beginScope._multi&&(ee(T.beginScope,_),Y="")),P=Object.create(T,{parent:{value:P}}),P}function me(T,_,U){let q=Gn(T.endRe,U);if(q){if(T["on:end"]){const ne=new st(T);T["on:end"](_,ne),ne.isMatchIgnored&&(q=!1)}if(q){for(;T.endsParent&&T.parent;)T=T.parent;return T}}if(T.endsWithParent)return me(T.parent,_,U)}function Ne(T){return P.matcher.regexIndex===0?(Y+=T[0],1):(Be=!0,0)}function Ee(T){const _=T[0],U=T.rule,q=new st(U),ne=[U.__beforeBegin,U["on:begin"]];for(const se of ne)if(se&&(se(T,q),q.isMatchIgnored))return Ne(_);return U.skip?Y+=_:(U.excludeBegin&&(Y+=_),j(),!U.returnBegin&&!U.excludeBegin&&(Y=_)),oe(U,T),U.returnBegin?0:_.length}function tt(T){const _=T[0],U=b.substring(T.index),q=me(P,T,U);if(!q)return ht;const ne=P;P.endScope&&P.endScope._wrap?(j(),V(_,P.endScope._wrap)):P.endScope&&P.endScope._multi?(j(),ee(P.endScope,T)):ne.skip?Y+=_:(ne.returnEnd||ne.excludeEnd||(Y+=_),j(),ne.excludeEnd&&(Y=_));do P.scope&&X.closeNode(),!P.skip&&!P.subLanguage&&(Se+=P.relevance),P=P.parent;while(P!==q.parent);return q.starts&&oe(q.starts,T),ne.returnEnd?0:_.length}function $e(){const T=[];for(let _=P;_!==re;_=_.parent)_.scope&&T.unshift(_.scope);T.forEach(_=>X.openNode(_))}let ge={};function xe(T,_){const U=_&&_[0];if(Y+=T,U==null)return j(),0;if(ge.type==="begin"&&_.type==="end"&&ge.index===_.index&&U===""){if(Y+=b.slice(_.index,_.index+1),!i){const q=new Error(`0 width match regex (${m})`);throw q.languageName=m,q.badRule=ge.rule,q}return 1}if(ge=_,_.type==="begin")return Ee(_);if(_.type==="illegal"&&!x){const q=new Error('Illegal lexeme "'+U+'" for mode "'+(P.scope||"<unnamed>")+'"');throw q.mode=P,q}else if(_.type==="end"){const q=tt(_);if(q!==ht)return q}if(_.type==="illegal"&&U==="")return 1;if(Re>1e5&&Re>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=U,U.length}const re=I(m);if(!re)throw ue(r.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Oe=xa(re);let ve="",P=$||Oe;const S={},X=new o.__emitter(o);$e();let Y="",Se=0,ce=0,Re=0,Be=!1;try{if(re.__emitTokens)re.__emitTokens(b,X);else{for(P.matcher.considerAll();;){Re++,Be?Be=!1:P.matcher.considerAll(),P.matcher.lastIndex=ce;const T=P.matcher.exec(b);if(!T)break;const _=b.substring(ce,T.index),U=xe(_,T);ce=T.index+U}xe(b.substring(ce))}return X.finalize(),ve=X.toHTML(),{language:m,value:ve,relevance:Se,illegal:!1,_emitter:X,_top:P}}catch(T){if(T.message&&T.message.includes("Illegal"))return{language:m,value:je(b),illegal:!0,relevance:0,_illegalBy:{message:T.message,index:ce,context:b.slice(ce-100,ce+100),mode:T.mode,resultSoFar:ve},_emitter:X};if(i)return{language:m,value:je(b),illegal:!1,relevance:0,errorRaised:T,_emitter:X,_top:P};throw T}}function h(m){const b={value:je(m),illegal:!1,relevance:0,_top:s,_emitter:new o.__emitter(o)};return b._emitter.addText(m),b}function v(m,b){b=b||o.languages||Object.keys(t);const x=h(m),$=b.filter(I).filter(Z).map(j=>d(j,m,!1));$.unshift(x);const M=$.sort((j,V)=>{if(j.relevance!==V.relevance)return V.relevance-j.relevance;if(j.language&&V.language){if(I(j.language).supersetOf===V.language)return 1;if(I(V.language).supersetOf===j.language)return-1}return 0}),[F,L]=M,z=F;return z.secondBest=L,z}function p(m,b,x){const $=b&&n[b]||x;m.classList.add("hljs"),m.classList.add(`language-${$}`)}function f(m){let b=null;const x=u(m);if(l(x))return;if(w("before:highlightElement",{el:m,language:x}),m.children.length>0&&(o.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),o.throwUnescapedHTML))throw new ka("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const $=b.textContent,M=x?c($,{language:x,ignoreIllegals:!0}):v($);m.innerHTML=M.value,p(m,x,M.language),m.result={language:M.language,re:M.relevance,relevance:M.relevance},M.secondBest&&(m.secondBest={language:M.secondBest.language,relevance:M.secondBest.relevance}),w("after:highlightElement",{el:m,result:M,text:$})}function g(m){o=ut(o,m)}const y=()=>{k(),fe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){k(),fe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let A=!1;function k(){if(document.readyState==="loading"){A=!0;return}document.querySelectorAll(o.cssSelector).forEach(f)}function O(){A&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",O,!1);function D(m,b){let x=null;try{x=b(e)}catch($){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),i)ue($);else throw $;x=s}x.name||(x.name=m),t[m]=x,x.rawDefinition=b.bind(null,e),x.aliases&&H(x.aliases,{languageName:m})}function N(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function R(){return Object.keys(t)}function I(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=b})}function Z(m){const b=I(m);return b&&!b.disableAutodetect}function G(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function W(m){G(m),a.push(m)}function K(m){const b=a.indexOf(m);b!==-1&&a.splice(b,1)}function w(m,b){const x=m;a.forEach(function($){$[x]&&$[x](b)})}function C(m){return fe("10.7.0","highlightBlock will be removed entirely in v12.0"),fe("10.7.0","Please use highlightElement now."),f(m)}Object.assign(e,{highlight:c,highlightAuto:v,highlightAll:k,highlightElement:f,highlightBlock:C,configure:g,initHighlighting:y,initHighlightingOnLoad:E,registerLanguage:D,unregisterLanguage:N,listLanguages:R,getLanguage:I,registerAliases:H,autoDetection:Z,inherit:ut,addPlugin:W,removePlugin:K}),e.debugMode=function(){i=!1},e.safeMode=function(){i=!0},e.versionString=Ca,e.regex={concat:he,lookahead:Mt,either:Ve,optional:zn,anyNumberOfTimes:Pn};for(const m in ke)typeof ke[m]=="object"&&Tt(ke[m]);return Object.assign(e,ke),e},be=Lt({});be.newInstance=()=>Lt({});var Aa=be;be.HighlightJS=be;be.default=be;const mt=Rn(Aa),gt="[A-Za-z$_][0-9A-Za-z$_]*",Ma=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],_a=["true","false","null","undefined","NaN","Infinity"],jt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Pt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],zt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ia=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Na=[].concat(zt,jt,Pt);function $a(e){const t=e.regex,n=(b,{after:x})=>{const $="</"+b[0].slice(1);return b.input.indexOf($,x)!==-1},a=gt,i={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const $=b[0].length+b.index,M=b.input[$];if(M==="<"||M===","){x.ignoreMatch();return}M===">"&&(n(b,{after:$})||x.ignoreMatch());let F;const L=b.input.substring($);if(F=L.match(/^\s*=/)){x.ignoreMatch();return}if((F=L.match(/^\s+extends\s+/))&&F.index===0){x.ignoreMatch();return}}},o={$pattern:gt,keyword:Ma,literal:_a,built_in:Na,"variable.language":Ia},l="[0-9](_?[0-9])*",u=`\\.(${l})`,c="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${c})((${u})|\\.)?|(${u}))[eE][+-]?(${l})\\b`},{begin:`\\b(${c})\\b((${u})\\b|\\.)?|(${u})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},h={className:"subst",begin:"\\$\\{",end:"\\}",keywords:o,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"xml"}},p={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,h]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},A=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,p,f,g,{match:/\$\d+/},d];h.contains=A.concat({begin:/\{/,end:/\}/,keywords:o,contains:["self"].concat(A)});const k=[].concat(E,h.contains),O=k.concat([{begin:/\(/,end:/\)/,keywords:o,contains:["self"].concat(k)}]),D={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:O},N={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...jt,...Pt]}},I={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},Z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function G(b){return t.concat("(?!",b.join("|"),")")}const W={match:t.concat(/\b/,G([...zt,"super","import"]),a,t.lookahead(/\(/)),className:"title.function",relevance:0},K={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},w={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:o,exports:{PARAMS_CONTAINS:O,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),I,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,p,f,g,E,{match:/\$\d+/},d,R,{className:"attr",begin:a+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:O}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:r},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},K,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},W,Z,N,w,{match:/\$[(.]/}]}}const J=e=>{const{bau:t,css:n}=e,{div:a,table:i,tbody:r,tr:s,td:o,thead:l,th:u}=t.tags,c=["sm","md","lg"];return function({Item:h,name:v}){return a({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},i(l(s(u(v??"Variant/Color"),ae.map(p=>u(p)))),r(xn.map(p=>s(u(p),ae.map((f,g)=>o(h({color:f,variant:p,size:c[g%3]},{index:g}))))))))}},Oa=e=>{const{bau:t,css:n}=e,{article:a,h1:i,p:r,h2:s,pre:o}=t.tags;mt.registerLanguage("javascript",$a);const l=J(e),u=({text:c})=>o({bauCreated:({element:d})=>{d.innerHTML=mt.highlight(c,{language:"js"}).value}});return function(d){return a({class:n``},i(d.title),r(d.description),s("Gallery"),l({Item:d.gridItem(e)}),s("Usage"),u({text:d.importStatement}))}},Ra={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',gridItem:e=>{const{bau:t}=e,{div:n,p:a}=t.tags,r=kt(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>n(a("Item 3 content"))}]});return s=>r({...s})}},Ba=e=>{const t=Oa(e);return()=>t(Ra)},Da={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},La=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},ja=()=>ae.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Me(e,t){const{bau:n,css:a,createGlobalStyles:i}=e,{div:r,i:s}=n.tags;La({css:a,createGlobalStyles:i});const o=a`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 1rem;
      font-size: 2.5rem;
    }
    & .content {
      padding: 0 0.5rem;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
    }
    & .button-close {
      margin: 1rem;
    }
    ${ja()}
  `,l=te(e),u=({onclick:c})=>l({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(d,...h){const{variant:v="outline",color:p="neutral",size:f="md",onRemove:g,...y}=d;return r({...y,class:B(`alert-${v}`,v,p,f,o,t==null?void 0:t.class,d.class,"alert"),role:"alert"},s({class:"icon"},Da[p]),r({class:"content"},...h),g&&u({onclick:g}))}}const Pa=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,h4:l,p:u}=n.tags,c=J(e),d=Me(e),h=Me(e,{class:a`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>i({id:"alert"},o(t("Alert Examples")),s("Basic Alert"),r(d({color:"danger"},l("Something went wrong"),u("Error code ",404),u("Status ","Not Found"))),s("Custom Alert"),r(h({color:"warning"},l("My message"))),s("Alert Table"),c({Item:v=>d({...v},`Alert ${v.color}`)}))},za=(e,t={})=>{const{bau:n,css:a,keyframes:i}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:o}=n.tags,l=n.state([]),u={inserting:i`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:i`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},c={stack:a`
      min-width: 300px;
      max-width: 90% vw;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:a`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      animation: ${u.inserting} var(--transition-slow) ease-out;
    `,itemOut:a`
      animation: ${u.removing} var(--transition-slow) ease-out;
    `},d=({id:h,status:v})=>{const p=l.val.findIndex(f=>f.id===h);p!=-1&&(l.val[p].status=v)};return function(v={},...p){const f=({id:E})=>{d({id:E,status:"removing"});const A=l.val.findIndex(k=>k.id===E);A!=-1&&l.val.splice(A,1)},g=({Component:E})=>{const A={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};l.val.length>=r&&f({id:l.val[0].id}),l.val.push(A),setTimeout(()=>f(A),s)},y=E=>o({class:c.item,onclick:()=>f(E)},E.Component());return document.addEventListener("alert.add",E=>g(E.detail)),document.addEventListener("alert.remove",E=>f(E.detail)),o({class:B(c.stack,t==null?void 0:t.class,v.class)},n.loop(l,o(),y))}},Ha=e=>{const{tr:t,bau:n}=e,{section:a,h1:i}=n.tags,r=za(e,{deleteAfterDuration:2e4}),s=te(e),o=Me(e);return function(){return a({id:"alert-stack"},r(),i("Alert stack"),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>o({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>o({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Ga=({keyframes:e})=>({hideRight:e`
   from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
  `,showRight:e`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `}),Fa=e=>{const{bau:t}=e,{section:n,div:a,h1:i}=t.tags,r=Et(),s=te(e),o=Ga(e);return function(){const l=t.state(!0),u=a(),c=d=>{u.replaceChildren(r({parent:u,animationHide:`${o.hideRight} 0.5s`,animationShow:`${o.showRight} 0.5s`},a(d.val?"Ciao":"")))};return c(l),n({id:"animate"},a(i("Test Animate"),a(s({onclick:()=>{l.val=!l.val,c(l)}},()=>l.val?"Hide":"Show")),u))}};function Ht(e,t){const{bau:n,css:a}=e,{span:i,img:r}=n.tags,s=n.state(!0),o=n.state(!1),l=()=>s.val=!1,u=d=>{s.val=!1,o.val=!0},c=a`
    &.sm {
      width: 20px;
      height: 20px;
    }
    &.md {
      width: 40px;
      height: 40px;
    }
    &.lg {
      width: 60px;
      height: 60px;
    }
  `;return function(...h){let[{color:v,variant:p="outline",size:f="md",width:g=30,height:y=30,...E},...A]=Q(h);return i({class:B(c,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>o.val&&"Error",r({width:g,height:y,onload:l,onerror:u,class:B(v,p,f,c,t==null?void 0:t.class,E.class),...E}))}}const Ua=e=>{const{tr:t,bau:n,css:a,config:i}=e,{section:r,h2:s,h3:o}=n.tags,l=a`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,u=J(e),c=Ht(e,{class:a`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>r({id:"avatar"},s(t("Avatar")),c({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}),c({src:`${i.base}/grucloud.svg`,alt:"GruCloud"}),o("Avatar Table"),u({Item:d=>c({...d,src:`${i.base}/grucloud.svg`,alt:"GruCloud"})}))};function qe(e,t){const{bau:n,css:a,window:i}=e,{dialog:r}=n.tags,s=a`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    &::backdrop {
      background: var(--background-color);
    }
    opacity: 0;
  `;return function(...l){let[{contentEl:u,triggerEl:c,onClose:d,...h},...v]=Q(l);const p=y=>{g.style.opacity=1,g.showModal();const E=c.getBoundingClientRect(),A=g.getBoundingClientRect();E.x<i.innerWidth/2?g.style.left=E.left+"px":g.style.left=E.right-A.width+"px",E.y<i.innerHeight/2?g.style.top=E.top+E.height+"px":g.style.top=E.top-A.height+"px"},f=y=>{const E=()=>{g.close(),g.removeEventListener("transitionend",E)};g.addEventListener("transitionend",E),g.style.opacity=0},g=r({role:"presentation",class:B("popover",s,t==null?void 0:t.class,h==null?void 0:h.class),onclick:y=>y.target===g&&(f(),d==null?void 0:d.call())},u);return g.closeDialog=f,g.openDialog=p,g}}const Wa=()=>ae.map(e=>`
&.input.${e} {
  border: 2px solid transparent;
}
&.input.plain.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
}
&.input.outline.${e} {
  border: 1px solid var(--color-${e});
  &:focus {
    border: 2px solid var(--color-${e});
  };
}
&.input.soft.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
} 
&.input.solid.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function Ye(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,r=a`
    display: inline-block;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    &.sm {
      padding: 0.4rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.8rem;
    }
    ${Wa()}
  `;return function(o){const{size:l="md",variant:u="outline",color:c="neutral",name:d,id:h,disabled:v,...p}=o;return i({...p,class:B("input",l,c,u,r,t==null?void 0:t.class,p.class)})}}const Xa=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Gt(e,t){const{bau:n,css:a}=e,{div:i,li:r,ul:s}=n.tags,o=qe(e),l=te(e),u=Ye(e),c=_e(e),d=a`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }
    & .content {
      height: fit-content;
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${Xa()}
  `,h=n.state(""),v=n.state(""),p=n.state(!1),f=n.state(0),g=()=>{p.val=!1};return function(...E){let[{variant:A="outline",color:k,size:O="md",id:D,label:N,placeholder:R,Option:I,options:H,getOptionLabel:Z=({label:j})=>j,...G},...W]=Q(E);const K=n.state(H),w=()=>{z.openDialog(),p.val=!0,v.val="",K.val=H},C=()=>{z.closeDialog(),p.val=!1,v.val=""},m=j=>{const{value:V}=j.target;v.val=V,V?K.val=H.filter(ee=>Z(ee).match(new RegExp(`${V}`,"i"))):K.val=H},b=j=>{p.val?C():w()},x=({option:j,index:V})=>ee=>{h.val=Z(j),f.val=V,C()},$=j=>{switch(console.log("onkeydown",j.key,f.val),j.key){case"Escape":C();break;case"ArrowDown":f.val<K.val.length-1?f.val++:f.val=0;break;case"ArrowUp":f.val<=0?f.val=K.val.length-1:f.val--;break;case"Enter":h.val=Z(K.val[f.val]),v.val="",C();break}},M=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":N,onclick:b,variant:A,color:k,size:O},()=>!h.val&&N,h),F=u({id:D,value:v,placeholder:R,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":p,oninput:m,onkeydown:$,variant:A,color:k,size:O}),z=o({id:D,triggerEl:M,contentEl:(()=>i({class:B(A,k,O,"content")},F,()=>c({class:B(A,k,O)},K.val.map((j,V)=>r({class:()=>B(f.val==V&&"active"),onclick:x({option:j,index:V})},I(j))))))(),onClose:g});return i({...G,class:B("autocomplete",d,t==null?void 0:t.class,G==null?void 0:G.class)},M,z)}}const Va=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,span:l}=n.tags,u=(...p)=>r({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...p),c=J(e),d=Gt(e),h=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],v=p=>r({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(p.label),l(p.code));return()=>i({id:"autocomplete",class:a``},o(t("Autocomplete")),s("Basic Autocomplete"),u(d({options:h,Option:v,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),c({Item:p=>d({...p,options:h,Option:v,getOptionLabel:({label:f})=>f,label:"Country",placeholder:"Search countries",id:"country"})}))};function Pe(e,t){const{bau:n,css:a}=e,{span:i}=n.tags,r=a`
    position: relative;
    & span {
      display: block;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      right: 0;
      font-size: 0.75rem;
      font-weight: 600;
      transform: scale(1) translate(100%, -50%);
      transform-origin: 100% 0%;
      padding: 0.2rem;
      border-radius: 1rem;
      min-width: 1rem;
      height: 1rem;
    }
  `;return function(...o){let[{color:l,variant:u="outline",size:c="md",content:d,...h},...v]=Q(o);return i({...h,class:B("badge",r,t==null?void 0:t.class,h==null?void 0:h.class)},i({class:B(l,u,c)},d),...v)}}const Ka=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:r,h2:s}=t.tags,o=(...d)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...d),l=J(e),u=Pe(e),c=Pe(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>a({id:"badge"},s("Badge"),r("Basic Badge"),o(u({content:"10"},"☏")),r("Badges Table"),l({Item:(d,{index:h})=>u({...d,content:`${h*100}`},"☏")}),r("Badge custom"),o(c({content:"1"},"☏")))};function Ft(e,t){const{bau:n,css:a}=e,{ul:i,li:r,a:s,span:o}=n.tags,l=te(e),u=a`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin-bottom: 0;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "\u3009";
        padding: 0.5rem;
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
      > a,
      span {
        display: flex;
        text-decoration: none;
        border-radius: var(--global-radius);
        padding: 0.5rem;
        &:hover {
          background-color: var(--color-emphasis-100);
        }
      }
    }
  `;return function(...d){let[{color:h,variant:v="outline",size:p="md",items:f,...g},...y]=Q(d);return i({...g,class:B(u,t==null?void 0:t.class,g==null?void 0:g.class)},f.map(({href:E,name:A})=>r((E?l:o)({href:E,color:h,variant:v,size:p,class:B(h,v,p)},A))))}}const Za=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:r}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},o=J(e),l=Ft(e);return()=>a({id:"breadcrumbs"},i(t("Breadcrumbs")),r("Bacis Breadcrumb"),l(s),r("Breadcrumbs Table"),o({Item:u=>l({...u,...s})}))},qa=e=>{const{bau:t,css:n}=e,{section:a,p:i,h3:r}=t.tags,s=J(e),o=te(e);return()=>a({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},r("Button Examples"),s({Item:l=>o({...l},`${l.variant} ${l.color} ${l.size}`)}),r("Full With"),i(o({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),r("Icon"),i(o({"aria-label":"Close"},"✖"),o({},"⟪"),o({},"⟨"),o({},"⟩"),o({},"⟫")))},Ya=()=>ae.map(e=>`
&.button-group.${e} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function Je(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,r=a`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${Ya()}
  `;return function(...o){let[{variant:l="outline",size:u="md",color:c,...d},...h]=Q(o);return i({...d,class:B("button-group",l,c,u,r,t==null?void 0:t.class,d==null?void 0:d.class)},...h)}}const Ja=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:r}=n.tags,s=J(e),o=te(e),l=Je(e),u=["ONE","TWO","THREE"];return()=>a({id:"button-group"},i(t("Button Group Examples")),r("Outline"),l({color:"primary",variant:"solid"},u.map(c=>o({color:"primary",variant:"solid"},c))),r("Button Group Table"),s({Item:c=>l({...c},u.map(d=>o(c,d)))}))};function ze(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,s=a`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ae.map(o=>`
&.calendar.${o} {
  accent-color: var(--color-${o});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{color:u="neutral",variant:c="plain",size:d,...h},...v]=Q(l);return i({...h,type:"date",class:B("calendar",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const Qa=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,label:l}=n.tags,u=J(e),c=(...p)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...p),d=n.state("2023-08-08"),h=ze(e),v=ze(e,{class:a`
      background-color: lightseagreen !important;
    `});return()=>i({id:"calendar"},o(t("Calendar")),r("Date: ",d),s("Basic Calendar"),c(l({for:"start"},"Start date:",h({id:"start",value:d.val,oninput:p=>{d.val=p.target.value}}))),s("Calendar min and max"),c(l("End date:",h({min:"2023-01-01",max:"2023-12-31",value:d.val,oninput:p=>{d.val=p.target.value}}))),s("Calendar custom"),c(v({})),s("Calendar Table"),u({Item:p=>h({...p})}))};function Ut(e,t){const{bau:n,css:a}=e,{span:i}=n.tags,r=a`
    display: inline-block;
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0.2rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.5rem;
    }
  `;return function(...o){let[{size:l="md",variant:u="outline",color:c="neutral",onclick:d,...h},...v]=Q(o);return i({...h,onclick:d,class:B("chip",r,l,u,c,d&&"clickable",t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const er=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o}=n.tags,l=J(e),u=(...d)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...d),c=Ut(e);return()=>i({id:"chip"},o(t("Chip")),s("Chip Default"),u(c("My Chip")),s("Chip Clickable"),u(c({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),l({Item:d=>c({...d},`Chip ${d.color}`)}))};function Wt(e,t={}){const{bau:n,css:a}=e,{input:i}=n.tags,r=a`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--global-radius);
    appearance: none;
    outline: none;
    box-sizing: border-box;
    transition: all var(--transition-fast) ease-in-out;
    box-shadow: var(--shadow-s);
    position: relative;
    &:hover {
      transform: scale(1.05);
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &:disabled {
      border: 2px dashed var(--color-gray-500);
    }
    &:checked::after {
      opacity: 1;
    }
    &::after {
      content: "\u2716";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
    &.sm {
      width: 1.3rem;
      height: 1.3rem;
    }
    &.sm::after {
      font-size: 0.9rem;
    }
    &.md {
      width: 1.5rem;
      height: 1.5rem;
    }
    &.md::after {
      font-size: 1.2rem;
    }
    &.lg {
      width: 2rem;
      height: 2rem;
    }
    &.lg::after {
      font-size: 1.6rem;
    }
  `;return function(...o){let[{color:l,variant:u="outline",size:c="md",...d},...h]=Q(o);return i({type:"checkbox",required:"required",...d,class:B(r,l,u,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const tr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,label:s,h2:o,form:l}=n.tags,u=J(e),c=Wt(e),d=n.state(!1),h=n.state(!1),v=f=>g=>{f.val=!!g.target.checked},p=(...f)=>r({class:a`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...f);return()=>i({id:"checkbox"},l(o(t("Checkbox Examples")),p(c({id:"myCheckbox",name:"myCheckbox",checked:d,onchange:v(d)}),s({for:"myCheckbox"},"My Checkbox")),p(c({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:h,onchange:v(h)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),o(t("Checkbox Table")),u({Item:(f,{index:g})=>c({id:`myCheckbox-${g}`,name:`myCheckbox-${g}`,...f})})))};function nr(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,r=a`
    position: fixed;
    top: 80px;
    left: 0px;
    z-index: 2;
    & .overlay {
      position: fixed;
      visibility: hidden;
      z-index: -1;
      opacity: 0;
      background-color: var(--background-color);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: opacity var(--transition-fast) ease-out;
    }
    & .overlay-open {
      visibility: visible;
      z-index: 1;
      opacity: 0.5;
    }
    & .content {
      transform: translate(-100%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
    & .content-open {
      transform: translate(0%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
  `;return function(...o){let[{color:l,variant:u="outline",size:c,openState:d,...h},...v]=Q(o);return i({class:B(r,t==null?void 0:t.class,h.class)},i({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),i({class:()=>B("content",d.val&&"content-open")},v))}}const ar=e=>{const{tr:t,bau:n}=e,{section:a,h2:i}=n.tags,r=n.state(!1),s=nr(e),o=te(e),l=Ct(e);return()=>a({id:"drawer"},i(t("Drawer")),o({onclick:()=>{r.val=!r.val}},"OPEN DRAWER"),s({openState:r},l()))},rr=e=>{const{tr:t,bau:n,window:a,config:i}=e,{section:r,h2:s,h3:o}=n.tags,l=n.state(a.location.pathname.replace(i.base,"")),u=J(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},d=We(e,{base:i.base+"/components/drillDownMenu"});return()=>r({id:"drillDownMenu"},s(t("Drill Down Menu")),d({tree:c,pathnameState:l}),o("Drill Down Table"),u({Item:h=>d({tree:c,...h})}))};function Xt(e,t){const{bau:n,css:a}=e,{div:i,span:r,label:s,input:o}=n.tags,l={base:a`
      display: inline-block;
      > * {
        margin: 1rem 0;
      }
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      & .filename-display {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & label {
        border-radius: var(--global-radius);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          box-shadow: var(--shadow-m);
        }
      }
    `,disabled:a`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(c,...d){const{variant:h="outline",color:v="neutral",size:p="md",Component:f,disabled:g,...y}=c;return i({class:B(l.base,g&&l.disabled,t==null?void 0:t.class,c.class)},s({class:B(h,v,p)},f({disabled:g}),o({type:"file",disabled:g,...y})),r({class:"filename-display"}))}}const or=e=>{const{tr:t,bau:n,css:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:o,h3:l,h2:u,span:c}=n.tags,d=J(e),h=n.state("No file selected"),v=Xt(e),p=g=>{const y=g.target.files[0];y?h.val=y.name:h.val="No file selected"},f=({disabled:g})=>o({class:B(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,g&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:"uploadIcon.svg#Capa_1"})),c(t("Choose a file to upload")));return()=>s({id:"fileInput"},u(t("FileInput Examples")),l("File Input"),v({Component:f,name:"file",accept:"text/*",onchange:p}),o("File selected: ",h),l("File Input disabled"),v({Component:f,name:"file",accept:"text/*",disabled:!0,onchange:p}),l("File Input Table"),d({Item:g=>v({Component:f,name:"file",accept:"text/*",onchange:p,...g})}))},sr=e=>{const{tr:t,bau:n}=e,{section:a,div:i,h3:r,h2:s}=n.tags,o=J(e),l=Ye(e);return()=>a({id:"input"},s(t("Input Examples")),r("Standard"),i(l({id:"my-Input",name:"Label",label:"Label"})),r("Disabled"),i(l({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),l({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),r("Input with error"),i(l({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),r("Input Table"),o({Item:u=>l({name:"my-input",id:"my-input-with",placeholder:"Enter text",...u})}))};function Vt(e,t){const{bau:n,css:a}=e,{dialog:i}=n.tags,s=a`
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    top: 0;
    left: 0;
    max-height: 90vh;
    max-width: 95vw;
    transition: transform 0.3s ease-out;
    border-radius: 10px;
    min-width: 400px;
    padding: 0px;
    border: 0px;
    & header {
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: 800;
      text-align: center;
    }
    & footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: var(--shadow-s);
      padding: 1rem;
      gap: 1rem;
    }
    & > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
    ${(()=>ae.map(o=>`
&.modal.plain.${o} {
  color: inherit;
}
&.modal.outline.${o} {
  color: inherit;
}
&.modal.soft.${o} {
  color: inherit;
}
&.modal.solid.${o} {

}
`).join(`
`))()}
  `;return function(...l){let[{color:u="neutral",variant:c="outline",size:d="md",...h},...v]=Q(l);return i({class:B("modal",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const ir=e=>{const{tr:t,bau:n}=e,{section:a,main:i,h2:r,header:s,footer:o,p:l,div:u}=n.tags,c=J(e),d=te(e),h=Vt(e),v=()=>i(Array(10).fill("").map((g,y)=>l(y+1,". Some text here"))),p=g=>{const y=h({id:"my-dialog",...g},s("Header"),v(),o(d({variant:"outline",color:g.color,onclick:()=>{y.close()}},"Cancel"),d({variant:"solid",color:g.color,onclick:()=>{y.close()}},"OK")));return y},f=p({color:"neutral"});return()=>a({id:"modal"},r(t("Modal Examples")),d({variant:"solid",color:"neutral",onclick:()=>{f.showModal()}},"OPEN MODAL"),f,r(t("Modal Table")),c({Item:g=>{const y=p(g);return u(d({...g,onclick:()=>{y.showModal()}},"OPEN MODAL"),y)}}))},lr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,h1:l,p:u}=n.tags,c=te(e),d=(...O)=>r({class:a`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...O),h=qe(e),p=(()=>c({onclick:()=>y.open?y.closeDialog():y.openDialog()},"Click"))(),f=()=>r({},l("My content"),u("My Content")),g=f(),y=h({id:"my-popover-left",triggerEl:p,contentEl:g}),E=c({onclick:()=>k.open?k.closeDialog():k.openDialog()},"Click"),A=f(),k=h({id:"my-popover-left",triggerEl:E,contentEl:A});return()=>i({id:"popover",class:a``},o(t("Popover")),s("Basic Popover"),d(r(p,y),r(E,k)))},cr=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Kt(e,t){const{bau:n,css:a}=e,{div:i,li:r}=n.tags,s=te(e),o=qe(e),l=_e(e),u=a`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${cr()}
  `,c=n.state(""),d=n.state(!1),h=n.state(0);return function(...p){let[{color:f="neutral",variant:g="outline",size:y="md",id:E,label:A,Option:k,options:O,getOptionLabel:D=({label:b})=>b,...N},...R]=Q(p);const I=()=>{m.openDialog(),m.focus(),d.val=!0},H=()=>{m.closeDialog(),d.val=!1},Z=()=>{d.val=!1},G=b=>{d.val?H():I()},W=({option:b,index:x})=>$=>{c.val=D(b),h.val=x,H()},K=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":h.val<O.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=O.length-1:h.val--;break;case"Enter":d.val?(c.val=D(O[h.val]),H()):I();break}},w=()=>l({tabindex:"0",class:B(f,g)},O.map((b,x)=>r({class:()=>B(h.val==x&&"active"),onclick:W({option:b,index:x})},k(b)))),C=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":A,onclick:G,color:f,variant:g,size:y},()=>!c.val&&A,c),m=o({id:E,triggerEl:C,contentEl:w(),onClose:Z});return i({...N,class:B("select",f,y,u,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:K},C,m)}}const dr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,span:l}=n.tags,u=(...p)=>r({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...p),c=J(e),d=Kt(e),h=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],v=p=>r({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(p.label),l(p.code));return()=>i({id:"select",class:a``},o(t("Select")),s("Basic Select"),u(d({options:h,Option:v,getOptionLabel:({label:p})=>p,label:"Select a country..."})),o(t("Select Table")),c({Item:p=>r(d({...p,options:h,Option:v,getOptionLabel:({label:f})=>f,label:"Select a country..."}))}))};function Te(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,s=a`
    ${(()=>ae.map(o=>`
&.slider.${o} {
  accent-color: var(--color-${o});
}
`).join(`
`))()};
  `;return function(...l){let[{color:u="neutral",variant:c="outline",size:d,...h},...v]=Q(l);return i({...h,type:"range",class:B("slider",u,c,d,s,t==null?void 0:t.class,h.class)},...v)}}const ur=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,p:l,label:u,datalist:c,option:d,br:h}=n.tags,v=n.state(0),p=k=>{v.val=k==null?void 0:k.target.value},f=(...k)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...k),g=J(e),y=Te(e),E=Te(e),A=Te(e);return()=>i({id:"slider"},o(t("Slider")),l("Slider value: ",v),s("Basic Slider"),f(y({oninput:p,name:"slider-simple"})),s(t("Slider Table")),g({Item:k=>y(k)}),s("Slider Min Max: -1000 1000"),f(E({oninput:p,min:-1e3,max:1e3})),s("Slider Step 20"),f(y({oninput:p,step:20,min:-100,max:100})),s("Slider Vertical"),f(r({class:a`
              display: flex;
            `},y({oninput:p,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:a`
              width: 30px;

              appearance: slider-vertical;
            `}),c({id:"markers-vertical",class:a`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(k=>d({value:Number(k),label:k}))))),s("Slider with mark"),f(u({for:"temp"},"Choose a comfortable temperature"),h(),A({oninput:p,class:a`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),c({id:"markers",class:a`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(k=>d({value:Number(k),label:k})))))},ft={sm:16,md:32,lg:64};function Qe(e,t={}){const{bau:n,css:a}=e,{svg:i,animate:r,animateTransform:s,rect:o}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:u="md",color:c="color-base",variant:d="outline",visibility:h=!0,...v}={}){return i({class:B(a`
            visibility: ${h?"visible":"hidden"};
            color: var(--color-${c});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:ft[u],height:ft[u],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},o({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),o({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const hr=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:r}=n.tags,s=J(e),o=Qe(e);return()=>a({id:"spinner"},i(t("Spinner Examples")),r(t("Spinner Table")),s({Item:l=>o(l)}))},mr=()=>ae.map(e=>`
&.switch.plain.${e} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.outline.${e} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.soft.${e} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.solid.${e} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-400);
  } 
  &:checked {
    background-color: var(--color-${e}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-400);
  }
}
`).join(`
`);function Zt(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,r=a`
    position: relative;
    border-radius: 0.7rem;
    appearance: none;
    outline: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-m);
    &::after {
      content: "";
      transform: translate(-100%, -50%);
      left: 50%;
      top: 50%;
      border-radius: 50%;
      position: absolute;
      box-shadow: var(--shadow-m);
      transition: all var(--transition-fast);
      background-color: var(--color-emphasis-800);
    }
    &:checked::after {
      content: "";
      transform: translate(0%, -50%);
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      width: 2rem;
      height: 1.2rem;
      border-radius: 0.6rem;
    }
    &.sm::after {
      width: 0.8rem;
      height: 0.8rem;
    }
    &.md {
      width: 2.4rem;
      height: 1.4rem;
      border-radius: 0.7rem;
    }
    &.md::after {
      width: 1rem;
      height: 1rem;
    }
    &.lg {
      width: 3.3rem;
      height: 1.7rem;
      border-radius: 2rem;
    }
    &.lg::after {
      width: 1.5rem;
      height: 1.5rem;
    }
    ${mr()}
  `;return function(...o){let[{color:l="neutral",variant:u="plain",size:c="md",...d},...h]=Q(o);return i({...d,class:B("switch",r,l,u,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...h)}}const gr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,form:r,label:s,div:o,h2:l}=n.tags,u=J(e),c=Zt(e);return()=>i({id:"switch"},l(t("Switch Examples")),r(o({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-shinny-switch"},"My shinny switch"),c({id:"my-shinny-switch"}))),l(t("Switch Table")),u({Item:d=>o({class:a`
                & label {
                  display: inline-flex;
                  border: 1px dotted var(--color-emphasis-200);
                  font-size: smaller;
                  align-items: center;
                  color: var(--color-content-secondary);
                  padding: 0.2rem;
                }
              `},s("off ",c({...d,id:`my-switch-example-off-${d.color}-${d.variant}`})),s("on ",c({...d,id:`my-switch-example-on-${d.color}-${d.variant}`,checked:!0})))}))},fr=()=>ae.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function He(e,t){const{bau:n,css:a}=e,{tabDefs:i}=t,{div:r,ul:s,li:o}=n.tags,l=n.state(i),u=n.state(i[0]),c=h=>l.val.find(v=>v.name==h),d={base:a`
      display: flex;
      flex-direction: column;
      & ul {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0;
        list-style: none;
        border-bottom: 2px solid var(--color-emphasis-200);
        & li {
          text-align: center;
          padding: 0.5rem;
          padding-bottom: 0rem;
          color: inherit;
          cursor: pointer;
          font-weight: var(--font-weight-semibold);
          transition: var(--transition-fast) ease-in-out;
          overflow: hidden;
          &:hover {
            color: var(--color-primary-light);
            background-color: var(--color-emphasis-300);
            &::after {
              transform: translateY(0%);
            }
          }
          &::after {
            transition: var(--transition-fast) ease-in-out;
            transform: translateY(400%);
            opacity: 1;
            content: "";
            margin-top: 0.3rem;
            height: 2px;
            width: 100%;
            display: block;
          }
        }
        & .active {
          font-weight: bolder;
          &::after {
            transform: translateY(0%);
          }
        }
        & .disabled {
          cursor: not-allowed;
          font-style: italic;
          transform: none;
          &:hover {
            border: none;
          }
        }
      }
      ${fr()}
    `};return function(...v){let[{color:p,variant:f="plain",size:g,...y},...E]=Q(v);const A=O=>{const{Header:D,disabled:N,name:R}=O;return o({class:()=>B(u.val.name==R&&"active",N&&"disabled"),onclick:I=>I.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:R},bubbles:!0}))},D(O))},k=r({class:B("tabs",d.base,f,g,p,t==null?void 0:t.class,y.class)},n.loop(l,s(),A),()=>u.val.Content?u.val.Content({}):"");return k.addEventListener("tab.select",O=>{var R,I;const{tabName:D}=O.detail,N=c(D);N&&((R=u.val.exit)==null||R.call(),u.val=N,(I=N.enter)==null||I.call())},!1),k.addEventListener("tab.add",O=>{var N;const{tab:D}=O.detail;(N=D.enter)==null||N.call(),l.val.push(D)},!1),k.addEventListener("tab.remove",O=>{var N;const D=l.val.findIndex(R=>R.name==O.detail.tabName);D>0&&((N=l.val[D].exit)==null||N.call(),l.val.splice(D,1))},!1),k}}const pr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,p:l,i:u}=n.tags,c=J(e),d=te(e),h=(...E)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...E),v=()=>({name:"New Tab",Header:({name:E})=>r(E),Content:()=>r("My Paragraph")}),f=He(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(l("My tab Disabled"))}]}),y=He(e,{tabDefs:[{name:"Tab1",Header:()=>r(u({class:a`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>r({class:a`
              > button {
                margin: 10px;
              }
            `},d({onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:v()},bubbles:!0}))},"Add a new Tab"),d({accent:!0,onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(l("My Content"))}]});return()=>i({id:"tabs"},o(t("Tabs")),s("Basic Tabs"),h(f({})),s("Full Witdth"),h(f({class:a`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),h(f({class:a`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),h(f({class:a`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),h(f({class:a`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),h(f({class:a`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),h(y({})),o(t("Tabs Table")),c({Item:E=>f(E)}))};function de(e,t){const{bau:n,css:a,createGlobalStyles:i}=e,{div:r}=n.tags;i`
  :root {
    --table-cell-padding: 0.75rem;
    --table-background: transparent;
    --table-stripe-background: rgba(0, 0, 0, 0.03);
    --table-border-width: 1px;
    --table-border-color: var(--color-emphasis-300);
    --table-head-background: inherit;
    --table-head-color: inherit;
    --table-cell-color: inherit;
  }

  table {
    border-collapse: collapse;
    display: table;

    & thead, tr  {
      border-bottom: var(--table-border-width) solid var(--table-border-color);
    }

    & tr {
      background-color: var(--table-background);
    }
    & tr:last-child {
      border-bottom: none
    }
    
    & td, th {
      padding: var(--table-cell-padding);
    }

    & th {
      background-color: var(--table-head-background);
      color: var(--table-head-color);
      font-weight: var(--font-weight-semibold);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

    }

    & td {
      color: var(--table-cell-color);
      font-size: 0.875rem;
    }
  }
`;const s=a`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...l){let[{...u},...c]=Q(l);return r({...u,class:B("table-container",s,t==null?void 0:t.class,u==null?void 0:u.class)},...c)}}const br=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:r,h2:s,th:o,td:l,tr:u,table:c,thead:d,tbody:h,caption:v}=t.tags;function p(R,I,H,Z,G){return{name:R,calories:I,fat:H,carbs:Z,protein:G}}const f=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=(...R)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...R),y=({name:R,calories:I})=>u(l(R),l({class:n`
            text-align: right;
          `},I)),E=()=>d(u(o({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),o({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),A=de(e,{class:n`
      max-width: 650px;
    `}),k=de(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),O=de(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),D=de(e,{class:n`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),N=de(e,{class:n`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>a({id:"table"},s(u("Table")),r("Basic Table"),g(A(c(v("Basic Table"),E(),h(f.map(y))))),r("Dense Table"),g(k(c(v("Dense Table"),E(),h(f.map(y))))),r("Zebra Table"),g(O(c(v("Zebra Table"),E(),h(f.map(y))))),r("Caption Bottom"),g(D(c(v("Caption Bottom Table"),E(),h(f.map(y))))),r("Overflow Header"),g(N(c(v("Overflow Header"),E(),h(f.map(y))))))};function qt(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,r=Je(e),s=te(e),o=Qe(e),l=a`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: var(--table-border-width) solid var(--table-border-color);
    gap: 0.5rem;
    padding: 0.4rem 0.2rem;
    & .pages-numbers {
      font-size: smaller;
    }
    &.disabled {
      pointer-events: none;
    }
  `,u=({label:p,icon:f,...g})=>s({"aria-label":p,title:p,...g},f),c=({count:p,totalCount:f,page:g,rowsPerPage:y})=>i({class:"pages-numbers"},Number(g-1)*Number(y)+(p>0?1:0),"-",Math.min(g*y,f)," of ",f),d=({count:p,page:f,rowsPerPage:g})=>i({class:"pages-numbers"},(f-1)*g+(p>0?1:0),"-",f*g),h=p=>p<=1,v=(p,f,g)=>p>=Math.ceil(f/g);return function(...f){let[{count:g=0,totalCount:y=0,page:E=1,rowsPerPage:A=50,onPageChange:k,isLoading:O=!1,disableFirst:D=()=>h(E),disablePrevious:N=()=>h(E),disableNext:R=()=>v(E,y,A),disableLast:I=()=>v(E,y,A),...H},...Z]=Q(f);const G=Math.max(0,Math.ceil(y/A)),W=k({page:1}),K=k({page:E-1}),w=k({page:E+1}),C=k({page:G}),m=[{label:"First",icon:"⟪",onclick:W,disabled:D()},{label:"Previous",icon:"⟨",onclick:K,disabled:N()},{label:"Next",icon:"⟩",onclick:w,disabled:R()},{label:"Last",icon:"⟫",onclick:C,disabled:I()}];return i({...H,class:B("table-pagination",l,O&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},o({class:"spinner",visibility:O,size:"md"}),y>0?c({count:g,totalCount:y,page:E,maxPages:G,rowsPerPage:A}):d({count:g,page:E,maxPages:G,rowsPerPage:A}),r({variant:"outline",color:"neutral"},m.map(b=>u({...b,variant:"outline",color:"neutral"}))))}}const vr=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),wr=e=>{const{bau:t,css:n}=e,{th:a,td:i,tr:r,table:s,thead:o,tbody:l}=t.tags,u=vr(45),c=({name:E,email:A})=>r(i(E),i(A)),d=()=>o(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Email")),h=qt(e),v=de(e,{class:n`
      max-width: 650px;
    `}),p=t.state(u),f=t.state({count:u.length,totalCount:u.length,page:1,rowsPerPage:10}),g=t.derive(()=>p.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),y=({page:E})=>A=>{f.val.page=E};return()=>v(s(d(),()=>l(g.val.map(c))),()=>h({...f.val,onPageChange:y}))},yr=e=>{const{bau:t,css:n}=e,{th:a,td:i,tr:r,table:s,thead:o,tbody:l,div:u}=t.tags,c=t.state(!1),d=t.state([]),h=t.state(""),v=t.derive(()=>d.val.length),p=t.state(1),f=t.state(10),g=t.derive(()=>d.val),y=I=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(I).toString()}`,E=({page:I})=>H=>{p.val=I,A(y({page:I,per_page:f.val}))};A(y({page:1,per_page:f.val}));async function A(I){try{c.val=!0;const H=await fetch(I,{});if(H.ok){const Z=await H.json();d.val=Z;return}throw H}catch(H){h.val=H.message}finally{c.val=!1}}const k=({name:I,description:H,stargazers_count:Z})=>r(i(I),i(H),i({class:n`
            text-align: right;
          `},Z)),O=()=>o(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Description"),a({class:n`
            text-align: right;
          `},"Stars")),D=qt(e),N=de(e,{class:n`
      min-width: 650px;
    `}),R=({message:I})=>u(I);return()=>N(()=>D({rowsPerPage:f.val,page:p.val,count:v.val,totalCount:-1,isLoading:c.val,onPageChange:E,disableNext:()=>!1}),s(O(),()=>h.val&&R({message:h.val}),()=>l(g.val.map(k))))},Er=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:r,h2:s,tr:o}=t.tags,l=wr(e),u=yr(e),c=(...d)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
          & .table-container {
            width: 100%;
            & table {
              min-width: 500px;
              width: 100%;
              & td,
              th {
                padding: 0.4rem;
              }
            }
          }
        `},...d);return()=>a({id:"pagination"},s(o("Table Pagination")),r("Asynchronous Pagination"),c(u()),r("Simple Pagination"),c(l()))};function Ge(e,t){const{bau:n,css:a,window:i}=e,{div:r}=n.tags,s=a`
    position: relative;
    display: inline-block;
    & .container {
      & .content {
        box-shadow: var(--shadow-m);
        font-size: smaller;
        border-radius: var(--global-radius);
        padding: 0.3rem;
      }
      white-space: nowrap;
      position: absolute;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out;
    }
    & .visible.container {
      visibility: visible;
      opacity: 1;
    }
    & .top.container {
      bottom: 100%;
      padding-bottom: 0.3rem;
    }
    & .bottom.container {
      top: 100%;
      padding-top: 0.3rem;
    }
    & .right.container {
      left: 100%;
      padding-left: 0.3rem;
    }
    & .left.container {
      right: 100%;
      padding-right: 0.3rem;
    }
    & .top.start.container {
      left: 0%;
    }
    & .top.centered.container {
      left: 50%;
      transform: translateX(-50%);
    }
    & .top.end.container {
      left: 100%;
      transform: translateX(-100%);
    }
    & .bottom.start.container {
      left: 0%;
    }
    & .bottom.centered.container {
      left: 50%;
      transform: translateX(-50%);
    }
    & .bottom.end.container {
      left: 100%;
      transform: translateX(-100%);
    }
    & .right.start.container {
      top: 0%;
    }
    & .right.centered.container {
      top: 50%;
      transform: translateY(-50%);
    }
    & .right.end.container {
      top: 100%;
      transform: translateY(-100%);
    }
    & .left.start.container {
      top: 0%;
    }
    & .left.centered.container {
      top: 50%;
      transform: translateY(-50%);
    }
    & .left.end.container {
      top: 100%;
      transform: translateY(-100%);
    }
  `;return function(...l){let[{titleEl:u,side:c="bottom-start",color:d="neutral",variant:h="outline",size:v="md",...p},...f]=Q(l);const g=r({class:B("container",...c.split("-"))},r({class:B("content",d,h,v),role:"tooltip"},u)),y=N=>`move-to-${N}`,E=(N,R,I)=>{if(N()){const H=y(R);g.classList.add(H),g.classList.add(R),g.classList.remove(I)}},A=(N,R)=>{const I=y(N);g.classList.contains(I)&&(g.classList.remove(I),g.classList.add(R),g.classList.remove(N))},k=N=>{const R=g.getBoundingClientRect();E(()=>R.x<0,"right","left"),E(()=>R.x+R.width>i.innerWidth,"left","right"),E(()=>R.y<0,"bottom","top"),E(()=>R.bottom>i.innerHeight,"top","bottom"),g.classList.add("visible")},O=N=>{g.classList.remove("visible"),A("right","left"),A("left","right"),A("bottom","top"),A("top","bottom")};return r({...p,class:B("tooltip",s,t==null?void 0:t.class,p==null?void 0:p.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",k),N.addEventListener("mouseout",O)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",k),N.removeEventListener("mouseout",O)}},...f,g)}}const xr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h2:s,em:o,p:l}=n.tags,u=J(e),c=te(e),d=Ge(e),h=Ge(e,{class:a`
      .container > .content {
        background-color: lightgreen;
        border: 2px dotted darkgreen;
        font-size: 1.5rem;
      }
      .container.top {
        &::after {
          position: absolute;
          content: " ";
          bottom: 0%;
          left: 20%;
          margin-top: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent var(--color-emphasis-400)
            transparent;
        }
      }
      .container.bottom {
        &::after {
          position: absolute;
          content: " ";
          top: 0%;
          left: 20%;
          margin-left: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--color-emphasis-400) transparent transparent
            transparent;
        }
      }
    `}),v=()=>r({class:a`
          font-size: larger;
        `},l("A ",o("tooltip")," can be any component")),p=()=>[r({class:a`
          display: flex;
          justify-content: space-around;
        `},d({side:"top-start",titleEl:v()},c({},"top-start")),d({side:"top-centered",titleEl:v()},c({},"top-centered")),d({side:"top-end",titleEl:v()},c({},"top-end"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-start",titleEl:v()},c({},"left-start")),d({side:"right-start",titleEl:v()},c({},"right-start"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-centered",titleEl:v()},c({},"left-centered")),d({side:"right-centered",titleEl:v()},c({},"right-centered"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-end",titleEl:v()},c({},"left end")),d({side:"right-end",titleEl:v()},c({},"right end"))),r({class:a`
          display: flex;
          justify-content: space-around;
        `},d({side:"bottom-start",titleEl:v()},c({},"bottom start")),d({side:"bottom-centered",titleEl:v()},c({},"bottom centered")),d({side:"bottom-end",titleEl:v()},c({},"bottom end")))];return()=>i({id:"tooltip"},s(t("Tooltip")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},p()),s(t("Tooltip moved")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},p()),s(t("Tooltip custom")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},h({titleEl:v()},c({},"custom tooltip"))),s(t("Tooltip Table")),u({Item:f=>d({titleEl:v(),...f},c(f,`${f.color} ${f.variant}`))}))},Sr=e=>{const{tr:t,bau:n,css:a}=e,{section:i,form:r,div:s,h2:o}=n.tags,l=J(e),u=Ue(e);return()=>i({id:"theme-switch"},o(t("Theme Switch")),r(s({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},u({}))),o(t("Theme Switch Table")),l({Item:c=>u(c)}))},Cr=({css:e,createGlobalStyles:t})=>(t`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
}
`,{nav:e`
    font-weight: var(--font-weight-semibold);
    overflow-x: hidden;
    display: inline-flex;

    &.solid div:hover {
      filter: brightness(var(--brightness-hover-always));
    }

    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      background: inherit;

      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all var(--transition-fast) ease-in-out;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
          }
          &::after {
            transition: transform var(--transition-fast) linear;
            font-size: x-large;
            margin-right: 1rem;
          }
          > a,
          span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--menu-link-padding-vertical)
              var(--menu-link-padding-horizontal);
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `,expanded:e`
      > div {
        &::after {
          content: "\u203A";
          transform: rotate(90deg);
        }
      }
    `,collapsed:e`
      > div {
        &::after {
          content: "\u203A";
        }
      }
    `});function Yt(e,t){const{bau:n,css:a,createGlobalStyles:i,window:r}=e,{renderMenuItem:s}=t,{ul:o,li:l,nav:u,div:c}=n.tags,d=Cr({css:a,createGlobalStyles:i}),h=({element:g,closeState:y})=>{g.scrollHeight!=0&&(y.val?v(g):p(g))};function v(g){g.style.height=g.scrollHeight+"px";const y=()=>{g.removeEventListener("transitionend",y)};g.addEventListener("transitionend",y),r.requestAnimationFrame(()=>{g.style.height="0px"})}function p(g){const y=()=>{g.removeEventListener("transitionend",y),g.style.height=null};g.addEventListener("transitionend",y),g.style.height=g.scrollHeight+"px"}const f=({depth:g=1,maxDepth:y,color:E,variant:A,size:k})=>O=>{const{children:D,expanded:N}=O,R=n.state(!N);return l({class:()=>B(D?R.val?d.collapsed:d.expanded:"")},c({class:a`
              cursor: pointer;
            `,onclick:I=>{D&&(R.val=!R.val)}},s(O.data)),D&&g<y&&o({class:B(E,k),bauMounted:({element:I})=>{R.val&&(I.style.height="0px")},"aria-expanded":({element:I})=>(h({element:I,closeState:R}),!R.val)},D.map(f({depth:g+1,maxDepth:y}))))};return function({tree:y,maxDepth:E=1/0,size:A="md",variant:k="plain",color:O="neutral",...D}){return u({class:B(d.nav,A,k,O,t==null?void 0:t.class,D.class)},y.children&&o(y.children.map(f({maxDepth:E,color:O,variant:k,size:A}))))}}const kr=e=>{const{tr:t,bau:n}=e,{section:a,a:i,h2:r,h3:s}=n.tags,o=J(e),l={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},c=Yt(e,{renderMenuItem:({name:d,href:h})=>i({href:h,onclick:v=>{v.preventDefault()}},d)});return()=>a({id:"treeview"},r(t("Tree View")),s(t("Tree View Default")),c({tree:l}),s(t("Tree View Table")),o({Item:d=>c({...d,tree:l})}))};function Tr(e,t={}){const{bau:n,css:a}=e,{div:i,span:r,pre:s,h3:o,h4:l}=n.tags;return function(c,...d){return i("Login")}}const Ar=e=>{const{tr:t,bau:n}=e,{section:a,div:i,h3:r,h2:s}=n.tags,o=Tr(e);return()=>a({id:"login"},s(t("Login Examples")),r("Basic"),i(o()))};function Mr(e){const{tr:t,bau:n,css:a}=e,{div:i,article:r,h1:s}=n.tags;return function(){return i({class:a`
          grid-area: main;
          display: flex;
        `},r({class:a`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),Ar(e)()))}}const pt=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],_r=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:r,h3:s,h2:o,li:l,span:u}=n.tags,c=J(e),d=(...p)=>r({class:a`
          border: 1px dotted red;
          padding: 1rem;
        `},...p),h=_e(e),v=({code:p,label:f})=>l({class:a`
          display: flex;
          gap: 1rem;
        `},u(p),u(f));return()=>i({id:"list"},o(t("List")),s("List outline primary"),d(h({variant:"outline",color:"primary"},pt.map(v))),s("List Table"),c({Item:p=>h({...p},pt.map(v))}))},Ir=e=>{const{bau:t,css:n,config:a}=e,{section:i,div:r,h1:s,span:o,p:l,ul:u,li:c,a:d,main:h,header:v,footer:p,label:f}=t.tags,{svg:g,use:y}=t.tagsNS("http://www.w3.org/2000/svg"),E=J(e),k=kt(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>r(l("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>r(l("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>r(l("Item 3 content"))}]}),O=Me(e),D=Gt(e),N=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],R=S=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},o(S.label),o(S.code)),I=Ht(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),H=Pe(e),Z={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},G=Ft(e),W=te(e),K=Je(e),w=ze(e),C=Wt(e),m=Ut(e),b={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},x=We(e,{base:a.base+"/components"}),$=({disabled:S})=>r({class:B(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,S&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},g({width:100,height:100,fill:"currentColor"},y({href:"uploadIcon.svg#Capa_1"})),o("Choose a file to upload")),M=Xt(e),F=Ye(e),L=Vt(e),z=()=>h(Array(10).fill("").map((S,X)=>l(X+1,". Some text here"))),j=S=>{const X=L({id:"my-dialog",...S},v("Header"),z(),p(W({...S,variant:"outline",onclick:()=>{X.close()}},"Cancel"),W({...S,variant:"solid",onclick:()=>{X.close()}},"OK")));return X},V=Kt(e),ee=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],oe=S=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},o(S.label),o(S.code)),me=Te(e),Ne=Qe(e),Ee=Zt(e),$e=He(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(l("My tab Disabled"))}]}),ge=Ue(e),xe=()=>o("My tooltip"),re=Ge(e),Oe={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},ve=Yt(e,{renderMenuItem:({name:S,href:X})=>d({href:X,onclick:Y=>{Y.preventDefault()}},S)}),P=[{name:"Accordion",Item:S=>k({...S})},{name:"Alert",Item:S=>O({...S},`Alert ${S.color}`)},{name:"Autocomplete",Item:S=>D({...S,options:N,Option:R,getOptionLabel:({label:X})=>X,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:S=>I({...S,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(S,{index:X})=>H({...S,content:`${X*100}`},"☏")},{name:"Breadcrumbs",Item:S=>G({...S,...Z})},{name:"Button",Item:S=>W({...S},`${S.variant} ${S.color}`)},{name:"Button Group",Item:S=>K({...S},["ONE","TWO","THREE"].map(X=>W(S,X)))},{name:"Calendar",Item:S=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},f(`${S.color} ${S.variant}`,w({...S})))},{name:"Checkbox",Item:S=>f({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${S.color} ${S.variant}`,C({id:`myCheckbox-gallery-${S.color}-${S.variant}`,name:`myCheckbox-gallery-${S.color}-${S.variant}`,...S}))},{name:"Chip",Item:S=>m({...S},`Chip ${S.color}`)},{name:"DrillDown Menu",Item:S=>x({tree:b,...S})},{name:"File Input",Item:S=>M({Component:$,name:"file",accept:"text/*",onchange,...S})},{name:"Input",Item:S=>F({name:"my-input",id:"my-input-with",placeholder:"Enter text",...S})},{name:"Modal",Item:S=>{const X=j(S);return r(W({...S,onclick:()=>{X.showModal()}},"OPEN MODAL"),X)}},{name:"Select",Item:S=>r(V({...S,options:ee,Option:oe,getOptionLabel:({label:X})=>X,label:"Select a country..."}))},{name:"Slider",Item:S=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},f(`${S.color} ${S.variant}`,me({...S,id:`my-slider-${S.color}-${S.variant}`})))},{name:"Spinner",Item:S=>Ne(S)},{name:"Switch",Item:S=>r({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},f("off",Ee({...S,id:`mySwitch-off-${S.color}-${S.variant}`})),f("on",Ee({...S,id:`mySwitch-on-${S.color}-${S.variant}`,checked:!0})))},{name:"Tabs",Item:S=>$e(S)},{name:"Theme Switch",Item:S=>ge(S)},{name:"Tooltip",Item:S=>re({titleEl:xe(),...S},W(S,`${S.color} ${S.variant}`))},{name:"Tree View",Item:S=>ve({...S,tree:Oe})}];return()=>i(s("Bau Component Gallery"),l("This page displays the components with various colors and variants."),u({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},P.map(({name:S})=>c(W({color:"primary",variant:"solid",href:`#${S}`},S)))),P.map(S=>r({id:S.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},E(S))))},Nr=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:$n(e)})},{path:"components",action:()=>({title:"Component",component:Ir(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ba(e)})},{path:"alert",action:()=>({title:"Alert",component:Pa(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ha(e)})},{path:"animate",action:()=>({title:"Animate",component:Fa(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Va(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ua(e)})},{path:"badge",action:()=>({title:"Badge",component:Ka(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Za(e)})},{path:"button",action:()=>({title:"Button",component:qa(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ja(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Qa(e)})},{path:"chip",action:()=>({title:"Chip",component:er(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:tr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:ar(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:rr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:or(e)})},{path:"input",action:()=>({title:"Input",component:sr(e)})},{path:"list",action:()=>({title:"List",component:_r(e)})},{path:"modal",action:()=>({title:"Modal",component:ir(e)})},{path:"popover",action:()=>({title:"Popover",component:lr(e)})},{path:"select",action:()=>({title:"Select",component:dr(e)})},{path:"slider",action:()=>({title:"Slider",component:ur(e)})},{path:"spinner",action:()=>({title:"Spinner",component:hr(e)})},{path:"switch",action:()=>({title:"Switch",component:gr(e)})},{path:"table",action:()=>({title:"Table",component:br(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Er(e)})},{path:"tabs",action:()=>({title:"Tabs",component:pr(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:xr(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Sr(e)})},{path:"treeView",action:()=>({title:"Tree View",component:kr(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Mr(e)})}],$r=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Or=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:a,bau:i,states:r}=e,s=i.state(),o=t({componentState:s});return document.getElementById("app").replaceChildren(o),({router:u})=>{const c=a.location.pathname.replace(n,""),{title:d,component:h,Layout:v=t}=u.resolve({pathname:c});r.pathname.val=c,s.val=h,document.title=`${d}`}},Rr=e=>{const{createGlobalStyles:t}=e;hn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#3e5915;background:#f6f5b2}.hljs-keyword,.hljs-literal,.hljs-selector-tag{color:#059}.hljs-subst{color:#3e5915}.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-link,.hljs-section,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#2c009f}.hljs-comment,.hljs-deletion,.hljs-meta,.hljs-quote{color:#e60415}.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-id,.hljs-selector-tag,.hljs-strong,.hljs-title,.hljs-type{font-weight:700}.hljs-emphasis{font-style:italic}

    .hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}
  `},Br=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${yt({dark:!0})}
}
  `};mn();const et={title:"Bau",base:"/bau/bau-ui"},le=En({config:et}),{bau:bt}=le;le.states={pathname:bt.state(window.location.pathname.replace(et.base,"")),drawerOpen:bt.state(!0)};Rr(le);Br(le);an({routes:Nr({context:le}),onLocationChange:Or({context:le,LayoutDefault:_n(le),config:et}),notFoundRoute:$r(le)});