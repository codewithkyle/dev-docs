import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { register, InboxEvent } from "@codewithkyle/messaging";

type Link = {
    label: string,
    hash: string,
    offset: number,
};
type ISubnav = {
    links: Array<Link>,
};
export default class Subnav extends SuperComponent<ISubnav>{
    constructor(){
        super();
        this.state = "LOADING";
        this.stateMachine = {
            LOADING: {
                PASS: "IDLING",
                FAIL: "ERROR",
                LOAD: "LOADING",
            },
            IDLING: {
                LOAD: "LOADING",
            },
            ERROR: {
                LOAD: "LOADING",
            }
        };
        this.model = {
            links: [],
        };
        register("subnav", this.inbox.bind(this));
        this.render();
    }

    private inbox(e:InboxEvent){
        const { type, links } = e.data;
        switch(type){
            case "load":
                this.trigger("LOAD");
                break;
            case "render":
                this.trigger("PASS");
                this.update({
                    links: links,
                });
                break;
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
                    ${this.model.links.map(link => {
                        return html`<a style="padding-left: ${link.offset * 0.5}rem;" href="#${link.hash}">${link.label}</a>`;
                    })}
                `;
                break;
            case "ERROR":
                view = html`<p class="block w-full text-center font-danger-700">An error occured. Please contact support.</p>`;
                break;
        }
        render(view, this);
    }
}