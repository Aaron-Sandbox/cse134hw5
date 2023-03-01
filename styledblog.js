import {showCRUDDialog} from './crud-dialog.js';
import {showConfirmDialog} from './customdialog.js';

const LOCAL_STORAGE_KEY = "blogposts";
let postCount = 0;

function createPost(_e, data) {
    let node = document.getElementById('blogposts');

    let noPostsMessage = node.querySelector('#blogposts > p');
    if(noPostsMessage) {
        noPostsMessage.remove();
    }
    
    let postContainer = document.createElement('section');
    let controlContainer = document.createElement('section');

    let title = document.createElement('h1');
    title.textContent = data.title;

    let date = document.createElement('h2');
    date.textContent = data.date;

    let summary = document.createElement('p');
    summary.textContent = data.summary;

    let editButton = document.createElement('button');
    const editIcon = `<svg class="icon"><use xlink:href="/media/icons/solid.svg#pencil"></use></svg>`;
    editButton.innerHTML = editIcon;
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
    const deleteIcon = `<svg class="icon"><use xlink:href="/media/icons/solid.svg#trash-can"></use></svg>`;
    deleteButton.innerHTML = deleteIcon;
    deleteButton.addEventListener('click', function () {
        showConfirmDialog("Are you sure you want to delete?", (_e, confirmed) => {
            if(confirmed) removePost(postContainer);
        })
    });

    controlContainer.append(editButton, deleteButton);
    postContainer.append(title, date, summary, controlContainer);

    node.append(postContainer);
    postCount++;

    updateLocalStorage()
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

    updateLocalStorage()
}

function removePost(post) {
    post.remove();
    postCount--;

    if(!postCount) {
        let node = document.getElementById('blogposts');
        let noPosts = document.createElement('p');
        noPosts.textContent = "No posts to show!";
        node.appendChild(noPosts);
    }

    updateLocalStorage();
}

function updateLocalStorage() {
    let blogposts = [];
    let node = document.getElementById('blogposts');
    let postContainers = node.querySelectorAll('#blogposts > section');

    postContainers.forEach((element) => {
        let title = element.querySelector('h1');
        let date = element.querySelector('h2');
        let summary = element.querySelector('p');

        blogposts.push({
            title: title.textContent,
            date: date.textContent,
            summary: summary.textContent
        });
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogposts));
    console.log(localStorage.getItem(LOCAL_STORAGE_KEY));

}

window.addEventListener('DOMContentLoaded', function () {
    let stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if(!stored) {
        stored = [
            {title: "My First Blogpost", date: "2023-02-25", summary: "This is the text content of my first blogpost, which is about the creation of this CRUD application. Please enjoy reading!"}, 
            {title: "My Second Blogpost", date: "2023-02-26", summary: "This is the text content of my second blogpost, which is about the creation of this CRUD application. Please enjoy reading!"}, 
            {title: "My Third Blogpost", date: "2023-02-27", summary: "This is the text content of my third blogpost, which is about the creation of this CRUD application. Please enjoy reading!"}
        ];
    }
    stored.forEach((blogpost) => createPost(null, blogpost));

    document.getElementById('add-post').addEventListener('click', function () {
        showCRUDDialog("Create Post", function (e, data) {
            if (data) createPost(e, data);
        })
    });
})