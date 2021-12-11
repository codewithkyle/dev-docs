class SuperComponent extends HTMLElement {
    model;
    data;
    state;
    stateMachine;
    constructor() {
        super();
        this.model = {};
        this.data = this.model;
        this.state = "INACTIVE";
        this.stateMachine = {};
    }
    snapshot() {
        const snapshot = {
            state: this.state,
            model: this.get(),
        };
        return snapshot;
    }
    debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback.apply(null, args);
            }, wait);
        };
    };
    debounceRender = this.debounce(this.render.bind(this), 80);
    debounceUpdate = this.debounce(this.updated.bind(this), 80);
    /**
     * @deprecated Use `this.set()` instead. Will be removed in next major release.
     */
    update(model, skipRender = false) {
        // @ts-ignore
        this.set(model, skipRender);
    }
    set(model, skipRender = false) {
        this.model = Object.assign(this.model, model);
        this.data = this.model;
        if (!skipRender) {
            this.debounceRender();
        }
        this.debounceUpdate();
    }
    get() {
        return { ...this.model };
    }
    trigger(trigger) {
        this.state = this.stateMachine?.[this.state]?.[trigger] ?? "ERROR";
        this.debounceRender();
        this.debounceUpdate();
    }
    render() { }
    updated() { }
    connected() { }
    connectedCallback() {
        this.connected();
    }
    disconnected() { }
    disconnectedCallback() {
        this.disconnected();
    }
}

export default SuperComponent;
