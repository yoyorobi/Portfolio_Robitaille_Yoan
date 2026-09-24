import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export default class Scroller {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    this.options = {
      hasPinItems: false,
    };
    this.element = element;
    this.setOptions();
    this.init();
  }
  init() {
    const scroller = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.3,
      //   onUpdate: this.onUpdateScroll.bind(this),
      //   onStop: this.onStopScroll.bind(this),
      ease: 'expo.out',
    });
  }

  initPins() {
    console.log('pin');
    const pinnedItems = this.element.querySelectorAll('.js-pinned');
    for (let i = 0; i < pinnedItems.length; i++) {
      const pinnedItem = pinnedItems[i];
      ScrollTrigger.create({
        pin: pinnedItem,
        trigger: pinnedItem.parentElement,
        pinSpacing: false,
        start: '0 10%',
        end: '90% center',
        markers: true,
      });
    }
    // projets.addEventListenener('click')
    // https://gsap.com/community/forums/topic/31740-scrollsmoother-with-jump-links-does-not-work/
    // https://gsap.com/docs/v3/Plugins/ScrollToPlugin/
    // https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTo()/
  }

  /*initHoriz() {
    const sectionHoriz = this.element.querySelector('.js-horiz');

    const panels = sectionHoriz.querySelectorAll('.js-panel');
    const nbPanels = panels.length - 1;
    const buffer = 200;

    gsap.to(panels, {
      xPercent: -100 * nbPanels,
      ease: 'none',
      scrollTrigger: {
        pin: true,
        pinSpacing: false,
        trigger: sectionHoriz,
        scrub: 1,
        end: () => '+=' + (sectionHoriz.offsetWidth + buffer),
      },
    });
  }*/

  setOptions() {
    if ('pinItems' in this.element.dataset) {
      this.options.hasPinItems = true;
      console.log('test');
      this.initPins();
    }
    if (this.element.querySelector('.js-horiz')) {
      this.initHoriz();
    }
  }
}
