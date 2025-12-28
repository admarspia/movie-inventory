

const USERS_KEY = 'movie_users';
const CURRENT_USER_KEY = 'movie_current_user';

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

export function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.reload();
}

export function initAuth() {
    console.log("Initializing Auth UI...");


    const modal = document.getElementById('auth-modal');
    const openBtn = document.getElementById('openAuthBtn');     
    const closeBtn = document.querySelector('.close-modal-btn');
    const userDisplay = document.getElementById('userDisplay'); 
    const welcomeMsg = document.getElementById('welcomeMsg');
    const logoutBtn = document.getElementById('logoutBtn');

    const user = getCurrentUser();
    if (user) {
        if(openBtn) openBtn.style.display = 'none';           
        if(userDisplay) {
            userDisplay.style.display = 'flex';               
            welcomeMsg.textContent = `Hi, ${user.username}`;
        }
    } else {
        if(openBtn) openBtn.style.display = 'block';          
        if(userDisplay) userDisplay.style.display = 'none';   
    }

    if(openBtn) {
        openBtn.addEventListener('click', () => {
            if(modal) modal.style.display = 'flex';
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            if(modal) modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    if(logoutBtn) logoutBtn.addEventListener('click', logout);

    setupFormLogic();
}

function setupFormLogic() {
    document.getElementById('showSignup')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('signup-section').style.display = 'block';
    });

    document.getElementById('showLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    });

    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const users = getUsers();
        
        if (users.find(u => u.username === username && u.password === password)) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ username }));
            window.location.reload(); 
        } else {
            alert('Invalid credentials');
        }
    });

    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const users = getUsers();
        
        if(users.find(u => u.username === username)) {
            alert('User already exists');
            return;
        }

        users.push({ username, password });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        alert('Registered! Please login.');
        document.getElementById('showLogin').click();
    });
}