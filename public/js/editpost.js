const editPost = async (event) => {
    event.preventDefault();
    console.log("edit post clicked");
    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-text').value.trim();
    console.log(title);
    console.log(content);

    if (title && content) {
        const editPost = await fetch('/api/posts', {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("post edited" + editPost)
        if (newPost.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post!')
        }
    }
};

document.querySelector('#edit-post-submit').addEventListener('click', editPost);