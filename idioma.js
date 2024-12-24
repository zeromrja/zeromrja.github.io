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
                document.getElementById('welcome').textContent = translations.welcome;
                document.getElementById('skinPacks').textContent = translations.skinPacks;
                document.getElementById('detectiveConan').textContent = translations.detectiveConan;
                document.getElementById('doraemon').textContent = translations.doraemon;
                document.getElementById('hotelTransylvania').textContent = translations.hotelTransylvania;
                document.getElementById('evangelion').textContent = translations.evangelion;
                document.getElementById('blackHole').textContent = translations.blackHole;
                document.getElementById('twitter').textContent = translations.twitter;
                document.getElementById('youtube').textContent = translations.youtube;
                document.getElementById('instagram').textContent = translations.instagram;
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    // Load selected language or default to Spanish
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = savedLanguage;
    loadTranslations(savedLanguage);
});
