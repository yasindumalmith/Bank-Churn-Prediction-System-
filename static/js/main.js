// Interaction logic for Hero Section
document.addEventListener("DOMContentLoaded", () => {
    const learnMoreBtn = document.getElementById("learn-more-btn");
    const closeCardBtn = document.getElementById("close-card-btn");
    const heroContent = document.getElementById("hero-content");
    const whyMattersContainer = document.getElementById("why-matters-container");
    const heroButtons = document.getElementById("hero-buttons");
    const heroDesc = document.getElementById("hero-desc");

    if (learnMoreBtn && closeCardBtn) {
        learnMoreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Switch to left-aligned 2-column layout
            heroContent.classList.remove("col-lg-10", "text-center");
            heroContent.classList.add("col-lg-7", "text-center", "text-lg-start", "mb-5", "mb-lg-0", "pe-lg-5");
            
            heroButtons.classList.remove("justify-content-center");
            heroButtons.classList.add("justify-content-center", "justify-content-lg-start");
            
            heroDesc.classList.remove("mx-auto");
            heroDesc.classList.add("mx-auto", "mx-lg-0");
            
            // Show the card with animation
            whyMattersContainer.classList.remove("d-none");
            setTimeout(() => {
                whyMattersContainer.classList.remove("opacity-0");
                whyMattersContainer.classList.add("opacity-100", "slide-in-right");
            }, 50);
        });

        closeCardBtn.addEventListener("click", () => {
            // Hide the card
            whyMattersContainer.classList.remove("opacity-100", "slide-in-right");
            whyMattersContainer.classList.add("opacity-0");
            
            setTimeout(() => {
                whyMattersContainer.classList.add("d-none");
                
                // Revert to center alignment
                heroContent.classList.remove("col-lg-7", "text-center", "text-lg-start", "mb-5", "mb-lg-0", "pe-lg-5");
                heroContent.classList.add("col-lg-10", "text-center");
                
                heroButtons.classList.remove("justify-content-center", "justify-content-lg-start");
                heroButtons.classList.add("justify-content-center");
                
                heroDesc.classList.remove("mx-auto", "mx-lg-0");
                heroDesc.classList.add("mx-auto");
            }, 300); // Wait for fade out
        });
    }

    // Slider logic for prediction form
    const ageInput = document.getElementById("ageInput");
    const ageValue = document.getElementById("ageValue");
    
    if (ageInput && ageValue) {
        ageInput.addEventListener("input", (e) => {
            ageValue.textContent = e.target.value;
        });
    }

    const balanceInput = document.getElementById("balanceInput");
    const balanceValue = document.getElementById("balanceValue");
    
    if (balanceInput && balanceValue) {
        balanceInput.addEventListener("input", (e) => {
            // Format as currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });
            balanceValue.textContent = formatter.format(e.target.value);
        });
    }

    // Bootstrap Form Validation logic & Progress Simulation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                // If the form is valid and it's the prediction form, simulate processing
                if (form.getAttribute('action') === '/predict' || form.getAttribute('action').includes('predict')) {
                    event.preventDefault(); // Prevent immediate submission
                    
                    const submitBtn = form.querySelector('button[type="submit"]');
                    
                    // Fix the width to prevent the button from resizing during animation
                    const btnWidth = submitBtn.offsetWidth;
                    submitBtn.style.width = `${btnWidth}px`;
                    submitBtn.classList.add('btn-progress-container');
                    submitBtn.disabled = true; // Prevent double-clicks
                    
                    let progress = 0;
                    submitBtn.innerHTML = `
                        <div class="btn-progress-bar" id="btnProgressBar"></div>
                        <span class="btn-progress-text" id="btnProgressText">Processing... 0%</span>
                    `;
                    
                    const progressBar = document.getElementById('btnProgressBar');
                    const progressText = document.getElementById('btnProgressText');
                    
                    const interval = setInterval(() => {
                        progress += 1;
                        progressBar.style.width = `${progress}%`;
                        progressText.textContent = `Processing... ${progress}%`;
                        
                        if (progress >= 100) {
                            clearInterval(interval);
                            progressText.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 16 16" style="margin-top: -3px;">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                                Complete!
                            `;
                            progressBar.style.backgroundColor = 'rgba(25, 135, 84, 0.8)'; // Success green background
                            
                            // Submit the form after a brief pause
                            setTimeout(() => {
                                HTMLFormElement.prototype.submit.call(form);
                            }, 500);
                        }
                    }, 30); // 30ms * 100 = 3000ms (3 seconds)
                } else {
                    form.classList.add('was-validated');
                }
            }
        }, false);
    });
});
