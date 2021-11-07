const fs = require("fs");
const path = require("path");
const glob = require("glob");

async function getDirectories(basePath){
    let dirs = []
    const files = await fs.promises.readdir(basePath);
    for (const file of files) {
        const filePath = path.join(basePath, file);
        if ((await fs.promises.stat(filePath)).isDirectory()) {
            dirs = [...dirs, filePath];
        }
    }
    return dirs;
}

function cleanPaths(files, basePath){
    for (let i = 0; i < files.length; i++){
        files[i] = files[i].replace(basePath, "").replace(/\\|^[\/\\]/g, "").trim();
    }
}

function cleanPath(file, basePath){
    return file.replace(basePath, "").replace(/\\|^[\/\\]/g, "").trim();
}

async function buildNav(dir, basePath){
    let files = glob.sync(`${dir}/*.md`);
    let folders = await getDirectories(dir);
    let nav = [];
    const fileData = [];
    for (let i = 0; i < files.length; i++){
        const link = {
            label: files[i].replace(/.*[\/\\]|\.md$/g, "").replace(/\-/g, " ").trim(),
            slug: cleanPath(files[i], basePath),
            children: null,
        };
        fileData.push(link);
    }
    fileData.sort();
    let swapIndex = -1;
    for (let i = 0; i < fileData.length;i++){
        if (fileData[i].slug.indexOf("readme.md") !== -1 || fileData[i].slug.indexOf("introduciton.md") !== -1){
            swapIndex = i;
            break;
        }
    }
    if (swapIndex !== -1){
        const temp = fileData[swapIndex];
        fileData.splice(swapIndex, 1);
        fileData.splice(0, 0, temp);
    }
    const folderData = [];
    for (let i = 0; i < folders.length; i++){
        const childDirs = await getDirectories(folders[i]);
        const childFiles = glob.sync(`${path.join(folders[i])}/*.md`);
        if (childDirs.length || childFiles.length){
            const link = {
                label: folders[i].replace(/.*[\/\\]/, "").replace(/\-/g, " ").trim(),
                slug: cleanPath(folders[i], basePath),
                children: await buildNav(folders[i], basePath),
            };
            folderData.push(link);
        }
    }
    folderData.sort();
    nav = [...fileData, ...folderData];
    return nav;
}

module.exports = { getDirectories, cleanPaths, cleanPath, buildNav };