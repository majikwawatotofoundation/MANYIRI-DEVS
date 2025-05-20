document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  (function () {
    try {
      emailjs.init("vOp_-MaeIZu5dXWMM"); // Verify User ID
    } catch (error) {
      console.error('EmailJS initialization failed:', error);
      showNotification('Failed to initialize email service. Please try again later or contact us via WhatsApp at +254 (0) 797 211 294.', 'error');
    }
  })();

  // Notification helper function
  function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden', 'success', 'error');
    notification.classList.add(type, 'visible');
    // Auto-hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('visible');
      notification.classList.add('hidden');
    }, 3000);
  }

  // Form submission
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect and trim form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form fields
    if (!name || !email || !subject || !message) {
      showNotification('Please fill all fields before submitting!', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address!', 'error');
      return;
    }

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Send data via EmailJS
    emailjs
      .send('service_jedfpcf', 'template_dwkb6sw', {
        name: name,
        email: email,
        subject: subject,
        message: message,
      })
      .then(
        (response) => {
          showNotification(
            'Message sent successfully! Thanks for reaching out to Manyiri Developers. We’ll get back to you soon!',
            'success'
          );
          console.log('SUCCESS!', response.status, response.text);
          form.reset();
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        },
        (error) => {
          let errorMessage = 'Oops! Something went wrong while sending your message. Please try again or contact us via WhatsApp at +254 (0) 797 211 294.';
          if (error && typeof error.text === 'string' && error.text.includes('CORS')) {
            errorMessage = 'Network error (CORS). Please try submitting from a hosted website or contact us via WhatsApp at +254 (0) 797 211 294.';
          } else if (error && error.status === 400) {
            errorMessage = 'Invalid service or template configuration. Please contact us via WhatsApp at +254 (0) 797 211 294.';
          }
          showNotification(errorMessage, 'error');
          console.error('FAILED...', {
            status: error.status || 'Unknown',
            text: error.text || 'No text available',
            error,
          });
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      );
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize EmailJS with your public key
//     (function() {
//         emailjs.init("jxlssNq_4XslK_qqb"); // Your EmailJS user ID
//     })();
  
//     // Listener for the contact form submission
//     document.getElementById("contact-form").addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission
  
//         // Collect the form data
//         const name = document.getElementById('name').value.trim();
//         const email = document.getElementById('email').value.trim();
//         const subject = document.getElementById('subject').value.trim();
//         const message = document.getElementById('message').value.trim();
        
  
//         // Validate the form fields
//         if (!name || !email || !subject || !message) {
//             alert('Please fill all fields before submitting!');
//             return; // Exit if any field is empty
//         }
  
//         // Send the data via Email.js
//         emailjs.send("service_uou2zeg", "template_he0w2vo", { 
//             name: name,
//             email: email,
//             subject:subject,
//             message:message
            
        
//         }).then(function(response) {
//             // Success message
//             alert('Your message has been successfully sent! Thank you for reaching out to Manyiri Developers. Our team will review your inquiry and respond as soon as possible. We look forward to assisting you.');
//             console.log('SUCCESS!', response); // Log success response
//         }, function(error) {
//             // Error message
//             alert('Failed to send. Please try again.');
//             console.error('FAILED...', error); // Log error response
//         });
//     });
//   });