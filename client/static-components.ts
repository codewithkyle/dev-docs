import { copyToClipboard } from "./utils/clipboard";

class StaticNav extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.querySelectorAll("button").forEach(el => {
            el.addEventListener("click", () => {
                el.classList.toggle("is-open");
            });
        });
    }
}
customElements.define("static-navigation-component", StaticNav);

class StaticView extends HTMLElement{
    constructor(){
        super();
    }

    private highlightSynatx(){
        this.querySelectorAll('pre code').forEach((el) => {
            el.innerHTML = el.innerHTML.replace(/\t/g, "    ");
            // @ts-ignore
            hljs?.highlightElement(el);
        });
    }

    private scrubLinks(){
        const routeSegments = location.pathname.replace(/^\//, "").split("/");
        if (routeSegments.length){
            const SkipURL = new RegExp(/https?:\/\/|^\#/);
            this.querySelectorAll("a").forEach(el => {
                const url = el.href.replace(location.origin, "").replace(location.pathname, "").trim();
                if (!SkipURL.test(url)){
                    el.href = `/${routeSegments[0]}/${url.replace(/^\//, "").trim()}`
                } else {
                    el.dataset.noHijack = "true";
                }
            });
            this.querySelectorAll("img").forEach(el => {
                const url = el.src.replace(location.origin, "");
                if (!SkipURL.test(url)){
                    el.src = `/${routeSegments[0]}/${url.replace(/^\//, "").trim()}`
                }
            });
        }
    }

    private pageJump(){
        if (location.hash.length){
            const el = this.querySelector(location.hash);
            if (el){
                el.scrollIntoView();
            }
        }else{
            this.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto',
            });
        }
    }

    private copyCodeToClipboard:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        const code = target.parentElement.querySelector("code");
        const raw = code.innerText.trim();
        copyToClipboard(raw);
        target.focus();
        target.classList.add("is-success");
        setTimeout(() => {
            target.classList.remove("is-success");
        }, 3000);
    }

    private injectCopyToClipboardButtons(){
        this.querySelectorAll("pre code").forEach(el => {
            const bttn = document.createElement("button");
            bttn.setAttribute("aria-label", "copy source code to clipboard");
            bttn.className = "copy-to-clipboard";
            bttn.addEventListener("click", this.copyCodeToClipboard);
            bttn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="copy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            `;
            el.parentElement.appendChild(bttn);
        });
    }

    private copyLinkToClipboard:EventListener = (e:Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        location.hash = target.dataset.hash;
    }

    private injectPageJumpLinks(){
        const links: Array<{
            label: string,
            hash: string,
            offset: number,
        }> = [];
        this.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(el => {
            const link = {
                // @ts-ignore
                label: el.innerText,
                hash: el.id,
                offset: parseInt(el.tagName.substr(1, 1)) - 1,
            };
            links.push(link);
            const bttn = document.createElement("a");
            bttn.className = "page-jump-link-bttn";
            bttn.href = el.id;
            bttn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            `;
            bttn.setAttribute("aria-label", `click to copy a direct link to this heading`);
            bttn.addEventListener("click", this.copyLinkToClipboard);
            bttn.dataset.hash = el.id;
            el.appendChild(bttn);
        });
        const sideNav = document.body.querySelector("static-subnav-component");
        if (sideNav){
            links.map(link => {
                sideNav.innerHTML += `<a style="padding-left: ${link.offset * 0.5}rem;" href="#${link.hash}">${link.label}</a>`;
            })
        }
    }

    private injectTableCellNames(){
        this.querySelectorAll("table tbody tr td").forEach(el => {
            // @ts-ignore
            el.setAttribute("title", el.innerText.trim());
        });
    }

    connectedCallback(){
        this.highlightSynatx();
        this.scrubLinks();
        this.pageJump();
        this.injectCopyToClipboardButtons();
        this.injectPageJumpLinks();
        this.injectTableCellNames();
    }
}
customElements.define("static-doc-view", StaticView);