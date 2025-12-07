// --- DATA FOR EXPLORE ---
const destinations = [
    { name: "Japan", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800", desc: "Cherry blossoms and sushi await.", places: ["Tokyo Tower", "Mt Fuji", "Kyoto"] },
    { name: "Switzerland", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", desc: "The land of mountains.", places: ["Alps", "Geneva", "Zurich"] },
    { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", desc: "Tropical paradise.", places: ["Ubud", "Kuta", "Temples"] },
    { name: "Italy", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800", desc: "Art and History.", places: ["Rome", "Venice", "Pisa"] },
    { name: "Australia", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", desc: "Outback and beaches.", places: ["Sydney", "Reef", "Gold Coast"] }
];

// --- AUTH LOGIC ---
function toggleAuth(type) {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}
function handleLogin(e) {
    e.preventDefault();
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    showPage('home');
    renderDestinations(destinations); // Load explore data on login
}
function handleRegister(e) {
    e.preventDefault(); alert("Success! Please Login."); toggleAuth('login');
}
function handleLogout() {
    if(confirm("Logout?")) location.reload();
}

// --- APP NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- PLANNER LOGIC ---
function toggleInterest(btn) { btn.classList.toggle('pill-active'); }
function generateItinerary() {
    const pills = document.querySelectorAll('.pill-active');
    if(pills.length === 0) { alert("Select at least one interest!"); return; }
    document.getElementById('itinerary-result').innerHTML = `
        <div class="glass-panel p-6 rounded-2xl flex items-center gap-6 mb-4 animate-bounce-in">
            <div class="w-12 h-12 bg-brand rounded-full flex items-center justify-center font-bold">1</div>
            <div><h4 class="text-xl font-bold text-brand">Morning</h4><p>Activity based on your selection.</p></div>
        </div>`;
}

// --- EXPLORE LOGIC (Search & Modal) ---
function renderDestinations(data) {
    const container = document.getElementById('explore-container');
    container.innerHTML = '';
    if(data.length === 0) container.innerHTML = '<p class="w-full text-center">No results.</p>';
    data.forEach(d => {
        container.innerHTML += `
        <div class="min-w-[300px] h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer snap-center shadow-lg" onclick="openCountryDetails('${d.name}')">
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
    document.getElementById('country-modal').classList.remove('hidden');
}
function closeCountryDetails() { document.getElementById('country-modal').classList.add('hidden'); }

// --- PAYMENT & CONTACT ---
function processPayment(e) { e.preventDefault(); alert("Payment Successful!"); showPage('mytrips'); }
function handleContact(e) { e.preventDefault(); alert("Message Sent!"); e.target.reset(); }
