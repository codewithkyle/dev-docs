type DelayedPromises = {
    [uid:string]: {
        resolve: Function,
        reject: Function,
    }
}
class MarkdownRenderer {
    private promises: DelayedPromises;
    private worker: Worker;
    private messageId:number;

    constructor(){
        this.worker = new Worker('/js/markdown-worker.js');
        this.worker.onmessage = this.inbox.bind(this);
        this.messageId = 0;
        this.promises = {};
    }

    private inbox(e){
        const { id, html, type, error } = e.data;
        if (id in this.promises){
            if (type === "error"){
                this.promises[id].reject(error);
            } else {
                this.promises[id].resolve(html);
            }
            delete this.promises[id];
        }
    }

    stashMessageCallback(messageId, resolve, reject){
        this.promises[`${messageId}`] = {
            resolve: resolve,
            reject: reject,
        };
    }

    private sendDataToWorker(data, resolve, reject = () => {}){
        this.messageId++;
        this.stashMessageCallback(this.messageId, resolve, reject);
        this.worker.postMessage({
            id: this.messageId,
            markdown: data,
        });
    }

    public renderMarkdown(markdown:string):Promise<string>{
        return new Promise((resolve, reject) => {
            this.sendDataToWorker(markdown, resolve, reject);
        });
    }
}
const renderer = new MarkdownRenderer();
const renderMarkdown = renderer.renderMarkdown.bind(renderer);
export { renderMarkdown };