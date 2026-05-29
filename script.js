// ===========================
// FUNCIONALIDADES JAVASCRIPT
// ===========================

// Suavizar rolagem de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de fade-in ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de episódios
document.querySelectorAll('.episodio-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Formulário de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]');
        
        if (email.value) {
            // Simular envio
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Inscrito! ✓';
            button.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                email.value = '';
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// Navbar ativa ao rolar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
});

// Animação ao carregar a página
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Contadores animados (stats)
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = /^\d+/.test(finalValue);
        
        if (isNumber) {
            const number = parseInt(finalValue);
            let currentValue = 0;
            const increment = number / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= number) {
                    stat.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);
        }
    });
}

// Executar animação de contadores quando a seção fica visível
const statsSection = document.querySelector('.sobre-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Efeito de paralaxe suave no hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

console.log('✓ Script carregado com sucesso!');
