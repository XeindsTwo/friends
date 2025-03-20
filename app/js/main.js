const html = document.documentElement;
const menuBtn = document.querySelector('.menu-btn');
const headerNav = document.querySelector('.header__mobile');
const anchors = document.querySelectorAll('a.header__link.mobile');

menuBtn.addEventListener('click', () => {
  menuBtn.blur();
  html.classList.toggle('active');
  menuBtn.classList.toggle('active');
  headerNav.classList.toggle('active');
});

function scrollToTarget(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    html.classList.remove('active');
    headerNav.classList.remove('active');
    menuBtn.classList.remove('active');
    setTimeout(() => {
      const targetOffset = targetSection.offsetTop - 30;
      window.scrollTo({top: targetOffset, behavior: 'smooth'});
    }, 400);
  }
}

function handleAnchorClick(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const hrefParts = href.split('#');
  if (hrefParts.length === 2) {
    const targetId = '#' + hrefParts[1];
    scrollToTarget(targetId);
  }
}

for (const anchor of anchors) {
  anchor.addEventListener('click', handleAnchorClick);
  anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
}

document.querySelectorAll(".desktop").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 40;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});

const bigBall = document.querySelector('.cursor__ball--big');
const smallBall = document.querySelector('.cursor__ball--small');
const hoverables = document.querySelectorAll('.hoverable');

if (isTouchDevice()) {
  bigBall.style.display = 'none';
  smallBall.style.display = 'none';
} else {
  document.body.addEventListener('mousemove', onMouseMove);
  hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', onMouseHover);
    hoverable.addEventListener('mouseleave', onMouseHoverOut);
  });
}

function onMouseMove(e) {
  const { clientX, clientY } = e;
  TweenMax.to(bigBall, .4, {
    x: clientX - 15,
    y: clientY - 15
  });
  TweenMax.to(smallBall, .1, {
    x: clientX - 5,
    y: clientY - 7
  });
}

function onMouseHover() {
  TweenMax.to(bigBall, .3, {
    scale: 3
  });
}

function onMouseHoverOut() {
  TweenMax.to(bigBall, .3, {
    scale: 1
  });
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

document.addEventListener("DOMContentLoaded", function () {
  const dateElements = document.querySelectorAll(".home__date");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  dateElements.forEach(el => {
    el.textContent = formattedDate;
  });
});

const marqueeContent = document.querySelector('.marquee-content');
const marqueeItems = document.querySelectorAll('.marquee-content li');

marqueeItems.forEach(item => {
  const clone = item.cloneNode(true);
  marqueeContent.appendChild(clone);
});