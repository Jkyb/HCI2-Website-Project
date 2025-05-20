/* Load header and footer dynamically and setup dark mode toggle */
function loadHTML(id, url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

document.addEventListener("DOMContentLoaded", function() {
    Promise.all([
        loadHTML("header-placeholder", "header.html"),
        loadHTML("footer-placeholder", "footer.html")
    ]).then(() => {
        // After header and footer are loaded, setup dark mode toggle
        const toggleButton = document.getElementById('dark-mode-toggle');
        if (toggleButton) {
            function setDarkMode(enabled) {
                if (enabled) {
                    document.body.classList.add('dark-mode');
                    toggleButton.textContent = '☀️';
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    document.body.classList.remove('dark-mode');
                    toggleButton.textContent = '🌙';
                    localStorage.setItem('darkMode', 'disabled');
                }
            }
            toggleButton.addEventListener('click', () => {
                const isDark = document.body.classList.contains('dark-mode');
                setDarkMode(!isDark);
            });
            // Initialize based on saved preference
            const saved = localStorage.getItem('darkMode');
            if (saved === 'enabled') {
                setDarkMode(true);
            }
        }
    });
});
