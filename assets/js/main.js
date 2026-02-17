const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const themeToggle = document.getElementById('theme-toggle');
const scrollTop = document.getElementById('scroll-top');
const chatButton = document.querySelector('.chat-button');

const THEME_KEY = 'xtra-furniture-theme';

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        updateThemeIcon(true);
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        updateThemeIcon(false);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark');
            updateThemeIcon(true);
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            localStorage.setItem(THEME_KEY, 'light');
        }
    }
}

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    updateThemeIcon(isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

document.querySelectorAll('header nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }

    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

chatButton.addEventListener('click', () => {
    alert('Chat feature coming soon! 💬');
});

const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        categoryCards.forEach(c => c.classList.remove('bg-gold', 'text-navy'));
        card.classList.add('bg-gold', 'text-navy');
        
        const category = card.querySelector('h3').textContent;
        console.log('Selected category:', category);
    });
});

const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('h3').textContent;
        console.log('Clicked product:', productName);
    });
});

const floatingButtons = document.querySelectorAll('.floating-icons button');
floatingButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const actions = [
            'Quick actions',
            'Save to clipboard',
            'Watch video',
            'Start chat',
            'Add to favorites',
            'Bookmark page'
        ];
        console.log(actions[index]);
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

const scrollingContent = document.querySelector('.scrolling-content');
if (scrollingContent) {
    const content = scrollingContent.innerHTML;
    scrollingContent.innerHTML = content + content;
}

initTheme();

console.log('XTRA Furniture website loaded successfully! 🪑✨');
