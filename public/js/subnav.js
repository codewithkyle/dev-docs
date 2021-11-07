import a from"./supercomponent.js";import{html as r,render as n}from"./lit-html.js";import{register as i}from"./messaging.js";class o extends a{constructor(){super();this.state="LOADING",this.stateMachine={LOADING:{PASS:"IDLING",FAIL:"ERROR",LOAD:"LOADING"},IDLING:{LOAD:"LOADING"},ERROR:{LOAD:"LOADING"}},this.model={links:[]},i("subnav",this.inbox.bind(this)),this.render()}inbox(e){const{type:t,links:s}=e.data;switch(t){case"load":this.trigger("LOAD");break;case"render":this.trigger("PASS"),this.update({links:s});break}}render(){let e;switch(this.state){case"LOADING":e=r`
                    ${Array.from(Array(8)).map(()=>r`
                            <div class="skeleton -copy w-full mb-0.25"></div>
                        `)}
                `;break;case"IDLING":e=r`
                    ${this.model.links.map(t=>r`<a style="padding-left: ${t.offset*.5}rem;" href="#${t.hash}">${t.label}</a>`)}
                `;break;case"ERROR":e=r`<p class="block w-full text-center font-danger-700">An error occured. Please contact support.</p>`;break}n(e,this)}}export{o as default};
