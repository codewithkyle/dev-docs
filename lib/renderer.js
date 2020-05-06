const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();
const path = require("path");

const htmlShell = path.resolve(__dirname, "../static/shell.html");
function renderFile(file) {
    const markdown = fs.readFileSync(file).toString();
    const html = converter.makeHtml(markdown);
    let shell = fs.readFileSync(htmlShell).toString();
    shell = shell.replace("REPLACE_WITH_HTML", html);
    return shell;
}

function renderNavigation(doc, nav) {
    const groups = {
        noGroupSinglePages: [],
    };
    for (let i = 0; i < nav.length; i++) {
        if (nav[i].headings.length) {
            const group = nav[i].headings[0];
            if (groups?.[group]) {
                groups[group].push(nav[i]);
            } else {
                groups[group] = [nav[i]];
            }
        } else {
            groups.noGroupSinglePages.push(nav[i]);
        }
    }
    let html = "<nav>";
    for (let [heading, links] of Object.entries(groups)) {
        if (heading !== "noGroupSinglePages") {
            html += `<header>${heading}</header>`;
        } else {
            html += `<header>Documents</header>`;
        }
        for (let i = 0; i < links.length; i++) {
            html += `<a href="${links[i].slug}"><span>${links[i].label}</span></a>`;
        }
    }
    html += "</nav>";
    doc = doc.replace("REPLACE_WITH_NAVIGATION", html);
    return doc;
}

module.exports = { renderFile, renderNavigation };
