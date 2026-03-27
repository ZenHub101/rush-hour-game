/**
 * Rush Hour Game - Vanilla JS + Canvas
 * Format notasi: RHA3 = Merah Horizontal di A3
 */

class RushHourGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 6;
        this.cellSize = this.canvas.width / this.gridSize;

        this.grid = Array(6).fill().map(() => Array(6).fill(null));
        this.cars = [];
        this.selectedCar = null;
        this.currentLevel = 1;

        // ========== LEVEL DATA LANGSUNG DI SINI ==========
        this.levels = [
            // INDEX 0 - DEBUG / SANDBOX
            "RA, CHA4, TVF1",

            // INDEX 1-20 - BEGINNER (Level 1-20)
            "RHC3, CVE3, TVF2, THA4, THD5, CVC5",
            "RHA3, CHE4, CVE5, THA1, TVC2, THA5",
            "RHD3, CVC3, CHE5, THC2, TVF2, TVD4",
            "RHA3, CHC6, CHE6, TVC1, THA4, TVF3",
            "RHA3, CVB1, CVC5, CHE5, THD1, TVE2, THA4",
            "RHB3, CHE2, CVC5, CHE6, TVD1, TVE3, THB4",
            "RHC3, CHA4, CVC4, CHA6, TVB1, TVE2, THD5",
            "RHC3, CHA4, CVB5, CHE5, TVF1, TVE2, TVC4",
            "RHA3, CVC4, CVB5, CHD5, CHC6, THA1, TVD1, TVF4",
            "RHB3, CVA5, CVB5, CVC5, CHD5, TVD1, TVF3, THD6",
            "RHB3, CHA4, CVB5, CHD5, CVF5, TVD2, TVE2, TVC4",
            "RHD3, CVE1, CHB4, CVB5, CHE5, TVC1, TVF2, TVD4",
            "RHA3, CHA1, CVF1, CVF3, CVA5, CHB5, CVE5, THC1, TVC2",
            "RHA3, CHA1, CVC1, CVC3, CVB5, CHC5, CHD6, TVD1, TVF4",
            "RHC3, CVC1, CHA2, CVE2, CVA3, CHA5, CVF5, THD1, THC5",
            "RHD3, CVB1, CHC1, CVE1, CVC3, CVC6, CHE5, TVF1, TVD4",
            "RHB3, CHB2, CVD3, CHA4, CVC4, CHD5, TVA1, THD2, TVF4",
            "RHB3, CVD1, CHE1, CVD3, CVC5, CHD5, TVA1, THA4, TVF4",
            "RHA3, CVC2, CHA4, CVC4, CVB5, CHD5, TVD2, TVF4, THC6",
            "RHD3, CHB4, CVE4, CVA5, CVB5, CHE6, TVC1, TVF3, TVD4",

            // INDEX 21-40 - INTERMEDIATE (Level 21-40)
            "RHC3, CVA1, CHC1, CHE1, CVA3, CVF2, CVB4, CVC4, CHD4, CVF4, CVE5, TVB1, THC2, THA6",
            "RHC3, CVA1, CVB1, CVD1, CHE1, CVF2, CVB3, CHC4, CVC5, CHA6, CH36, TVE2, TVA3, THD5",
            "RHB3, CHA1, CVF1, CVA2, CHB2, CVD2, CVE2, CVF3, CHA4, CVC4, CHD4, THC1, THD5, THA6",
            "RHB3, CHB1, CVD1, CHE1, CHB2, CVD3, CHA4, CVC4, CHD5, CHB6, CHD6, TVA1, TVE2, TVF4",
            "RHB3, CVC1, CHD1, CVF1, CVE2, CVF3, CVB4, CVC5, CVD5, CHE5, CHA6, CHE6, TVA3, THC4",
            "RHA3, CHB1, CHD1, CHE2, CVA4, CVB4, CHE5, CHC5, CVE5, CVF5, CHA6, CHC6, TVC2, TVD2",
            "RHB3, CVC1, CVD2, CHE2, CVA3, CVF3, CVB4, CVA5, CHC5, CVF5, CHB6, CHD6, THD1, TVE3",
            "RHA3, CVA1, CVF1, CHB2, CVD2, CVC3, CVF3, CHA4, CVD4, CHE5, CHB6, CHD6, THC1, TVE2",
            "RHA3, CVA1, CVF1, CHC2, CVC3, CVA4, CHE4, CHB5, CVF5, THB1, TVE1, TVD4, THA6",
            "RHA3, CVA1, CHB1, CVE1, CVC2, CHE4, CHD5, CVF5, CHD6, TVD1, THB4, THA5, THA6",
            "RHA3, CVA1, CHB1, CVC2, CVF3, CVB4, CHC4, CHC5, CVF5, THD1, THD2, TVE4, THA6",
            "RHB3, CHD1, CHB2, CVB4, CVC4, CVA5, CVD5, CHE5, CHB6, THA1, TVF1, TVA2, THD4",
            "RHA3, CVD1, CHA2, CVC2, CHE2, CVA4, CHB5, CHD5, CHA6, CHC6, THA1, THC4, TVF4",
            "RHB3, CHA1, CHC1, CVE1, CVD2, CVA3, CVC4, CHA5, CVD5, CHE6, TVF1, THD4, THA6",
            "RHA3, CVA1, CHB1, CHC2, CVE2, CVC3, CHA4, CHD4, CHB5, CVD5, THD1, TVF4, THA6",
            "RHD3, CVB1, CHC1, CVE1, CVC2, CVD4, CVC5, CHE5, CHA6, CHD6, TVA1, TVF2, THA4",
            "RHB3, CVA1, CVB1, CHC1, CHC2, CVA3, CVF3, CVC4, CHD4, CVD5, CVF5, TVE1, THA6",
            "RHA3, CVA1, CHC1, CHE1, CHB2, CVD2, CVF2, CVC3, CHD4, CVF4, CVE5, THB5, THB6",
            "RHA3, CVA1, CHB1, CVC2, CHD2, CVF2, CVD4, CHE4, CVE5, CHA6, CHC6, THD1, THA5",
            "RHD3, CHB1, CVD1, CHE1, CHA2, CVC2, CVF2, CVC4, CVF4, CHD5, CHB6, TVA4, THD6",

            // INDEX 41-60 - ADVANCED (Level 41-60)
            "RHD3, CVC6, TVE4, TVF5, CHB2, CHD4, CHA4, TVF1, TVF3, CVA5",
            "RHA3, CHA4, CHB1, CVC2, CVE5, TVD6",
            "RHB2, CHD3, CVA1, CVC5, TVF4, TVE6",
            "RHC4, CHA2, CHB5, CVE1, TVD3, TVF6",
            "RHA5, CHB3, CHC1, CVA4, CVE6, TVD2",
            "RHB1, CHD2, CVC4, CVA6, TVE3, TVF5",
            "RHC3, CHA4, CHB6, CVE2, CVA1, TVD5",
            "RHA2, CHC5, CHD1, CVA3, TVB4, TVF6",
            "RHB4, CHD6, CVC2, CVE5, TVA1, TVF3",
            "RHC1, CHA5, CHB3, CVE4, TVD2, TVF6",
            "RHA3, CHC2, CHD4, CVA5, TVB1, TVE6",
            "RHB5, CHA1, CHB2, CVC3, TVD4, TVF6",
            "RHC2, CHB4, CHD6, CVE1, TVA3, TVF5",
            "RHA4, CHA2, CHC5, CVA6, TVB3, TVE1",
            "RHB6, CHC1, CHD3, CVE4, TVA2, TVF5",
            "RHC5, CHA3, CHB1, CVA2, TVD4, TVE6",
            "RHA1, CHB5, CHC3, CVE2, TVA4, TVF6",
            "RHB2, CHD4, CVA1, CVC6, TVE3, TVF5",
            "RHC4, CHA6, CHB2, CVE5, TVD1, TVF3",
            "RHA3, CHB1, CHC5, CVA2, TVD6, TVE4",
            "RHB5, CHD2, CVC4, CVE1, TVA3, TVF6",

            // INDEX 61-80 - EXPERT (Level 61-80)
            "RHA3, CHA4, CHB1, CHC2, CVA5, CVE6, TVD3",
            "RHB2, CHD3, CVA1, CVC4, CVE5, TVF6, TVB6",
            "RHC4, CHA2, CHB5, CVE1, TVD3, TVF6, TVA1",
            "RHA5, CHB3, CHC1, CVA4, CVE6, TVD2, TVF5",
            "RHB1, CHD2, CVC4, CVA6, TVE3, TVF5, TVB6",
            "RHC3, CHA4, CHB6, CVE2, CVA1, TVD5, TVF6",
            "RHA2, CHC5, CHD1, CVA3, TVB4, TVF6, TVE2",
            "RHB4, CHD6, CVC2, CVE5, TVA1, TVF3, TVB2",
            "RHC1, CHA5, CHB3, CVE4, TVD2, TVF6, TVA3",
            "RHA3, CHC2, CHD4, CVA5, TVB1, TVE6, TVF4",
            "RHB5, CHA1, CHB2, CVC3, TVD4, TVF6, TVE5",
            "RHC2, CHB4, CHD6, CVE1, TVA3, TVF5, TVC1",
            "RHA4, CHA2, CHC5, CVA6, TVB3, TVE1, TVF4",
            "RHB6, CHC1, CHD3, CVE4, TVA2, TVF5, TVB5",
            "RHC5, CHA3, CHB1, CVA2, TVD4, TVE6, TVF2",
            "RHA1, CHB5, CHC3, CVE2, TVA4, TVF6, TVD5",
            "RHB2, CHD4, CVA1, CVC6, TVE3, TVF5, TVA5",
            "RHC4, CHA6, CHB2, CVE5, TVD1, TVF3, TVC2",
            "RHA3, CHB1, CHC5, CVA2, TVD6, TVE4, TVF2",
            "RHB5, CHD2, CVC4, CVE1, TVA3, TVF6, TVB4"
        ];
        // ========== AKHIR LEVEL DATA ==========

        this.initEvents();
        this.loadLevel(this.currentLevel);
    }

    // ========== DECODER NOTASI ==========
    decodeNotation(notationString) {
        const tokens = notationString.split(',').map(t => t.trim());
        const cars = [];

        const carLength = { 'R': 2, 'C': 2, 'T': 3 };
        const carColor = { 'R': '#e33', 'C': '#444', 'T': '#888' };

        function parseCoord(coord) {
            const col = coord.charCodeAt(0) - 'A'.charCodeAt(0);
            const row = parseInt(coord[1]) - 1;
            return { row, col };
        }

        for (const token of tokens) {
            if (token === 'RA') {
                cars.push({
                    id: 'R', hex: '#e33', row: 2, col: 0,
                    orient: 'h', length: 2, isRed: true
                });
                continue;
            }

            const color = token[0];
            const orient = token[1];
            const coord = token.substring(2);
            const { row, col } = parseCoord(coord);

            cars.push({
                id: color, hex: carColor[color], row: row, col: col,
                orient: orient.toLowerCase(), length: carLength[color],
                isRed: (color === 'R')
            });
        }
        return cars;
    }

    // ========== LOAD LEVEL ==========
    loadLevel(index) {
        const notation = this.levels[index];
        if (notation) {
            const cars = this.decodeNotation(notation);
            this.loadCars(cars);
            this.updateUI();
        }
    }

    loadCars(cars) {
        // Reset grid
        this.grid = Array(6).fill().map(() => Array(6).fill(null));
        this.cars = [];

        // Load cars
        cars.forEach(carData => {
            const car = {
                id: carData.id,
                row: carData.row,
                col: carData.col,
                orient: carData.orient,
                length: carData.length,
                isRed: carData.isRed || false,
                hex: carData.hex || '#568'
            };
            this.cars.push(car);
            this.placeCarOnGrid(car);
        });

        this.selectedCar = null;
        this.draw();
    }

    placeCarOnGrid(car) {
        if (car.orient === 'h') {
            for (let i = 0; i < car.length; i++) {
                if (car.row >= 0 && car.row < 6 && car.col + i >= 0 && car.col + i < 6) {
                    this.grid[car.row][car.col + i] = car;
                }
            }
        } else {
            for (let i = 0; i < car.length; i++) {
                if (car.row + i >= 0 && car.row + i < 6 && car.col >= 0 && car.col < 6) {
                    this.grid[car.row + i][car.col] = car;
                }
            }
        }
    }

    removeCarFromGrid(car) {
        if (car.orient === 'h') {
            for (let i = 0; i < car.length; i++) {
                if (car.row >= 0 && car.row < 6 && car.col + i >= 0 && car.col + i < 6) {
                    this.grid[car.row][car.col + i] = null;
                }
            }
        } else {
            for (let i = 0; i < car.length; i++) {
                if (car.row + i >= 0 && car.row + i < 6 && car.col >= 0 && car.col < 6) {
                    this.grid[car.row + i][car.col] = null;
                }
            }
        }
    }

    tryMove(car, dx, dy) {
        const newCol = car.col + dx;
        const newRow = car.row + dy;

        if (car.orient === 'h') {
            if (newCol < 0 || newCol + car.length > this.gridSize) return false;
            for (let i = 0; i < car.length; i++) {
                const cell = this.grid[car.row][newCol + i];
                if (cell !== null && cell !== car) return false;
            }
        } else {
            if (newRow < 0 || newRow + car.length > this.gridSize) return false;
            for (let i = 0; i < car.length; i++) {
                const cell = this.grid[newRow + i][car.col];
                if (cell !== null && cell !== car) return false;
            }
        }

        this.removeCarFromGrid(car);
        car.col = newCol;
        car.row = newRow;
        this.placeCarOnGrid(car);
        this.draw();

        if (car.isRed && car.col + car.length === this.gridSize) {
            this.selectedCar = null;

            let step = 0;
            const maxStep = 10;
            const startX = car.col * this.cellSize;
            const targetX = (car.col + car.length) * this.cellSize;
            const y = car.row * this.cellSize;
            const width = car.length * this.cellSize;

            // Hapus mobil merah dari grid dan cars array
            this.removeCarFromGrid(car);
            const carIndex = this.cars.indexOf(car);
            if (carIndex !== -1) this.cars.splice(carIndex, 1);

            const animateExit = () => {
                step++;
                const progress = step / maxStep;
                const currentX = startX + (targetX - startX) * progress;

                // Gambar ulang SEMUA (grid + mobil lain)
                this.draw();

                // Gambar mobil merah di posisi baru (overlay)
                this.ctx.fillStyle = '#e33';
                this.ctx.fillRect(currentX, y, width, this.cellSize);
                this.ctx.strokeStyle = '#222';
                this.ctx.strokeRect(currentX, y, width, this.cellSize);

                // Roda
                this.ctx.fillStyle = '#222';
                this.ctx.fillRect(currentX + 5, y + 5, 8, 8);
                this.ctx.fillRect(currentX + width - 13, y + 5, 8, 8);
                this.ctx.fillRect(currentX + 5, y + this.cellSize - 13, 8, 8);
                this.ctx.fillRect(currentX + width - 13, y + this.cellSize - 13, 8, 8);

                if (step < maxStep) {
                    requestAnimationFrame(animateExit);
                } else {
                    document.getElementById('statusMsg').innerHTML = '🎉 SELAMAT! MOBIL MERAH KELUAR! 🎉';
                    setTimeout(() => {
                        if (this.currentLevel + 1 < this.levels.length) {
                            this.nextLevel();
                        }
                    }, 500);
                }
            };

            requestAnimationFrame(animateExit);
            return true;
        }
        return true;
    }

    // ========== EVENT HANDLER ==========
    initEvents() {
        this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
        window.addEventListener('keydown', (e) => this.onKeyPress(e));

        const resetBtn = document.getElementById('resetBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (resetBtn) resetBtn.onclick = () => this.resetLevel();
        if (prevBtn) prevBtn.onclick = () => this.changeLevel(-1);
        if (nextBtn) nextBtn.onclick = () => this.changeLevel(1);
        // Touch controls untuk HP
        const touchBtns = document.querySelectorAll('.touch-btn');
        touchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const dir = btn.getAttribute('data-dir');
                if (!this.selectedCar) {
                    document.getElementById('statusMsg').innerHTML = '⚠️ Klik mobil dulu!';
                    return;
                }

                let dx = 0, dy = 0;
                switch (dir) {
                    case 'left': dx = -1; break;
                    case 'right': dx = 1; break;
                    case 'up': dy = -1; break;
                    case 'down': dy = 1; break;
                }

                if (this.selectedCar.orient === 'h' && dy !== 0) return;
                if (this.selectedCar.orient === 'v' && dx !== 0) return;

                this.tryMove(this.selectedCar, dx, dy);
            });
        });
    }

    onCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(mouseX / this.cellSize);
        const row = Math.floor(mouseY / this.cellSize);

        const clickedCar = this.cars.find(car => {
            if (car.orient === 'h') {
                return car.row === row && col >= car.col && col < car.col + car.length;
            } else {
                return car.col === col && row >= car.row && row < car.row + car.length;
            }
        });

        if (clickedCar) {
            this.selectedCar = clickedCar;
            const statusMsg = document.getElementById('statusMsg');
            if (statusMsg) statusMsg.innerHTML = `🚗 Terpilih: Mobil ${clickedCar.isRed ? 'MERAH' : clickedCar.id}`;
            this.draw();
        } else {
            this.selectedCar = null;
            const statusMsg = document.getElementById('statusMsg');
            if (statusMsg) statusMsg.innerHTML = 'Klik mobil, lalu tekan tombol panah';
            this.draw();
        }
    }

    onKeyPress(e) {
        if (!this.selectedCar) return;

        let dx = 0, dy = 0;
        switch (e.key) {
            case 'ArrowLeft': dx = -1; break;
            case 'ArrowRight': dx = 1; break;
            case 'ArrowUp': dy = -1; break;
            case 'ArrowDown': dy = 1; break;
            default: return;
        }
        e.preventDefault();

        if (this.selectedCar.orient === 'h' && dy !== 0) return;
        if (this.selectedCar.orient === 'v' && dx !== 0) return;

        this.tryMove(this.selectedCar, dx, dy);
    }

    // ========== DRAW ==========
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid
        for (let i = 0; i <= this.gridSize; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#7a5a3a';
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }

        // Exit point
        const exitGrad = this.ctx.createLinearGradient(
            this.cellSize * 5, this.cellSize * 2,
            this.cellSize * 6, this.cellSize * 3
        );
        exitGrad.addColorStop(0, '#ffd966');
        exitGrad.addColorStop(1, '#ffaa33');
        this.ctx.fillStyle = exitGrad;
        this.ctx.fillRect(this.cellSize * 5, this.cellSize * 2, this.cellSize, this.cellSize);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.cellSize * 5, this.cellSize * 2, this.cellSize, this.cellSize);
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${this.cellSize * 0.5}px Arial`;
        this.ctx.fillText('→', this.cellSize * 5.35, this.cellSize * 2.7);

        // Gambar mobil SELAIN merah
        this.cars.forEach(car => {
            if (car.isRed) return; // SKIP mobil merah, nanti digambar manual di animasi

            const x = car.col * this.cellSize;
            const y = car.row * this.cellSize;
            const width = car.orient === 'h' ? car.length * this.cellSize : this.cellSize;
            const height = car.orient === 'v' ? car.length * this.cellSize : this.cellSize;

            this.ctx.fillStyle = this.selectedCar === car ? '#6c9' : car.hex;
            this.ctx.fillRect(x, y, width, height);
            this.ctx.strokeStyle = '#222';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);

            // Roda
            this.ctx.fillStyle = '#222';
            this.ctx.fillRect(x + 5, y + 5, 8, 8);
            this.ctx.fillRect(x + width - 13, y + 5, 8, 8);
            this.ctx.fillRect(x + 5, y + height - 13, 8, 8);
            this.ctx.fillRect(x + width - 13, y + height - 13, 8, 8);
        });
    }

    // ========== UI & NAVIGASI ==========
    updateUI() {
        const levelCounter = document.getElementById('levelCounter');
        const levelName = document.getElementById('levelName');

        if (levelCounter) {
            if (this.currentLevel === 0) {
                levelCounter.innerText = 'Debug / Sandbox';
            } else {
                levelCounter.innerText = `Level ${this.currentLevel} / ${this.levels.length - 1}`;
            }
        }

        if (levelName) {
            if (this.currentLevel === 0) {
                levelName.innerText = '🔧 SANDBOX';
            } else {
                levelName.innerText = `Level ${this.currentLevel}`;
            }
        }
    }

    resetLevel() {
        this.loadLevel(this.currentLevel);
    }

    changeLevel(delta) {
        let newLevel = this.currentLevel + delta;
        if (newLevel >= 1 && newLevel < this.levels.length) {
            this.currentLevel = newLevel;
            this.loadLevel(this.currentLevel);
        }
    }

    nextLevel() {
        if (this.currentLevel + 1 < this.levels.length) {
            this.changeLevel(1);
        }
    }
}

// ========== START GAME ==========
window.onload = function () {
    new RushHourGame('gameCanvas');
};
