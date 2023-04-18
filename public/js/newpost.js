const newPost = async (event) => {
    event.preventDefault();
    console.log("new post clicked");
    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post-text').value.trim();
    console.log(title);
    console.log(content);

    if (title && content) {
        const newPost = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("new post added" + newPost)
        if (newPost.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Sign up failed, please try again!')
        }
    }
};

document.querySelector('#new-post-submit').addEventListener('click', newPost);