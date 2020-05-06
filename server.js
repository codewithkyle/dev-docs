#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const semver = require("semver");
const express = require("express");
const watch = require("watch");
const os = require("os");
const boxen = require("boxen");

const cwd = process.cwd();
const interfaces = os.networkInterfaces();

/** Verify Nodejs version */
const packageJson = require(path.join(__dirname, "package.json"));
const version = packageJson.engines.node;
if (!semver.satisfies(process.version, version)) {
    const rawVersion = version.replace(/[^\d\.]*/, "");
    console.log(`Dev Docs requires at least Node v${rawVersion} and you're using Node ${process.version}`);
    process.exit(1);
}

const getNetworkAddress = () => {
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            const { address, family, internal } = interface;
            if (family === "IPv4" && !internal) {
                return address;
            }
        }
    }
};

const app = express();
let port = 5000;
function startServer() {
    try {
        app.listen(port, () => {
            let message = "";
            message += `Local: http://localhost:${port}\n`;
            message += `Network: http://${getNetworkAddress()}:${port}`;
            console.log(
                boxen(message, {
                    padding: 1,
                    borderColor: "green",
                    margin: 1,
                })
            );
        });
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

const normalizeCssPath = path.resolve(cwd, "node_modules/normalize.css/normalize.css");
if (!fs.existsSync(path.join(__dirname, "static", "normalize.css"))) {
    fs.copyFileSync(normalizeCssPath, path.join(__dirname, "static", "normalize.css"));
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

app.use(express.static(path.join(__dirname, "static")));

const renderer = require("./lib/renderer");

app.get("/", function (req, res) {
    let doc = renderer.renderFile(readme);
    doc = renderer.renderNavigation(doc, nav);
    res.send(doc);
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
        let doc = renderer.renderFile(file);
        doc = renderer.renderNavigation(doc, nav);
        res.send(doc);
    } else {
        res.status(404).send("404 | Document Not Found");
    }
});
