const glob = require("glob");

function buildNavigation(docsDir) {
    const files = glob.sync(`${docsDir}/**/*.md`);
    const nav = [];
    for (let i = 0; i < files.length; i++) {
        const slug = files[i]
            .toLowerCase()
            .trim()
            .replace(/(.*[\/\\])|(\.md)/gi, "")
            .replace(/\s+/gi, "-")
            .replace(/\\/gi, "/");
        const label = files[i]
            .toLowerCase()
            .trim()
            .replace(/\s+/gi, " ")
            .replace(/(.*[\/\\])|(\.md)/gi, "");
        const group = files[i]
            .replace(/.*docs[\\\/]/gi, "")
            .match(/.*(?=[\\\/])/gi)?.[0]
            ?.replace(/\s+/gi, "-");
        nav.push({
            label: label,
            group: group,
            slug: `/${slug}`,
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
