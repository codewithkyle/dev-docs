class n extends HTMLElement{constructor(){super();this.debounce=(e,t)=>{let s=null;return(...d)=>{window.clearTimeout(s),s=window.setTimeout(()=>{e.apply(null,d)},t)}},this.debounceRender=this.debounce(this.render.bind(this),80),this.debounceUpdate=this.debounce(this.updated.bind(this),80),this.model={},this.data=this.model,this.state="INACTIVE",this.stateMachine={}}snapshot(){return{state:this.state,model:{...this.model}}}update(e,t=!1){this.model=Object.assign(this.model,e),this.data=this.model,t||this.debounceRender(),this.debounceUpdate()}trigger(e){this.state=this.stateMachine?.[this.state]?.[e]??"ERROR",this.debounceRender(),this.debounceUpdate()}render(){}updated(){}connected(){}connectedCallback(){this.connected()}disconnected(){}disconnectedCallback(){this.disconnected()}}var o=n;export{o as default};