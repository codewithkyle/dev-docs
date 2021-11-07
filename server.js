const fs = require("fs");
const path = require("path");
const express = require("express");
const watch = require("watch");
const boxen = require("boxen");
const yargs = require("yargs").argv;

const cwd = process.cwd();
const packageJson = require(path.join(cwd, "package.json"));

class Server {
    constructor() {
        this.app = express();
        this.port = yargs?.p || yargs?.port || 5000;
        this.interfaces = require("os").networkInterfaces();

        this.docs = path.join(cwd, "docs");
        this.readme = path.join(this.docs, "readme.md");
        this.normalizeCssPath = path.resolve(cwd, "node_modules/normalize.css/normalize.css");
        this.navUtil = require("./lib/navigation");
        this.nav = this.navUtil.buildNavigation(this.docs);
        this.renderer = require("./lib/renderer");
        this.projectDetails = packageJson?.devDocs || null;
        this.projectName = this.projectDetails?.name || "Documentation";

        this.init();
        this.startServer();
        this.watch();
    }

    init() {
        if (!fs.existsSync(this.docs)) {
            fs.mkdirSync(this.docs);
        }

        if (!fs.existsSync(this.readme)) {
            this.readme = path.join(cwd, "readme.md");
            if (!fs.existsSync(this.readme)){
                fs.writeFileSync(path.join(this.docs, "readme.md"), "Start Here");
                this.readme = path.join(this.docs, "readme.md");
            }
        }

        if (!fs.existsSync(path.join(__dirname, "static", "normalize.css"))) {
            fs.copyFileSync(this.normalizeCssPath, path.join(__dirname, "static", "normalize.css"));
        }
    }

    watch() {
        watch.createMonitor(this.docs, (monitor) => {
            monitor.on("created", () => {
                this.nav = this.navUtil.buildNavigation(this.docs);
            });
            monitor.on("removed", () => {
                this.nav = this.navUtil.buildNavigation(this.docs);
            });
        });
    }

    startServer() {
        try {
            this.app.listen(this.port, () => {
                let message = "";
                message += `Local: http://localhost:${this.port}\n`;
                message += `Network: http://${this.getNetworkAddress()}:${this.port}`;
                console.log(
                    boxen(message, {
                        padding: 1,
                        borderColor: "green",
                        margin: 1,
                    })
                );
            });
        } catch {
            console.error(`Port ${this.port} was taken, trying port ${this.port + 1}`);
            this.port++;
            this.startServer();
            return;
        }

        this.app.use(express.static(path.join(__dirname, "static")));

        this.app.get("/", (req, res) => {
            if (this.readme){
                let doc = this.renderer.renderFile(this.readme, this.projectName);
                doc = this.renderer.renderNavigation(doc, this.nav, this.projectDetails);
                res.send(doc);
            } else {
                res.status(404).send("404 | Document Not Found");
            }
        });

        this.app.get("/*", (req, res) => {
            const slug = decodeURI(req.url);
            let file = null;
            for (let i = 0; i < this.nav.length; i++) {
                if (this.nav[i].slug === slug) {
                    file = this.nav[i].file;
                    break;
                }
            }
            if (file) {
                let doc = this.renderer.renderFile(file, this.projectName);
                doc = this.renderer.renderNavigation(doc, this.nav, this.projectDetails);
                res.send(doc);
            } else {
                res.status(404).send("404 | Document Not Found");
            }
        });
    }

    getNetworkAddress() {
        for (const name of Object.keys(this.interfaces)) {
            for (const iface of this.interfaces[name]) {
                const { address, family, internal } = iface;
                if (family === "IPv4" && !internal) {
                    return address;
                }
            }
        }
    }
}
module.exports = Server;
