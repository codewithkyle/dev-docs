import { message } from "@codewithkyle/messaging";

export function navigate(slug) {
    window.history.pushState(null, null, `/${slug.replace(/^\/|\/$|\.md$/gi, "")}`);
    message({
        recipient: "renderer",
        data: {
            slug: slug,
        },
    });
    message({
        recipient: "navigation",
        data: {
            slug: slug,
        },
    });
}