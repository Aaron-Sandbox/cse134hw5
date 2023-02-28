import {showCRUDDialog} from './crud-dialog.js';
import {showConfirmDialog} from './customdialog.js'

let postCount = 0;

function createPost(_e, data) {
    let node = document.getElementById('blogposts');
    
    let postContainer = document.createElement('section');
    let controlContainer = document.createElement('section');

    let title = document.createElement('h1');
    title.textContent = data.title;

    let date = document.createElement('h2');
    date.textContent = data.date;

    let summary = document.createElement('p');
    summary.textContent = data.summary;

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function (e) {
        showCRUDDialog(
            "Edit Post", 
            (__e, data) => { if (data) editPost(e, data); }, 
            () => {
                return {
                    title: title.textContent,
                    date: date.textContent,
                    summary: summary.textContent
                };
        })
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        showConfirmDialog("Are you sure you want to delete?", (_e, confirmed) => {
            if(confirmed) removePost(postContainer);
        })
    });

    controlContainer.append(editButton, deleteButton);
    postContainer.append(title, date, summary, controlContainer);

    node.append(postContainer);
    postCount++;
}

function editPost(e, data) {
    let editButton = e.target;
    let controlContainer = editButton.parentElement;
    let postContainer = controlContainer.parentElement;
    
    let title = postContainer.querySelector('h1');
    let date = postContainer.querySelector('h2');
    let summary = postContainer.querySelector('p');

    title.textContent = data.title;
    date.textContent = data.date;
    summary.textContent = data.summary;
}

function removePost(post) {
    post.remove();
    postCount--;
}


window.addEventListener('DOMContentLoaded', function () {
    let stored = [
        {title: "My First Blogpost", date: "2023-02-25", summary: "This is the text content of my first blogpost, which is about the creation of this CRUD application. Please enjoy reading!"}, 
        {title: "My Second Blogpost", date: "2023-02-26", summary: "This is the text content of my second blogpost, which is about the creation of this CRUD application. Please enjoy reading!"}, 
        {title: "My Third Blogpost", date: "2023-02-27", summary: "This is the text content of my third blogpost, which is about the creation of this CRUD application. Please enjoy reading!"}
    ];

    stored.forEach((blogpost) => createPost(null, blogpost));

    document.getElementById('add-post').addEventListener('click', function () {
        showCRUDDialog("Create Post", function (e, data) {
            if (data) createPost(e, data);
        })
    });
})