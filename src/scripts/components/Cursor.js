export default class Cursor {
  constructor() {
    this.init();
  }

  init() {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (event) => {
      const { width, height } = cursor.getBoundingClientRect();

      cursor.style.left = `${event.clientX - width / 2}px`;
      cursor.style.top = `${event.clientY - height / 2}px`;
    });

    var text = Array.from(document.querySelectorAll('a'));

    text.forEach((text) => {
      text.addEventListener('mousemove', function () {
        cursor.classList.add('hover-cursor');
      });
      text.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover-cursor');
      });
    });
  }
}
