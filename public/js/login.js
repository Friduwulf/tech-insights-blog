const loginHandler = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(res.statusText);
        }
    }
};

const newAccountHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#name-new-account').value.trim();
    const email = document.querySelector('#email-new-account').value.trim();
    const password = document.querySelector('#password-new-account').value.trim();
    
    if (name && email && password) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(res.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.new-account-form').addEventListener('submit', newAccountHandler);