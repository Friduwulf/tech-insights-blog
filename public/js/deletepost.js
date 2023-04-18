const deletePost = async (event) => {
    event.preventDefault();
    console.log("delete post clicked");

    const deletePost = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (deletePost.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post!')
    }
};

document.querySelector('#delete-post-button').addEventListener('click', deletePost);