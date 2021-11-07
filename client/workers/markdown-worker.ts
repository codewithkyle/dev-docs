importScripts("/static/marked.js");

onmessage = (e) => {
  const { id, markdown } = e.data;
  let output = {
    id: id,
    type: "success",
    html: "",
    error: "",
  };
  try {
    // @ts-ignore
    output.html = marked(markdown);
  } catch (e) {
    output.error = e;
    output.type = "error";
  }
  // @ts-ignore
  postMessage(output);
};