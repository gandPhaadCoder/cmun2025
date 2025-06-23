document.addEventListener('DOMContentLoaded', async () => {
    let committeeDatabase = {};
    try {
        const res = await fetch('committees.json');
        if (!res.ok) throw new Error('Failed to load committees.json');
        committeeDatabase = await res.json();
    } catch (e) {
        console.error('Error loading committees:', e);
        // Fallback: show error or minimal UI
        const grid = document.querySelector('.committee-grid');
        if (grid) grid.innerHTML = '<div class="text-red-500 font-bold">Error loading committees.</div>';
        return;
    }
    
    // 1. Initialize Feather Icons
    feather.replace();

    // 2. Mobile Menu Toggle (Unified for all pages)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 3. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
    });

    // 4. Countdown Timer (for index.html)
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const conferenceDate = new Date('July 18, 2025 09:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const gap = conferenceDate - now;
            if (gap < 0) {
                countdownElement.innerHTML = `<div class="text-3xl md:text-5xl font-bold">The Conference is Live!</div>`;
                clearInterval(interval); return;
            }
            const d = Math.floor(gap / (1000 * 60 * 60 * 24));
            const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((gap % (1000 * 60)) / 1000);
            document.getElementById('days').innerText = String(d).padStart(2, '0');
            document.getElementById('hours').innerText = String(h).padStart(2, '0');
            document.getElementById('minutes').innerText = String(m).padStart(2, '0');
            document.getElementById('seconds').innerText = String(s).padStart(2, '0');
        }, 1000);
    }

    // 5. Swiper Slider (for index.html)
    const swiperWrapper = document.querySelector('.committee-slider .swiper-wrapper');
    if (swiperWrapper) {
        const committeesForSwiper = Object.values(committeeDatabase).slice(0, 8); // Show first 8
        swiperWrapper.innerHTML = '';
        committeesForSwiper.forEach(committee => {
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <a href="committee-detail.html?name=${committee.name}" class="committee-card">
                        <img src="${committee.img}" alt="${committee.name}" class="committee-card-img">
                    </a>
                </div>`;
        });
        new Swiper('.committee-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 80,
                depth: 200,
                modifier: 1,
                slideShadows: false
            },
            pagination: { el: '.swiper-pagination', clickable: true },
            autoplay: { delay: 2500, disableOnInteraction: false },
        });
    }
    
    // 6. Populate Full Committee Grid (for committees.html)
    const committeeGrid = document.querySelector('.committee-grid');
    if (committeeGrid) {
        committeeGrid.innerHTML = '';
        Object.values(committeeDatabase).forEach((committee, index) => {
             committeeGrid.innerHTML += `
                <a href="committee-detail.html?name=${committee.name}"
                   class="committee-card group relative z-10 block overflow-hidden"
                   data-aos="fade-up" data-aos-delay="${(index % 4) * 100}">
                   <img src="${committee.img}" alt="${committee.name} Poster" class="committee-card-img"/>
                   <div class="committee-card-content">
                     <div class="committee-card-title">${committee.name}</div>
                     <div class="committee-card-agenda">${committee.agenda}</div>
                   </div>
                </a>`;
        });
    }
    
    // 7. Populate Committee Detail Page (for committee-detail.html)
    const committeeContent = document.getElementById('committee-content');
    if (committeeContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const committeeName = urlParams.get('name');
        const committeeData = committeeDatabase[committeeName];
        
        if (committeeData) {
            document.title = `${committeeData.name} | CHIREC MUN 2025`;
            committeeContent.innerHTML = `
                <div class="grid md:grid-cols-5 gap-8 lg:gap-12">
                    <div class="md:col-span-2">
                        <img src="${committeeData.img}" alt="${committeeData.name} Poster" class="rounded-lg w-full shadow-lg shadow-red-900/20">
                    </div>
                    <div class="md:col-span-3">
                        <h1 class="text-4xl md:text-6xl font-black text-white">${committeeData.name}</h1>
                        <h2 class="text-2xl text-red-500 mt-1">${committeeData.fullName}</h2>
                        
                        <div class="mt-8 pt-6 border-t border-gray-800">
                            <h3 class="text-xl font-bold text-white uppercase tracking-wider">Agenda</h3>
                            <p class="mt-2 text-lg text-gray-300">${committeeData.agenda}</p>
                        </div>
                         <div class="mt-8">
                            <h3 class="text-xl font-bold text-white uppercase tracking-wider">Description</h3>
                            <p class="mt-2 text-lg text-gray-400 leading-relaxed">${committeeData.description}</p>
                        </div>
                        <a href="index.html#registration" class="mt-10 inline-block bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-colors transform hover:scale-105">Register for ${committeeData.name}</a>
                    </div>
                </div>
            `;
        } else {
            committeeContent.innerHTML = `
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-red-500">Committee Not Found</h1>
                    <p class="mt-4 text-lg text-gray-400">The committee you are looking for does not exist. Please check the name and try again.</p>
                    <a href="committees.html" class="mt-8 inline-block bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-colors">View All Committees</a>
                </div>
            `;
        }
    }

    // HERO BACKGROUND ANIMATION (particles)
    window.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('hero-bg-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width, height, particles;
            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = document.querySelector('.hero-bg').offsetHeight;
            }
            resize();
            window.addEventListener('resize', resize);
            // Particle config
            const PARTICLE_COUNT = 48;
            function randomColor() {
                const golds = ['#FFD700', '#ef4444', '#fff', '#FFD70099'];
                return golds[Math.floor(Math.random() * golds.length)];
            }
            function createParticles() {
                return Array.from({length: PARTICLE_COUNT}, () => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: 1.5 + Math.random() * 2.5,
                    dx: (Math.random() - 0.5) * 0.6,
                    dy: (Math.random() - 0.5) * 0.6,
                    color: randomColor(),
                    alpha: 0.5 + Math.random() * 0.5
                }));
            }
            particles = createParticles();
            function animate() {
                ctx.clearRect(0, 0, width, height);
                for (const p of particles) {
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 16;
                    ctx.fill();
                    ctx.restore();
                    p.x += p.dx;
                    p.y += p.dy;
                    if (p.x < 0 || p.x > width) p.dx *= -1;
                    if (p.y < 0 || p.y > height) p.dy *= -1;
                }
                requestAnimationFrame(animate);
            }
            animate();
        }

        // COUNTDOWN TIMER
        const countdown = document.getElementById('countdown');
        if (countdown) {
            // Set target date to July 18, 2025 00:00:00
            const target = new Date('2025-07-18T00:00:00+05:30').getTime();
            function updateCountdown() {
                const now = new Date().getTime();
                let diff = Math.max(0, target - now);
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                diff -= days * (1000 * 60 * 60 * 24);
                const hours = Math.floor(diff / (1000 * 60 * 60));
                diff -= hours * (1000 * 60 * 60);
                const minutes = Math.floor(diff / (1000 * 60));
                diff -= minutes * (1000 * 60);
                const seconds = Math.floor(diff / 1000);
                countdown.querySelector('#days').textContent = String(days).padStart(2, '0');
                countdown.querySelector('#hours').textContent = String(hours).padStart(2, '0');
                countdown.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
                countdown.querySelector('#seconds').textContent = String(seconds).padStart(2, '0');
            }
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    });

    // HERO PARALLAX/SCROLL EFFECT
    (function() {
        const logo = document.getElementById('hero-logo');
        const slogan = document.getElementById('hero-slogan');
        function parallax() {
            if (!logo || !slogan) return;
            if (window.innerWidth < 768) {
                logo.style.transform = slogan.style.transform = '';
                return;
            }
            const scrollY = window.scrollY;
            logo.style.transform = `translateY(${scrollY * 0.12}px) scale(${1 + scrollY * 0.0007})`;
            slogan.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
        window.addEventListener('scroll', parallax);
        parallax();
    })();

    // SITE-WIDE PARTICLES BACKGROUND (tsParticles)
    window.addEventListener('DOMContentLoaded', () => {
        if (window.tsParticles && document.getElementById('particles-bg')) {
            tsParticles.load('particles-bg', {
                fullScreen: { enable: false },
                background: { color: 'transparent' },
                particles: {
                    number: { value: 48, density: { enable: true, area: 900 } },
                    color: { value: ['#FFD700', '#ef4444', '#fff'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: { enable: true, minimumValue: 0.3 } },
                    size: { value: 2.5, random: { enable: true, minimumValue: 1.2 } },
                    move: {
                        enable: true,
                        speed: 0.6,
                        direction: 'none',
                        random: true,
                        straight: false,
                        outModes: { default: 'bounce' }
                    },
                    links: { enable: false }
                },
                detectRetina: true,
                zLayers: 1
            });
        }
    });
});