document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.getElementById('game-grid');
    const messageDisplay = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const totalTiles = 10;
    const maxAttempts = 5; 
    const nemoPosition = Math.floor(Math.random() * totalTiles);
    let attempts = 0;
    let gameWon = false;

    // Generate the game tiles
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = i;
        gameGrid.appendChild(tile);

       
        tile.addEventListener('click', () => {
            if (gameWon || attempts >= maxAttempts || tile.classList.contains('nemo-found') || tile.classList.contains('nemo-not-found')) {
                return; 
            }

            attempts++;
            attemptsDisplay.textContent = `Attempts: ${attempts}`;

            if (i === nemoPosition) {
                // Found Nemo!
                gameWon = true;
                tile.classList.add('nemo-found');
                tile.innerHTML = '<img src="/nemo.png">';
                messageDisplay.textContent = `Congratulations, You Won!!`;
                attemptsDisplay.textContent = `Attempts: ${attempts}`;
                revealAllTiles();
            } else {
                // Not Nemo
                tile.classList.add('nemo-not-found');
            }

            if (attempts >= maxAttempts && !gameWon) {
                messageDisplay.textContent = `Game Over! Nemo was at position ${nemoPosition + 1}.`;
                revealAllTiles();
            }
        });
    }

    function revealAllTiles() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            if (!tile.classList.contains('nemo-found')) {
                tile.classList.add('nemo-not-found');
            }
            tile.style.pointerEvents = 'none'; 
        });
    }

});
