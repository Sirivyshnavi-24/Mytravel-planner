// Navigation Logic
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.add('hidden');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.classList.remove('hidden');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Simple Itinerary Generator Logic
function generateItinerary() {
    const resultContainer = document.getElementById('itinerary-result');
    
    // Mock Data - In a real app, this would come from an API
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
        <div class="glass-panel p-6 rounded-2xl flex items-center gap-6 transform transition hover:scale-105 cursor-pointer">
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
}