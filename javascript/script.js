// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})

// typed js effect
var typed = new Typed(".typing-text", {
    strings: ["Web Development", "Software Development", "UI/UX Design", "Graphic Design"],
    loop: true,
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 500,
});

// Animated Statistics Counter
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.about-stats');
  const counters = document.querySelectorAll('.count');
  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 2000; // total animation duration in ms
    const startTime = performance.now();

    const easeOutQuad = (t) => t * (2 - t); // easing function

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // cap at 1
      const easedProgress = easeOutQuad(progress);
      const currentValue = Math.round(easedProgress * target);

      el.textContent = `+${currentValue}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `+${target}`; // ensure exact target
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      counters.forEach(animateCounter);
      hasAnimated = true;
      observer.disconnect(); // no re-triggering
    }
  }, {
    threshold: 0.4
  });

  if (statsSection) {
    observer.observe(statsSection);
  }
});


// switch between about buttons 
const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    contents.forEach(content => content.style.display = 'none');
    contents[index].style.display = 'block';
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// portfolio fillter 
const buttons2 = document.querySelectorAll('.fillter-buttons button');
buttons2.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons2.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
});

var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});

// modal portfolio window
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const modalIcons = document.getElementById('modal-icons'); // Pour les icônes de stack
  const closeBtn = document.querySelector('.modal-close');
  const openButtons = document.querySelectorAll('.open-modal');

  // Fonction pour charger les images dans Swiper
  let swiperInstance = null;
  function loadGallery(images = []) {
    const wrapper = document.getElementById('modal-swiper-wrapper');
    wrapper.innerHTML = ''; // reset

    images.forEach(src => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${src}" alt="Project preview">`;
      wrapper.appendChild(slide);
    });

    if (swiperInstance) swiperInstance.destroy(true, true);
    swiperInstance = new Swiper('.modal-swiper', {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: '.modal-swiper .swiper-button-next', // scoped inside modal
            prevEl: '.modal-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.modal-swiper .swiper-pagination',
            clickable: true,
        },
    });
  }

  // Fonction pour afficher les icônes devicon
  const iconMap = {
    html: 'devicon-html5-plain',
    css: 'devicon-css3-plain',
    javascript: 'devicon-javascript-plain',
    php: 'devicon-php-plain',
    mysql: 'devicon-mysql-plain',
    react: 'devicon-react-original',
    flutter: 'devicon-flutter-plain',
    dart: 'devicon-dart-plain',
    nodejs: 'devicon-nodejs-plain',
    figma: 'devicon-figma-plain',
    python: 'devicon-python-plain',
    'c++': 'devicon-cplusplus-plain'
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      modalTitle.textContent = btn.dataset.title;
      modalDesc.textContent = btn.dataset.desc;
      modalLink.href = btn.dataset.link;

      const images = btn.dataset.images?.split(',') || [];
      loadGallery(images);

      // Injecte les icônes devicon
      modalIcons.innerHTML = '';
      const stack = btn.dataset.stack?.split(',') || [];
      stack.forEach(tech => {
        const key = tech.trim().toLowerCase();
        const iconClass = iconMap[key];
        if (iconClass) {
          const icon = document.createElement('i');
          icon.className = iconClass;
          icon.title = key;
          modalIcons.appendChild(icon);
        }
      });

      modal.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  // Fermeture modale
  const closeModal = () => {
    modal.close();
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const blogSwiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".blog-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".blog-next",
      prevEl: ".blog-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
});


// side progress bar 
let calcScrollValue = ()=>{
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);
    
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click",()=>{
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#081b29 ${scrollValue}%,#00abf0 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);

// scroll reveal

ScrollReveal({ 
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });
