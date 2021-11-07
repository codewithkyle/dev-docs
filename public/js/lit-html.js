/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const $=new WeakMap,te=s=>(...e)=>{const t=s(...e);return $.set(t,!0),t},w=s=>typeof s=="function"&&$.has(s);/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const B=typeof window!="undefined"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,O=(s,e,t=null,n=null)=>{for(;e!==t;){const i=e.nextSibling;s.insertBefore(e,n),e=i}},P=(s,e,t=null)=>{for(;e!==t;){const n=e.nextSibling;s.removeChild(e),e=n}};/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const d={},S={};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const f=`{{lit-${String(Math.random()).slice(2)}}}`,F=`<!--${f}-->`,W=new RegExp(`${f}|${F}`),N="$lit$";class j{constructor(e,t){this.parts=[],this.element=t;const n=[],i=[],o=document.createTreeWalker(t.content,133,null,!1);let c=0,r=-1,a=0;const{strings:b,values:{length:ee}}=e;for(;a<ee;){const l=o.nextNode();if(l===null){o.currentNode=i.pop();continue}if(r++,l.nodeType===1){if(l.hasAttributes()){const h=l.attributes,{length:T}=h;let _=0;for(let u=0;u<T;u++)D(h[u].name,N)&&_++;for(;_-- >0;){const u=b[a],x=C.exec(u)[2],v=x.toLowerCase()+N,g=l.getAttribute(v);l.removeAttribute(v);const p=g.split(W);this.parts.push({type:"attribute",index:r,name:x,strings:p}),a+=p.length-1}}l.tagName==="TEMPLATE"&&(i.push(l),o.currentNode=l.content)}else if(l.nodeType===3){const h=l.data;if(h.indexOf(f)>=0){const T=l.parentNode,_=h.split(W),u=_.length-1;for(let x=0;x<u;x++){let v,g=_[x];if(g==="")v=m();else{const p=C.exec(g);p!==null&&D(p[2],N)&&(g=g.slice(0,p.index)+p[1]+p[2].slice(0,-N.length)+p[3]),v=document.createTextNode(g)}T.insertBefore(v,l),this.parts.push({type:"node",index:++r})}_[u]===""?(T.insertBefore(m(),l),n.push(l)):l.data=_[u],a+=u}}else if(l.nodeType===8)if(l.data===f){const h=l.parentNode;(l.previousSibling===null||r===c)&&(r++,h.insertBefore(m(),l)),c=r,this.parts.push({type:"node",index:r}),l.nextSibling===null?l.data="":(n.push(l),r--),a++}else{let h=-1;for(;(h=l.data.indexOf(f,h+1))!==-1;)this.parts.push({type:"node",index:-1}),a++}}for(const l of n)l.parentNode.removeChild(l)}}const D=(s,e)=>{const t=s.length-e.length;return t>=0&&s.slice(t)===e},G=s=>s.index!==-1,m=()=>document.createComment(""),C=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class k{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)n!==void 0&&n.setValue(e[t]),t++;for(const n of this.__parts)n!==void 0&&n.commit()}_clone(){const e=B?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let o=0,c=0,r,a=i.nextNode();for(;o<n.length;){if(r=n[o],!G(r)){this.__parts.push(void 0),o++;continue}for(;c<r.index;)c++,a.nodeName==="TEMPLATE"&&(t.push(a),i.currentNode=a.content),(a=i.nextNode())===null&&(i.currentNode=t.pop(),a=i.nextNode());if(r.type==="node"){const b=this.processor.handleTextExpression(this.options);b.insertAfterNode(a.previousSibling),this.__parts.push(b)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,r.name,r.strings,this.options));o++}return B&&(document.adoptNode(e),customElements.upgrade(e)),e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const q=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:s=>s}),ne=` ${f} `;class V{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let i=0;i<e;i++){const o=this.strings[i],c=o.lastIndexOf("<!--");n=(c>-1||n)&&o.indexOf("-->",c+1)===-1;const r=C.exec(o);r===null?t+=o+(n?ne:F):t+=o.substr(0,r.index)+r[1]+r[2]+N+r[3]+f}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return q!==void 0&&(t=q.createHTML(t)),e.innerHTML=t,e}}class z extends V{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),O(t,n.firstChild),e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=s=>s===null||!(typeof s=="object"||typeof s=="function"),A=s=>Array.isArray(s)||!!(s&&s[Symbol.iterator]);class L{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let i=0;i<n.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new M(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(t===1&&e[0]===""&&e[1]===""){const o=n[0].value;if(typeof o=="symbol")return String(o);if(typeof o=="string"||!A(o))return o}let i="";for(let o=0;o<t;o++){i+=e[o];const c=n[o];if(c!==void 0){const r=c.value;if(E(r)||!A(r))i+=typeof r=="string"?r:String(r);else for(const a of r)i+=typeof a=="string"?a:String(a)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class M{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==d&&(!E(e)||e!==this.value)&&(this.value=e,w(e)||(this.committer.dirty=!0))}commit(){for(;w(this.value);){const e=this.value;this.value=d,e(this)}this.value!==d&&this.committer.commit()}}class y{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(m()),this.endNode=e.appendChild(m())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=m()),e.__insert(this.endNode=m())}insertAfterPart(e){e.__insert(this.startNode=m()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=d,t(this)}const e=this.__pendingValue;e!==d&&(E(e)?e!==this.value&&this.__commitText(e):e instanceof V?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):A(e)?this.__commitIterable(e):e===S?(this.value=S,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling;e=e??"";const n=typeof e=="string"?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof k&&this.value.template===t)this.value.update(e.values);else{const n=new k(t,e.processor,this.options),i=n._clone();n.update(e.values),this.__commitNode(i),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n=0,i;for(const o of e)i=t[n],i===void 0&&(i=new y(this.options),t.push(i),n===0?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(o),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){P(this.startNode.parentNode,e.nextSibling,this.endNode)}}class J{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,n.length!==2||n[0]!==""||n[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;w(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=d,t(this)}if(this.__pendingValue===d)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=d}}class K extends L{constructor(e,t,n){super(e,t,n);this.single=n.length===2&&n[0]===""&&n[1]===""}_createPart(){return new Q(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class Q extends M{}let U=!1;(()=>{try{const s={get capture(){return U=!0,!1}};window.addEventListener("test",s,s),window.removeEventListener("test",s,s)}catch{}})();class X{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=i=>this.handleEvent(i)}setValue(e){this.__pendingValue=e}commit(){for(;w(this.__pendingValue);){const o=this.__pendingValue;this.__pendingValue=d,o(this)}if(this.__pendingValue===d)return;const e=this.__pendingValue,t=this.value,n=e==null||t!=null&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=e!=null&&(t==null||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=se(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=d}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const se=s=>s&&(U?{capture:s.capture,passive:s.passive,once:s.once}:s.capture);/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class Y{handleAttributeExpressions(e,t,n,i){const o=t[0];return o==="."?new K(e,t.slice(1),n).parts:o==="@"?[new X(e,t.slice(1),i.eventContext)]:o==="?"?[new J(e,t.slice(1),n)]:new L(e,t,n).parts}handleTextExpression(e){return new y(e)}}const I=new Y;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function Z(s){let e=H.get(s.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},H.set(s.type,e));let t=e.stringsArray.get(s.strings);if(t!==void 0)return t;const n=s.strings.join(f);return t=e.keyString.get(n),t===void 0&&(t=new j(s,s.getTemplateElement()),e.keyString.set(n,t)),e.stringsArray.set(s.strings,t),t}const H=new Map;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const R=new WeakMap,ie=(s,e,t)=>{let n=R.get(e);n===void 0&&(P(e,e.firstChild),R.set(e,n=new y(Object.assign({templateFactory:Z},t))),n.appendInto(e)),n.setValue(s),n.commit()};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */typeof window!="undefined"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const oe=(s,...e)=>new V(s,e,"html",I),re=(s,...e)=>new z(s,e,"svg",I);export{L as AttributeCommitter,M as AttributePart,J as BooleanAttributePart,Y as DefaultTemplateProcessor,X as EventPart,y as NodePart,K as PropertyCommitter,Q as PropertyPart,z as SVGTemplateResult,j as Template,k as TemplateInstance,V as TemplateResult,m as createMarker,I as defaultTemplateProcessor,te as directive,oe as html,w as isDirective,A as isIterable,E as isPrimitive,G as isTemplatePartActive,d as noChange,S as nothing,R as parts,P as removeNodes,ie as render,O as reparentNodes,re as svg,H as templateCaches,Z as templateFactory};
