const header = document.getElementById('header');
const headerToggleBtn = document.getElementById('header-toggle');
const main = document.querySelector('main.main');
const footer = document.getElementById('footer'); 


// dynamic highlights for scrolling on index
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

// DOM LOADER
  document.addEventListener('DOMContentLoaded', function () {
    function setupNavToggle() {

      // Correctly assign toggleHeader to the header-toggle button
      // Make sure you are selecting the correct element:
      // The button in your HTML is: <i class="header-toggle d-xl-none bi bi-list"></i>
      // So use querySelector('.header-toggle') instead of getElementById('header-toggle')
      const headerToggleBtn = document.querySelector('.header-toggle');
      if (headerToggleBtn) {
        headerToggleBtn.addEventListener('click', function () {
          toggleHeader();
        });
      }


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
  });

function toggleHeader() {
    const header = document.getElementById('header');
    const main = document.querySelector('main.main');
    const footer = document.getElementById('footer');
    const headerToggleBtn = document.querySelector('.header-toggle');
    const isShown = header.classList.contains('header-show');

    if (isShown) {
        header.classList.remove('header-show');
        header.setAttribute('visibility', 'hidden');
        document.body.classList.remove('nav-open');
        if (headerToggleBtn) {
            headerToggleBtn.classList.add('bi-list');
            headerToggleBtn.classList.remove('bi-x');
        }
        if (main) main.style.marginLeft = '';
        if (footer) footer.style.marginLeft = '';
    } else {
        header.classList.add('header-show');
                header.setAttribute('visibility', 'visible');

        document.body.classList.add('nav-open');
        if (headerToggleBtn) {
            headerToggleBtn.classList.remove('bi-list');
            headerToggleBtn.classList.add('bi-x');
        }
        if (main) main.style.marginLeft = '300px';
        if (footer) footer.style.marginLeft = '300px';
    }
}


