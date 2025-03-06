document.addEventListener("DOMContentLoaded", function() {
    // Intersection Observer to trigger animations when the section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start counter animations
          const counters = document.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let count = 0;
            const updateCounter = () => {
              count += increment;
              if (count < target) {
                counter.innerText = Math.ceil(count).toLocaleString();
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target.toLocaleString();
              }
            };
            
            updateCounter();
          });
          
          // Unobserve after triggering
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe the about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }
  });