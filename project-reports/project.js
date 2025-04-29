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

    // Function to restore scroll
    function restoreScroll() {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }

    // Razorpay integration for Download buttons
    document.querySelectorAll('.payment-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const projectName = getProjectName(this);
            const amount = parseInt(this.getAttribute('data-amount')) * 100; // Convert to paise

            const options = {
                "key": "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
                "amount": amount,
                "currency": "INR",
                "name": projectName,
                "description": "Civil Project Report Payment",
                "handler": function (response) {
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
                },
                "modal": {
                    "ondismiss": function() {
                        restoreScroll(); // Restore scroll when Razorpay modal is closed
                    }
                }
            };

            const rzp1 = new Razorpay(options);

            // Event listener for any modal events to ensure scroll is restored
            rzp1.on('payment.failed', restoreScroll);
            rzp1.on('payment.captured', restoreScroll);
            rzp1.on('payment.cancelled', restoreScroll);

            // Open Razorpay modal
            rzp1.open();

            // Disable body scroll when Razorpay modal is open
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
        });
    });

    // WhatsApp redirect for Order Project buttons
    document.querySelectorAll('.order-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const projectName = getProjectName(this);
            const whatsappNumber = "919360438998"; // WhatsApp number without '+' or spaces
            const message = encodeURIComponent(`Hello, I would like to order the project: ${projectName}`);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    });

    // Ensure scroll is restored on page load (in case it was stuck previously)
    window.addEventListener('load', restoreScroll);
