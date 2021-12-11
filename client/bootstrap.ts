import { message } from "@codewithkyle/messaging";
import "./static-components.js";

import Navigation from "./nav";
customElements.define("navigation-component", Navigation);

import View from "./view";
customElements.define("doc-view", View);

import Subnav from "./subnav";
customElements.define("subnav-component", Subnav);

if (location.pathname === "/") {
    message({
        recipient: "renderer",
        data: {
            slug: "readme",
            origin: "fs",
        },
    });
} else {
    const route = location.pathname.replace(/^\//, "");
    message({
        recipient: "renderer",
        data: {
            slug: route,
            origin: "fs",
        },
    });
}
