import r from"./supercomponent.js";import{html as n,render as o}from"./lit-html.js";import{register as p}from"./messaging.js";import{navigate as g}from"./navigation.js";class m extends r{constructor(){super();this.state="LOADING",this.stateMachine={LOADING:{PASS:"IDLING",FAIL:"ERROR"}},this.model={fsLinks:[]},p("navigation",this.inbox.bind(this)),this.render(),this.fetchData(),this.openNavigationMenus()}inbox(e){this.openNavigationMenus()}async openNavigationMenus(){const t=location.pathname.replace(/^\//,"").split("/");let s="";for(const c of t){s.length?s+=`/${c}`:s=c;const a=document.body.querySelector(`button[data-slug="${s}"]`);a&&a.parentElement instanceof l&&await a.parentElement.open()}}async fetchFSData(){const t=await(await fetch("/api/navigation.json")).json();this.update({fsLinks:t})}async fetchData(){try{await Promise.all([this.fetchFSData()]),this.trigger("PASS")}catch{this.trigger("FAIL")}}render(){let e;switch(this.state){case"LOADING":e=n`
                    ${Array.from(Array(8)).map(()=>n`
                            <div class="skeleton -copy w-full mb-0.25"></div>
                        `)}
                `;break;case"IDLING":e=n`
                    ${this.model.fsLinks.map(t=>n`
                            ${t.children!==null?h(t):u(t)}
                        `)}
                `;break;case"ERROR":e=n`<p class="block w-full text-center font-danger-700">An error occured. Please contact support.</p>`;break}o(e,this),this.openNavigationMenus()}}class l extends r{constructor(e){super();this.toggleGroup=e=>{this.model.isOpen?this.update({isOpen:!1}):this.update({isOpen:!0})};this.model={label:e.label,children:e.children,slug:e.slug,isOpen:!1},this.render()}async open(){this.update({isOpen:!0})}render(){const e=n`
            <button class="${this.model.isOpen?"is-open":""}" @click=${this.toggleGroup} data-slug="${this.model.slug}">
                <span>${this.model.label}</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/></svg>
                </i>
            </button>
            <nav-children-container>
                ${this.model.children.map(t=>t.children!==null?h(t):u(t))}
            </nav-children-container>
        `;o(e,this)}}customElements.define("nav-link-group",l);function u(i){return new d(i)}function h(i){return new l(i)}class d extends r{constructor(e){super();this.navigationEvent=e=>{g(this.model.slug)};this.model=e,p("navigation",this.inbox.bind(this)),this.render()}inbox(e){this.render()}render(){const e=this.model.slug.replace(/\.md$/,""),t=n`<button class="${location.pathname===`/${e}`?"is-active":""}" @click=${this.navigationEvent} data-slug="${e}">${this.model.label.replace(/\-/g," ")}</button>`;o(t,this)}}customElements.define("nav-link",d);export{m as default};
