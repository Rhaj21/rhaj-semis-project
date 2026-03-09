/*
FALLARIA, RHAJ GENDREX F.
BSIT - 1ST YEAR COLLEGE
*/

let isModalOpen = false;

// SCROLL-BASED ACTIVE LINK LOGIC 
const sections = document.querySelectorAll("section");
const sectionLinks = document.querySelectorAll("nav a[href^='#']:not([href='#signup-modal'])");

function activateNavLink() {
    
    if (isModalOpen) return;

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

// PERFECT SMOOTH SCROLLING 
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
    isModalOpen = true;
    signupModal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.classList.add('no-scroll'); 
    
    
    sectionLinks.forEach(link => link.classList.remove("active"));
    signupLink.classList.add('active');
}

function closeModal() {
    isModalOpen = false; 
    signupModal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll'); 
    signupLink.classList.remove('active');
    
   
    activateNavLink();
}

signupLink.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

signupModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(error => console.log("Audio play failed:", error));
        musicBtn.classList.add('active');
    } else {
        audio.pause();
        musicBtn.classList.remove('active');
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

// Password Show/Hide SVG Icon Logic
const togglePasswordBtn = document.getElementById('toggle-password');
const passwordInputBox = document.getElementById('password-input');

// Define SVG icons
const eyeOpenIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
</svg>`;

const eyeClosedIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
</svg>`;

togglePasswordBtn.addEventListener('click', function () {
    const isPassword = passwordInputBox.getAttribute('type') === 'password';
    
    // Toggle the type attribute
    passwordInputBox.setAttribute('type', isPassword ? 'text' : 'password');
    
    // Swap the SVG
    this.innerHTML = isPassword ? eyeClosedIcon : eyeOpenIcon;
});