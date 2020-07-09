#!/usr/bin/env node

const path = require("path");
const semver = require("semver");
const glob = require("glob");

/** Verify Nodejs version */
const packageJson = require(path.join(__dirname, "package.json"));
const version = packageJson.engines.node;
if (!semver.satisfies(process.version, version)) {
    const rawVersion = version.replace(/[^\d\.]*/, "");
    console.log(`Dev Docs requires at least Node v${rawVersion} and you're using Node ${process.version}`);
    process.exit(1);
}

const yargs = require("yargs").argv;
const mode = yargs?.o ? 0 : 1;

function toUpper(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
}

if (mode) {
    const Server = require("./server");
    new Server();
} else {
    const cwd = process.cwd();
    const fs = require("fs");
    const path = require("path");

    const output = path.resolve(cwd, yargs.o);
    if (fs.existsSync(output)) {
        fs.rmdirSync(output, { recursive: true });
    }
    fs.mkdirSync(output);

    const cname = yargs?.c || null;
    if (cname) {
        const cnameFile = path.resolve(cwd, cname);
        if (fs.existsSync(cnameFile)) {
            fs.copyFileSync(cnameFile, path.join(output, "CNAME"));
        }
    }

    const projectPackage = require(path.join(process.cwd(), "package.json"));
    const projectDetails = projectPackage?.devDocs || null;
    const docs = path.resolve(cwd, "docs");
    const navUtil = require("./lib/navigation");
    const nav = navUtil.buildNavigation(docs);
    const renderer = require("./lib/renderer");

    for (let i = 0; i < nav.length; i++) {
        const outputFilePath = path.join(output, nav[i].slug);
        fs.mkdirSync(outputFilePath, { recursive: true });

        let doc = renderer.renderFile(nav[i].file, toUpper(nav[i].label));
        doc = renderer.renderNavigation(doc, nav, projectDetails);
        fs.writeFileSync(path.join(outputFilePath, "index.html"), doc);

        if (nav[i].slug === "/readme") {
            fs.writeFileSync(path.join(output, "index.html"), doc);
        }
    }

    const staticCSSFiles = glob.sync(path.join(__dirname, "static", "*.css"));
    for (let i = 0; i < staticCSSFiles.length; i++) {
        const filename = staticCSSFiles[i].replace(/.*[\/\\]/g, "");
        fs.copyFileSync(staticCSSFiles[i], path.join(output, filename));
    }

    const staticJSFiles = glob.sync(path.join(__dirname, "static", "*.js"));
    for (let i = 0; i < staticJSFiles.length; i++) {
        const filename = staticJSFiles[i].replace(/.*[\/\\]/g, "");
        fs.copyFileSync(staticJSFiles[i], path.join(output, filename));
    }
}
