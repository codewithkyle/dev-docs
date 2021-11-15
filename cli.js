#!/usr/bin/env node

const path = require("path");
const semver = require("semver");
const cwd = process.cwd();

/** Verify Nodejs version */
const packageJson = require(path.join(__dirname, "package.json"));
const version = packageJson.engines.node;
if (!semver.satisfies(process.version, version)) {
    const rawVersion = version.replace(/[^\d\.]*/, "");
    console.log(`Dev Docs requires at least Node v${rawVersion} and you're using Node ${process.version}`);
    process.exit(1);
}

const yargs = require("yargs").argv;
const output =  yargs?.o || yargs?.output || null;
const isLive = output ? false : true;
const src = yargs?.s || yargs?.src || "./docs";
const port = yargs?.p || yargs?.port || 5000;
const cname = yargs?.c || yargs?.cname || null;
let favicon = yargs?.f || yargs?.favicon || null;

(async () => {
    if (isLive) {
        const details = getDetails();
        const Server = require("./server/server.js");
        new Server(port, src, details);
    } else {
        const { buildNav } = require("./server/utils");
        const glob = require("glob");
        const { marked } = require('marked');
        const fs = require("fs");
        const { renderStaticPage } = require("./server/render");
    
        if (fs.existsSync(output)) {
            fs.rmdirSync(output, { recursive: true });
        }
        fs.mkdirSync(output);
    
        if (cname) {
            const cnameFile = path.resolve(cwd, cname);
            if (fs.existsSync(cnameFile)) {
                fs.copyFileSync(cnameFile, path.join(output, "CNAME"));
            } else {
                console.warn(`Error: ${cnameFile} does not exist`);
                process.exit(1);
            }
        } else {
            console.warn(`Error: a cname file is required. See https://github.com/codewithkyle/dev-docs#flags`);
            process.exit(1);
        }
    
        if (favicon){
            const faviconFile = path.resolve(cwd, favicon);
            favicon = faviconFile.replace(/.*[\\\/]/, "").trim();
            if (fs.existsSync(faviconFile)){
                fs.copyFileSync(faviconFile, path.join(output, favicon));
            } else {
                console.warn(`Warning: ${faviconFile} does not exist`);
            }
        }
    
        const details = getDetails();
        const basePath = path.join(cwd, src).replace(/[\/\\]$/, "");
        const nav = await buildNav(basePath, basePath);
        fs.mkdirSync(path.join(output, "api"));
        fs.writeFileSync(path.join(output, "api", "navigation.json"), JSON.stringify(nav));

        const files = glob.sync(`${basePath}/**/*.md`);
        files.forEach(file => {
            const raw = fs.readFileSync(file, { encoding: "utf-8"});
            const docHTML = marked.parse(raw);
            const slug = file.replace(basePath, "").replace(/(\.md)$/, "").replace(/[\\\/]/, "");
            const html = renderStaticPage(details.name, details.description, details.keywords, details.github, details.bugs, details.npm, details.version, docHTML, nav, favicon, slug);
            const outFile = file.replace(basePath, "").replace(/(\.md)$/i, ".html");
            const outDir = path.join(output, outFile.match(/.*[\\\/]/)[0]);
            if (!fs.existsSync(outDir)){
                fs.mkdirSync(outDir, { recursive: true });
            }
            fs.writeFileSync(path.join(output, outFile), html);
        });

        const cssFiles = glob.sync(`${__dirname}/public/css/*.css`);
        fs.mkdirSync(path.join(output, "css"));
        cssFiles.forEach(file => {
            const outFile = file.replace(path.join(__dirname, "public"), "");
            fs.copyFileSync(file, path.join(output, outFile));
        });

        const jsFiles = glob.sync(`${__dirname}/public/js/*.js`);
        fs.mkdirSync(path.join(output, "js"));
        jsFiles.forEach(file => {
            const outFile = file.replace(path.join(__dirname, "public"), "");
            fs.copyFileSync(file, path.join(output, outFile));
        });

        const staticFiles = glob.sync(`${__dirname}/public/static/*`);
        fs.mkdirSync(path.join(output, "static"));
        staticFiles.forEach(file => {
            const outFile = file.replace(path.join(__dirname, "public"), "");
            fs.copyFileSync(file, path.join(output, outFile));
        });

        const readme = path.join(output, "readme.html");
        const intro = path.join(output, "introduction.html");
        if (fs.existsSync(readme)){
            fs.copyFileSync(readme, path.join(output, "index.html"));
        }
        else if (fs.existsSync(intro)){
            fs.copyFileSync(intro, path.join(output, "index.html"));
        }
    }
})();

function getDetails(){
    const projectPackage = require(path.join(cwd, "package.json"));
    const projectDetails = projectPackage?.docs || {};
    const details = {
        name: "Documentation",
        description: "",
        github: null,
        bugs: null,
        version: null,
        npm: null,
        keywords: [],
    };

    // Map project details
    if (projectPackage?.name){
        details.name = projectPackage.name;
    }
    if (projectPackage?.description){
        details.description = projectPackage.description;
    }
    if (projectPackage?.bugs?.url){
        details.bugs = projectPackage.bugs.url;
    }
    if (projectPackage?.keywords){
        details.keywords = projectPackage.keywords;
    }
    if (projectPackage?.version){
        details.version = projectPackage.version;
    }

    // Map custom details
    if (projectDetails?.github){
        details.github = projectDetails.github;
    }
    if (projectDetails?.npm){
        details.npm = projectDetails.npm;
    }
    if (projectDetails?.name){
        details.name = projectDetails.name;
    }
    if (projectDetails?.description){
        details.description = projectDetails.description;
    }

    return details;
}