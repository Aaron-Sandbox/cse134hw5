window.addEventListener('DOMContentLoaded', init);

function init() {
    const form = document.querySelector('form');

    document.getElementById('postBtn').addEventListener('click', async () => {
        let formBody = formatForm(form);
        handleRequest(new Request('https://httpbin.org/post', 
        {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': formBody.toString().length
            }
        }));
    });

    document.getElementById('getBtn').addEventListener('click', async () => {
        let formBody = formatForm(form);

        handleRequest(new Request(`https://httpbin.org/get?${formBody.toString()}`,
            {
                method: 'GET'
            }
        ));
    });

    document.getElementById('putBtn').addEventListener('click', async () => {
        let formBody = formatForm(form);
        handleRequest(new Request('https://httpbin.org/put', 
        {
            method: 'PUT',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': formBody.toString().length
            }
        }));
    });

    document.getElementById('deleteBtn').addEventListener('click', () => {
        let formBody = formatForm(form);
        handleRequest(new Request(`https://httpbin.org/delete?${formBody.toString()}`,
            {
                method: 'DELETE'
            }
        ));
    });
}

async function handleRequest(request) {
    fetch(request)
    .then(response => response.json())
    .then(data => displayOutput(data))
    .catch(error => console.log(error));
}

function formatForm(form) {
    let formData = new FormData(form);
    formData.set('date', new Date());
    return new URLSearchParams(formData);
}

function codeBlock(_strings, html) {
    return '<pre>' + html + '</pre>';
}

function displayOutput(output) {
    const outputEl = document.querySelector('#response');
    outputEl.innerHTML = codeBlock`${JSON.stringify(output, null, 2)}`;
}