// export default class Form {
//   constructor(element) {
//     this.element = element;
//     this.form = document.getElementById('form');
//     this.submitBtn = this.form.querySelector('button[type="submit"]');

//     this.init();
//   }
//   init() {
//     this.form.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const formData = new FormData(this.form);
//       formData.append('access_key', '99780f1c-9a85-460d-a94c-e8c1e489f5ff');

//       const originalText = this.submitBtn.textContent;

//       this.submitBtn.textContent = 'Sending...';
//       this.submitBtn.disabled = true;

//       try {
//         const response = await fetch('https://api.web3forms.com/submit', {
//           method: 'POST',
//           body: formData,
//         });

//         const data = await response.json();

//         if (response.ok) {
//           alert('success!');
//           this.form.reset();
//         } else {
//           alert('Error: ' + data.message);
//         }
//       } catch (error) {
//         alert('something went wrong');
//       } finally {
//         this.submitBtn.textContent = originalText;
//         this.submitBtn.disabled = false;
//       }
//     });
//   }
// }
