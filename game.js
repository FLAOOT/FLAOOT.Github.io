const UI = (() => {
    const translations = {
        ru: {
            play: "Играть",
            settings: "Настройки",
            language: "Язык",
            color: "Цвет интерфейса"
        },
        en: {
            play: "Play",
            settings: "Settings",
            language: "Language",
            color: "Interface Color"
        }
    };

    let currentLang = 'ru';

    return {
        init() {
            document.getElementById('languageSelect').addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === document.getElementById('settingsModal')) {
                    this.hideSettings();
                }
            });

            this.changeLanguage('ru');
        },

        changeLanguage(lang) {
            currentLang = lang;
            document.querySelectorAll('[data-lang]').forEach(el => {
                const key = el.getAttribute('data-lang');
                el.textContent = translations[lang][key];
            });
        },

        changeColor(color) {
            document.documentElement.style.setProperty('--tg-blue', color);
        },

        showSettings() {
            document.getElementById('settingsModal').style.display = 'block';
        },

        hideSettings() {
            document.getElementById('settingsModal').style.display = 'none';
        }
    };
})();

const Game = (() => {
    let scene, camera, renderer;

    return {
        start() {
            document.getElementById('mainMenu').style.display = 'none';
            this.initGame();
        },

        initGame() {
            // Создание сцены
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87CEEB);

            // Настройка камеры
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 10, 20);
            camera.lookAt(0, 0, 0);

            // Создание рендерера
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.id = 'gameCanvas';
            document.body.appendChild(renderer.domElement);
            document.getElementById('gameCanvas').style.display = 'block';

            // Освещение
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(100, 100, 100);
            scene.add(light);
            scene.add(new THREE.AmbientLight(0x404040));

            // Генерация мира
            this.generateWorld();
            this.animate();

            window.addEventListener('resize', () => this.onWindowResize());
        },

        generateWorld() {
            // Генерация простой плоскости
            const geometry = new THREE.PlaneGeometry(50, 50);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x4CAF50,
                side: THREE.DoubleSide
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.rotation.x = Math.PI / 2;
            scene.add(plane);

            // Добавление тестового куба
            const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
            const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF5722 });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.y = 1;
            scene.add(cube);
        },

        animate() {
            requestAnimationFrame(() => this.animate());
            renderer.render(scene, camera);
        },

        onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    };
})();

// Инициализация при загрузке
window.onload = () => {
    UI.init();
};
