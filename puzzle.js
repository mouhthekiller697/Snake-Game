// Sliding Puzzle Game Logic

class SlidingPuzzle {
    constructor() {
        this.photos = {
            1: 'linear-gradient(135deg, #667eea, #764ba2)',
            2: 'linear-gradient(135deg, #f093fb, #f5576c)',
            3: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            4: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            5: 'linear-gradient(135deg, #fa709a, #fee140)',
            6: 'linear-gradient(135deg, #30cfd0, #330867)'
        };
        
        this.selectedPhoto = null;
        this.tiles = [];
        this.emptyIndex = 8; // Bottom right corner
        this.moves = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.gameActive = false;
        
        this.initializeUI();
    }
    
    initializeUI() {
        // Photo selection
        document.querySelectorAll('.photo-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const photoId = e.currentTarget.dataset.photo;
                this.selectPhoto(photoId);
            });
        });
        
        // Control buttons
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            this.shufflePuzzle();
        });
        
        document.getElementById('newPhotoBtn').addEventListener('click', () => {
            this.showPhotoSelection();
        });
        
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });
        
        document.getElementById('closePreviewBtn').addEventListener('click', () => {
            this.hidePreview();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.hideWinnerModal();
            this.shufflePuzzle();
        });
        
        document.getElementById('changePhotoBtn').addEventListener('click', () => {
            this.hideWinnerModal();
            this.showPhotoSelection();
        });
    }
    
    selectPhoto(photoId) {
        this.selectedPhoto = photoId;
        this.showPhotoSelection(false);
        this.showPuzzleGame();
        this.initializePuzzle();
        this.shufflePuzzle();
    }
    
    showPhotoSelection(show = true) {
        if (show) {
            document.getElementById('photoSelection').classList.remove('hidden');
            document.getElementById('puzzleGame').classList.add('hidden');
            this.stopTimer();
        } else {
            document.getElementById('photoSelection').classList.add('hidden');
        }
    }
    
    showPuzzleGame() {
        document.getElementById('puzzleGame').classList.remove('hidden');
    }
    
    initializePuzzle() {
        // Create tiles array [0, 1, 2, 3, 4, 5, 6, 7, 8]
        this.tiles = Array.from({ length: 9 }, (_, i) => i);
        this.emptyIndex = 8;
        this.moves = 0;
        this.timer = 0;
        this.gameActive = false;
        
        this.updateMoveCount();
        this.updateTimer();
        this.renderBoard();
    }
    
    renderBoard() {
        const board = document.getElementById('puzzleBoard');
        board.innerHTML = '';
        
        this.tiles.forEach((tileValue, index) => {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.dataset.index = index;
            
            if (tileValue === 8) {
                tile.classList.add('empty');
            } else {
                // Calculate position in 3x3 grid
                const row = Math.floor(tileValue / 3);
                const col = tileValue % 3;
                
                // Set background gradient with position
                tile.style.background = this.photos[this.selectedPhoto];
                tile.style.backgroundSize = '300% 300%';
                tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
                
                // Add tile number for clarity
                tile.textContent = tileValue + 1;
                
                // Check if this tile is moveable
                if (this.isMoveable(index)) {
                    tile.classList.add('moveable');
                }
                
                tile.addEventListener('click', () => {
                    this.moveTile(index);
                });
            }
            
            board.appendChild(tile);
        });
    }
    
    isMoveable(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const emptyRow = Math.floor(this.emptyIndex / 3);
        const emptyCol = this.emptyIndex % 3;
        
        // Check if tile is adjacent to empty space
        return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
               (Math.abs(col - emptyCol) === 1 && row === emptyRow);
    }
    
    moveTile(index) {
        if (!this.isMoveable(index)) return;
        
        // Start timer on first move
        if (!this.gameActive) {
            this.gameActive = true;
            this.startTimer();
        }
        
        // Swap tiles
        [this.tiles[index], this.tiles[this.emptyIndex]] = 
        [this.tiles[this.emptyIndex], this.tiles[index]];
        
        this.emptyIndex = index;
        this.moves++;
        
        this.updateMoveCount();
        this.renderBoard();
        
        // Check if puzzle is solved
        if (this.checkWin()) {
            this.winGame();
        }
    }
    
    shufflePuzzle() {
        this.initializePuzzle();
        
        // Perform random valid moves to shuffle
        const numShuffles = 100;
        for (let i = 0; i < numShuffles; i++) {
            const moveableIndices = [];
            for (let j = 0; j < 9; j++) {
                if (this.isMoveable(j)) {
                    moveableIndices.push(j);
                }
            }
            
            const randomIndex = moveableIndices[Math.floor(Math.random() * moveableIndices.length)];
            [this.tiles[randomIndex], this.tiles[this.emptyIndex]] = 
            [this.tiles[this.emptyIndex], this.tiles[randomIndex]];
            this.emptyIndex = randomIndex;
        }
        
        // Reset moves and timer after shuffle
        this.moves = 0;
        this.timer = 0;
        this.gameActive = false;
        this.stopTimer();
        
        this.updateMoveCount();
        this.updateTimer();
        this.renderBoard();
    }
    
    checkWin() {
        for (let i = 0; i < 9; i++) {
            if (this.tiles[i] !== i) {
                return false;
            }
        }
        return true;
    }
    
    winGame() {
        this.gameActive = false;
        this.stopTimer();
        
        // Show winner modal
        document.getElementById('finalMoves').textContent = this.moves;
        document.getElementById('finalTime').textContent = this.formatTime(this.timer);
        document.getElementById('winnerModal').classList.remove('hidden');
    }
    
    showPreview() {
        const previewImage = document.getElementById('previewImage');
        previewImage.style.background = this.photos[this.selectedPhoto];
        document.getElementById('previewModal').classList.remove('hidden');
    }
    
    hidePreview() {
        document.getElementById('previewModal').classList.add('hidden');
    }
    
    hideWinnerModal() {
        document.getElementById('winnerModal').classList.add('hidden');
    }
    
    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateMoveCount() {
        document.getElementById('moveCount').textContent = this.moves;
    }
    
    updateTimer() {
        document.getElementById('timeCount').textContent = this.formatTime(this.timer);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new SlidingPuzzle();
});
