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
                document.getElementById('title').textContent = translations.title;
                document.getElementById('text').textContent = translations.text;
                document.getElementById('download').textContent = translations.download;
                document.getElementById('models').textContent = translations.models;
                document.getElementById('twitter').textContent = translations.twitter;
                document.getElementById('youtube').textContent = translations.youtube;
                document.getElementById('instagram').textContent = translations.instagram;
                document.getElementById('backBtn').textContent = translations.backBtn;
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    // Load selected language or default to Spanish
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    languageSelect.value = savedLanguage;
    loadTranslations(savedLanguage);
});