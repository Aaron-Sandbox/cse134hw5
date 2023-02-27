import {showCRUDDialog} from './crud-dialog.js';

function createPost(title, date, summary) {
    console.log(title, date, summary)
}

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add-post').addEventListener('click', function (e) {
        showCRUDDialog(e, "Create Post", (e, response) => {
            createPost(response.get('title'), response.get('date'), response.get('summary'))
        })
    });
})