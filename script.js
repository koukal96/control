// Ošetření inicializace Formspree podle dokumentace Vanilla JS
window.formspree = window.formspree || function () { 
    (formspree.q = formspree.q || []).push(arguments); 
};

// Zde propojujeme formulář s tvým konkrétním endpointem (xjgplprp)
document.addEventListener("DOMContentLoaded", function() {
    
    // Inicializace Formspree
    formspree('initForm', { 
        formElement: '#my-form', 
        formId: 'xjgplprp' 
    });

    // Custom ošetření po úspěšném odeslání (přepínání CSS tříd)
    const form = document.getElementById('my-form');
    const successMsg = document.querySelector('[data-fs-success]');
    const errorMsg = document.querySelector('[data-fs-error]');

    form.addEventListener('submit', function() {
        // Skryje případné předchozí zprávy při novém pokusu
        if(successMsg) successMsg.classList.add('hidden');
        if(errorMsg) errorMsg.classList.add('hidden');
    });

    // Observer, který hlídá změny od knihovny Formspree a ukazuje zprávy plynule
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "style" || mutation.attributeName === "class") {
                // Pokud Formspree knihovna odstraní atribut hidden, my odebereme naši třídu
                if(successMsg.style.display !== 'none' && !successMsg.hasAttribute('hidden')) {
                    successMsg.classList.remove('hidden');
                    form.reset(); // Vyčistíme formulář po úspěchu
                }
                if(errorMsg.style.display !== 'none' && !errorMsg.hasAttribute('hidden')) {
                    errorMsg.classList.remove('hidden');
                }
            }
        });
    });

    if(successMsg) observer.observe(successMsg, { attributes: true });
    if(errorMsg) observer.observe(errorMsg, { attributes: true });
});
