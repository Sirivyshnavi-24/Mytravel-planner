// DATA
const destinations = [
    { name: "Japan", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800", desc: "Cherry blossoms and sushi await.", places: ["Tokyo Tower", "Mt Fuji", "Kyoto"] },
    { name: "Switzerland", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", desc: "The land of mountains.", places: ["Alps", "Geneva", "Zurich"] },
    { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", desc: "Tropical paradise.", places: ["Ubud", "Kuta", "Temples"] },
    { name: "Italy", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800", desc: "Art and History.", places: ["Rome", "Venice", "Pisa"] },
    { name: "Australia", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", desc: "Outback and beaches.", places: ["Sydney", "Reef", "Gold Coast"] }
];

let selectedDestination = "Anywhere"; // Tracks current destination

// AUTH
function toggleAuth(type) {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}
function handleLogin(e) {
    e.preventDefault();
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    showPage('home');
    renderDestinations(destinations);
}
function handleRegister(e) { e.preventDefault(); alert("Success! Please Login."); toggleAuth('login'); }
function handleLogout() { if(confirm("Logout?")) location.reload(); }

// NAVIGATION
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// EXPLORE LOGIC
function renderDestinations(data) {
    const container = document.getElementById('explore-container');
    container.innerHTML = '';
    if(data.length === 0) container.innerHTML = '<p class="w-full text-center">No results.</p>';
    data.forEach(d => {
        container.innerHTML += `
        <div class="min-w-[300px] h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer snap-center shadow-lg transform hover:scale-105 transition" onclick="openCountryDetails('${d.name}')">
            <img src="${d.img}" class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="absolute bottom-0 p-6">
                <h3 class="text-3xl font-bold">${d.name}</h3>
                <span class="text-xs bg-brand px-3 py-1 rounded-full">Explore</span>
            </div>
        </div>`;
    });
}
function filterDestinations() {
    const term = document.getElementById('explore-search').value.toLowerCase();
    const filtered = destinations.filter(d => d.name.toLowerCase().includes(term));
    renderDestinations(filtered);
}
function openCountryDetails(name) {
    const d = destinations.find(x => x.name === name);
    document.getElementById('modal-img').src = d.img;
    document.getElementById('modal-title').innerText = d.name;
    document.getElementById('modal-desc').innerText = d.desc;
    document.getElementById('modal-places').innerHTML = d.places.map(p => `<div class="bg-white/10 p-3 rounded-xl"><i class="fa-solid fa-map-pin text-brand mr-2"></i>${p}</div>`).join('');
    
    // LINK TO PLANNER
    const planBtn = document.getElementById('modal-plan-btn');
    planBtn.onclick = function() {
        closeCountryDetails();
        planTripTo(d.name); // Set destination
    };
    
    document.getElementById('country-modal').classList.remove('hidden');
}
function closeCountryDetails() { document.getElementById('country-modal').classList.add('hidden'); }

// PLANNER LOGIC
function planTripTo(countryName) {
    selectedDestination = countryName;
    document.getElementById('planner-destination').innerText = countryName;
    showPage('planner');
}

function toggleInterest(btn) { btn.classList.toggle('pill-active'); }

function generateItinerary() {
    const activePills = document.querySelectorAll('.pill-active');
    const resultDiv = document.getElementById('itinerary-result');
    const budget = document.getElementById('budget-disp').innerText;

    if(activePills.length === 0) { alert("Select at least one interest!"); return; }

    resultDiv.innerHTML = '<p class="text-center animate-pulse">Designing trip for ' + selectedDestination + '...</p>';

    // Dynamic Routine Generation
    setTimeout(() => {
        let html = `<h4 class="text-xl font-bold mb-4">Trip to ${selectedDestination} (${budget})</h4>`;
        
        activePills.forEach((pill, index) => {
            const interest = pill.getAttribute('data-interest'); // Get Adventure, Food, etc.
            let activity = "";
            let time = "";

            // Custom Logic for Activities
            if(interest === "Adventure") { activity = "Mountain Trekking & Zipline"; time = "08:00 AM"; }
            else if(interest === "Relaxation") { activity = "Luxury Spa & Beach Sunset"; time = "04:00 PM"; }
            else if(interest === "Food") { activity = "Local Street Food Tasting Tour"; time = "01:00 PM"; }
            else if(interest === "History") { activity = "Ancient Museum & Heritage Walk"; time = "10:00 AM"; }

            html += `
            <div class="glass-panel p-6 rounded-2xl flex items-center gap-6 mb-4 animate-bounce-in">
                <div class="w-12 h-12 bg-brand rounded-full flex items-center justify-center font-bold">${index+1}</div>
                <div>
                    <h4 class="text-xl font-bold text-brand">${time}</h4>
                    <p class="font-bold">${activity}</p>
                    <p class="text-sm opacity-70">Based on your '${interest}' interest.</p>
                </div>
            </div>`;
        });
        resultDiv.innerHTML = html;
    }, 1000);
}

// MISC
function processPayment(e) { e.preventDefault(); alert("Payment Successful!"); showPage('mytrips'); }
function handleContact(e) { e.preventDefault(); alert("Message Sent!"); e.target.reset(); }
