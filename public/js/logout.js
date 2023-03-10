const logout = async (event) => {
    event.preventDefault();
    const res = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
        document.location.replace('/');
    } else {
        alert(res.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);