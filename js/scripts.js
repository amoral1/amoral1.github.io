/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const projects = [
    {
        title: "Project 1",
        description: "Description of Project 1"
    },
    {
        title: "Project 2",
        description: "Description of Project 2"
    }
];

// Function to create dropdown items for projects
function createDropdownItems() {
    const dropdown = document.getElementById("dataDropdown");
    projects.forEach(project => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<h4>${project.title}</h4><p>${project.description}</p>`;
        dropdown.appendChild(listItem);
    });
}

// Toggle dropdown visibility
function toggleDropdown() {
    const dropdown = document.getElementById("dataDropdown");
    dropdown.classList.toggle("show");
}

// Event listener for clicking on the "Data" link to toggle dropdown
document.querySelector("#projects h3 a").addEventListener("click", toggleDropdown);

// Event listener to close dropdown when clicking outside
window.addEventListener("click", function(event) {
    const dropdown = document.getElementById("dataDropdown");
    if (!event.target.matches("#projects h3 a")) {
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    }
});

// Initialize dropdown items
createDropdownItems();
