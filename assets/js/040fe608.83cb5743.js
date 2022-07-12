"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[5070],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var u=a.createContext({}),s=function(e){var t=a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(r),d=n,h=m["".concat(u,".").concat(d)]||m[d]||p[d]||o;return r?a.createElement(h,i(i({ref:t},c),{},{components:r})):a.createElement(h,i({ref:t},c))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8865:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=r(87462),n=(r(67294),r(3905));const o={},i="Outreach",l={unversionedId:"integrations/sources/outreach",id:"integrations/sources/outreach",title:"Outreach",description:"Overview",source:"@site/../docs/integrations/sources/outreach.md",sourceDirName:"integrations/sources",slug:"/integrations/sources/outreach",permalink:"/integrations/sources/outreach",draft:!1,editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/integrations/sources/outreach.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"PostHog",permalink:"/integrations/sources/orbit"},next:{title:"PagerDuty",permalink:"/integrations/sources/pagerduty"}},u={},s=[{value:"Overview",id:"overview",level:2},{value:"Output schema",id:"output-schema",level:3},{value:"Features",id:"features",level:3},{value:"Getting started",id:"getting-started",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Setup guide",id:"setup-guide",level:3},{value:"Streams",id:"streams",level:2},{value:"Changelog",id:"changelog",level:2}],c={toc:s};function p(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"outreach"},"Outreach"),(0,n.kt)("h2",{id:"overview"},"Overview"),(0,n.kt)("p",null,"The Outreach source supports both ",(0,n.kt)("inlineCode",{parentName:"p"},"Full Refresh")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"Incremental")," syncs. You can choose if this connector will copy only the new or updated data, or all rows in the tables and columns you set up for replication, every time a sync is run."),(0,n.kt)("h3",{id:"output-schema"},"Output schema"),(0,n.kt)("p",null,"Some output streams are available from this source. A list of these streams can be found below in the ",(0,n.kt)("a",{parentName:"p",href:"/integrations/sources/outreach#streams"},"Streams")," section."),(0,n.kt)("h3",{id:"features"},"Features"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Supported?"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"Full Refresh Sync"),(0,n.kt)("td",{parentName:"tr",align:"left"},"Yes")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"Incremental Sync"),(0,n.kt)("td",{parentName:"tr",align:"left"},"Yes")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"SSL connection"),(0,n.kt)("td",{parentName:"tr",align:"left"},"Yes")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},"Namespaces"),(0,n.kt)("td",{parentName:"tr",align:"left"},"No")))),(0,n.kt)("h2",{id:"getting-started"},"Getting started"),(0,n.kt)("h3",{id:"requirements"},"Requirements"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Outreach Account"),(0,n.kt)("li",{parentName:"ul"},"Outreach OAuth credentials")),(0,n.kt)("h3",{id:"setup-guide"},"Setup guide"),(0,n.kt)("p",null,"Getting oauth credentials require contacting Outreach to request an account. Check out ",(0,n.kt)("a",{parentName:"p",href:"https://www.outreach.io/lp/watch-demo#request-demo"},"here"),"."),(0,n.kt)("h2",{id:"streams"},"Streams"),(0,n.kt)("p",null,"List of available streams:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Prospects"),(0,n.kt)("li",{parentName:"ul"},"Sequences"),(0,n.kt)("li",{parentName:"ul"},"SequenceStates")),(0,n.kt)("h2",{id:"changelog"},"Changelog"),(0,n.kt)("p",null,"| Version | Date       | Pull Request | Subject |"),(0,n.kt)("p",null,"| :------ | :--------  | :-----       | :------ |\n| 0.1.2   | 2022-07-04 | ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/airbytehq/airbyte/pull/14386"},"14386")," | Fix stream schema and cursor field |\n| 0.1.1   | 2021-12-07 | ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/airbytehq/airbyte/pull/8582"},"8582")," | Update connector fields title/description |\n| 0.1.0   | 2021-11-03 | ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/airbytehq/airbyte/pull/7507"},"7507")," | Outreach Connector |"))}p.isMDXComponent=!0}}]);