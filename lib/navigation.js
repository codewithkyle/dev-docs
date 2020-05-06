const glob = require("glob");

function buildNavigation(docsDir) {
    const files = glob.sync(`${docsDir}/**/*.md`);
    const nav = [];
    for (let i = 0; i < files.length; i++) {
        const slug = files[i]
            .toLowerCase()
            .trim()
            .replace(/(.*docs[\/\\])|(\.md)/gi, "")
            .replace(/[\;\?\:\@\=\&\"\<\>\#\%\{\}\|\\\^\~\[\]\`]/g, "")
            .replace(/\s+/gi, "-")
            .replace(/\\/gi, "/");
        const label = files[i]
            .toLowerCase()
            .trim()
            .replace(/\s+/gi, " ")
            .replace(/(.*[\/\\])|(\.md)/gi, "");
        const groups =
            files[i]
                .replace(/.*docs[\\\/]/gi, "")
                .match(/.*(?=[\\\/])/gi)?.[0]
                ?.replace(/\s+/gi, "-")
                ?.replace(/\\/gi, "/")
                ?.split("/") ?? [];
        nav.push({
            label: label,
            headings: groups,
            slug: `/${encodeURI(slug)}`,
            file: files[i],
        });
    }
    return nav;
}

function renderNavigation(nav) {
    let html = "<nav>";
    for (let i = 0; i < nav.length; i++) {
        html += `<a href="${nav[i].slug}">${nav[i].label}</a>`;
    }
    html += "</nav>";
    return html;
}

module.exports = { buildNavigation, renderNavigation };
