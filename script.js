// Navigation Logic
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.add('hidden');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Itinerary Generator
function generateItinerary() {
    const resultContainer = document.getElementById('itinerary-result');
    resultContainer.innerHTML = '<p class="text-center animate-pulse">AI is generating your plan...</p>';

    setTimeout(() => {
        const plans = [
            { time: '09:00 AM', title: 'Breakfast at The Cliff', desc: 'Enjoy organic coffee with a view.' },
            { time: '11:00 AM', title: 'Hidden Waterfall Trek', desc: 'A 2km hike to the secret blue lagoon.' },
            { time: '01:00 PM', title: 'Local Street Food Tour', desc: 'Taste the spice of the city.' },
            { time: '04:00 PM', title: 'Sunset Boat Ride', desc: 'Relax on the water as the sun goes down.' },
            { time: '08:00 PM', title: 'Bonfire & Music', desc: 'Live acoustic music by the beach.' }
        ];

        let html = '';
        plans.forEach((plan, index) => {
            html += `
            <div class="glass-panel p-6 rounded-2xl flex items-center gap-6 transform transition hover:scale-105 cursor-pointer mb-4">
                <div class="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-xl font-bold shrink-0">${index + 1}</div>
                <div>
                    <h4 class="text-xl font-bold text-brand">${plan.time}</h4>
                    <h5 class="text-lg font-semibold">${plan.title}</h5>
                    <p class="opacity-80 text-sm">${plan.desc}</p>
                </div>
            </div>
            `;
        });
        resultContainer.innerHTML = html;
    }, 1000);
}

// Login
function handleLogin(e) {
    e.preventDefault();
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerText;
    
    button.innerText = "Logging in...";
    button.classList.add('opacity-75');
    
    setTimeout(() => {
        alert("Login Successful! Welcome to Vanderlust.");
        showPage('home');
        button.innerText = originalText;
        button.classList.remove('opacity-75');
    }, 1500);
}

// Registration
function handleRegister(e) {
    e.preventDefault();
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerText;

    button.innerText = "Creating Account...";
    button.classList.add('opacity-75');

    setTimeout(() => {
        alert("Account Created Successfully! Please Login.");
        showPage('login');
        button.innerText = originalText;
        button.classList.remove('opacity-75');
    }, 1500);
}

// Payment
function processPayment(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = "Processing...";
    btn.classList.remove('bg-green-500');
    btn.classList.add('bg-gray-500');

    setTimeout(() => {
        alert("Payment Successful! Ticket sent to email.");
        showPage('mytrips');
        btn.innerText = originalText;
        btn.classList.add('bg-green-500');
        btn.classList.remove('bg-gray-500');
    }, 2000);
}

// Contact Form (NEW)
function handleContact(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = "Sending...";
    
    setTimeout(() => {
        alert("Message Sent! We will contact you shortly.");
        e.target.reset();
        btn.innerText = originalText;
    }, 1500);
}
