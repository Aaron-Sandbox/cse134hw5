export function showCRUDDialog(title, rsltHandler, prefill=null) {
    const dialog = document.getElementById('crud-dialog');
    const dialogTitle = dialog.querySelector('h1');
    const form = dialog.querySelector('form');
    form.reset();

    if(prefill) {
        let prefillFields = prefill();
        form.querySelector('#title').value = prefillFields.title;
        form.querySelector('#date').value = prefillFields.date;
        form.querySelector('#summary').value = prefillFields.summary;
    }
    
    dialogTitle.textContent = title;
    dialog.showModal();

    dialog.addEventListener('close', (e) => {
        if(dialog.returnValue == "save") {
            let data = new FormData(form);
            rsltHandler(e, {
                title: data.get('title'), 
                date: data.get('date'), 
                summary: data.get('summary')
            });
        } else {
            rsltHandler(e, null);
        }
        
    }, {once: true});
}