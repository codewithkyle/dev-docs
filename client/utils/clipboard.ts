const clipboardInput = document.querySelector("#clipboard-input") as HTMLInputElement;
export async function copyToClipboard(value:any){
    try{
        await navigator.clipboard.writeText(value);
    } catch (e) {
        clipboardInput.value = value;
        clipboardInput.select();
        document.execCommand("copy");
        clipboardInput.blur();
    }
}