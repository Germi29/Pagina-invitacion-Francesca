document.addEventListener('DOMContentLoaded', () => {
    // --- Fade-in on Scroll ---
    const faders = document.querySelectorAll('.fade-in-section');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Countdown Timer ---
    // Set party date to a future date (e.g., November 14, 2026, 21:00:00)
    const partyDate = new Date("November 14, 2026 21:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = partyDate - now;

        if (distance < 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            if (document.getElementById("seconds")) document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- Copy Alias functionality ---
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', () => {
        const alias = "francesca.xv.mp";
        navigator.clipboard.writeText(alias).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "¡Copiado!";
            copyBtn.classList.add('bg-slate-light', 'text-navy-dark');
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.classList.remove('bg-slate-light', 'text-navy-dark');
            }, 3000);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    });

    // --- Lightbox Logic ---
    window.openLightbox = function(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        
        if (lightbox && lightboxImg) {
            lightboxImg.src = imageSrc;
            lightbox.classList.remove('hidden');
            // Small delay to allow display block to apply before changing opacity
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
        }
    };

    window.closeLightbox = function(event) {
        // Close only if clicking the background or close button, not the image itself
        if (event.target.id === 'lightbox' || event.target.tagName.toLowerCase() === 'button' || event.target.closest('button')) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            
            if (lightbox) {
                lightbox.classList.add('opacity-0');
                lightboxImg.classList.remove('scale-100');
                lightboxImg.classList.add('scale-95');
                
                setTimeout(() => {
                    lightbox.classList.add('hidden');
                }, 300);
            }
        }
    };
});
