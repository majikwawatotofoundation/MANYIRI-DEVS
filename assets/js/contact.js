// document.addEventListener('DOMContentLoaded', () => {
//   (function () {
//     try {
//       emailjs.init("vOp_-MaeIZu5dXWMM");
//     } catch (error) {
//       console.error('EmailJS initialization failed:', error);
//       alert('Failed to initialize email service. Please try again later or contact us via WhatsApp at +254 (0) 797 211 294.');
//     }
//   })();
//   const form = document.getElementById("contact-form");
//   const submitButton = form.querySelector('button[type="submit"]');
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const name = document.getElementById('name-field').value.trim();
//     const email = document.getElementById('email-field').value.trim();
//     const subject = document.getElementById('subject-field').value.trim();
//     const message = document.getElementById('message-field').value.trim();
//     if (!name || !email || !subject || !message) {
//       alert('Please fill all fields before submitting!');
//       return;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert('Please enter a valid email address!');
//       return;
//     }
//     submitButton.disabled = true;
//     submitButton.textContent = 'Sending...';
//     emailjs
//       .send("service_gu4cutl", "template_dwkb6sw", {
//         name: name,
//         email: email,
//         subject: subject,
//         message: message,
//       })
//       .then(
//         (response) => {
//           alert(
//             "Thanks for reaching out to Manyiri Developers! We’ve received your message and someone from our growing network will get back to you soon. Let’s build something great together."
//           );
//           console.log('SUCCESS!', response.status, response.text);
//           form.reset();
//           submitButton.disabled = false;
//           submitButton.textContent = 'Send Message';
//         },
//         (error) => {
//           let errorMessage = 'Oops! Something went wrong while sending your message. Please try again or contact us via WhatsApp at +254 (0) 797 211 294.';
//         //   if (error.text.includes('CORS')) {
//         //     errorMessage = 'Network error (CORS). Please try submitting from a hosted website or contact us via WhatsApp at +254 (0) 797 211 294.';
//         //   } else if (error.status === 400) {
//         //     errorMessage = 'Invalid service or template configuration. Please contact us via WhatsApp at +254 (0) 797 211 294.';
//         //   }
//           alert(errorMessage);
//           console.error('FAILED...', error.status, error.text);
//           submitButton.disabled = false;
//           submitButton.textContent = 'Send Message';
//         }
//       );
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init("jxlssNq_4XslK_qqb"); // Your EmailJS user ID
    })();
  
    // Listener for the contact form submission
    document.getElementById("contact-form").addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        // Collect the form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
  
        // Validate the form fields
        if (!name || !email || !subject || !message) {
            alert('Please fill all fields before submitting!');
            return; // Exit if any field is empty
        }
  
        // Send the data via Email.js
        emailjs.send("service_uou2zeg", "template_he0w2vo", { 
            name: name,
            email: email,
            subject:subject,
            message:message
            
        
        }).then(function(response) {
            // Success message
            alert('Your message has been successfully sent! Thank you for reaching out to Manyiri Developers. Our team will review your inquiry and respond as soon as possible. We look forward to assisting you.');
            console.log('SUCCESS!', response); // Log success response
        }, function(error) {
            // Error message
            alert('Failed to send. Please try again.');
            console.error('FAILED...', error); // Log error response
        });
    });
  });