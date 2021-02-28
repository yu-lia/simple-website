
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    message1.textContent = "Please wait. I'm talking to my people";
    message2.textContent = '';

    fetch('/weatherRoute?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
                message2.textContent = '';
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }       
        });
    });
});