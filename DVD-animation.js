document.addEventListener('DOMContentLoaded', function() {
  // Create DVD animation elements when DVD theme is selected
  const dvdContainer = document.createElement('div');
  dvdContainer.id = 'dvd-animation-container';
  dvdContainer.style.position = 'fixed';
  dvdContainer.style.top = '0';
  dvdContainer.style.left = '0';
  dvdContainer.style.width = '100%';
  dvdContainer.style.height = '100%';
  dvdContainer.style.zIndex = '-1';
  dvdContainer.style.overflow = 'hidden';
  dvdContainer.style.background = '#000';
  dvdContainer.style.display = 'none';
  document.body.appendChild(dvdContainer);
  
  const dvdLogo = document.createElement('div');
  dvdLogo.id = 'dvd-logo';
  dvdLogo.style.position = 'absolute';
  dvdLogo.style.width = '200px';
  dvdLogo.style.height = '200px';
  dvdLogo.style.transformStyle = 'preserve-3d';
  dvdLogo.style.transition = 'filter 0.3s ease-out';
  dvdContainer.appendChild(dvdLogo);
  
  const logoGlow = document.createElement('div');
  logoGlow.className = 'logo-glow';
  logoGlow.style.position = 'absolute';
  logoGlow.style.width = '100%';
  logoGlow.style.height = '100%';
  logoGlow.style.borderRadius = '20px';
  logoGlow.style.filter = 'blur(15px)';
  logoGlow.style.opacity = '0.5';
  logoGlow.style.zIndex = '-1';
  dvdLogo.appendChild(logoGlow);
  
  const logoOutline = document.createElement('div');
  logoOutline.className = 'dvd-outline';
  logoOutline.style.position = 'absolute';
  logoOutline.style.width = '100%';
  logoOutline.style.height = '100%';
  logoOutline.style.border = '3px solid rgba(255, 255, 255, 0.7)';
  logoOutline.style.borderRadius = '20px';
  logoOutline.style.boxSizing = 'border-box';
  logoOutline.style.top = '0';
  logoOutline.style.left = '0';
  logoOutline.style.pointerEvents = 'none';
  dvdLogo.appendChild(logoOutline);
  
  const headImg = document.createElement('img');
  headImg.className = 'head';
  headImg.alt = 'DVD Head';
  headImg.style.display = 'block';
  headImg.style.width = '100%';
  headImg.style.height = '100%';
  headImg.style.objectFit = 'contain';
  headImg.style.imageRendering = 'crisp-edges';
  dvdLogo.appendChild(headImg);
  
  const dvdText = document.createElement('div');
  dvdText.className = 'dvd-text';
  dvdText.textContent = 'Hire Me :)';
  dvdText.style.fontFamily = 'Arial, sans-serif';
  dvdText.style.fontWeight = 'bold';
  dvdText.style.textAlign = 'center';
  dvdText.style.fontSize = '32px';
  dvdText.style.marginTop = '5px';
  dvdText.style.color = 'white';
  dvdText.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.7)';
  dvdLogo.appendChild(dvdText);
  
  // Your head images
  const images = [
    "images/head-01.png",
    "images/head-02.png",
    "images/head-03.png", 
    "images/head-04.png",
    "images/head-05.png",
  ];
  
  // DVD-style vibrant colors
  const dvdColors = [
    { filter: "hue-rotate(0deg) saturate(2) brightness(1.3)", color: "rgba(255, 30, 30, 0.7)" },      // Red
    { filter: "hue-rotate(60deg) saturate(2) brightness(1.3)", color: "rgba(255, 255, 30, 0.7)" },   // Yellow
    { filter: "hue-rotate(120deg) saturate(2) brightness(1.3)", color: "rgba(30, 255, 30, 0.7)" },   // Green
    { filter: "hue-rotate(180deg) saturate(2) brightness(1.3)", color: "rgba(30, 255, 255, 0.7)" },  // Cyan
    { filter: "hue-rotate(240deg) saturate(2) brightness(1.3)", color: "rgba(30, 30, 255, 0.7)" },   // Blue
    { filter: "hue-rotate(300deg) saturate(2) brightness(1.3)", color: "rgba(255, 30, 255, 0.7)" },  // Magenta
  ];
  
  // Animation variables
  let position = { x: 150, y: 150 };
  let velocity = { x: 2, y: 1.5 };
  let currentImage = 0;
  let animationFrame = null;
  
  // Set initial image
  headImg.src = images[currentImage];
  
  // Function to get random DVD-style color
  function getRandomDvdColor() {
    const randomIndex = Math.floor(Math.random() * dvdColors.length);
    return dvdColors[randomIndex];
  }
  
  // Add a small random factor to make the animation more interesting
  function addVariability(velocity) {
    const variability = 0.05;
    const randomFactor = 1 + (Math.random() * variability * 2 - variability);
    return velocity * randomFactor;
  }
  
  // Apply initial random color
  const initialColor = getRandomDvdColor();
  headImg.style.filter = initialColor.filter;
  dvdText.style.filter = initialColor.filter;
  logoGlow.style.background = initialColor.color;
  
  // Animation function
  function animate() {
    // Calculate new position
    position.x += velocity.x;
    position.y += velocity.y;
    
    const logoWidth = 200;
    const logoHeight = 200;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    let collision = false;
    
    // Check for collision with right/left walls
    if (position.x + logoWidth > containerWidth) {
      position.x = containerWidth - logoWidth;
      velocity.x = -Math.abs(addVariability(velocity.x));
      collision = true;
    } else if (position.x < 0) {
      position.x = 0;
      velocity.x = Math.abs(addVariability(velocity.x));
      collision = true;
    }
    
    // Check for collision with top/bottom walls
    if (position.y + logoHeight > containerHeight) {
      position.y = containerHeight - logoHeight;
      velocity.y = -Math.abs(addVariability(velocity.y));
      collision = true;
    } else if (position.y < 0) {
      position.y = 0;
      velocity.y = Math.abs(addVariability(velocity.y));
      collision = true;
    }
    
    // On collision: change image and generate new color
    if (collision) {
      currentImage = (currentImage + 1) % images.length;
      headImg.src = images[currentImage];
      
      const newColor = getRandomDvdColor();
      headImg.style.filter = newColor.filter;
      dvdText.style.filter = newColor.filter;
      logoGlow.style.background = newColor.color;
    }
    
    // Apply new position
    dvdLogo.style.left = `${position.x}px`;
    dvdLogo.style.top = `${position.y}px`;
    
    // Apply 3D effect
    dvdLogo.style.transform = 'perspective(500px) rotateX(10deg)';
    
    // Continue animation if DVD theme is active
    if (document.body.classList.contains('theme-dvd')) {
      animationFrame = requestAnimationFrame(animate);
    }
  }
  
  // Function to handle theme changes
  function handleThemeChange() {
    if (document.body.classList.contains('theme-dvd')) {
      // Show the DVD animation
      dvdContainer.style.display = 'block';
      
      // Start animation if not already running
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    } else {
      // Hide the DVD animation
      dvdContainer.style.display = 'none';
      
      // Stop animation
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }
  }
  
  // Watch for theme changes
  const observer = new MutationObserver(function() {
    handleThemeChange();
  });
  
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  
  // Initial theme check
  handleThemeChange();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    // Keep the logo within bounds
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    position.x = Math.min(position.x, containerWidth - 200);
    position.y = Math.min(position.y, containerHeight - 200);
  });
});