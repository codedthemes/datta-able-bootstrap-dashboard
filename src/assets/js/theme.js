/**
=========================================================================
=========================================================================
Template Name: Datta Able - Admin Template
Author: CodedThemes
Support: https://codedthemes.support-hub.io/
File: themes.js
Description:  this file will contains overall theme setup and handle
              behavior of live custumizer like Dark/Light, LTR/RTL,
              preset color, theme layout, theme contarast etc.
=========================================================================
=========================================================================
*/

var rtl_flag = false;
var dark_flag = false;

function layout_change_default() {
  // Determine the initial layout based on the user's system preference for color scheme
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let dark_layout = prefersDarkScheme.matches ? 'dark' : 'light';

  // Apply the initial layout
  layout_change(dark_layout);

  // Listen for changes in the user's system color scheme preference
  prefersDarkScheme.addEventListener('change', (event) => {
    dark_layout = event.matches ? 'dark' : 'light';
    layout_change(dark_layout);
  });

  // Set the active class on the default theme button, if it exists
  const btn_control = document.querySelector('.theme-layout .btn[data-value="default"]');
  if (btn_control) {
    btn_control.classList.add('active');
    var activeBtn = document.querySelector('.theme-layout .btn.active');
    if (activeBtn) activeBtn.classList.remove('active');
  }
}

// dark switch mode
function dark_mode() {
  const darkModeToggle = document.getElementById('dark-mode');

  // Ensure the element exists before proceeding
  if (!darkModeToggle) return;

  // Toggle between dark and light modes based on the checkbox status
  const mode = darkModeToggle.checked ? 'dark' : 'light';
  layout_change(mode);
}

// preset color
document.addEventListener('DOMContentLoaded', function () {
  function addClickListeners(selector, changeFunction) {
    const elements = document.querySelectorAll(`${selector} > a`);
    elements.forEach((element) => {
      element.addEventListener('click', (event) => {
        let target = event.target;
        if (target.tagName === 'SPAN') {
          target = target.parentNode; // Handle click on inner <span>
        }
        const value = target.getAttribute('data-value'); // Get data-value attribute
        changeFunction(value); // Call the corresponding change function
      });
    });
  }

  // Add event listeners for various UI elements using the reusable function
  addClickListeners('.preset-color', preset_change);
  addClickListeners('.header-color', header_change);
  addClickListeners('.navbar-color', navbar_change);
  addClickListeners('.logo-color', logo_change);
  addClickListeners('.caption-color', caption_change);
  addClickListeners('.navbar-img', nav_image_change);
  addClickListeners('.drp-menu-icon', drp_menu_icon_change);
  addClickListeners('.drp-menu-link-icon', drp_menu_link_icon_change);

  // Initialize SimpleBar if .pct-body exists
  const pctBody = document.querySelector('.pct-body');
  if (pctBody) {
    new SimpleBar(pctBody);
  }

  // Add event listener to reset button to reload the page
  const layoutReset = document.querySelector('#layoutreset');
  if (layoutReset) {
    layoutReset.addEventListener('click', () => location.reload());
  }
});

function layout_theme_sidebar_change(value) {
  // Set the sidebar theme attribute on the <body> element
  document.body.setAttribute('data-pc-sidebar_theme', value);

  // Select the sidebar logo and update its source based on the selected theme
  const logo = document.querySelector('.pc-sidebar .m-header .logo-lg');
  if (logo) {
    const logoSrc = value === 'true' ? '../assets/images/logo-dark.svg' : '../assets/images/logo-white.svg';
    logo.setAttribute('src', logoSrc);
  }

  // Remove 'active' class from the currently active button, if it exists
  const activeBtn = document.querySelector('.sidebar-theme .btn.active');
  if (activeBtn) {
    activeBtn.classList.remove('active');
  }

  // Add 'active' class to the button corresponding to the selected value
  const newActiveBtn = document.querySelector(`.sidebar-theme .btn[data-value='${value}']`);
  if (newActiveBtn) {
    newActiveBtn.classList.add('active');
  }
}

function layout_caption_change(value) {
  // Set the sidebar caption attribute on the <body> element based on the provided value
  document.body.setAttribute('data-pc-sidebar-caption', value);

  // Select the active button if it exists
  const activeBtn = document.querySelector('.theme-nav-caption .btn.active');
  if (activeBtn) {
    activeBtn.classList.remove('active'); // Remove 'active' from the current button
  }

  // Add 'active' class to the button corresponding to the selected value
  const newActiveBtn = document.querySelector(`.theme-nav-caption .btn[data-value='${value}']`);
  if (newActiveBtn) {
    newActiveBtn.classList.add('active');
  }
}

function change_attribute(type, value, selector) {
  // Set the relevant data attribute on the <body> element
  document.body.setAttribute(`data-pc-${type}`, value);

  // Check if the off-canvas control exists
  const control = document.querySelector('.pct-offcanvas');
  if (control) {
    // Remove 'active' class from the currently active element
    const activeElement = document.querySelector(`${selector} > a.active`);
    if (activeElement) {
      activeElement.classList.remove('active');
    }

    // Add 'active' class to the newly selected element
    const newActiveElement = document.querySelector(`${selector} > a[data-value='${value}']`);
    if (newActiveElement) {
      newActiveElement.classList.add('active');
    }
  }
}

// Specific functions that call the generic change_attribute function
function preset_change(value) {
  change_attribute('preset', value, '.preset-color');
}
function header_change(value) {
  change_attribute('header', value, '.header-color');
}
function navbar_change(value) {
  document.body.removeAttribute('data-pc-navimg');
  change_attribute('navbar', value, '.navbar-color');
}
function logo_change(value) {
  change_attribute('logo', value, '.logo-color');
}
function caption_change(value) {
  change_attribute('caption', value, '.caption-color');
}

function drp_menu_icon_change(value) {
  // Set the 'data-pc-drp-menu-icon' attribute on the <body> to the selected value
  document.body.setAttribute('data-pc-drp-menu-icon', value);

  // Select the off-canvas menu element, if it exists
  const control = document.querySelector('.pct-offcanvas');

  if (control) {
    // Remove the 'active' class from the currently active menu icon
    const activeIcon = document.querySelector('.drp-menu-icon > a.active');
    if (activeIcon) {
      activeIcon.classList.remove('active');
    }

    // Add the 'active' class to the newly selected icon based on the value
    const newActiveIcon = document.querySelector(`.drp-menu-icon > a[data-value='${value}']`);
    if (newActiveIcon) {
      newActiveIcon.classList.add('active');
    }
  }
}
function drp_menu_link_icon_change(value) {
  const body = document.body;
  body.setAttribute('data-pc-drp-menu-link-icon', value); // Update dropdown menu icon attribute

  const activeIcon = document.querySelector('.drp-menu-link-icon > a.active');
  const targetIcon = document.querySelector(`.drp-menu-link-icon > a[data-value='${value}']`);

  // Safely remove the active class from the current element, if any
  if (activeIcon) activeIcon.classList.remove('active');

  // Add the active class to the target element, if it exists
  if (targetIcon) targetIcon.classList.add('active');
}

function nav_image_change(value) {
  const body = document.body;
  body.removeAttribute('data-pc-navbar');
  body.setAttribute('data-pc-navimg', value); // Set the nav image attribute

  const activeNavImg = document.querySelector('.navbar-img > a.active');
  const targetNavImg = document.querySelector(`.navbar-img > a[data-value='${value}']`);

  // Safely remove active class from the current active element, if any
  if (activeNavImg) activeNavImg.classList.remove('active');

  // Add active class to the target element, if it exists
  if (targetNavImg) targetNavImg.classList.add('active');
}

function layout_rtl_change(value) {
  const body = document.querySelector('body');
  const html = document.querySelector('html');
  const directionControl = document.querySelector('.theme-direction .btn.active');
  const rtlBtn = document.querySelector(".theme-direction .btn[data-value='true']");
  const ltrBtn = document.querySelector(".theme-direction .btn[data-value='false']");

  if (value === 'true') {
    rtl_flag = true;
    body.setAttribute('data-pc-direction', 'rtl');
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');

    // Update active button state for RTL
    if (directionControl) directionControl.classList.remove('active');
    if (rtlBtn) rtlBtn.classList.add('active');
  } else {
    rtl_flag = false;
    body.setAttribute('data-pc-direction', 'ltr');
    html.removeAttribute('dir');
    html.removeAttribute('lang');

    // Update active button state for LTR
    if (directionControl) directionControl.classList.remove('active');
    if (ltrBtn) ltrBtn.classList.add('active');
  }
}

function updateLogo(selector, logoPath) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('src', logoPath);
  }
}

// Helper function to toggle button states
function updateActiveButton(layout) {
  const activeBtn = document.querySelector('.theme-layout .btn.active');
  const targetBtn = document.querySelector(`.theme-layout .btn[data-value='${layout === 'dark' ? 'false' : 'true'}']`);

  if (activeBtn) activeBtn.classList.remove('active');
  if (targetBtn) targetBtn.classList.add('active');
}

// Main function to change the layout theme (dark or light)
function layout_change(layout) {
  const body = document.body;
  body.setAttribute('data-pc-theme', layout); // Set the theme attribute

  dark_flag = layout === 'dark'; // Set the dark mode flag

  // Define the correct logo path based on the selected layout
  const logoPath = `../assets/images/logo-${layout === 'dark' ? 'white' : 'dark'}.svg`;

  // Update logos across multiple locations
  updateLogo('.footer-top .footer-logo', logoPath);
  updateLogo('.brand-logo', logoPath);
  updateLogo('.invoice-logo', logoPath);
  updateLogo('.auth-wrapper:not(.v3) a>img', logoPath);
  updateLogo('[data-pc-layout="horizontal"] .pc-sidebar .m-header .logo-lg', logoPath);

  // Update active button state
  updateActiveButton(layout);
}

function change_box_container(value) {
  // Check if the .pc-content element exists
  if (document.querySelector('.pc-content')) {
    // If value is 'true', switch to boxed layout
    if (value == 'true') {
      // Add 'container' class to the content and footer, remove 'container-fluid' from the footer
      document.querySelector('.pc-content').classList.add('container');
      document.querySelector('.footer-wrapper').classList.add('container');
      document.querySelector('.footer-wrapper').classList.remove('container-fluid');

      // Update the active button for the boxed layout option
      var control = document.querySelector('.theme-container .btn.active');
      if (control) {
        control.classList.remove('active');
        document.querySelector(".theme-container .btn[data-value='true']").classList.add('active');
      }
    }
    // If value is not 'true', switch to full-width layout
    else {
      // Remove 'container' class and add 'container-fluid' to the footer
      document.querySelector('.pc-content').classList.remove('container');
      document.querySelector('.footer-wrapper').classList.remove('container');
      document.querySelector('.footer-wrapper').classList.add('container-fluid');

      // Update the active button for the full-width layout option
      var control = document.querySelector('.theme-container .btn.active');
      if (control) {
        control.classList.remove('active');
        document.querySelector(".theme-container .btn[data-value='false']").classList.add('active');
      }
    }
  }
}

// =======================================================
// =======================================================
