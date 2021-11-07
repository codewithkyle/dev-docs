importScripts("/static/marked.js"),onmessage=r=>{const{id:e,markdown:s}=r.data;let t={id:e,type:"success",html:"",error:""};try{t.html=marked(s)}catch(a){t.error=a,t.type="error"}postMessage(t)};
