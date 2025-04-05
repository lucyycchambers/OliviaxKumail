document.querySelectorAll('input[name="attending"]').forEach(input => {
    input.addEventListener('change', () => {
        const attendingInputYes = document.getElementById('yes');
        const eventInputs = document.querySelectorAll('input[name="event"]');

        if (!attendingInputYes.checked) {
            eventInputs.forEach(eventInput => {
                eventInput.setCustomValidity('');
            });
        }
        document.getElementById('yes').setCustomValidity('');
        document.getElementById('no').setCustomValidity('');
    });
});

// emailjs.init(""); Removed for privacy

const eventNames = {
    'mehndi': 'Mehndi',
    'wedding': 'Wedding',
};

const contactForm = document.getElementById("rsvp-form");
const messageSent = document.getElementById("message-sent");
const submitButton = document.getElementById("submit-btn");
const rsvpBanner = document.querySelector(".rsvp-banner");
const rsvpImage = document.querySelector(".rsvp-image");
const rsvp = document.querySelector(".rsvp-form-container");
const errorMessage = document.getElementById("error-message");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const events = document.querySelectorAll('input[name="event"]:checked');
    const attendingInputYes = document.getElementById('yes');
    const attendingInputNo = document.getElementById('no');
    const nameInput = document.getElementById('name-input');

    if (!nameInput.checkValidity()) {
        nameInput.reportValidity();
        return;
    }

    if (!attendingInputYes.checked && !attendingInputNo.checked) {
        attendingInputNo.setCustomValidity('Please specify if you will be attending.');
        attendingInputNo.reportValidity();
        return;
    }

    if (attendingInputYes.checked && events.length === 0) {
        document.querySelectorAll('input[name="event"]').forEach(eventInput => {
            eventInput.setCustomValidity('Please select which events you will be attending.');
            eventInput.reportValidity(); 
        });
        return;
    } else {
        document.querySelectorAll('input[name="event"]').forEach(eventInput => {
            eventInput.setCustomValidity(''); 
        });
    }

    submitButton.innerHTML = 'Submitting...';

    const messageInput = document.getElementById('message-input');
    const dietaryInput = document.getElementById('dietary-input');
    const attending = attendingInputYes.checked ? 'Yes' : (attendingInputNo.checked ? 'No' : '');
    const eventsAttending = Array.from(document.querySelectorAll('input[name="event"]:checked')).map(event => {
        return eventNames[event.value] || event.value; 
    });

    const data = {
        name: nameInput.value,
        attending: attending,
        events: eventsAttending.join(', '),
        dietary_requirements: dietaryInput.value,
        message: messageInput.value,
    };

    emailjs.send("service_bvzq92l", "template_e5mjh0e", data)
    .then((response) => {
        console.log("Email sent:", response);
        contactForm.style.display = "none";
        messageSent.style.display = "flex"; 
        rsvpBanner.style.display = "none";  
        rsvpImage.style.display = "none";
        rsvp.style.display = "none";
    })
    .catch((error) => {
        console.error("Error sending email:", error);
        errorMessage.style.display = "block";
        })
    .finally(() => {
        submitButton.innerHTML = "Submit";
    });
});

messageSent.addEventListener("click", function() {
    messageSent.style.display = "none";
    contactForm.style.display = "block";
    rsvpBanner.style.display = "block";  
    rsvpImage.style.display = "block";
    rsvp.style.display = "block";

    document.querySelectorAll('input[name="event"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="attending"]').forEach(input => input.checked = false);
    document.getElementById('name-input').value = '';
    document.getElementById('message-input').value = '';
    document.getElementById('dietary-input').value = '';
});

document.querySelectorAll('input[name="attending"]').forEach(input => {
    input.addEventListener('change', () => {
        document.getElementById('yes').setCustomValidity('');
        document.getElementById('no').setCustomValidity('');
    });
});

document.querySelectorAll('input[name="event"]').forEach(input => {
    input.addEventListener('change', () => {
        if (document.querySelectorAll('input[name="event"]:checked').length > 0) {
            document.querySelectorAll('input[name="event"]').forEach(eventInput => {
                eventInput.setCustomValidity('');
            });
        }
    });
});

document.getElementById('message-sent').addEventListener('click', function() {
    this.style.display = 'none';
    document.querySelector('.rsvp-form-container').style.display = 'block';
});
