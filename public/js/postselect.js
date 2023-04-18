
const selectPost = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#post-select').value.trim();
    console.log(id);

    if (id) {
        const getPost = await fetch('/api/editpost', {
            method: 'GET',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(getPost.ok) {
            console.log('good!');
        }
    }
};

document.querySelector('#post-select').addEventListener('click', selectPost);