window.onload = function() {
    const hasVisited = localStorage.getItem('hasVisited');
    const loginHeading = document.querySelector('#loginForm h2');
    const loginSubtitle = document.querySelector('#loginForm .form-subtitle');
    
    if (hasVisited) {
        loginHeading.textContent = 'Welcome Back!';
        loginSubtitle.textContent = 'Login to continue making your city better';
    } else {
        loginHeading.textContent = 'Welcome to Sehyogsetu!';
        loginSubtitle.textContent = 'Login to start making your city better';
    }
};
function showSignup() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}
function showLogin() 
{
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const emailOrPhone = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = users.find(user => 
        (user.email === emailOrPhone || user.phone === emailOrPhone) && 
        user.password === password
    );
    if (userExists) 
    {
        localStorage.setItem('hasVisited', 'true');
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userExists));
        alert('Login successful! Welcome to Sehyogsetu');
        window.location.href = 'index.html';
    } else 
    {
        const userWithEmail = users.find(user => 
            user.email === emailOrPhone || user.phone === emailOrPhone
        );
        
        if (userWithEmail) 
        {
            alert('Incorrect password! Please try again.');
        } 
        else 
        {
            alert('Account not found! Please sign up first.');
            showSignup();
        }
    }
}
function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    if (password !== confirmPassword) 
    {
        alert('Passwords do not match!');
        return;
    }
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = users.find(user => 
        user.email === email || user.phone === phone
    );
    
    if (existingUser) 
    {
        alert('Account already exists with this email or phone! Please login.');
        showLogin();
        return;
    }
    const newUser = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    localStorage.setItem('hasVisited', 'true');
    alert('Account created successfully! Please login to continue.');
    showLogin();
    setTimeout(() => {
        document.querySelector('#loginForm input[type="text"]').value = email;
    }, 100);
}