// --- AUTHENTICATION LOGIC ---

// Toggle between Login and Register Forms
function toggleAuth(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (formType === 'register') {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    } else {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
}

// Handle Login (Unlocks the App)
function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Authenticating...";
    btn.classList.add('opacity-70');

    setTimeout(() => {
        // Success: Hide Auth Container, Show App Container
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');
        
        // Reset button
        btn.innerText = originalText;
        btn.classList.remove('opacity-70');
        
        // Go to Home
        showPage('home');
    }, 1000); // 1 second fake delay
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    alert("Account created! Please login.");
    toggleAuth('login');
}

// Handle Logout
function handleLogout() {
    if(confirm("Are you sure you want to logout?")) {
        // Hide App, Show Auth
        document.getElementById('app-container').classList.add('hidden');
        document.getElementById('auth-container').classList.remove('hidden');
        // Reset Forms
        document.querySelector('#login-form form').reset();
    }
}

// --- APP LOGIC ---

// Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.add('hidden'));
    const selected = document.getElementById(pageId);
    if(selected) selected.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Interest Button Toggle Logic (Fix for buttons not working)
function toggleInterest(btn) {
    // Toggle the 'pill-active' class defined in CSS
    btn.classList.toggle('pill-active');
}

// Generator
function generateItinerary() {
    const resultDiv = document.getElementById('itinerary-result');
    
    // Check if any interests are selected
    const activePills = document.querySelectorAll('.pill-active');
    if(activePills.length === 0) {
        alert("Please select at least one interest!");
        return;
    }

    resultDiv.innerHTML = '<p class="text-center animate-pulse">Designing your perfect trip based on ' + activePills.length + ' interests...</p>';
    
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="glass-panel p-6 rounded-2xl flex items-center gap-6 mb-4 animate-bounce-in">
                <div class="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <div><h4 class="text-xl font-bold text-brand">Morning</h4><p>Sunrise hike based on your 'Adventure' interest.</p></div>
            </div>
            <div class="glass-panel p-6 rounded-2xl flex items-center gap-6 mb-4 animate-bounce-in">
                <div class="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <div><h4 class="text-xl font-bold text-brand">Afternoon</h4><p>Spa session based on your 'Relaxation' interest.</p></div>
            </div>
        `;
    }, 1500);
}
