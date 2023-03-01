export function showAlertDialog (message) {
    const dialogMessage = document.querySelector('#alert-dialog > p');
    dialogMessage.textContent = message;

    const alertDialog = document.getElementById('alert-dialog');
    alertDialog.showModal();
}

export function showConfirmDialog (message, rsltHandler) {
    const dialogMessage = document.querySelector('#confirm-dialog > p');
    dialogMessage.textContent = message;

    const confirmDialog = document.getElementById('confirm-dialog');
    confirmDialog.showModal();
    confirmDialog.addEventListener('close', (e) => rsltHandler(e, confirmDialog.returnValue === "true"), {once: true});
}

export function showPromptDialog (prompt, rsltHandler) {
    const dialogMessage = document.querySelector('#prompt-dialog > p');
    dialogMessage.textContent = prompt;

    const promptDialog = document.getElementById('prompt-dialog');
    promptDialog.showModal();

    const form = document.querySelector('#prompt-dialog > form');
    promptDialog.addEventListener('close', (e) => {
        let response = new FormData(form).get('response');
        if(promptDialog.returnValue == 'OK') {
            rsltHandler(e, response);
        } else {
            rsltHandler(e, '');
        }
    }, {once: true});
}

export function sanitize_xss(strings, str) {
    return strings[0] + DOMPurify.sanitize(str);
}


