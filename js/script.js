// Confirm script is loaded
console.log('Retro-Futuristic Portfolio Script Loaded!');

document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Ensure it's an internal link
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1); // Remove #
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Optional: Update active class on navigation (basic version)
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                } else {
                    console.warn(`Smooth scroll target not found for ID: ${targetId}`);
                }
            }
        });
    });

    // 2. (Optional) Simple On-Scroll Animations (Example: Fade-in sections)
    //    JavaScript part - CSS for '.is-visible' would be needed in style.css

    const animatedElements = document.querySelectorAll('section, .project-card, .skill-item'); // Add more selectors as needed

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // More lenient viewport check: element is partially visible
    const isPartiallyInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        // Check if part of the element is in the viewport
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return vertInView && horInView;
    };


    const handleScrollAnimations = () => {
        animatedElements.forEach(element => {
            // Check if element is partially in viewport and not yet visible
            if (isPartiallyInViewport(element) && !element.classList.contains('is-visible')) {
                element.classList.add('is-visible');
                // console.log('Added is-visible to:', element); // For debugging
            }
            // Optional: remove class if element scrolls out of view (for re-animation)
            // else if (!isPartiallyInViewport(element) && element.classList.contains('is-visible')) {
            //     element.classList.remove('is-visible');
            // }
        });
    };

    // Initial check on page load
    handleScrollAnimations();

    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);

    // Also check on resize if layout changes affect visibility
    window.addEventListener('resize', handleScrollAnimations);

});

// CSS to add to style.css for the .is-visible class:
/*
section, .project-card, .skill-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

section.is-visible,
.project-card.is-visible,
.skill-item.is-visible {
    opacity: 1;
    transform: translateY(0);
}
*/
