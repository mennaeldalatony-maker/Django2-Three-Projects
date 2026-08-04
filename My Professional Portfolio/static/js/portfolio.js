document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const message = document.getElementById('senderMessage').value;

            const myEmail = "mennaeldalatony@gmail.com";

            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Hello Menna,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;

            window.open(gmailUrl, '_blank');
        });
    }
});