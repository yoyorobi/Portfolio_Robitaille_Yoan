export default class Form {
  constructor(element) {
    this.element = element;
    this.options = {
      sendingMessage: 'Envoi en cours...',
      successMessage: 'Merci! Ton message a bien été envoyé.',
      errorMessage: 'Une erreur est survenue, réessaie.',
      hideDelay: 0,
    };

    this.button = this.element.querySelector('[type="submit"]');
    this.result = null;
    this.timeout = null;

    this.init();
  }

  init() {
    this.setOptions();
    this.initResult();
    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  setOptions() {
    // Vérifier les différents data sur la composante
    if ('sendingMessage' in this.element.dataset) {
      this.options.sendingMessage = this.element.dataset.sendingMessage;
    }
    if ('successMessage' in this.element.dataset) {
      this.options.successMessage = this.element.dataset.successMessage;
    }
    if ('errorMessage' in this.element.dataset) {
      this.options.errorMessage = this.element.dataset.errorMessage;
    }
    if ('hideDelay' in this.element.dataset) {
      this.options.hideDelay = parseInt(this.element.dataset.hideDelay, 10);
    }
  }

  initResult() {
    // Utilise l'élément .js-form-result s'il existe, sinon le crée
    this.result = this.element.querySelector('.js-form-result');

    if (!this.result) {
      this.result = document.createElement('p');
      this.result.classList.add('form__result', 'js-form-result');
      this.element.appendChild(this.result);
    }

    this.result.setAttribute('aria-live', 'polite');
  }

  async onSubmit(event) {
    // Empêche le redirect vers la page de Web3Forms
    event.preventDefault();
    const formData = new FormData(this.element);
    const fullName = `${formData.get('fname')} ${formData.get('lname')}`.trim();
    this.setState('is-sending', this.options.sendingMessage);
    formData.set('subject', `Nouveau message de ${fullName}`);
    formData.set('name', fullName);

    try {
      const response = await fetch(this.element.action, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        this.setState('is-success', this.options.successMessage);
        this.element.reset();
      } else {
        this.setState('is-error', this.options.errorMessage);
      }
    } catch (error) {
      this.setState('is-error', this.options.errorMessage);
    }
  }

  setState(state, message) {
    this.element.classList.remove('is-sending', 'is-success', 'is-error');
    this.element.classList.add(state);
    this.result.textContent = message;

    if (this.button) {
      this.button.disabled = state === 'is-sending';
    }

    // Cache le message de succès après un délai (si data-hide-delay est défini)
    clearTimeout(this.timeout);
    if (state === 'is-success' && this.options.hideDelay > 0) {
      this.timeout = setTimeout(
        this.clearState.bind(this),
        this.options.hideDelay,
      );
    }
  }

  clearState() {
    this.element.classList.remove('is-sending', 'is-success', 'is-error');
    this.result.textContent = '';
  }
}
