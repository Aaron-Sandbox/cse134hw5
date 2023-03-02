window.addEventListener('DOMContentLoaded', () => {
    // Get sections and nav links
    const sections = [...document.querySelectorAll('main > section')].reverse(); // Search sections from end
    const navLinks = document.querySelectorAll('main > nav > a');

    // Map section IDs to the corresponding nav link, to avoid repeated DOM queries
    let idToNav = {};
    sections.forEach((section) => {
        idToNav[section.id] = document.querySelector(`main > nav > a[href*=${section.id}]`);
    })

    function highlightActiveNav () {
        sections.every((section) => {
            if(window.scrollY >= section.offsetTop // Scrolled past the top of the section
                || window.scrollY >= document.documentElement.offsetHeight - window.offsetHeight) { // Or past last section
                // Only change classList if we need to (scrolled to another section)
                if(!idToNav[section.id].classList.contains('active')){
                    navLinks.forEach((navlink) => navlink.classList.remove('active'));
                    idToNav[section.id].classList.add('active');
                }
                return false;
            }
            return true;
        });
    }

    window.addEventListener('scroll', _.throttle(highlightActiveNav, 150));
})