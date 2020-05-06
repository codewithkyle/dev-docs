# Dev Docs

Dev Docs is a simple markdown based documentation management tool created by [Kyle Andrews](https://kyleandrews.dev/). Simply create markdown files within the generated `docs/` directory and run the `docs` command. No hassle, no fuss, just documentation in a minimalist style.

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

## Writing Documentation

Create new documents by adding markdown files to the `docs/` directory. You can group several documents under a custom header place them together within a subdirectory.
