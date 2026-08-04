function openBookingModal(id, name, price) {
    document.getElementById('modalSpaceId').value = id;
    document.getElementById('modalTitle').innerText = `Booking: ${name}`;
    document.getElementById('bookingModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('bookingForm').reset();
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    const payload = {
        workspace_id: document.getElementById('modalSpaceId').value,
        name: document.getElementById('custName').value,
        email: document.getElementById('custEmail').value,
        date: document.getElementById('bookDate').value,
        hours: document.getElementById('bookHours').value
    };

    try {
        const response = await fetch('/api/book/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Booking successful! Booking ID: ' + result.booking_id);
            closeModal();
            window.location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (err) {
        alert('Connection error. Please try again.');
    }
}
