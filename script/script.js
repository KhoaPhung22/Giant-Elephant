document.addEventListener('DOMContentLoaded', () => {
    const splashContent = document.querySelector('.initial-splash-content');
    const gameMenu = document.querySelector('.game-menu');
    const body = document.body;

    // Function to handle showing the game menu
    function showGameMenu() {
        // 1. Fade out the initial splash content
        splashContent.classList.add('fade-out');

        // 2. Fade in the game menu after the splash content has faded out
        setTimeout(() => {
            gameMenu.classList.add('visible');
            body.style.cursor = 'default';
        }, 500); // 500ms matches the CSS transition time for opacity

        // 3. Remove the click listener from the body, so it only happens once
        body.removeEventListener('click', showGameMenu);
    }

    // Add a click event listener to the body to trigger the showGameMenu function
    body.addEventListener('click', showGameMenu, { once: true });

    // --- Sound Effects ---
    const hoverSound = new Audio(); // Create an audio object
    hoverSound.src = 'asset/audio/rpg-sound-effect.mp3'; // Set the path to your sound file (see note below)

    const menuItems = document.querySelectorAll('.menu-item:not(.disabled)');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; // Rewind to start
            hoverSound.play().catch(e => {
                console.error("Hover sound failed:", e); // Use console.error for errors
            });
        });
    });
    document.querySelectorAll('.slot').forEach(slot => {
        slot.addEventListener('mouseenter', () => {
          const hoverSound = new Audio('asset/audio/rpg-sound-effect.mp3');
          hoverSound.play();
        });
      });
      
});
