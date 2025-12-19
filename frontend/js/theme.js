
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
}


function updateButtonState() {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;

    const isLight = document.body.classList.contains('light-mode');

    if (isLight) {
        btn.innerHTML = "☾ Night Mode";
        btn.style.backgroundColor = "#e50914"; 
        btn.style.color = "#fff";
        btn.style.border = "none";
    } else {
        btn.innerHTML = "☀ Day Mode";
        btn.style.backgroundColor = "transparent";
        btn.style.color = "var(--text-main)";
        btn.style.border = "1px solid var(--text-main)";
    }
}


document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'theme-btn') {
        const body = document.body;
        
    
        body.classList.toggle('light-mode');
        
    
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }

        updateButtonState();
    }
});


const observer = new MutationObserver(() => {
    const btn = document.getElementById('theme-btn');
    if (btn) {
        updateButtonState();
        
        observer.disconnect(); 
    }
});


observer.observe(document.body, { childList: true, subtree: true });


document.addEventListener('DOMContentLoaded', updateButtonState);