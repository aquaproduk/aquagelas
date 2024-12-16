document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Hover effect on links
    document.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('progress')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.skill, .project-card, .about-content, .contact-content')
        .forEach(el => observer.observe(el));

    // Form Handling with Animation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success message
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Something went wrong!', 'error');
            } finally {
                button.textContent = originalText;
                button.disabled = false;
            }
        });
    }

    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }

    // Animasi untuk emoji di footer
    const footerEmoji = document.querySelector('footer p emoji');
    if (footerEmoji) {
        setInterval(() => {
            const emojis = ['💖', '💝', '💕', '💗', '💓'];
            footerEmoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        }, 2000);
    }

    // Menambahkan efek hover untuk emoji di stats
    document.querySelectorAll('.stat').forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            const emoji = stat.querySelector('p');
            emoji.style.transform = 'scale(1.2) rotate(10deg)';
        });

        stat.addEventListener('mouseleave', () => {
            const emoji = stat.querySelector('p');
            emoji.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Menambahkan efek pop untuk contact emoji
    document.querySelectorAll('.contact-item i').forEach(icon => {
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Image Animation Effects
    const profileImage = document.querySelector('.profile-img');
    const imageContainer = document.querySelector('.about-image');

    if (profileImage && imageContainer) {
        // Efek 3D tilt pada mouse move
        imageContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imageContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            profileImage.style.transform = `
                perspective(1000px)
                rotateY(${x * 20}deg)
                rotateX(${-y * 20}deg)
                scale(1.05)
            `;
        });

        // Reset transform pada mouse leave
        imageContainer.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });

        // Efek parallax pada scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.05;

            if (isInViewport(imageContainer)) {
                profileImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Helper function untuk cek elemen dalam viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
