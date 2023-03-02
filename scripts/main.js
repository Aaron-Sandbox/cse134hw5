const NAV_HIGHLIGHT_UPDATE_PERIOD = 150;
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
        // Media breakpoint for switching to topbar (needs additional offset on scroll height)
        let offsetHeight = window.innerWidth <= 984 ? 4 * parseFloat(getComputedStyle(document.documentElement).fontSize) : 0; 
        sections.every((section) => {
            if(window.scrollY + offsetHeight >= section.offsetTop // Scrolled past the top of the section
                || window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight) { // Or past last section
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

    window.addEventListener('scroll', _.throttle(highlightActiveNav, NAV_HIGHLIGHT_UPDATE_PERIOD));
})