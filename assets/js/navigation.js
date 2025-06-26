// Highlight nav links based on scroll position (scrollspy)
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

  // Navigation toggle for small screens
  document.addEventListener('DOMContentLoaded', function () {
    function setupNavToggle() {
      const header = document.getElementById('header');
      const headerToggleBtn = document.querySelector('.header-toggle');
      if (!header || !headerToggleBtn) return;

      function toggleNav() {
        if (window.innerWidth < 800) {
          header.classList.toggle('header-show');
          headerToggleBtn.classList.toggle('bi-list');
          headerToggleBtn.classList.toggle('bi-x');
          document.body.classList.toggle('nav-open');
        }
      }

      headerToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNav();
        // Shift content when nav is shown/hidden on small screens
        const main = document.querySelector('main.main');
        const footer = document.getElementById('footer');
        if (window.innerWidth < 800) {
          if (header.classList.contains('header-show')) {
            if (main) main.style.marginLeft = '300px';
            if (footer) footer.style.marginLeft = '300px';
          } else {
            if (main) main.style.marginLeft = '';
            if (footer) footer.style.marginLeft = '';
          }
        }
      });

      document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', function () {
            header.classList.remove('header-show');
            headerToggleBtn.classList.add('bi-list');
            headerToggleBtn.classList.remove('bi-x');
            document.body.classList.remove('nav-open');
            // Reset content shift on nav close
            const main = document.querySelector('main.main');
            const footer = document.getElementById('footer');
            if (main) main.style.marginLeft = '';
            if (footer) footer.style.marginLeft = '';
        });
      });

      window.addEventListener('resize', function () {
        const main = document.querySelector('main.main');
        const footer = document.getElementById('footer');
        if (window.innerWidth >= 800) {
          header.classList.add('header-show');
          headerToggleBtn.classList.add('bi-list');
          headerToggleBtn.classList.remove('bi-x');
          document.body.classList.remove('nav-open');
            if (main) main.style.marginLeft = '300px';
            if (footer) footer.style.marginLeft = '300px';
        } else {
          header.classList.remove('header-show');
          headerToggleBtn.classList.add('bi-list');
          headerToggleBtn.classList.remove('bi-x');
          document.body.classList.remove('nav-open');
          if (main) main.style.marginLeft = '';
          if (footer) footer.style.marginLeft = '';
        }
      });

      // Set initial state
      if (window.innerWidth >= 800) {
        header.classList.add('header-show');
      } else {
        header.classList.remove('header-show');
      }
    }

    // If loaded dynamically, wait for insertion
    if (!document.getElementById('header')) {
      setTimeout(setupNavToggle, 100);
    } else {
      setupNavToggle();
    }
  });(function() {
  function initHeaderNav() {
    const headerToggleBtn = document.querySelector('.header-toggle');
    if (!headerToggleBtn) return;
    function headerToggle() {
      document.querySelector('#header').classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
      document.body.classList.toggle('nav-open');
    }
    headerToggleBtn.addEventListener('click', headerToggle);
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('#header').classList.contains('header-show')) {
          headerToggle();
        }
      });
    });
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }
  // Wait for navigation to be loaded into the DOM
  document.addEventListener('DOMContentLoaded', function() {
    // If navigation is loaded dynamically, wait a tick
    setTimeout(initHeaderNav, 0);
  });
})();
