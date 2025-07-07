const main = document.querySelector('main.main');
const footer = document.getElementById('footer'); 

function setupNavToggle() {
  const navigation = document.getElementById('navigation');
  const navigationToggleBtn = document.querySelector('.navigation-toggle');

  if (!navigation || !navigationToggleBtn) return;

  navigationToggleBtn.addEventListener('click', function () {
    togglenavigation();

    if (navigation.classList.contains('navigation-show')) {
      navigationToggleBtn.classList.remove('bi-list');
      navigationToggleBtn.classList.add('bi-x');
    } else {
      navigationToggleBtn.classList.add('bi-list');
      navigationToggleBtn.classList.remove('bi-x');
    }
  });

  handleResponsiveNavigation();

  window.addEventListener('resize', handleResponsiveNavigation);
}

function handleResponsiveNavigation() {
  const navigation = document.getElementById('navigation');
  if (!navigation) return;

  if (window.innerWidth >= 800) {
    navigation.classList.add('navigation-show');
    navigation.style.left = '0';
    main.style.marginLeft = '300px';
    footer.style.marginLeft = '300px';
  } else {
    navigation.classList.remove('navigation-show');
    navigation.style.left = '-300px';
    main.style.marginLeft = '0';
    footer.style.marginLeft = '0';
  }
}

function togglenavigation() {
  const navigation = document.getElementById('navigation');
  const isShown = navigation.classList.contains('navigation-show');

  if (isShown) {
    navigation.classList.remove('navigation-show');
    navigation.style.left = '-300px';
    main.style.marginLeft = '0';
    footer.style.marginLeft = '0';
  } else {
    navigation.classList.add('navigation-show');
    navigation.style.left = '0';
    main.style.marginLeft = '300px';
    footer.style.marginLeft = '300px';
  }
}

// Load navigation.html into the #navigation-include div
// and initialize toggle after it's loaded

document.addEventListener("DOMContentLoaded", function() {
  const navInclude = document.getElementById('navigation-include');
  if (navInclude) {
    fetch('navigation.html')
      .then(response => response.text())
      .then(html => {
        navInclude.innerHTML = html;
        setupNavToggle();
      });
  }
});

// Scrollspy for nav links
(function() {
  function navmenuScrollspy() {
    const navmenulinks = document.querySelectorAll('.navmenu a');
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();