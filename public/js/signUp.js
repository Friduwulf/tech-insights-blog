const signUp = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const newUser = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("new user added" + newUser)
        if (newUser.ok) {
            document.location.replace('/');
        } else {
            alert('Sign up failed, please try again!')
        }
    }
};

document.querySelector('#sign-up').addEventListener('click', signUp);