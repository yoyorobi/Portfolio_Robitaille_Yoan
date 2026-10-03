export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      threshold: 0.1,
      show: false,
    };
    this.html = document.documentElement;

    this.scrollPosition = 0;
    this.lastScrollPosition = 0;

    this.init();
    this.initNavMobile();
  }
  init() {
    this.setOptions();
    if (!this.options.show) {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  setOptions() {
    // Vérifier les difféerents data sur la composante
    if ('threshold' in this.element.dataset) {
      this.options.threshold = this.element.dataset.threshold;
    }
    if ('alwaysShow' in this.element.dataset) {
      this.options.show = true;
    }
  }

  onScroll() {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirections();
  }

  setHeaderState() {
    if (
      this.scrollPosition >
      document.scrollingElement.scrollHeight * this.options.threshold
    ) {
      this.html.classList.add('header-is-hidden');
    } else if (this.scrollPosition < this.lastScrollPosition) {
      this.html.classList.remove('header-is-hidden');
    }
  }

  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      //scroll vers le bas
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      //scroll vers le haut
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
