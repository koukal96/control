// Animace čísel v E-HUBu
const stats = document.querySelectorAll('.stat-value');
const speed = 200;

const startCounters = () => {
    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\s/g, ''); // Odstranění mezer
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString();
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
};

// Spuštění animace při srolování
let observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.ehub-section'));

// Formspree AJAX odeslání (vylepšené)
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const response = await fetch(e.target.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
        status.innerHTML = "<p style='color: green; font-weight: bold; margin-top: 10px;'>DORUČENO DO SYSTÉMU CP. Ozveme se!</p>";
        form.reset();
    } else {
        status.innerHTML = "<p style='color: red;'>Chyba při odesílání.</p>";
    }
});
