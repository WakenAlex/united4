// Așteptăm încărcarea completă a DOM-ului înainte de a executa codul
document.addEventListener('DOMContentLoaded', () => {
    // Selectăm elementele necesare
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const scrollTopBtn = document.createElement('button');

    // Funcție pentru toggle-ul meniului mobil
    const toggleNav = () => {
        // Toggle pentru navigație
        nav.classList.toggle('nav-active');

        // Animație pentru link-uri
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animație pentru burger
        burger.classList.toggle('toggle');
    };

    // Event listener pentru burger menu
    burger.addEventListener('click', toggleNav);

    // Funcție pentru schimbarea header-ului la scroll
    const changeHeaderOnScroll = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Event listener pentru scroll
    window.addEventListener('scroll', changeHeaderOnScroll);

    // Implementare smooth scroll pentru link-urile de navigare
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Implementare buton "Scroll to Top"
    scrollTopBtn.innerHTML = '&uarr;';
    scrollTopBtn.setAttribute('id', 'scrollTopBtn');
    document.body.appendChild(scrollTopBtn);

    const toggleScrollTopBtn = () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleScrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animație pentru numerele din secțiunea "About"
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countElements = entry.target.querySelectorAll('.count-up');
                countElements.forEach(el => {
                    const finalValue = parseInt(el.getAttribute('data-count'));
                    animateValue(el, 0, finalValue, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Validare și trimitere formular de contact
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            let isValid = true;

            if (name.value.trim() === '') {
                isValid = false;
                showError(name, 'Numele este obligatoriu');
            } else {
                removeError(name);
            }

            if (email.value.trim() === '') {
                isValid = false;
                showError(email, 'Email-ul este obligatoriu');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Vă rugăm să introduceți un email valid');
            } else {
                removeError(email);
            }

            if (message.value.trim() === '') {
                isValid = false;
                showError(message, 'Mesajul este obligatoriu');
            } else {
                removeError(message);
            }

            if (isValid) {
                var formData = new FormData(contactForm);
    
                fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData
                })
                .then(response => response.text())
                .then(result => {
                    alert(result); // Afișează mesajul de succes sau eroare
                    if (result.includes("Vă mulțumim!")) {
                        contactForm.reset(); // Resetează formularul dacă trimiterea a avut succes
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.");
                });
            }
        });
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message') || document.createElement('small');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorMessage);
        }
        input.className = 'error';
    }

    function removeError(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        if (errorMessage) {
            formControl.removeChild(errorMessage);
        }
        input.className = '';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Slider pentru proiecte
    const projectSlider = document.querySelector('.project-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (projectSlider) {
        projectSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            projectSlider.classList.add('active');
            startX = e.pageX - projectSlider.offsetLeft;
            scrollLeft = projectSlider.scrollLeft;
        });

        projectSlider.addEventListener('mouseleave', () => {
            isDown = false;
            projectSlider.classList.remove('active');
        });

        projectSlider.addEventListener('mouseup', () => {
            isDown = false;
            projectSlider.classList.remove('active');
        });

        projectSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectSlider.offsetLeft;
            const walk = (x - startX) * 3;
            projectSlider.scrollLeft = scrollLeft - walk;
        });
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-play
    setInterval(nextSlide, 5000);
});


// Navbar Fixed (Testing)
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});