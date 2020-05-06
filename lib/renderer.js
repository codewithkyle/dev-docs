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

module.exports = { renderFile };
