document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', changeLanguage);

    function changeLanguage() {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        loadTranslations(selectedLanguage);
    }

    function loadTranslations(language) {
        fetch(`${language}.json`)
            .then(response => response.json())
            .then(translations => {
                document.getElementById('select').textContent = translations.select;
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    // Load selected language or default to Spanish
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    languageSelect.value = savedLanguage;
    loadTranslations(savedLanguage);
});
