// Loading Screen
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';

    // Matrix Rain Animation
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Making the canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the matrix animation
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height;
    }

    // Draw the matrix
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ffcc";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops.length = 0;
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    });
});

// Navigation Background Change on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Active Link Switching
    const currentPosition = window.scrollY + 200;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach(section => {
        if (currentPosition >= section.offsetTop && currentPosition < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Back to Top Button Visibility
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});

// Progress Bar Animation on Scroll
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    const skillsSection = document.querySelector('.skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (skillsPosition < screenPosition) {
        progressBars.forEach(bar => {
            const progressValue = bar.parentElement.parentElement.getAttribute('data-progress');
            bar.style.width = progressValue;
        });
    }
}

window.addEventListener('scroll', showProgress);

// Audio Playback on Scroll or Click
const backgroundAudio = document.getElementById('background-audio');

function playAudio() {
    if (backgroundAudio.paused) {
        backgroundAudio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    }
}

window.addEventListener('scroll', playAudio);
window.addEventListener('click', playAudio);
