/*
FALLARIA, RHAJ GENDREX F.
BSIT - 1ST YEAR COLLEGE
*/

// SCROLL-BASED ACTIVE LINK LOGIC 
const sections = document.querySelectorAll("section");
const sectionLinks = document.querySelectorAll("nav a[href^='#']:not([href='#signup-modal'])");

function activateNavLink() {
    let currentSection = "";
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector('header').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - headerHeight - windowHeight * 0.3) && 
            scrollY < (sectionTop + sectionHeight - headerHeight - windowHeight * 0.3)) {
            currentSection = section.id;
        }
    });

    sectionLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activateNavLink);
window.addEventListener("load", activateNavLink);

// PERFECT CENTERED SMOOTH SCROLLING 
document.querySelectorAll('nav a[href^="#"]:not([href="#signup-modal"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (targetId === '#about') {
            const targetSection = document.querySelector('#about');
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetSection.offsetTop - headerHeight - 20; 
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    });
});

// SIGN UP LOGIC
const signupLink = document.getElementById('signup-link');
const signupModal = document.getElementById('signup-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeBtn = document.querySelector('.close-btn');

function openModal(e) {
    if(e) e.preventDefault();
    signupModal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.classList.add('no-scroll'); 
    signupLink.classList.add('active');
}

function closeModal() {
    signupModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll'); 
    signupLink.classList.remove('active');
}

signupLink.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

signupModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// MUSIC TOGGLE
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

musicBtn.addEventListener('click', () => {
    if(audio.paused){
        audio.play().catch(error => console.log("Audio play failed:", error));
        musicBtn.textContent = "🔇 Music";
    } else {
        audio.pause();
        musicBtn.textContent = "🎵 Music";
    }
});

// LOGIN / SIGNUP TOGGLE LOGIC
const modalTitle = document.getElementById('modal-title');
const signupSection = document.getElementById('signup-only-fields');
const authBtn = document.getElementById('auth-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');

// Get all inputs inside the signup-only div
const signupInputs = signupSection.querySelectorAll('input');

let isLoginMode = false;

toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode; 
    
    if (isLoginMode) {
        // Switch to Login: Show ONLY Email & Password
        modalTitle.textContent = "LOGIN";
        signupSection.style.display = "none"; 
        authBtn.textContent = "LOG IN";
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = "Sign up";
        
        
        signupInputs.forEach(input => input.removeAttribute('required'));
    } else {
        // Switch to Sign Up: Show EVERYTHING
        modalTitle.textContent = "SIGN UP";
        signupSection.style.display = "block";
        authBtn.textContent = "JOIN NOW";
        toggleText.textContent = "Already have an account?";
        toggleLink.textContent = "Login here";
        
        signupInputs.forEach(input => input.setAttribute('required', 'true'));
    }
});