import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { register } from "@codewithkyle/messaging";
import { navigate } from "./utils/navigation";

type Link = {
    label: string,
    slug: string,
    children: Array<Link>,
};

type INav = {
    fsLinks: Array<Link>,
};
export default class Nav extends SuperComponent<INav>{
    constructor(){
        super();
        this.state = "LOADING";
        this.stateMachine = {
            LOADING: {
                PASS: "IDLING",
                FAIL: "ERROR"
            },
        };
        this.model = {
            fsLinks: [],
        };
        register("navigation", this.inbox.bind(this));
        this.render();
        this.fetchData();
        this.openNavigationMenus();
    }

    private inbox(e){
        this.openNavigationMenus();
    }

    private async openNavigationMenus(){
        const route = location.pathname.replace(/^\//, "");
        const segments = route.split("/");
        let slug = "";
        for (const segment of segments){
            if (slug.length){
                slug += `/${segment}`;    
            } else {
                slug = segment;
            }
            const bttn = document.body.querySelector(`button[data-slug="${slug}"]`);
            if (bttn){
                if (bttn.parentElement instanceof NavLinkGroup){
                    await bttn.parentElement.open();
                }
            }
        }
    }

    private async fetchFSData(){
        const request = await fetch(`/api/navigation.json`);
        const response = await request.json();
        this.update({
            fsLinks: response,
        });
    }

    private async fetchData(){
        try{
            await Promise.all([
                this.fetchFSData(),
            ]);
            this.trigger("PASS");
        } catch (e) {
            this.trigger("FAIL");
        }
    }

    render(){
        let view;
        switch (this.state){
            case "LOADING":
                view = html`
                    ${Array.from(Array(8)).map(() => {
                        return html`
                            <div class="skeleton -copy w-full mb-0.25"></div>
                        `;
                    })}
                `;
                break;
            case "IDLING":
                view = html`
                    ${ this.model.fsLinks.map(link => {
                        return html`
                            ${link.children !== null ? renderLinkWithChildren(link) : renderLink(link)}
                        `;
                    }) }
                `;
                break;
            case "ERROR":
                view = html`<p class="block w-full text-center font-danger-700">An error occured. Please contact support.</p>`;
                break;
        }
        render(view, this);
        this.openNavigationMenus();
    }
}

type INavLinkGroup = {
    label: string,
    children: Array<Link>,
    slug: string,
    isOpen: boolean,
};
class NavLinkGroup extends SuperComponent<INavLinkGroup>{
    constructor(link:Link){
        super();
        this.model = {
            label: link.label,
            children: link.children,
            slug: link.slug,
            isOpen: false,
        };
        this.render();
    }

    private toggleGroup:EventListener = (e:Event) => {
        if (this.model.isOpen){
            this.update({
                isOpen: false,
            });
        } else {
            this.update({
                isOpen: true,
            });
        }
    }
    
    public async open(){
        this.update({
            isOpen: true,
        });
    }

    render(){
        const view = html`
            <button class="${this.model.isOpen ? "is-open" : ""}" @click=${ this.toggleGroup } data-slug="${this.model.slug}">
                <span>${ this.model.label }</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/></svg>
                </i>
            </button>
            <nav-children-container>
                ${this.model.children.map(child => {
                    return child.children !== null ? renderLinkWithChildren(child) : renderLink(child)
                })}
            </nav-children-container>
        `;
        render(view, this);
    }
}
customElements.define("nav-link-group", NavLinkGroup);

function renderLink(link:Link){
    return new NavLink(link);
}

function renderLinkWithChildren(link){
    return new NavLinkGroup(link);
}

class NavLink extends SuperComponent<Link>{
    constructor(link:Link){
        super();
        this.model = link;
        register("navigation", this.inbox.bind(this));
        this.render();
    }
    private inbox(e){
        this.render();
    }
    private navigationEvent:EventListener = (e:Event) => {
        // @ts-ignore
        navigate(this.model.slug);
    }
    render(){
        const slug = this.model.slug.replace(/\.md$/, "");
        const view = html`<button class="${location.pathname === `/${slug}` ? "is-active" : ""}" @click=${ this.navigationEvent } data-slug="${ slug }">${ this.model.label.replace(/\-/g, " ") }</button>`;    
        render(view, this);
    }
}
customElements.define("nav-link", NavLink);