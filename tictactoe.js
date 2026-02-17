// Tic Tac Toe Game Logic

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameMode = null; // 'pvp' or 'pvbot'
        this.difficulty = null; // 'easy', 'medium', 'hard'
        this.gameActive = false;
        this.scores = {
            x: parseInt(localStorage.getItem('tttXWins')) || 0,
            o: parseInt(localStorage.getItem('tttOWins')) || 0,
            draws: parseInt(localStorage.getItem('tttDraws')) || 0
        };
        
        this.winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];
        
        this.initializeUI();
        this.updateScoreDisplay();
    }
    
    initializeUI() {
        // Mode selection
        document.getElementById('pvpBtn').addEventListener('click', () => {
            this.gameMode = 'pvp';
            this.showBoard();
        });
        
        document.getElementById('pvbotBtn').addEventListener('click', () => {
            this.gameMode = 'pvbot';
            this.showDifficultySelection();
        });
        
        // Difficulty selection
        document.querySelectorAll('[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.difficulty = e.currentTarget.dataset.difficulty;
                this.showBoard();
            });
        });
        
        document.getElementById('backToModeBtn').addEventListener('click', () => {
            this.showModeSelection();
        });
        
        // Board cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.makeMove(index);
            });
        });
        
        // Control buttons
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('changeModeBtn').addEventListener('click', () => {
            this.resetGame();
            this.showModeSelection();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.hideModal();
            this.resetGame();
        });
    }
    
    showModeSelection() {
        document.getElementById('modeSelection').classList.remove('hidden');
        document.getElementById('difficultySelection').classList.add('hidden');
        document.getElementById('gameBoard').classList.add('hidden');
    }
    
    showDifficultySelection() {
        document.getElementById('modeSelection').classList.add('hidden');
        document.getElementById('difficultySelection').classList.remove('hidden');
        document.getElementById('gameBoard').classList.add('hidden');
    }
    
    showBoard() {
        document.getElementById('modeSelection').classList.add('hidden');
        document.getElementById('difficultySelection').classList.add('hidden');
        document.getElementById('gameBoard').classList.remove('hidden');
        this.resetGame();
    }
    
    makeMove(index) {
        if (!this.gameActive || this.board[index] !== null) return;
        
        this.board[index] = this.currentPlayer;
        this.updateCell(index, this.currentPlayer);
        
        const winner = this.checkWinner();
        if (winner) {
            this.endGame(winner);
            return;
        }
        
        if (this.isBoardFull()) {
            this.endGame('draw');
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateTurnIndicator();
        
        // Bot's turn
        if (this.gameMode === 'pvbot' && this.currentPlayer === 'O') {
            setTimeout(() => this.botMove(), 500);
        }
    }
    
    botMove() {
        let move;
        
        switch(this.difficulty) {
            case 'easy':
                move = this.getRandomMove();
                break;
            case 'medium':
                move = this.getMediumMove();
                break;
            case 'hard':
                move = this.getHardMove();
                break;
        }
        
        if (move !== null) {
            this.makeMove(move);
        }
    }
    
    getRandomMove() {
        const availableMoves = this.getAvailableMoves();
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    getMediumMove() {
        // 50% chance to make optimal move, 50% random
        if (Math.random() < 0.5) {
            return this.getHardMove();
        } else {
            return this.getRandomMove();
        }
    }
    
    getHardMove() {
        // Minimax algorithm for optimal play
        const bestMove = this.minimax(this.board, 'O');
        return bestMove.index;
    }
    
    minimax(board, player) {
        const availableMoves = this.getAvailableMoves(board);
        
        // Check for terminal states
        const winner = this.checkWinner(board);
        if (winner === 'O') return { score: 10 };
        if (winner === 'X') return { score: -10 };
        if (availableMoves.length === 0) return { score: 0 };
        
        const moves = [];
        
        for (let move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = player;
            
            const result = player === 'O' 
                ? this.minimax(newBoard, 'X')
                : this.minimax(newBoard, 'O');
            
            moves.push({
                index: move,
                score: result.score
            });
        }
        
        // Find best move
        if (player === 'O') {
            const bestMove = moves.reduce((best, move) => 
                move.score > best.score ? move : best
            );
            return bestMove;
        } else {
            const bestMove = moves.reduce((best, move) => 
                move.score < best.score ? move : best
            );
            return bestMove;
        }
    }
    
    getAvailableMoves(board = this.board) {
        return board.map((cell, index) => cell === null ? index : null)
                    .filter(index => index !== null);
    }
    
    checkWinner(board = this.board) {
        for (let pattern of this.winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
    
    isBoardFull() {
        return this.board.every(cell => cell !== null);
    }
    
    updateCell(index, player) {
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add('filled', player.toLowerCase());
    }
    
    updateTurnIndicator() {
        const indicator = document.getElementById('turnIndicator');
        if (this.gameActive) {
            if (this.gameMode === 'pvbot' && this.currentPlayer === 'O') {
                indicator.textContent = "Bot's Turn (O)";
            } else {
                indicator.textContent = `Player ${this.currentPlayer}'s Turn`;
            }
        }
    }
    
    endGame(result) {
        this.gameActive = false;
        
        if (result === 'draw') {
            this.scores.draws++;
            localStorage.setItem('tttDraws', this.scores.draws);
            this.showWinnerModal("It's a Draw! 🤝");
        } else {
            // Highlight winning cells
            this.highlightWinningCells(result);
            
            if (result === 'X') {
                this.scores.x++;
                localStorage.setItem('tttXWins', this.scores.x);
                this.showWinnerModal('Player X Wins! 🎉');
            } else {
                this.scores.o++;
                localStorage.setItem('tttOWins', this.scores.o);
                const winText = this.gameMode === 'pvbot' ? 'Bot Wins! 🤖' : 'Player O Wins! 🎉';
                this.showWinnerModal(winText);
            }
        }
        
        this.updateScoreDisplay();
    }
    
    highlightWinningCells(winner) {
        for (let pattern of this.winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] === winner && 
                this.board[b] === winner && 
                this.board[c] === winner) {
                [a, b, c].forEach(index => {
                    document.querySelector(`[data-index="${index}"]`).classList.add('winner');
                });
                break;
            }
        }
    }
    
    showWinnerModal(text) {
        document.getElementById('winnerText').textContent = text;
        document.getElementById('winnerModal').classList.remove('hidden');
    }
    
    hideModal() {
        document.getElementById('winnerModal').classList.add('hidden');
    }
    
    updateScoreDisplay() {
        document.getElementById('xWins').textContent = this.scores.x;
        document.getElementById('oWins').textContent = this.scores.o;
        document.getElementById('draws').textContent = this.scores.draws;
    }
    
    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('filled', 'x', 'o', 'winner');
        });
        
        this.updateTurnIndicator();
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new TicTacToe();
});
