/**
=========================================================================
=========================================================================
Template Name: Datta Able - Admin Template
Author: CodedThemes
Support: https://codedthemes.support-hub.io/
File: script.js
Description:  this file will contains behavior, properties, 
              functionality and interactions of a small module of ui element 
              which used to build a theme layout.
=========================================================================
=========================================================================
*/

'use strict';
var flg = '0';
document.addEventListener('DOMContentLoaded', function () {
  // feather icon start
  feather.replace();
  // feather icon end

  // remove pre-loader start
  setTimeout(function () {
    var loaderBg = document.querySelector('.loader-bg');
    if (loaderBg) {
      loaderBg.remove();
    }
  }, 400);

  // remove pre-loader end
  if (document.body.hasAttribute('data-pc-layout') && document.body.getAttribute('data-pc-layout') === 'horizontal') {
    if (window.innerWidth <= 1024) {
      add_scroller();
    }
  } else {
    add_scroller();
  }

  var hamburger = document.querySelector('.hamburger');
  if (hamburger && !hamburger.classList.contains('is-active')) {
    hamburger.addEventListener('click', function () {
      // Toggle the 'is-active' class
      hamburger.classList.toggle('is-active');
    });
  }

  // Menu overlay layout start
  var temp_overlay_menu = document.querySelector('#overlay-menu');
  if (temp_overlay_menu) {
    temp_overlay_menu.addEventListener('click', function () {
      var pcSidebar = document.querySelector('.pc-sidebar');
      menu_click(); // Assuming this initializes any menu interactions needed

      if (pcSidebar.classList.contains('pc-over-menu-active')) {
        remove_overlay_menu();
      } else {
        pcSidebar.classList.add('pc-over-menu-active');

        // Check if overlay already exists before adding
        if (!document.querySelector('.pc-menu-overlay')) {
          pcSidebar.insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>');

          // Add event listener to the overlay for removing menu and overlay on click
          document.querySelector('.pc-menu-overlay').addEventListener('click', function () {
            remove_overlay_menu();
            document.querySelector('.hamburger').classList.remove('is-active'); // Ensuring hamburger is deactivated
          });
        }
      }
    });
  }
  // Menu overlay layout end

  // Menu collapse click start
  var mobile_collapse_over = document.querySelector('#mobile-collapse');
  if (mobile_collapse_over) {
    mobile_collapse_over.addEventListener('click', function () {
      var temp_sidebar = document.querySelector('.pc-sidebar');
      if (temp_sidebar) {
        if (temp_sidebar.classList.contains('mob-sidebar-active')) {
          rm_menu(); // Close menu if already active
        } else {
          temp_sidebar.classList.add('mob-sidebar-active');

          // Only add the overlay if it doesn't already exist
          if (!document.querySelector('.pc-menu-overlay')) {
            temp_sidebar.insertAdjacentHTML('beforeend', '<div class="pc-menu-overlay"></div>');

            // Add event listener to remove the menu when overlay is clicked
            document.querySelector('.pc-menu-overlay').addEventListener('click', function () {
              rm_menu();
            });
          }
        }
      }
    });
  }
  // Menu collapse click end

  // Menu collapse click start
  var topbar_link_list = document.querySelectorAll('.pc-horizontal .topbar .pc-navbar > li > a');
  if (topbar_link_list.length) {
    topbar_link_list.forEach((link) => {
      link.addEventListener('click', function (e) {
        var targetElement = e.target;
        setTimeout(function () {
          var secondChild = targetElement.parentNode.children[1];
          if (secondChild) {
            secondChild.removeAttribute('style');
          }
        }, 1000);
      });
    });
  }
  // Menu collapse click end
  // Horizontal menu click js start
  var topbar_link_list = document.querySelectorAll('.pc-horizontal .topbar .pc-navbar > li > a');
  if (topbar_link_list) {
    topbar_link_list.forEach((link) => {
      link.addEventListener('click', function (e) {
        var targetElement = e.target;
        setTimeout(function () {
          targetElement.parentNode.children[1].removeAttribute('style');
        }, 1000);
      });
    });
  }
  // Horizontal menu click js end

  // header dropdown scrollbar start
  function initializeSimpleBar(selector) {
    const element = document.querySelector(selector);
    if (element) {
      new SimpleBar(element);
    }
  }
  // Initialize SimpleBar for message notification scroll
  initializeSimpleBar('.profile-notification-scroll');
  // Initialize SimpleBar for header notification scroll
  initializeSimpleBar('.header-notification-scroll');
  // header dropdown scrollbar end

  // component scrollbar start
  const cardBody = document.querySelector('.component-list-card .card-body');
  if (cardBody) {
    new SimpleBar(cardBody);
  }
  // component- dropdown scrollbar end

  // sidebar toggle event
  const sidebarHideBtn = document.querySelector('#sidebar-hide');
  const sidebar = document.querySelector('.pc-sidebar');

  if (sidebarHideBtn && sidebar) {
    sidebarHideBtn.addEventListener('click', () => {
      sidebar.classList.toggle('pc-sidebar-hide');
    });
  }

  // search dropdown trigger event
  const searchDrp = document.querySelector('.trig-drp-search');
  if (searchDrp) {
    searchDrp.addEventListener('shown.bs.dropdown', () => {
      const searchInput = document.querySelector('.drp-search input');
      if (searchInput) {
        searchInput.focus();
      }
    });
  }
});

// Menu click start
function add_scroller() {
  // Initialize menu click behavior
  menu_click();

  // Cache the navbar content element
  var navbarContent = document.querySelector('.navbar-content');

  // Check if the navbar content exists and SimpleBar is not already initialized
  if (navbarContent && !navbarContent.SimpleBar) {
    new SimpleBar(navbarContent);
  }
}

// Menu click start
function menu_click() {
  var vw = window.innerWidth;
  var menuItems = document.querySelectorAll('.pc-navbar li');

  // Remove previous click events
  menuItems.forEach((item) => {
    item.removeEventListener('click', function () {});
  });

  // Hide all submenus initially
  var subMenus = document.querySelectorAll('.pc-navbar li:not(.pc-trigger) .pc-submenu');
  subMenus.forEach((subMenu) => {
    subMenu.style.display = 'none';
  });

  // Event delegation for main menu items
  var navbar = document.querySelector('.pc-navbar');
  if (navbar) {
    navbar.addEventListener('click', function (event) {
      var target = event.target.closest('li.pc-hasmenu');

      if (target) {
        event.stopPropagation();
        toggleMenu(target);
      }
    });
  }

  // Helper function to toggle menus
  function toggleMenu(targetElement) {
    // Handle the current menu item
    if (targetElement.classList.contains('pc-trigger')) {
      targetElement.classList.remove('pc-trigger');
      slideUp(targetElement.children[1], 200);
      setTimeout(() => {
        targetElement.children[1].removeAttribute('style');
        targetElement.children[1].style.display = 'none';
      }, 200);
    } else {
      closeAllMenus(); // Close other open menus
      targetElement.classList.add('pc-trigger');
      slideDown(targetElement.children[1], 200);
    }
  }

  // Close all open menus
  function closeAllMenus() {
    var openMenus = document.querySelectorAll('li.pc-trigger');
    openMenus.forEach((menu) => {
      menu.classList.remove('pc-trigger');
      slideUp(menu.children[1], 200);
      setTimeout(() => {
        menu.children[1].removeAttribute('style');
        menu.children[1].style.display = 'none';
      }, 200);
    });
  }

  // Submenu click handling with event delegation
  var subMenuItems = document.querySelectorAll('.pc-navbar > li:not(.pc-caption) li');
  subMenuItems.forEach((subMenuItem) => {
    subMenuItem.addEventListener('click', function (event) {
      var target = event.target.closest('li');
      if (target) {
        event.stopPropagation();
        toggleSubMenu(target);
      }
    });
  });

  // Helper function to toggle submenus
  function toggleSubMenu(targetElement) {
    if (targetElement.classList.contains('pc-hasmenu')) {
      if (targetElement.classList.contains('pc-trigger')) {
        targetElement.classList.remove('pc-trigger');
        slideUp(targetElement.children[1], 200);
      } else {
        closeSiblingMenus(targetElement.parentNode.children);
        targetElement.classList.add('pc-trigger');
        slideDown(targetElement.children[1], 200);
      }
    }
  }

  // Close sibling menus
  function closeSiblingMenus(siblings) {
    Array.from(siblings).forEach((sibling) => {
      if (sibling.classList.contains('pc-trigger')) {
        sibling.classList.remove('pc-trigger');
        slideUp(sibling.children[1], 200);
      }
    });
  }
}

// hide menu in mobile menu
function rm_menu() {
  // Cache the necessary elements
  var sidebar = document.querySelector('.pc-sidebar');
  var topbar = document.querySelector('.topbar');
  var sidebarOverlay = document.querySelector('.pc-sidebar .pc-menu-overlay');
  var topbarOverlay = document.querySelector('.topbar .pc-menu-overlay');

  // Remove active class from sidebar if it exists
  if (sidebar) {
    sidebar.classList.remove('mob-sidebar-active');
  }

  // Remove active class from topbar if it exists
  if (topbar) {
    topbar.classList.remove('mob-sidebar-active');
  }

  // Remove sidebar overlay if it exists
  if (sidebarOverlay) {
    sidebarOverlay.remove();
  }

  // Remove topbar overlay if it exists
  if (topbarOverlay) {
    topbarOverlay.remove();
  }
}

// remove overlay
function remove_overlay_menu() {
  var sidebar = document.querySelector('.pc-sidebar');
  var topbar = document.querySelector('.topbar');
  var sidebarOverlay = document.querySelector('.pc-sidebar .pc-menu-overlay');
  var topbarOverlay = document.querySelector('.topbar .pc-menu-overlay');

  // Remove active class from sidebar
  if (sidebar) {
    sidebar.classList.remove('pc-over-menu-active');
  }

  // Remove active class from topbar if exists
  if (topbar) {
    topbar.classList.remove('mob-sidebar-active');
  }

  // Remove the overlay elements if they exist
  if (sidebarOverlay) {
    sidebarOverlay.remove();
  }

  if (topbarOverlay) {
    topbarOverlay.remove();
  }
}

// bootstrap componant
window.addEventListener('load', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  var toastElList = [].slice.call(document.querySelectorAll('.toast'));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
});

// active menu item list start
var elem = document.querySelectorAll('.pc-sidebar .pc-navbar a');
for (var l = 0; l < elem.length; l++) {
  var pageUrl = window.location.href.split(/[?#]/)[0];
  if (elem[l].href == pageUrl && elem[l].getAttribute('href') != '') {
    elem[l].parentNode.classList.add('active');

    elem[l].parentNode.parentNode.parentNode.classList.add('pc-trigger');
    elem[l].parentNode.parentNode.parentNode.classList.add('active');
    elem[l].parentNode.parentNode.style.display = 'block';

    elem[l].parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('pc-trigger');
    elem[l].parentNode.parentNode.parentNode.parentNode.style.display = 'block';
  }
}

// like event
var likeInputs = document.querySelectorAll('.prod-likes .form-check-input');
likeInputs.forEach(function (likeInput) {
  likeInput.addEventListener('change', function (event) {
    var parentElement = event.target.parentNode;

    if (event.target.checked) {
      // Append like animation HTML
      parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="pc-like">
          <div class="like-wrapper">
            <span>
              <span class="pc-group">
                <span class="pc-dots"></span>
                <span class="pc-dots"></span>
                <span class="pc-dots"></span>
                <span class="pc-dots"></span>
              </span>
            </span>
          </div>
        </div>`
      );

      // Add animation class
      parentElement.querySelector('.pc-like').classList.add('pc-like-animate');

      // Remove the like animation after 3 seconds
      setTimeout(function () {
        var likeElement = parentElement.querySelector('.pc-like');
        if (likeElement) {
          likeElement.remove();
        }
      }, 3000);
    } else {
      // Remove the like animation if it exists
      var likeElement = parentElement.querySelector('.pc-like');
      if (likeElement) {
        likeElement.remove();
      }
    }
  });
});

// authentication logo
// Select all elements with the class 'img-brand' inside '.auth-main.v2'
var tc = document.querySelectorAll('.auth-main.v2 .img-brand');

// Loop through each selected element
for (var t = 0; t < tc.length; t++) {
  // Change the 'src' attribute to the new logo path
  tc[t].setAttribute('src', '../assets/images/logo-white.svg');
}

// =======================================================
// =======================================================

function removeClassByPrefix(node, prefix) {
  for (let i = 0; i < node.classList.length; i++) {
    let value = node.classList[i];
    if (value.startsWith(prefix)) {
      node.classList.remove(value);
    }
  }
}

let slideUp = (target, duration = 0) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
};

let slideDown = (target, duration = 0) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none') display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

var slideToggle = (target, duration = 0) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

// =======================================================
// =======================================================
