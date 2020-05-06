const fs = require("fs");
const showdown = require("showdown");
const converter = new showdown.Converter();

function renderFile(file) {
    const markdown = fs.readFileSync(file).toString();
    return converter.makeHtml(markdown);
}

module.exports = { renderFile };
