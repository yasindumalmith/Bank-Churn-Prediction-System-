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
});
