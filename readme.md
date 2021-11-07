# Dev Docs

Dev Docs is a simple markdown based documentation management tool. Simply create markdown files within the generated `docs/` directory and run the `docs` command. No hassle, no fuss, just documentation in a minimalist style.

### Features

-   Dynamically generated navigation structure
-   Group documents via directories
-   No configuration required
-   Light & dark theme

## Installation

Install the npm packages

```sh
npm i -D @codewithkyle/dev-docs
```

Add the startup script to your `package.json` file

```json
"docs": "docs"
```

Run the script

```sh
npm run docs
```

## Flags

```sh
    -o ./directory # Output as HTML
    -c ./file # CNAME file path (optional)
    -f ./file # Favicon file path (optional)
    -p 5000 # Set the documentation server port (optional)
```

## Writing Documentation

Create new documents by adding markdown files to the `docs/` directory. You can group several documents under a custom header by placing the files together within a subdirectory.

## External Navigation Links

Add custom external navigation links to the dynamically generated navigation structure.

```json
"devDocs": {
    "name": "Project Name",
    "description": "Project description used for pages meta description element",
    "links": [
        {
            "label": "GitHub Link",
            "url": "https://github.com/"
        },
        {
            "label": "NPM Link",
            "url": "https://npmjs.com/"
        }
    ]
}
```

## GitHub Actions Integration

Install the [gh-pages](https://www.npmjs.com/package/gh-pages) package and create a `nodejs.yml` file within the `.github/workflows/` directory.

```yml
name: Build and Deploy
on:
    push:
        branches:
            - master
jobs:
    build-and-deploy:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@master

            - name: Setup Node and NPM
              uses: actions/setup-node@v1
              with:
                  node-version: 14.2.0

            - name: Install NPM Packages
              run: npm ci

            - name: Build
              run: npm run predeploy

            - name: Deploy
              run: npm run deploy
              env:
                  ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

Create the NPM scripts:

```json
"predeploy": "docs -o ./public",
"deploy": "node ./deploy.js"
```

Create the `deploy.js` script.

```javascript
const ghPages = require("gh-pages");

const NAME = "Your Name";
const EMAIL = "Email";
const USERNAME = "github-username";
const PROJECT = "github-project-name";

ghPages.publish(
    "public",
    {
        user: {
            name: NAME,
            email: EMAIL,
        },
        repo: "https://" + process.env.ACCESS_TOKEN + "@github.com/" + USERNAME + "/" + PROJECT + ".git",
        silent: true,
    },
    (error) => {
        if (error) {
            console.log(error);
        }
    }
);
```

To finish adding GitHub Action automated deployment generate a personal access token and add it as a project secret named `ACCESS_TOKEN`

1. Go to your GitHub profile settings
1. Click on Developer Settings
1. Click on Person Access Tokens
1. Generate a new token with `repo` checked
1. Copy token
1. Go to project settings
1. Click on Secrets
1. Add a new secret named `ACCESS_TOKEN`
