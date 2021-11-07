function renderPage(name, description, keywords, github, bugs, npm, version){
return`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${name}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords.join(", ")}">

    <link href="/css/normalize.css" rel="stylesheet">
    <link href="/css/brixi.css" rel="stylesheet">
    <link href="/css/skeleton.css" rel="stylesheet">
    <link href="/css/layout.css" rel="stylesheet">
    <link href="/css/navigation.css" rel="stylesheet">
    <link href="/css/docs.css" rel="stylesheet">
    <link href="/css/subnav.css" rel="stylesheet">

    <link rel="stylesheet" href="/static/highlight.css">
    <script defer src="/static/highlight.js"></script>

    <script type="module" src="/js/bootstrap.js"></script>
</head>
<body>
    <header flex="row nowrap items-center justify-between">
        <button id="nav-menu" onclick="document.documentElement.classList.toggle('menu-open');" aria-label="toggle navigation menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <a href="/" class="font-bold" id="logo">
            ${name}
        </a>
        <div flex="items-center row nowrap">
            <nav>
                ${version !== null ? `
                    <span class="font-sm font-grey-500">v${version}</span>
                ` : ""}
                ${github ? `
                    <a aria-label="GitHub icon" href="${github}">
                        <svg style="width:18px;height:18px;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                    </a>
                ` : ""}
                ${bugs ? `
                    <a aria-label="GitHub icon" href="${bugs}">
                        <svg style="width:16px;height:16px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bug" class="svg-inline--fa fa-bug fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"></path></svg>
                    </a>
                ` : ""}
                ${npm ? `
                    <a aria-label="GitHub icon" href="${npm}">
                        <svg style="width:24px;height:24px;" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="npm" class="svg-inline--fa fa-npm fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"></path></svg>
                    </a>
                ` : ""}
            </nav>
        </div>
    </header>
    <main>
        <navigation-component></navigation-component>
        <doc-view></doc-view>
        <subnav-component></subnav-component>
    </main>
    <textarea id="clipboard-input" tabindex="-1"></textarea>
</body>
</html>
`;
}

function renderStaticPage(name, description, keywords, github, bugs, npm, version, doc, nav, favicon, slug){
return`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${name}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords.join(", ")}">
    <link rel="icon" href="${favicon}">

    <link href="/css/normalize.css" rel="stylesheet">
    <link href="/css/brixi.css" rel="stylesheet">
    <link href="/css/skeleton.css" rel="stylesheet">
    <link href="/css/layout.css" rel="stylesheet">
    <link href="/css/navigation.css" rel="stylesheet">
    <link href="/css/docs.css" rel="stylesheet">
    <link href="/css/subnav.css" rel="stylesheet">

    <link rel="stylesheet" href="/static/highlight.css">
    <script defer src="/static/highlight.js"></script>

    <script type="module" src="/js/bootstrap.js"></script>
</head>
<body>
    <header flex="row nowrap items-center justify-between">
        <button id="nav-menu" onclick="document.documentElement.classList.toggle('menu-open');" aria-label="toggle navigation menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <a href="/" class="font-bold" id="logo">
            ${name}
        </a>
        <div flex="items-center row nowrap">
            <nav>
                ${version !== null ? `
                    <span class="font-sm font-grey-500">v${version}</span>
                ` : ""}
                ${github ? `
                    <a aria-label="GitHub icon" href="${github}">
                        <svg style="width:18px;height:18px;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                    </a>
                ` : ""}
                ${bugs ? `
                    <a aria-label="GitHub icon" href="${bugs}">
                        <svg style="width:16px;height:16px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bug" class="svg-inline--fa fa-bug fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"></path></svg>
                    </a>
                ` : ""}
                ${npm ? `
                    <a aria-label="GitHub icon" href="${npm}">
                        <svg style="width:24px;height:24px;" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="npm" class="svg-inline--fa fa-npm fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"></path></svg>
                    </a>
                ` : ""}
            </nav>
        </div>
    </header>
    <main>
        ${renderStaticNavigation(nav, slug)}
        <static-doc-view>
            ${doc}
        </static-doc-view>
        <static-subnav-component></static-subnav-component>
    </main>
    <textarea id="clipboard-input" tabindex="-1"></textarea>
</body>
</html>
`;
}

function renderStaticNavigation(nav, slug){
    return `
        <static-navigation-component>
            ${nav.map(link => {
                return link.children ? renderLinkWithChildren(link, slug) : renderLink(link, slug);
            }).join("")}
        </static-navigation-component>
    `;
}

function renderLink(link, activeSlug){
    const slug = link.slug.replace(/\.md$/, "");
    console.log(slug, activeSlug);
    return `<a class="${activeSlug === slug ? 'is-active' : ''}" href="/${slug}" data-slug="${ slug }">${ link.label.replace(/\-/g, " ") }</a>`;
}

function renderLinkWithChildren(link, slug){
    return `
        <button data-slug="${link.slug}" class="${linkContainsSlug(link.children, slug) ? 'is-open' : ''}">
            <span>${ link.label }</span>
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/></svg>
            </i>
        </button>
        <nav-children-container>
            ${link.children.map(child => {
                return child.children !== null ? renderLinkWithChildren(child, slug) : renderLink(child, slug)
            }).join("")}
        </nav-children-container>
    `;
}

function linkContainsSlug(children, activeSlug){
    let contains = false;
    for (let i = 0; i < children.length; i++){
        if (children[i].children){
            contains = linkContainsSlug(children[i])
        }
        else{
            const slug = children[i].slug.replace(/\.md$/, "");
            if (activeSlug === slug){
                contains = true;
            }
        }
        if (contains){
            break;
        }
    }
    return contains;
}

module.exports = { renderPage, renderStaticPage };