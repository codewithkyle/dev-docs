#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const semver = require("semver");
const express = require("express");
const watch = require("watch");

const cwd = process.cwd();

/** Verify Nodejs version */
const packageJson = require(path.join(__dirname, "package.json"));
const version = packageJson.engines.node;
if (!semver.satisfies(process.version, version)) {
    const rawVersion = version.replace(/[^\d\.]*/, "");
    console.log(`Dev Docs requires at least Node v${rawVersion} and you're using Node ${process.version}`);
    process.exit(1);
}

const app = express();
let port = 5000;
function startServer() {
    try {
        app.listen(port, () => console.log(`Preview Docs at http://localhost:${port}`));
    } catch {
        console.error(`Port ${port} was taken, trying port ${port + 1}`);
        port++;
        startServer();
    }
}
startServer();

const docs = path.join(cwd, "docs");
if (!fs.existsSync(docs)) {
    fs.mkdirSync(docs);
}

const readme = path.join(docs, "readme.md");
if (!fs.existsSync(readme)) {
    fs.writeFileSync(readme, "Start here");
    fs.copyFileSync(path.join(__dirname, "readme.example"), readme);
}

const navUtil = require("./lib/navigation");
let nav = navUtil.buildNavigation(docs);

watch.createMonitor(docs, (monitor) => {
    monitor.on("created", () => {
        nav = navUtil.buildNavigation(docs);
    });
    monitor.on("removed", () => {
        nav = navUtil.buildNavigation(docs);
    });
});

const renderer = require("./lib/renderer");
app.get("/", function (req, res) {
    res.send("Homepage");
});

app.get("/*", function (req, res) {
    const slug = decodeURI(req.url);
    let file = null;
    for (let i = 0; i < nav.length; i++) {
        if (nav[i].slug === slug) {
            file = nav[i].file;
            break;
        }
    }
    if (file) {
        res.send(renderer.renderFile(file));
    } else {
        res.status(404).send("404 | Document Not Found");
    }
});
