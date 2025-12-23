// frontend/js/authentication.js

const USERS_KEY = 'movie_users';
const CURRENT_USER_KEY = 'movie_current_user';

// --- Helper Functions ---
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

// --- Main Init Function ---
export function initAuth() {
    console.log("Initializing Auth UI...");

    // 1. Get Elements
    const modal = document.getElementById('auth-modal');
    const openBtn = document.getElementById('openAuthBtn');     
    const closeBtn = document.querySelector('.close-modal-btn');
    const userDisplay = document.getElementById('userDisplay'); 
    const welcomeMsg = document.getElementById('welcomeMsg');
    const logoutBtn = document.getElementById('logoutBtn');

    // 2. Check Login Status
    const user = getCurrentUser();
    if (user) {
        // User is Logged In
        if(openBtn) openBtn.style.display = 'none';           
        if(userDisplay) {
            userDisplay.style.display = 'flex';               
            welcomeMsg.textContent = `Hi, ${user.username}`;
        }
    } else {
        // User is Logged Out
        if(openBtn) openBtn.style.display = 'block';          
        if(userDisplay) userDisplay.style.display = 'none';   
    }

    // 3. Event Listeners
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

    // 4. Setup Forms
    setupFormLogic();
}

function setupFormLogic() {
    // Switch between Login and Signup
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

    // Handle Login Submit
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

    // Handle Register Submit
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