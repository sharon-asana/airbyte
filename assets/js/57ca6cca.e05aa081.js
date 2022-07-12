"use strict";(self.webpackChunkdocu=self.webpackChunkdocu||[]).push([[3766],{3905:(t,e,a)=>{a.d(e,{Zo:()=>d,kt:()=>c});var n=a(67294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},i=Object.keys(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var p=n.createContext({}),s=function(t){var e=n.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},d=function(t){var e=s(t.components);return n.createElement(p.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},u=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,i=t.originalType,p=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),u=s(a),c=r,k=u["".concat(p,".").concat(c)]||u[c]||m[c]||i;return a?n.createElement(k,l(l({ref:e},d),{},{components:a})):n.createElement(k,l({ref:e},d))}));function c(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=a.length,l=new Array(i);l[0]=u;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,l[1]=o;for(var s=2;s<i;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},47607:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var n=a(87462),r=(a(67294),a(3905));const i={},l="MSSQL",o={unversionedId:"integrations/destinations/mssql",id:"integrations/destinations/mssql",title:"MSSQL",description:"Features",source:"@site/../docs/integrations/destinations/mssql.md",sourceDirName:"integrations/destinations",slug:"/integrations/destinations/mssql",permalink:"/integrations/destinations/mssql",draft:!1,editUrl:"https://github.com/airbytehq/airbyte/blob/master/docs/../docs/integrations/destinations/mssql.md",tags:[],version:"current",frontMatter:{},sidebar:"mySidebar",previous:{title:"MQTT",permalink:"/integrations/destinations/mqtt"},next:{title:"MySQL",permalink:"/integrations/destinations/mysql"}},p={},s=[{value:"Features",id:"features",level:2},{value:"Output Schema",id:"output-schema",level:2},{value:"Microsoft SQL Server specifics or why NVARCHAR type is used here:",id:"microsoft-sql-server-specifics-or-why-nvarchar-type-is-used-here",level:4},{value:"Getting Started (Airbyte Cloud)",id:"getting-started-airbyte-cloud",level:2},{value:"Getting Started (Airbyte Open-Source)",id:"getting-started-airbyte-open-source",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Normalization Requirements",id:"normalization-requirements",level:3},{value:"Setup guide",id:"setup-guide",level:3},{value:"Network Access",id:"network-access",level:4},{value:"<strong>Permissions</strong>",id:"permissions",level:4},{value:"Target Database",id:"target-database",level:4},{value:"SSL configuration (optional)",id:"ssl-configuration-optional",level:4},{value:"Setup the MSSQL destination in Airbyte",id:"setup-the-mssql-destination-in-airbyte",level:3},{value:"Connection via SSH Tunnel",id:"connection-via-ssh-tunnel",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Changelog (Strict Encrypt)",id:"changelog-strict-encrypt",level:3}],d={toc:s};function m(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"mssql"},"MSSQL"),(0,r.kt)("h2",{id:"features"},"Features"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Supported?","(","Yes/No",")"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Notes"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Full Refresh Sync"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Incremental - Append Sync"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Incremental - Deduped History"),(0,r.kt)("td",{parentName:"tr",align:"left"},"No"),(0,r.kt)("td",{parentName:"tr",align:"left"},"As this connector does not support dbt, we don't support this sync mode on this destination.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Namespaces"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})))),(0,r.kt)("h2",{id:"output-schema"},"Output Schema"),(0,r.kt)("p",null,"Each stream will be output into its own table in SQL Server. Each table will contain 3 columns:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_airbyte_ab_id"),": a uuid assigned by Airbyte to each event that is processed. The column type in SQL Server is ",(0,r.kt)("inlineCode",{parentName:"li"},"VARCHAR(64)"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_airbyte_emitted_at"),": a timestamp representing when the event was pulled from the data source. The column type in SQL Server is ",(0,r.kt)("inlineCode",{parentName:"li"},"DATETIMEOFFSET(7)"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"_airbyte_data"),": a JSON blob representing with the event data. The column type in SQL Server is ",(0,r.kt)("inlineCode",{parentName:"li"},"NVARCHAR(MAX)"),".")),(0,r.kt)("h4",{id:"microsoft-sql-server-specifics-or-why-nvarchar-type-is-used-here"},"Microsoft SQL Server specifics or why NVARCHAR type is used here:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"NVARCHAR is Unicode - 2 bytes per character, therefore max. of 1 billion characters; will handle East Asian, Arabic, Hebrew, Cyrillic etc. characters just fine."),(0,r.kt)("li",{parentName:"ul"},"VARCHAR is non-Unicode - 1 byte per character, max. capacity is 2 billion characters, but limited to the character set you're SQL Server is using, basically - no support for those languages mentioned before")),(0,r.kt)("h2",{id:"getting-started-airbyte-cloud"},"Getting Started ","(","Airbyte Cloud",")"),(0,r.kt)("p",null,"Airbyte Cloud only supports connecting to your MSSQL instance with TLS encryption. Other than that, you can proceed with the open-source instructions below."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Supported?","(","Yes/No",")"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Notes"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Full Refresh Sync"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Incremental - Append Sync"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Incremental - Deduped History"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Namespaces"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Yes"),(0,r.kt)("td",{parentName:"tr",align:"left"})))),(0,r.kt)("h2",{id:"getting-started-airbyte-open-source"},"Getting Started ","(","Airbyte Open-Source",")"),(0,r.kt)("h3",{id:"requirements"},"Requirements"),(0,r.kt)("p",null,"To use the SQL Server destination, you'll need:"),(0,r.kt)("p",null,"MS SQL Server: ",(0,r.kt)("inlineCode",{parentName:"p"},"Azure SQL Database"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Azure Synapse Analytics"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Azure SQL Managed Instance"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2019"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2017"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2016"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2014"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2012"),", or ",(0,r.kt)("inlineCode",{parentName:"p"},"PDW 2008R2 AU34"),"."),(0,r.kt)("h3",{id:"normalization-requirements"},"Normalization Requirements"),(0,r.kt)("p",null,"To sync ",(0,r.kt)("strong",{parentName:"p"},"with")," normalization you'll need to use MS SQL Server of the following versions: ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2019"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2017"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2016"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2014"),". The work of normalization on ",(0,r.kt)("inlineCode",{parentName:"p"},"SQL Server 2012")," and bellow are not guaranteed."),(0,r.kt)("h3",{id:"setup-guide"},"Setup guide"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"MS SQL Server: ",(0,r.kt)("inlineCode",{parentName:"li"},"Azure SQL Database"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"Azure Synapse Analytics"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"Azure SQL Managed Instance"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"SQL Server 2019"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"SQL Server 2017"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"SQL Server 2016"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"SQL Server 2014"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"SQL Server 2012"),", or ",(0,r.kt)("inlineCode",{parentName:"li"},"PDW 2008R2 AU34"),".")),(0,r.kt)("h4",{id:"network-access"},"Network Access"),(0,r.kt)("p",null,"Make sure your SQL Server database can be accessed by Airbyte. If your database is within a VPC, you may need to allow access from the IP you're using to expose Airbyte."),(0,r.kt)("h4",{id:"permissions"},(0,r.kt)("strong",{parentName:"h4"},"Permissions")),(0,r.kt)("p",null,"You need a user configured in SQL Server that can create tables and write rows. We highly recommend creating an Airbyte-specific user for this purpose."),(0,r.kt)("h4",{id:"target-database"},"Target Database"),(0,r.kt)("p",null,"You will need to choose an existing database or create a new database that will be used to store synced data from Airbyte."),(0,r.kt)("h4",{id:"ssl-configuration-optional"},"SSL configuration ","(","optional",")"),(0,r.kt)("p",null,"Airbyte supports a SSL-encrypted connection to the database. If you want to use SSL to securely access your database, ensure that ",(0,r.kt)("a",{parentName:"p",href:"https://support.microsoft.com/en-us/topic/how-to-enable-ssl-encryption-for-an-instance-of-sql-server-by-using-microsoft-management-console-1c7ae22f-8518-2b3e-93eb-d735af9e344c"},"the server is configured to use an SSL certificate.")),(0,r.kt)("h3",{id:"setup-the-mssql-destination-in-airbyte"},"Setup the MSSQL destination in Airbyte"),(0,r.kt)("p",null,"You should now have all the requirements needed to configure SQL Server as a destination in the UI. You'll need the following information to configure the MSSQL destination:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Host")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Port")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Username")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Password")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Schema")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Database"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"This database needs to exist within the schema provided."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"SSL Method"),":",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"The SSL configuration supports three modes: Unencrypted, Encrypted ","(","trust server certificate",")",", and Encrypted ","(","verify certificate",")",".",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Unencrypted"),": Do not use SSL encryption on the database connection"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Encrypted ","(","trust server certificate",")"),": Use SSL encryption without verifying the server's certificate.  This is useful for self-signed certificates in testing scenarios, but should not be used in production."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Encrypted ","(","verify certificate",")"),": Use the server's SSL certificate, after standard certificate verification."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Host Name In Certificate")," ","(","optional",")",": When using certificate verification, this property can be set to specify an expected name for added security.  If this value is present, and the server's certificate's host name does not match it, certificate verification will fail.")))),(0,r.kt)("h2",{id:"connection-via-ssh-tunnel"},"Connection via SSH Tunnel"),(0,r.kt)("p",null,"Airbyte has the ability to connect to the MS SQL Server instance via an SSH Tunnel. The reason you might want to do this because it is not possible ","(","or against security policy",")"," to connect to the database directly ","(","e.g. it does not have a public IP address",")","."),(0,r.kt)("p",null,"When using an SSH tunnel, you are configuring Airbyte to connect to an intermediate server ","(","a.k.a. a bastion sever",")"," that have direct access to the database. Airbyte connects to the bastion and then asks the bastion to connect directly to the server."),(0,r.kt)("p",null,"Using this feature requires additional configuration, when creating the source. We will talk through what each piece of configuration means."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Configure all fields for the source as you normally would, except ",(0,r.kt)("inlineCode",{parentName:"p"},"SSH Tunnel Method"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"SSH Tunnel Method")," defaults to ",(0,r.kt)("inlineCode",{parentName:"p"},"No Tunnel")," ","(","meaning a direct connection",")",". If you want to use an SSH Tunnel choose ",(0,r.kt)("inlineCode",{parentName:"p"},"SSH Key Authentication")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Password Authentication"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Choose ",(0,r.kt)("inlineCode",{parentName:"p"},"Key Authentication")," if you will be using an RSA private key as your secret for establishing the SSH Tunnel ","(","see below for more information on generating this key",")",".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Choose ",(0,r.kt)("inlineCode",{parentName:"p"},"Password Authentication")," if you will be using a password as your secret for establishing the SSH Tunnel.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"SSH Tunnel Jump Server Host")," refers to the intermediate ","(","bastion",")"," server that Airbyte will connect to. This should be a hostname or an IP Address.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"SSH Connection Port")," is the port on the bastion server with which to make the SSH connection. The default port for SSH connections is ",(0,r.kt)("inlineCode",{parentName:"p"},"22"),","),(0,r.kt)("p",{parentName:"li"},"so unless you have explicitly changed something, go with the default.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"SSH Login Username")," is the username that Airbyte should use when connection to the bastion server. This is NOT the MS SQL Server username.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"If you are using ",(0,r.kt)("inlineCode",{parentName:"p"},"Password Authentication"),", then ",(0,r.kt)("inlineCode",{parentName:"p"},"SSH Login Username")," should be set to the password of the User from the previous step."),(0,r.kt)("p",{parentName:"li"},"If you are using ",(0,r.kt)("inlineCode",{parentName:"p"},"SSH Key Authentication")," leave this blank. Again, this is not the MS SQL Server password, but the password for the OS-user that"),(0,r.kt)("p",{parentName:"li"},"Airbyte is using to perform commands on the bastion.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"If you are using ",(0,r.kt)("inlineCode",{parentName:"p"},"SSH Key Authentication"),", then ",(0,r.kt)("inlineCode",{parentName:"p"},"SSH Private Key")," should be set to the RSA Private Key that you are using to create the SSH connection."),(0,r.kt)("p",{parentName:"li"},"This should be the full contents of the key file starting with ",(0,r.kt)("inlineCode",{parentName:"p"},"-----BEGIN RSA PRIVATE KEY-----")," and ending with ",(0,r.kt)("inlineCode",{parentName:"p"},"-----END RSA PRIVATE KEY-----"),"."))),(0,r.kt)("h2",{id:"changelog"},"Changelog"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Version"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Date"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Pull Request"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Subject"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.19"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-05-25"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/13054"},"13054")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Destination MSSQL: added custom JDBC parameters support.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.18"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-05-17"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/12820"},"12820")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Improved 'check' operation performance")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.17"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-04-05"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/11729"},"11729")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Bump mina-sshd from 2.7.0 to 2.8.0")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.15"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-02-25"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/10421"},"10421")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Refactor JDBC parameters handling")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.14"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-02-14"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/10256"},"10256")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Add ",(0,r.kt)("inlineCode",{parentName:"td"},"-XX:+ExitOnOutOfMemoryError")," JVM option")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.13"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-12-28"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/9158"},"#","9158")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Update connector fields title/description")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.12"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-12-01"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/8371"},"#","8371")),(0,r.kt)("td",{parentName:"tr",align:"left"},'Fixed incorrect handling "\\n" in ssh key')),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.11"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-11-08"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/7719"},"#7719")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Improve handling of wide rows by buffering records based on their byte size rather than their count")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.10"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-10-11"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/6877"},"#","6877")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Add ",(0,r.kt)("inlineCode",{parentName:"td"},"normalization")," capability, add ",(0,r.kt)("inlineCode",{parentName:"td"},"append+deduplication")," sync mode")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.9"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-09-29"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/5970"},"#","5970")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Add support & test cases for MSSQL Destination via SSH tunnels")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.8"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-08-07"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/5272"},"#","5272")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Add batch method to insert records")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.7"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-07-30"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/5125"},"#","5125")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Enable ",(0,r.kt)("inlineCode",{parentName:"td"},"additionalPropertities")," in spec.json")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.6"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-06-21"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/3555"},"#","3555")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Partial Success in BufferedStreamConsumer")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.5"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-07-20"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/4874"},"#","4874")),(0,r.kt)("td",{parentName:"tr",align:"left"},"declare object types correctly in spec")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.4"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-06-17"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/3744"},"#","3744")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Fix doc/params in specification file")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.3"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-05-28"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/3973"},"#","3728")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Change dockerfile entrypoint")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.2"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-05-13"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/3671"},"#","3367")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Fix handle symbols unicode")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.1"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-05-11"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/3195"},"#","3566")),(0,r.kt)("td",{parentName:"tr",align:"left"},"MS SQL Server Destination Release!")))),(0,r.kt)("h3",{id:"changelog-strict-encrypt"},"Changelog (Strict Encrypt)"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Version"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Date"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Pull Request"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Subject"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.9"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-06-17"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/13864"},"13864")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Updated stacktrace format for any trace message errors")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.8"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-05-25"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/13054"},"13054")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Destination MSSQL: added custom JDBC parameters support.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.6"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-05-17"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/12820"},"12820")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Improved 'check' operation performance")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.5"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-02-25"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/10421"},"10421")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Refactor JDBC parameters handling")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.4"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2022-02-14"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/10256"},"10256")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Add ",(0,r.kt)("inlineCode",{parentName:"td"},"-XX:+ExitOnOutOfMemoryError")," JVM option")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.3"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-12-28"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/9158"},"#","9158")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Update connector fields title/description")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.2"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-12-01"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/8371"},"8371")),(0,r.kt)("td",{parentName:"tr",align:"left"},'Fixed incorrect handling "\\n" in ssh key')),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"0.1.1"),(0,r.kt)("td",{parentName:"tr",align:"left"},"2021-11-08"),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/airbytehq/airbyte/pull/7719"},"#7719")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Improve handling of wide rows by buffering records based on their byte size rather than their count")))))}m.isMDXComponent=!0}}]);