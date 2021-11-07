const express = require('express');
const fs = require("fs");
const path = require("path");
const { buildNav } = require("./utils");
const cwd = process.cwd();
const { renderPage } = require("./render");

class Server{
    constructor(port, source, projectDetails){
        this.details = projectDetails;
        this.app = express();
        this.port = parseInt(port);
        this.publicDir = path.resolve(__dirname, "../public");
        this.docsDir = path.join(cwd, source);
        this.init();
    }
    
    init(){
        this.app.use('/static', express.static(path.resolve(__dirname, '../public/static')));
        this.app.use('/js', express.static(path.resolve(__dirname, '../public/js')));
        this.app.use('/css', express.static(path.resolve(__dirname, '../public/css')));

        this.app.get('/', (req, res) => {
            const html = renderPage(this.details.name, this.details.description, this.details.keywords, this.details.github, this.details.bugs, this.details.npm, this.details.version);
            return res.status(200).send(html);
        });
        
        this.app.get('/api/navigation.json', async (req, res) => {
            const data = await buildNav(this.docsDir, this.docsDir);
            return res.status(200).json(data);
        });
        
        this.app.get('/doc/*', async (req, res) => {
            const slug = req.path.replace("/doc/", "").trim();
            const file = path.join(this.docsDir, `${slug}.md`);
            if (fs.existsSync(file)){
                return res.status(200).sendFile(file);
            } else {
                return res.status(404).send("# 404\nThis page does not exist.");
            }
        });
        
        this.app.get("/*", async (req, res) => {
            const FileCheck = new RegExp(/\.{2,4}$/);
            if (FileCheck.test(req.path)){
                const file = path.join(this.docsDir, req.path);
                if (fs.existsSync(file)){
                    res.status(200).sendFile(file);    
                } else {
                    res.status(404);
                }
            } else {
                const html = renderPage(this.details.name, this.details.description, this.details.keywords, this.details.github, this.details.bugs, this.details.npm, this.details.version);
                return res.status(200).send(html);
            }
        });
        
        this.app.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`);
        });
    }
}
module.exports = Server;
