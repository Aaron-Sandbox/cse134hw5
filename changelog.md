## Page Changes
Added JavaScript to highlight the name of the section that the user is currently scrolled to on the page in the navbar. Included optimizations like pre-computing all the section and name elements only on the first document load, searching the sections in reverse to minimize how often the classList of each nav element is changed, and only prompting a change when the active section has actually changed (user has scrolled out). 

Further, simplified the CSS, and changed how the page reflows when the screen size is smaller -- specifically, the sidebar nav becomes a top bar nav. On even smaller screens, the nav links are removed and replaced with a contact icon. This will eventually also be replaced with a hamburger menu instead, so the nav links can be preserved on smaller screens.

## Third-Party Script
Included **Google Analytics** in order to determine how users reach and engage with site so I can better optimize for conversion (getting people to contact me through LinkedIn or email).

Included **Lodash** so I could use the _.throttle() function to reduce the frequency at which my scroll handler for highlighting the name sections 