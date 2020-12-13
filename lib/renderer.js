const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();
const path = require("path");

const htmlShell = path.resolve(__dirname, "../static/shell.html");

function renderFile(file, name, projectDetails = null) {
    const markdown = fs.readFileSync(file).toString();
    const html = converter.makeHtml(markdown);
    let shell = fs.readFileSync(htmlShell).toString();
    let title = name;
    if (projectDetails?.name){
        title = `${projectDetails.name} - ${name}`;
    }
    const normalizeCSS = fs.readFileSync(path.resolve(__dirname, "../static/normalize.css")).toString();
    const resetCSS = fs.readFileSync(path.resolve(__dirname, "../static/reset.css")).toString();
    const baseCSS = fs.readFileSync(path.resolve(__dirname, "../static/base.css")).toString();
    const brixiCSS = fs.readFileSync(path.resolve(__dirname, "../static/brixi.css")).toString();
    const prismCSS = fs.readFileSync(path.resolve(__dirname, "../static/prism.css")).toString();
    shell = shell
                .replace("REPLACE_WITH_HTML", html)
                .replace("REPLACE_WITH_NAME", title)
                .replace("REPLACE_WITH_NORMALIZE", normalizeCSS)
                .replace("REPLACE_WITH_RESET", resetCSS)
                .replace("REPLACE_WITH_BRIXI", brixiCSS)
                .replace("REPLACE_WITH_BASE", baseCSS)
                .replace("REPLACE_WITH_PRISM", prismCSS);
    return shell;
}

function renderNavigation(doc, nav, projectDetails) {
    const groups = {
        noGroupSinglePages: [],
    };
    for (let i = 0; i < nav.length; i++) {
        if (nav[i].headings.length) {
            let group = nav[i].headings[0];
            if (nav[i].headings.length >= 2) {
                group += ` - ${nav[i].headings[1]}`;
            }
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
    if (projectDetails) {
        if (projectDetails?.name) {
            html += `<a href="/" class="project-name">${projectDetails.name}</a>`;
        }
        if (projectDetails?.links && Array.isArray(projectDetails.links)) {
            for (let i = 0; i < projectDetails.links.length; i++) {
                const link = projectDetails.links[i];
                if (link?.label && link?.url) {
                    html += `<a href="${link.url}"><span>${link.label}</span></a>`;
                }
            }
        }
    }
    for (let [heading, links] of Object.entries(groups)) {
        if (heading !== "noGroupSinglePages") {
            html += `<header>${heading}</header>`;
        } else {
            html += `<header>Documents</header>`;
        }
        for (let i = 0; i < links.length; i++) {
            if (links[i].slug !== "/readme" || links[i].slug === "/readme" && !projectDetails?.name){
                html += `<a href="${links[i].slug}" data-slug="${links[i].slug}"><span>${links[i].label}</span></a>`;
            }
        }
    }
    html += "</nav>";
    doc = doc.replace("REPLACE_WITH_NAVIGATION", html);
    return doc;
}

module.exports = { renderFile, renderNavigation };
