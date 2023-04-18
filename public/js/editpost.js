const editPost = async (event) => {
    event.preventDefault();
    console.log("edit post clicked");
    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    console.log("Title " + title);
    console.log("Content " + content);

    if (title && content) {
        console.log("title and content are valid")
        const editPost = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Post Ok');
        if (editPost.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post!')
        }
    }
};

document.querySelector('#edit-post-submit').addEventListener('click', editPost);