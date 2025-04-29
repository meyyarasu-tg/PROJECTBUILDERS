// Function to retrieve the project name based on the button's position in the DOM
function getProjectName(button) {
    // Start from the button's parent element
    let projectItem = button.closest('.project-item');

    // Traverse previous siblings to find the project name
    while (projectItem) {
        projectItem = projectItem.previousElementSibling;
        if (projectItem && projectItem.classList.contains('project-item') && !projectItem.querySelector('button')) {
            return projectItem.textContent.trim();
        }
    }
    return 'Unknown Project';
}

// Razorpay integration for Download buttons
document.querySelectorAll('.payment-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const projectName = getProjectName(this);
        const amount = parseInt(this.getAttribute('data-amount')) * 50; // Convert to paise

        const options = {
            "key": "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
            "amount": amount,
            "currency": "INR",
            "name": projectName,
            "description": "Civil Project Report Payment",
            "handler": function (response){
                alert("Payment successful for " + projectName);
                // Implement download logic here if needed
            },
            "prefill": {
                "name": "",
                "email": "",
                "contact": ""
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    });
});

// WhatsApp redirect for Order Project buttons
document.querySelectorAll('.order-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const projectName = getProjectName(this);
        const whatsappNumber = "919360438998"; // WhatsApp number without '+' or spaces
        const message = encodeURIComponent(`Hello, I would like to order the project: ${projectName}`);
        const whatsappURL = `https://wa.me/${919360438998}?text=${message}`;
        window.open(whatsappURL, '_blank');
    });
});