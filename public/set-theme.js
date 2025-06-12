(function () {
    try {
        var theme = localStorage.getItem('theme');
        if (!theme) {
            // Eğer localStorage yoksa veya tema seçilmemişse kullanıcı tercihini al
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {
        // Hata varsa sessizce geç
    }
})();
