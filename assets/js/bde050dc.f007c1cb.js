"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[6980],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),h=o,m=d["".concat(c,".").concat(h)]||d[h]||u[h]||a;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},50985:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(87462),o=(n(67294),n(3905));const a={},i="Getting Started",l={unversionedId:"connector-development/tutorials/cdk-tutorial-python-http/getting-started",id:"connector-development/tutorials/cdk-tutorial-python-http/getting-started",title:"Getting Started",description:"Summary",source:"@site/../docs/connector-development/tutorials/cdk-tutorial-python-http/0-getting-started.md",sourceDirName:"connector-development/tutorials/cdk-tutorial-python-http",slug:"/connector-development/tutorials/cdk-tutorial-python-http/getting-started",permalink:"/connector-development/tutorials/cdk-tutorial-python-http/getting-started",draft:!1,editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/connector-development/tutorials/cdk-tutorial-python-http/0-getting-started.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{},sidebar:"mySidebar",previous:{title:"Python CDK Speedrun: Creating a Source",permalink:"/connector-development/tutorials/cdk-speedrun"},next:{title:"Step 1: Creating the Source",permalink:"/connector-development/tutorials/cdk-tutorial-python-http/creating-the-source"}},c={},s=[{value:"Summary",id:"summary",level:2},{value:"Requirements",id:"requirements",level:2},{value:"Exchange Rates API Setup",id:"exchange-rates-api-setup",level:2},{value:"Checklist",id:"checklist",level:2}],p={toc:s};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("h2",{id:"summary"},"Summary"),(0,o.kt)("p",null,"This is a step-by-step guide for how to create an Airbyte source in Python to read data from an HTTP API. We'll be using the Exchange Rates API as an example since it is simple and demonstrates a lot of the capabilities of the CDK."),(0,o.kt)("h2",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Python ",">","= 3.9"),(0,o.kt)("li",{parentName:"ul"},"Docker"),(0,o.kt)("li",{parentName:"ul"},"NodeJS ","(","only used to generate the connector",")",". We'll remove the NodeJS dependency soon.")),(0,o.kt)("p",null,"All the commands below assume that ",(0,o.kt)("inlineCode",{parentName:"p"},"python")," points to a version of python ",">","=3.9.0. On some systems, ",(0,o.kt)("inlineCode",{parentName:"p"},"python")," points to a Python2 installation and ",(0,o.kt)("inlineCode",{parentName:"p"},"python3")," points to Python3. If this is the case on your machine, substitute all ",(0,o.kt)("inlineCode",{parentName:"p"},"python")," commands in this guide with ",(0,o.kt)("inlineCode",{parentName:"p"},"python3"),"."),(0,o.kt)("h2",{id:"exchange-rates-api-setup"},"Exchange Rates API Setup"),(0,o.kt)("p",null,"For this guide we will be making API calls to the Exchange Rates API. In order to generate the API access key that will be used by the new connector, you will have to follow steps on the ",(0,o.kt)("a",{parentName:"p",href:"https://exchangeratesapi.io/"},"Exchange Rates API")," by signing up for the Free tier plan. Once you have an API access key, you can continue with the guide."),(0,o.kt)("h2",{id:"checklist"},"Checklist"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Step 1: Create the source using the template"),(0,o.kt)("li",{parentName:"ul"},"Step 2: Install dependencies for the new source"),(0,o.kt)("li",{parentName:"ul"},"Step 3: Define the inputs needed by your connector"),(0,o.kt)("li",{parentName:"ul"},"Step 4: Implement connection checking"),(0,o.kt)("li",{parentName:"ul"},"Step 5: Declare the schema of your streams"),(0,o.kt)("li",{parentName:"ul"},"Step 6: Implement functionality for reading your streams"),(0,o.kt)("li",{parentName:"ul"},"Step 7: Use the connector in Airbyte"),(0,o.kt)("li",{parentName:"ul"},"Step 8: Write unit tests or integration tests")),(0,o.kt)("p",null,"Each step of the Creating a Source checklist is explained in more detail in the following steps. We also mention how you can submit the connector to be included with the general Airbyte release at the end of the tutorial."))}u.isMDXComponent=!0}}]);