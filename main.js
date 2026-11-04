/**
 * Jazaa foods and caters
 * Main Interactive Scripts & Signature Scroll Motion Engine
 */

// Math & Motion Helpers
const clamp = (val, min = 0, max = 1) => Math.min(max, Math.max(min, val));
const lerp = (start, end, t) => start + (end - start) * t;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Authentic Mughal Pointed Arch Path Generator
 * Generates an SVG path data string for the signature foiled arch
 */
function getArchPath(w, h, kVal, sVal = 0, offX = 0, offY = 0) {
    kVal = kVal == null ? 1 : kVal;
    sVal = sVal || 0;
    const archH = Math.min(0.56 * w, 0.62 * Math.max(0, h - sVal)) * kVal;
    const lx = (val) => (offX + val).toFixed(1);
    const ly = (val) => (offY + val).toFixed(1);
    const c = sVal;
    const d = sVal + archH;
    const midX = w / 2;

    if (archH < 0.5) {
        return `M${lx(0)} ${ly(c)}H${lx(w)}V${ly(h)}H${lx(0)}Z`;
    }

    return `M${lx(0)} ${ly(h)}V${ly(d)}` +
           `C${lx(0)} ${ly(d - 0.5 * archH)} ${lx(0.16 * w)} ${ly(c + 0.3 * archH)} ${lx(0.34 * w)} ${ly(c + 0.17 * archH)}` +
           `C${lx(0.43 * w)} ${ly(c + 0.1 * archH)} ${lx(0.485 * w)} ${ly(c + 0.07 * archH)} ${lx(midX)} ${ly(c)}` +
           `C${lx(0.515 * w)} ${ly(c + 0.07 * archH)} ${lx(0.57 * w)} ${ly(c + 0.1 * archH)} ${lx(0.66 * w)} ${ly(c + 0.17 * archH)}` +
           `C${lx(0.84 * w)} ${ly(c + 0.3 * archH)} ${lx(w)} ${ly(d - 0.5 * archH)} ${lx(w)} ${ly(d)}` +
           `V${ly(h)}Z`;
}

function applyArchClip(el, kVal, sVal = 0) {
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    const path = getArchPath(w, h, kVal, sVal);
    el.style.clipPath = `path('${path}')`;
    el.style.webkitClipPath = `path('${path}')`;
    el.style.borderRadius = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    // Enable motion styling flag
    document.documentElement.classList.add('gm-on');

    // 1. Header scroll effect
    initHeader();

    // 2. Mobile Menu toggle
    initMobileMenu();

    // 3. Signature Hero Scroll & Intro Animation
    initHeroAnimation();

    // 4. Horizontal Scroll Track ("Specialized in every event & cuisine")
    initHorizontalScroll();

    // 5. Story Section Word-by-Word Scroll Reveal
    initStoryWords();

    // 6. Arch Reveal on Section Cards
    initArchReveals();

    // 7. Reviews Carousel
    initReviewsCarousel();

    // 8. Menu Tabs & 19 Stations Filter
    initMenuTabs();

    // 9. Contact Page Booking Form
    initContactForm();

    // 10. Live Icons & Click Reaction Engine
    initLiveIcons();
    initIconInteractions();
});

/**
 * Sticky Header Scroll Effect
 */
function initHeader() {
    const header = document.querySelector('header[data-nav]');
    if (!header) return;

    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 20) {
            header.style.borderBottomColor = 'rgba(201, 106, 30, 0.35)';
            header.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.03)';
        } else {
            header.style.borderBottomColor = 'transparent';
            header.style.boxShadow = 'none';
        }
        lastY = y;
    }, { passive: true });
}

/**
 * Mobile Drawer Menu with Animated Morphing Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('button[aria-label="Open menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;

    const closeBtn = document.getElementById('mobile-menu-close');

    function openMenu() {
        mobileMenu.classList.add('is-active');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.style.background = 'rgba(201, 106, 30, 0.12)';
        }
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        mobileMenu.classList.remove('is-active');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.style.background = 'transparent';
        }
        document.body.classList.remove('menu-open');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (mobileMenu.classList.contains('is-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    // Close on navigation click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
            closeMenu();
        }
    });

    // Remove cover overlay after page is ready
    setTimeout(() => {
        document.querySelectorAll('[data-cover]').forEach(el => el.remove());
    }, 450);
}

/**
 * Signature Hero Scroll Animation
 * - Letters cascade in on load
 * - Right arched window expands to fullscreen background on scroll
 * - Left copy floats up and fades out
 * - Floating kitchen teaser badge slides in
 */
function initHeroAnimation() {
    const heroSection = document.querySelector('section[data-hero]');
    if (!heroSection) return;

    const heroFrame = heroSection.querySelector('[data-hero-frame]');
    const heroCopy = heroSection.querySelector('[data-hero-copy]');
    const heroEnd = heroSection.querySelector('[data-hero-end]');
    const letters = heroSection.querySelectorAll('[data-letter]');
    const heroIns = heroSection.querySelectorAll('[data-hero-in]');

    // 1. Initial State for Frame
    if (heroFrame) {
        heroFrame.style.right = "auto";
        heroFrame.style.bottom = "auto";
        heroFrame.style.willChange = "width, height, left, top, clip-path";
        applyArchClip(heroFrame, 1, 0);
    }

    if (heroCopy) {
        heroCopy.style.willChange = "opacity, transform";
    }

    if (heroEnd) {
        heroEnd.style.willChange = "opacity, transform";
    }

    // 2. Cascade Letter Entrance Animation
    letters.forEach((l, i) => {
        l.style.transform = "translate3d(0, 112%, 0) rotate(6deg)";
        l.style.transformOrigin = "0 100%";
        l.style.opacity = "0";
        l.style.transition = `transform 1.3s cubic-bezier(.19,1,.22,1) ${0.08 + 0.035 * i}s, opacity 0.85s ease ${0.08 + 0.035 * i}s`;
    });

    heroIns.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translate3d(0, 24px, 0)";
        el.style.transition = "opacity 1s ease 1.1s, transform 1.2s cubic-bezier(.2,.7,.2,1) 1.1s";
    });

    // Trigger entrance animation on next animation frame
    requestAnimationFrame(() => {
        letters.forEach(l => {
            l.style.opacity = "1";
            l.style.transform = "none";
        });
        heroIns.forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
    });

    // 3. Scroll Loop for Hero Expansion
    function updateHero() {
        if (!heroFrame) return;

        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const isMobile = winW < 820;

        const rect = heroSection.getBoundingClientRect();
        const scrollDist = Math.max(1, heroSection.offsetHeight - winH);
        // Progress reaches full expansion over first 78% of the hero 260vh height
        const progressRaw = clamp(-rect.top / (0.78 * scrollDist), 0, 1);
        const eased = easeInOutCubic(progressRaw);

        // Calculate initial frame bounds
        let initW, initH, initLeft, initTop;
        if (isMobile) {
            initW = Math.min(winW - 36, 340);
            initH = Math.min(320, Math.round(0.48 * winH));
            initLeft = Math.round((winW - initW) / 2);
            initTop = 395;
            heroFrame.style.transform = "none";
        } else {
            initW = Math.min(0.26 * winW, 460, 0.46 * winH);
            initH = Math.min(0.74 * winH, 1.72 * initW);
            initLeft = Math.max(0.66 * winW, winW - initW - 0.07 * winW);
            initTop = (winH - initH) / 2 + 0.06 * winH;
        }

        // Interpolate to 100vw x 100vh full backdrop
        const curW = lerp(initW, winW, eased);
        const curH = lerp(initH, winH, eased);
        const curLeft = lerp(initLeft, 0, eased);
        const curTop = lerp(initTop, 0, eased);

        heroFrame.style.left = `${curLeft.toFixed(1)}px`;
        heroFrame.style.top = `${curTop.toFixed(1)}px`;
        heroFrame.style.width = `${curW.toFixed(1)}px`;
        heroFrame.style.height = `${curH.toFixed(1)}px`;

        // Morph the arch cusp down to rectangle
        applyArchClip(heroFrame, 1 - eased, 0);

        // Copy fades & floats upward
        if (heroCopy) {
            heroCopy.style.opacity = String(clamp(1 - 2.1 * progressRaw, 0, 1));
            heroCopy.style.transform = `translate3d(0, ${-(140 * progressRaw).toFixed(1)}px, 0)`;
        }

        // Bottom floating card appears at the climax of the zoom
        if (heroEnd) {
            const endP = clamp((progressRaw - 0.82) / 0.18, 0, 1);
            heroEnd.style.opacity = String(endP);
            heroEnd.style.transform = `translate3d(0, ${((1 - endP) * 30).toFixed(1)}px, 0)`;
            heroEnd.style.pointerEvents = endP > 0.5 ? "auto" : "none";
        }
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHero();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        updateHero();
    });
    updateHero();
}

/**
 * Horizontal Scroll for "Specialized in every event & cuisine" section
 * Converts vertical page scrolling into smooth horizontal gliding across all 10 service cards
 */
function initHorizontalScroll() {
    const hScrollSections = document.querySelectorAll('[data-hscroll]');
    if (!hScrollSections.length) return;

    hScrollSections.forEach(section => {
        const sticky = section.querySelector('[data-hs-sticky]');
        const track = section.querySelector('[data-hs-track]');
        const bar = section.querySelector('[data-hs-bar]');
        if (!sticky || !track) return;

        let dist = 0;
        let isActive = false;

        function updateLayout() {
            const winW = window.innerWidth;
            const winH = window.innerHeight;

            if (winW < 820) {
                // Mobile layout - normal vertical flow
                isActive = false;
                section.style.height = "auto";
                sticky.style.position = "relative";
                sticky.style.top = "auto";
                sticky.style.height = "auto";
                sticky.style.overflow = "visible";
                track.style.transform = "none";
            } else {
                // Desktop horizontal scroll track
                sticky.style.position = "sticky";
                sticky.style.top = "0";
                sticky.style.height = "100vh";
                sticky.style.overflow = "hidden";
                sticky.style.display = "flex";
                sticky.style.flexDirection = "column";
                sticky.style.justifyContent = "center";

                // Horizontal scroll distance
                dist = Math.max(0, track.scrollWidth - winW);
                section.style.height = `${dist + winH}px`;
                isActive = true;

                // Apply authentic Mughal arch clip path to all card image frames
                track.querySelectorAll('[data-arch="reveal"]').forEach(arch => {
                    applyArchClip(arch, 1, 0);
                });
            }
        }

        function onScroll() {
            if (!isActive) return;
            const winH = window.innerHeight;
            const rect = section.getBoundingClientRect();
            const totalScroll = Math.max(1, section.offsetHeight - winH);
            const progress = clamp(-rect.top / totalScroll, 0, 1);

            track.style.transform = `translate3d(${(-progress * dist).toFixed(1)}px, 0, 0)`;
            if (bar) {
                bar.style.transform = `scaleX(${progress.toFixed(4)})`;
            }
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            updateLayout();
            onScroll();
        });

        // Initial setup
        updateLayout();
        onScroll();

        // Re-measure after all images load to ensure precise track width
        window.addEventListener('load', () => {
            updateLayout();
            onScroll();
        });
    });
}

/**
 * Story Section Word-by-Word Scroll Highlighting
 */
function initStoryWords() {
    const wordContainers = document.querySelectorAll('[data-words]');
    if (!wordContainers.length) return;

    function updateWords() {
        const winH = window.innerHeight;
        wordContainers.forEach(container => {
            const words = container.querySelectorAll('[data-word]');
            if (!words.length) return;
            const rect = container.getBoundingClientRect();
            const p = clamp((-rect.top + 0.15 * winH) / Math.max(1, container.offsetHeight - 0.9 * winH), 0, 1);
            const activeCount = Math.floor(p * (words.length + 2));

            words.forEach((w, idx) => {
                if (idx < activeCount) {
                    w.style.color = w.dataset.word === 'em' ? '#C96A1E' : '#1C1A17';
                } else {
                    w.style.color = '#E5E4E0';
                }
            });
        });
    }

    let wordsTicking = false;
    window.addEventListener('scroll', () => {
        if (!wordsTicking) {
            requestAnimationFrame(() => {
                updateWords();
                wordsTicking = false;
            });
            wordsTicking = true;
        }
    }, { passive: true });
    updateWords();
}

/**
 * Section Cards Mughal Arch Reveal
 */
function initArchReveals() {
    const archElements = document.querySelectorAll('[data-arch="reveal"]');
    if (!archElements.length) return;

    archElements.forEach(el => {
        applyArchClip(el, 1, 0);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.closest('[data-hs-track]')) return;

                let start = null;
                const dur = 1400;

                function step(ts) {
                    if (!start) start = ts;
                    const progress = clamp((ts - start) / dur, 0, 1);
                    const eased = easeInOutCubic(progress);

                    const w = el.offsetWidth;
                    const h = el.offsetHeight;
                    if (w && h) {
                        const sVal = h * (1 - eased);
                        const path = getArchPath(w, h, 1, sVal);
                        el.style.clipPath = `path('${path}')`;
                        el.style.webkitClipPath = `path('${path}')`;
                    }

                    const img = el.querySelector('img');
                    if (img) {
                        img.style.transform = `scale(${(1.18 - 0.18 * eased).toFixed(4)})`;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }

                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.15 });

    archElements.forEach(el => {
        if (!el.closest('[data-hs-track]')) {
            observer.observe(el);
        }
    });
}

/**
 * Reviews Carousel with Clickable Controls & Auto-advance
 */
function initReviewsCarousel() {
    const figures = document.querySelectorAll('figure[data-fade-item]');
    if (!figures || figures.length === 0) return;

    let currentIndex = 0;
    const total = figures.length;
    const counterEl = document.querySelector('[data-review-counter]');
    const prevBtn = document.querySelector('button[aria-label="Previous review"]');
    const nextBtn = document.querySelector('button[aria-label="Next review"]');

    function showReview(index) {
        figures.forEach((fig, i) => {
            if (i === index) {
                fig.style.opacity = '1';
                fig.style.position = 'relative';
                fig.style.pointerEvents = 'auto';
                fig.style.transition = 'opacity 0.6s ease';
            } else {
                fig.style.opacity = '0';
                fig.style.position = 'absolute';
                fig.style.pointerEvents = 'none';
                fig.style.transition = 'opacity 0.6s ease';
            }
        });
        if (counterEl) {
            counterEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
        }
    }

    const parent = figures[0].parentElement;
    if (parent) {
        parent.style.position = 'relative';
        parent.style.minHeight = '140px';
        parent.style.display = 'grid';
        parent.style.placeItems = 'center';
    }

    showReview(0);

    function nextReview() {
        currentIndex = (currentIndex + 1) % total;
        showReview(currentIndex);
    }

    function prevReview() {
        currentIndex = (currentIndex - 1 + total) % total;
        showReview(currentIndex);
    }

    let timer = setInterval(nextReview, 6000);

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(nextReview, 6000);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            resetTimer();
            prevReview();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            resetTimer();
            nextReview();
        });
    }

    if (parent) {
        parent.addEventListener('mouseenter', () => clearInterval(timer));
        parent.addEventListener('mouseleave', resetTimer);
    }
}

/**
 * Menus Page: 3 Tabs (One Dish, Daig Delivery, Full Event Menu)
 */
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('#menu-tabs div[role="tablist"] > div > button');
    const tabPanes = document.querySelectorAll('.menu-tab-pane');
    if (!tabButtons.length || !tabPanes.length) return;

    function activateTab(index) {
        tabButtons.forEach((btn, i) => {
            const isSelected = i === index;
            btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            btn.style.boxShadow = `inset 0 -2px 0 ${isSelected ? '#1C1A17' : 'transparent'}`;
            const label = btn.querySelector('span:first-child');
            if (label) label.style.color = isSelected ? '#C96A1E' : '#7A7872';
            const price = btn.querySelector('span:nth-child(2)');
            if (price) price.style.color = isSelected ? '#1C1A17' : '#7A7872';
        });

        tabPanes.forEach((pane, i) => {
            if (i === index) {
                pane.style.display = 'flex';
                pane.classList.add('active');
            } else {
                pane.style.display = 'none';
                pane.classList.remove('active');
            }
        });
    }

    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            activateTab(index);
            const targetSection = document.getElementById('menu-tabs');
            if (targetSection && targetSection.getBoundingClientRect().top < 0) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const hash = (window.location.hash || '').toLowerCase();
    if (hash.includes('daig')) {
        activateTab(1);
    } else if (hash.includes('live') || hash.includes('decor') || hash.includes('stall') || hash.includes('corporate') || hash.includes('birthday') || hash.includes('event')) {
        activateTab(2);
    } else {
        activateTab(0);
    }

    const filterButtons = document.querySelectorAll('#event-stations-filters button');
    const stationRows = document.querySelectorAll('.cat-station-row');

    if (filterButtons.length && stationRows.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.getAttribute('data-group');
                filterButtons.forEach(b => {
                    const active = b === btn;
                    b.setAttribute('aria-selected', active ? 'true' : 'false');
                    b.style.background = active ? '#1C1A17' : 'transparent';
                    b.style.color = active ? '#FAFAF8' : '#1C1A17';
                });

                stationRows.forEach(row => {
                    const rowGroup = row.getAttribute('data-station-group');
                    if (group === 'All' || rowGroup === group) {
                        row.style.display = 'grid';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Contact Page: Interactive Booking Form with direct WhatsApp pre-formatting
 */
function initContactForm() {
    const form = document.getElementById('event-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventType = form.elements['event_type'] ? form.elements['event_type'].value : 'Event';
        const cateringPref = form.elements['catering_preference'] ? form.elements['catering_preference'].value : 'All';
        const date = form.elements['event_date'] ? form.elements['event_date'].value : 'TBD';
        const guests = form.elements['guest_count'] ? form.elements['guest_count'].value : 'Not specified';
        const venue = form.elements['venue'] ? form.elements['venue'].value : 'Islamabad / Rawalpindi';
        const notes = form.elements['notes'] ? form.elements['notes'].value : '';

        const message = `Hi Jazaa foods and caters, I would like to book an event.
Event Type: ${eventType}
Catering / Stalls: ${cateringPref}
Date: ${date}
Guest Count: ${guests}
Venue/Location: ${venue}
${notes ? 'Notes: ' + notes : ''}`;

        const waUrl = `https://wa.me/923145262272?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });
}

/**
 * Live Icon Engine: Prepares all icons with dynamic wrappers, classes, and idle life
 */
function initLiveIcons() {
    // 1. Wrap raw arrow glyphs in links, buttons, and captions for unified animation
    const arrowTargets = document.querySelectorAll('a, button, .lnk, .svc-row, .cat-row, .eyebrow, [data-hero-end], .foot-phone, .cat-action');
    arrowTargets.forEach(el => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue && /[→↗↓←]/.test(node.nodeValue)) {
                if (!node.parentElement.classList.contains('icon-arrow')) {
                    textNodes.push(node);
                }
            }
        }
        textNodes.forEach(tn => {
            const span = document.createElement('span');
            span.innerHTML = tn.nodeValue
                .replace(/→/g, '<span class="icon-arrow icon-arrow-right">→</span>')
                .replace(/↗/g, '<span class="icon-arrow icon-arrow-upright">↗</span>')
                .replace(/↓/g, '<span class="icon-arrow icon-arrow-down">↓</span>')
                .replace(/←/g, '<span class="icon-arrow icon-arrow-left">←</span>');
            tn.parentNode.replaceChild(span, tn);
        });
    });

    // 2. Identify and classify all SVG icons
    document.querySelectorAll('svg').forEach(svg => {
        svg.classList.add('live-icon');
        const path = svg.querySelector('path');
        const d = path ? path.getAttribute('d') : '';
        if (d && d.startsWith('M17.472')) {
            svg.classList.add('live-icon-wa');
        } else if (d && d.startsWith('M22.56')) {
            svg.classList.add('live-icon-google');
        }
    });

    // 3. Attach idle bounces to scroll down and horizontal drag indicators
    document.querySelectorAll('a[href="#dishes"] .icon-arrow-down, a[href*="#"] .icon-arrow-down').forEach(ar => {
        ar.classList.add('icon-arrow-down-bounce');
    });
    document.querySelectorAll('[data-hs-sticky] .icon-arrow-right').forEach(ar => {
        ar.classList.add('icon-arrow-right-bounce');
    });
}

/**
 * Tactile Click Reaction Engine:
 * - Luxury saffron ripple on click coordinates
 * - Micro-pop squish and spring overshoot
 * - Phone ring wobble on WhatsApp icons
 * - Arrow shoot acceleration
 * - Golden haptic sparkle particles
 */
function initIconInteractions() {
    function createRipple(e, target) {
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'luxury-ripple';
        const size = Math.max(rect.width, rect.height) * 2.2;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        const clickX = e.clientX ? e.clientX - rect.left : rect.width / 2;
        const clickY = e.clientY ? e.clientY - rect.top : rect.height / 2;
        ripple.style.left = `${clickX}px`;
        ripple.style.top = `${clickY}px`;
        target.classList.add('has-ripple');
        target.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
            if (!target.querySelector('.luxury-ripple')) {
                target.classList.remove('has-ripple');
            }
        }, 700);
    }

    function createSparkles(x, y) {
        if (!x || !y) return;
        const count = 7;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
            const dist = 24 + Math.random() * 26;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            const spark = document.createElement('span');
            spark.className = 'haptic-sparkle';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.setProperty('--tx', `${tx.toFixed(1)}px`);
            spark.style.setProperty('--ty', `${ty.toFixed(1)}px`);
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }
    }

    // Capture click / pointer events across the whole page
    document.addEventListener('click', (e) => {
        // Find nearest interactive element
        const interactiveEl = e.target.closest(
            'a, button, [role="button"], [data-wa-float], .btn, .lnk, .cat-row, .svc-row, .dish, .foot-phone, .mono-label, figure[data-fade-item]'
        );
        if (!interactiveEl) return;

        // 1. Spawn luxury ripple
        createRipple(e, interactiveEl);

        // 2. Animate SVGs inside or target itself
        const svg = interactiveEl.querySelector('svg') || (e.target.tagName && e.target.tagName.toLowerCase() === 'svg' ? e.target : null);
        const isWhatsApp = interactiveEl.hasAttribute('data-wa-float') ||
                           interactiveEl.classList.contains('foot-phone') ||
                           (interactiveEl.getAttribute('href') && interactiveEl.getAttribute('href').includes('wa.me')) ||
                           (svg && svg.classList.contains('live-icon-wa'));

        if (svg) {
            if (isWhatsApp) {
                svg.classList.remove('icon-ring');
                void svg.offsetWidth; // Force reflow to retrigger animation
                svg.classList.add('icon-ring');
                setTimeout(() => svg.classList.remove('icon-ring'), 650);

                // Golden haptic sparkles for WhatsApp click!
                createSparkles(e.clientX, e.clientY);
            } else {
                svg.classList.remove('icon-pop');
                void svg.offsetWidth;
                svg.classList.add('icon-pop');
                setTimeout(() => svg.classList.remove('icon-pop'), 500);
            }
        }

        // 3. Arrow shoot animations
        const arrow = interactiveEl.querySelector('.icon-arrow');
        if (arrow) {
            let animClass = 'arrow-shoot-right';
            if (arrow.classList.contains('icon-arrow-upright')) animClass = 'arrow-shoot-upright';
            if (arrow.classList.contains('icon-arrow-down')) animClass = 'arrow-shoot-down';

            arrow.classList.remove(animClass);
            void arrow.offsetWidth;
            arrow.classList.add(animClass);
            setTimeout(() => arrow.classList.remove(animClass), 550);
        }

        // 4. Button-level micro-pop for buttons without arrows
        if (interactiveEl.tagName.toLowerCase() === 'button' && !interactiveEl.querySelector('.icon-arrow')) {
            interactiveEl.classList.remove('icon-pop');
            void interactiveEl.offsetWidth;
            interactiveEl.classList.add('icon-pop');
            setTimeout(() => interactiveEl.classList.remove('icon-pop'), 500);
        }
    });
}
