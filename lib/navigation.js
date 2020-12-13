const glob = require("glob");
const path = require("path");
const fs = require("fs");

function buildNavigation(docsDir) {
    const files = glob.sync(`${docsDir}/**/*.md`);
    const nav = [];
    let customReadme = false;
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
            .replace(/(\s+)|(\-+)/gi, " ")
            .replace(/(.*[\/\\])|(\.md)/gi, "");
        const groups =
            files[i]
                .replace(/.*docs[\\\/]/gi, "")
                .match(/.*(?=[\\\/])/gi)?.[0]
                ?.replace(/(\s+)|(\-+)/gi, " ")
                ?.replace(/\\/gi, "/")
                ?.split("/") ?? [];

        if (label === "readme"){
            customReadme = true;
        }
        nav.push({
            label: label,
            headings: groups,
            slug: `/${encodeURI(slug)}`,
            file: files[i],
        });
    }
    if (!customReadme){
        const projectReadme = path.join(process.cwd(), "readme.md");
        if (fs.existsSync(projectReadme)){
            nav.push({
                label: "readme",
                headings: [],
                slug: `/readme`,
                file: projectReadme,
            });
        }
    }
    return nav;
}

module.exports = { buildNavigation };
