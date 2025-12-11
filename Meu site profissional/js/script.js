document.addEventListener('DOMContentLoaded', () => {
    // Definindo elementos principais
    const header = document.getElementById('site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const form = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const body = document.body;

    // Função para obter o ano atual (Footer)
    document.getElementById('current-year').textContent = new Date().getFullYear();

    /* ========================================================================= */
    /* 1. HEADER E NAVEGAÇÃO */
    /* ========================================================================= */

    // Header Sticky e Sombra
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Menu Hamburger Toggle
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        // Trava o scroll do body quando o menu está aberto no mobile
        if (!isExpanded) {
             body.classList.add('menu-open');
        } else {
             body.classList.remove('menu-open');
        }
    });

    // Fechar menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('menu-open');
            }
        });
    });

    /* ========================================================================= */
    /* 2. PORTFÓLIO MODAL (Acessível) */
    /* ========================================================================= */

    const openModal = (item) => {
        const imgSrc = item.querySelector('.portfolio-img').src;
        const altText = item.querySelector('.portfolio-img').alt;
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        modalImage.src = imgSrc;
        modalImage.alt = altText;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        body.classList.add('modal-open');
        modal.focus(); // Foca no modal para trap focus
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');
        // Opcional: focar no item que abriu o modal
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });

    modalClose.addEventListener('click', closeModal);

    // Fechar com ESC (Acessibilidade)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Fechar clicando fora do modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    /* ========================================================================= */
    /* 3. CAROUSEL DE DEPOIMENTOS */
    /* ========================================================================= */

    const carousel = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.depoimento-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    // Configura o tamanho dos slides
    const setSlidePosition = (slide, index) => {
        slide.style.left = index * 100 + '%';
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentIndex = Array.from(slides).indexOf(targetSlide);
    };

    const moveNext = () => {
        let nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(track, slides[currentIndex], slides[nextIndex]);
    };

    const movePrev = () => {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(track, slides[currentIndex], slides[prevIndex]);
    };

    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);
    
    // Autoplay (se data-autoplay for definido)
    const autoplayTime = parseInt(carousel.getAttribute('data-autoplay'));
    if (autoplayTime) {
        setInterval(moveNext, autoplayTime);
    }

    /* ========================================================================= */
    /* 4. VALIDAÇÃO DE FORMULÁRIO (Simples) */
    /* ========================================================================= */
    
    const showError = (input, message) => {
        const errorElement = document.getElementById(`error-${input.id}`);
        errorElement.textContent = message;
        input.classList.add('input-error');
    };

    const clearError = (input) => {
        const errorElement = document.getElementById(`error-${input.id}`);
        errorElement.textContent = '';
        input.classList.remove('input-error');
    };

    const validateForm = () => {
        let isValid = true;
        const nome = document.getElementById('nome');
        const whatsapp = document.getElementById('whatsapp');

        // Validação do Nome
        if (nome.value.trim() === '') {
            showError(nome, 'O nome é obrigatório.');
            isValid = false;
        } else {
            clearError(nome);
        }

        // Validação do WhatsApp (simples)
        const phoneRegex = /^\+?(\d[\d\s\-\(\)]{8,}\d)$/;
        if (whatsapp.value.trim() === '') {
            showError(whatsapp, 'O WhatsApp é obrigatório.');
            isValid = false;
        } else if (!phoneRegex.test(whatsapp.value.trim())) {
             showError(whatsapp, 'Insira um número de telefone/WhatsApp válido.');
             isValid = false;
        } else {
            clearError(whatsapp);
        }

        return isValid;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formFeedback.classList.remove('success', 'error');
        formFeedback.style.display = 'none';

        if (validateForm()) {
            // Se a validação passar, você pode enviar o formulário
            // Neste exemplo, ele será enviado para o Formspree
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Requisição AJAX para o Formspree (substitua a URL no HTML)
            fetch(form.action, {
                method: form.method,
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                submitButton.textContent = 'Enviar Mensagem';
                submitButton.disabled = false;
                if (response.ok) {
                    formFeedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                    formFeedback.classList.add('success');
                    form.reset();
                } else {
                    formFeedback.textContent = 'Erro ao enviar. Por favor, tente novamente mais tarde ou use o WhatsApp.';
                    formFeedback.classList.add('error');
                }
            })
            .catch(error => {
                submitButton.textContent = 'Enviar Mensagem';
                submitButton.disabled = false;
                formFeedback.textContent = 'Erro de conexão. Por favor, use o WhatsApp.';
                formFeedback.classList.add('error');
            });

        } else {
            formFeedback.textContent = 'Preencha os campos obrigatórios corretamente.';
            formFeedback.classList.add('error');
        }
    });


    /* ========================================================================= */
    /* 5. ANIMAÇÕES SCROLL REVEAL (JS puro - Intersection Observer) */
    /* ========================================================================= */

    // Verifica se as animações estão ativas
    if (!body.classList.contains('no-animations')) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe 'animated' para ativar as transições CSS
                    entry.target.classList.add('animated');
                    // Para de observar depois de animar
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observa todas as seções e elementos com classes de animação
        document.querySelectorAll('.section, [class*="fade-in"]').forEach(el => {
            if (el.id !== 'hero') { // Hero já está visível ou deve ser animado imediatamente
                 observer.observe(el);
            }
        });
        
        // Animação imediata para elementos do Hero (para aparecer logo)
        document.querySelectorAll('.hero-section [class*="fade-in"]').forEach(el => {
            observer.observe(el);
        });
    }

});