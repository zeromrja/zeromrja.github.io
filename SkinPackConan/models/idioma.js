document.addEventListener('DOMContentLoaded', function() {
    function loadTranslations(language) {
        fetch(`${language}.json`)
            .then(response => response.json())
            .then(translations => {
                document.getElementById('select').textContent = translations.select;
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    // Detectar el idioma del navegador
    const browserLanguage = navigator.language.slice(0, 2); // Ejemplo: 'es', 'en'
    const supportedLanguages = ['en', 'es']; // Idiomas soportados

    // Cargar el idioma si está soportado, sino por defecto 'en'
    const selectedLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en';
    loadTranslations(selectedLanguage);
});
