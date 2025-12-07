// DATA
const destinations = [
    { name: "Japan", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800", desc: "Cherry blossoms and sushi await.", places: ["Tokyo Tower", "Mt Fuji", "Kyoto"] },
    { name: "Switzerland", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800", desc: "The land of mountains.", places: ["Alps", "Geneva", "Zurich"] },
    { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", desc: "Tropical paradise.", places: ["Ubud", "Kuta", "Temples"] },
    { name: "Italy", img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800", desc: "Art and History.", places: ["Rome", "Venice", "Pisa"] },
    { name: "Australia", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", desc: "Outback and beaches.", places: ["Sydney", "Reef", "Gold Coast"] }
];

let selectedDestination = "Anywhere";

// AUTH
function toggleAuth(type) { document.getElementById('login-form').classList.toggle('hidden'); document.getElementById('register-form').classList.toggle('hidden'); }
function handleLogin(e) { e.preventDefault(); document.getElementById('auth-container').classList.add('hidden'); document.getElementById('app-container').classList.remove('hidden'); showPage('home'); renderDestinations(destinations); }
function handleRegister(e) { e.preventDefault(); alert("Success! Please Login."); toggleAuth('login'); }
function handleLogout() { if(confirm("Logout?")) location.reload(); }

// NAV
function showPage(pageId) { document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden')); document.getElementById(pageId).classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }

// EXPLORE (With Map Logic)
function renderDestinations(data) {
    const container = document.getElementById('explore-container');
    container.innerHTML = '';
    data.forEach(d => {
        container.innerHTML += `
        <div class="min-w-[300px] h-[400px] rounded-3xl overflow-hidden relative group cursor-pointer snap-center shadow-lg transform hover:scale-105 transition" onclick="openCountryDetails('${d.name}')">
            <img src="${d.img}" class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="absolute bottom-0 p-6"><h3 class="text-3xl font-bold">${d.name}</h3><span class="text-xs bg-brand px-3 py-1 rounded-full">Explore</span></div>
        </div>`;
    });
}
function filterDestinations() { const term = document.getElementById('explore-search').value.toLowerCase(); renderDestinations(destinations.filter(d => d.name.toLowerCase().includes(term))); }

function openCountryDetails(name) {
    const d = destinations.find(x => x.name === name);
    document.getElementById('modal-img').src = d.img;
    document.getElementById('modal-title').innerText = d.name;
    document.getElementById('modal-desc').innerText = d.desc;
    document.getElementById('modal-places').innerHTML = d.places.map(p => `<div class="bg-white/10 p-3 rounded-xl"><i class="fa-solid fa-map-pin text-brand mr-2"></i>${p}</div>`).join('');
    
    // EMBED GOOGLE MAP (Simple Iframe)
    document.getElementById('modal-map').src = `https://maps.google.com/maps?q=${d.name}&t=&z=5&ie=UTF8&iwloc=&output=embed`;

    const planBtn = document.getElementById('modal-plan-btn');
    planBtn.onclick = function() { closeCountryDetails(); planTripTo(d.name); };
    document.getElementById('country-modal').classList.remove('hidden');
}
function closeCountryDetails() { document.getElementById('country-modal').classList.add('hidden'); }

// PLANNER
function planTripTo(countryName) { selectedDestination = countryName; document.getElementById('planner-destination').innerText = countryName; showPage('planner'); }
function toggleInterest(btn) { btn.classList.toggle('pill-active'); }
function generateItinerary() {
    const activePills = document.querySelectorAll('.pill-active');
    if(activePills.length === 0) { alert("Select at least one interest!"); return; }
    document.getElementById('itinerary-result').innerHTML = `<p class="text-center animate-pulse">Generating plan for ${selectedDestination}...</p>`;
    setTimeout(() => {
        let html = `<h4 class="text-xl font-bold mb-4">Trip to ${selectedDestination}</h4>`;
        activePills.forEach((pill, i) => {
            const interest = pill.getAttribute('data-interest');
            html += `<div class="glass-panel p-6 rounded-2xl flex items-center gap-6 mb-4 animate-bounce-in"><div class="w-12 h-12 bg-brand rounded-full flex items-center justify-center font-bold">${i+1}</div><div><h4 class="text-xl font-bold text-brand">Activity ${i+1}</h4><p>Best activity for ${interest}</p></div></div>`;
        });
        document.getElementById('itinerary-result').innerHTML = html;
    }, 1000);
}

// CHATBOT LOGIC
function toggleChat() { document.getElementById('chatbot-window').classList.toggle('hidden'); }
function handleChatInput(e) { if(e.key === 'Enter') sendMessage(); }
function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if(!msg) return;
    
    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML += `<div class="bg-brand p-2 rounded-lg self-end max-w-[80%] text-right">${msg}</div>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        let reply = "I can help you plan trips! Try checking the 'Explore' tab.";
        if(msg.toLowerCase().includes('hello') || msg.toLowerCase().includes('hi')) reply = "Hello! Where are you planning to go?";
        else if(msg.toLowerCase().includes('budget')) reply = "You can set your budget in the AI Planner tab.";
        else if(msg.toLowerCase().includes('japan')) reply = "Japan is beautiful! Check out Tokyo and Kyoto.";
        
        chatBox.innerHTML += `<div class="bg-white/10 p-2 rounded-lg self-start max-w-[80%]">${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// MISC
function processPayment(e) { e.preventDefault(); alert("Payment Successful!"); showPage('mytrips'); }
function handleContact(e) { e.preventDefault(); alert("Message Sent!"); e.target.reset(); }
