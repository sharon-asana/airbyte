"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[1174],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=l(r),d=a,y=m["".concat(c,".").concat(d)]||m[d]||p[d]||o;return r?n.createElement(y,i(i({ref:t},u),{},{components:r})):n.createElement(y,i({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8778:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(87462),a=(r(67294),r(3905));const o={},i="Securing Airbyte access",s={unversionedId:"operator-guides/securing-airbyte",id:"operator-guides/securing-airbyte",title:"Securing Airbyte access",description:"Airbyte, in its open-source version, does not support RBAC to manage access to the UI.",source:"@site/../docs/operator-guides/securing-airbyte.md",sourceDirName:"operator-guides",slug:"/operator-guides/securing-airbyte",permalink:"/operator-guides/securing-airbyte",draft:!1,editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/operator-guides/securing-airbyte.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"Scaling Airbyte",permalink:"/operator-guides/scaling-airbyte"},next:{title:"Troubleshooting & FAQ",permalink:"/troubleshooting/"}},c={},l=[],u={toc:l};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"securing-airbyte-access"},"Securing Airbyte access"),(0,a.kt)("p",null,"Airbyte, in its open-source version, does not support RBAC to manage access to the UI."),(0,a.kt)("p",null,"However, multiple options exist for the operators to implement access control themselves."),(0,a.kt)("p",null,"To secure access to Airbyte you have three options:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Networking restrictions: deploy Airbyte in a private network or use a firewall to filter which IP is allowed to access your host."),(0,a.kt)("li",{parentName:"ul"},"Put Airbyte behind a reverse proxy and handle the access control on the reverse proxy side. "),(0,a.kt)("li",{parentName:"ul"},"If you deployed Airbyte on a cloud provider: ",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"GCP: use the ",(0,a.kt)("a",{parentName:"li",href:"https://cloud.google.com/iap"},"Identidy-Aware proxy")," service"),(0,a.kt)("li",{parentName:"ul"},"AWS: use the ",(0,a.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html"},"AWS Systems Manager Session Manager")," service")))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Non exhaustive")," online resources list to set up auth on your reverse proxy:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://shadabshaukat.medium.com/deploy-and-secure-airbyte-with-nginx-reverse-proxy-basic-authentication-lets-encrypt-ssl-72bee223a4d9"},"Configure HTTP Basic Auth on NGINX for Airbyte")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://kubernetes.github.io/ingress-nginx/examples/auth/basic/"},"Kubernetes: Basic auth on a Nginx ingress controller")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://developer.okta.com/blog/2018/08/28/nginx-auth-request"},"How to set up Okta SSO on an NGINX reverse proxy")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://caddyserver.com/docs/caddyfile/directives/basicauth"},"How to enable HTTP Basic Auth on Caddy")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/thomseddon/traefik-forward-auth"},"SSO for Traefik"))))}p.isMDXComponent=!0}}]);