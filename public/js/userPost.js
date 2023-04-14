const newPostHandler = async (event) => {
    event.preventDefault();

    document.location.replace('/new');
}

document.querySelector(".newPost").addEventListener("click", newPostHandler);