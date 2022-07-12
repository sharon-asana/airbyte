"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[8298],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>y});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(r),y=o,g=d["".concat(u,".").concat(y)]||d[y]||p[y]||a;return r?n.createElement(g,i(i({ref:t},c),{},{components:r})):n.createElement(g,i({ref:t},c))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},11171:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var n=r(87462),o=(r(67294),r(3905));const a={},i="Deploying and Reverting Docs",l={unversionedId:"docusaurus/deploying_and_reverting_docs",id:"docusaurus/deploying_and_reverting_docs",title:"Deploying and Reverting Docs",description:"docs are fun",source:"@site/../docs/docusaurus/deploying_and_reverting_docs.md",sourceDirName:"docusaurus",slug:"/docusaurus/deploying_and_reverting_docs",permalink:"/docusaurus/deploying_and_reverting_docs",draft:!1,editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/docusaurus/deploying_and_reverting_docs.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"So you want to make a redirect in docs?",permalink:"/docusaurus/making_a_redirect"},next:{title:"Locally testing your changes",permalink:"/docusaurus/locally_testing_docusaurus"}},u={},s=[],c={toc:s};function p(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"deploying-and-reverting-docs"},"Deploying and Reverting Docs"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"docs are fun",src:r(39017).Z,width:"715",height:"288"})),(0,o.kt)("p",null,"Docusaurus has a strange deployment pattern.  Luckily that pattern is abstracted away from you."),(0,o.kt)("p",null,"If you were looking for the contribution guide ",(0,o.kt)("a",{parentName:"p",href:"/docusaurus/contributing_to_docs"},"check this doc out")),(0,o.kt)("p",null,"Docs will deploy from whatever branch you are in. You will probably want to deploy from master, but that is at your discretion."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/airbytehq/airbyte/blob/master/tools/bin/deploy_docusaurus"},"This is the deployment tool"),"\nYou will need a github ssh key, the tool will properly tell you if you don't have one though"),(0,o.kt)("p",null,"At it's simplest just open the airbyte repo and run ",(0,o.kt)("inlineCode",{parentName:"p"},"./tools/bin/deploy_docusaurus")),(0,o.kt)("p",null,"A typical deployment will look like this"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd airbyte\n# or cd airbyte-cloud  \ngit checkout master\ngit pull\n./tools/bin/deploy_docusaurus\n")),(0,o.kt)("p",null,"If docs has a problem this procedure will work the same on older branches.\nThe push to production is a force push so collisions are unlikely"),(0,o.kt)("p",null,"If you want to revert/rollback it will look something like this"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd airbyte\ngit checkout $SOME_OLDER_BRANCH\n./tools/bin/deploy_docusaurus\n")))}p.isMDXComponent=!0},39017:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/docs-45c35d4e949ea4f204954241e40edab2.jpg"}}]);