document.addEventListener("DOMContentLoaded", function() {
  const loadingScreen = document.createElement('div');
  loadingScreen.classList.add('loading-screen');
  loadingScreen.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loadingScreen);

  const backgrounds = [
    { gradient: 'rgba(0, 0, 0, 0.7)', url: '/assets/img/hero-carousel/hero-carousel-1.jpg' },
    { gradient: 'rgba(0, 0, 0, 0.7)', url: '/assets/img/hero-carousel/hero-carousel-2.jpg' },
    { gradient: 'rgba(0, 0, 0, 0.7)', url: '/assets/img/hero-carousel/hero-carousel-3.jpg' },
    { gradient: 'rgba(0, 0, 0, 0.7)', url: '/assets/img/hero-carousel/hero-carousel-4.jpg' },
    { gradient: 'rgba(0, 0, 0, 0.7)', url: '/assets/img/hero-carousel/hero-carousel-5.jpg' }
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);

  const selectedBackground = backgrounds[randomIndex];

  const img = new Image();
  img.onload = function() {
    document.body.style.backgroundImage = `linear-gradient(${selectedBackground.gradient}, ${selectedBackground.gradient}), url(${selectedBackground.url})`;
    
    loadingScreen.remove();

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed'; 
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '999'; 
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const particles = [];
    const particleCount = 100;

  };
  img.src = selectedBackground.url;
});

