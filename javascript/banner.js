function openModalBanner() {
    document.getElementById('addBannerModal').style.display = 'block';
  }
  
  function closeModalBanner() {
    document.getElementById('addBannerModal').style.display = 'none';
  }
  
  document.getElementById('banner-form').onsubmit = async function(e) {
    e.preventDefault();
  
    const title = document.getElementById('banner-title').value;
    const subtitle = document.getElementById('banner-subtitle').value;
    const detail = document.getElementById('banner-detail').value;
    const image = document.getElementById('banner-image').value;
  
    try {
      await fetch(`/system/webdev/Tuxania/Python_Scripts/save_banner?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&detail=${encodeURIComponent(detail)}&image=${encodeURIComponent(image)}`, {
        method: 'POST'
      });
  
      // Reset form and close modal
      document.getElementById('banner-form').reset();
      closeModal();
      
      // Reload the page to show the new banner
      location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function fetchBanners() {
    try {
      const response = await fetch('/system/webdev/Tuxania/Python_Scripts/get_banners');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log('Response data:', data); // Log the received data
  
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
  
      const container = document.getElementById('banner-container');
      container.innerHTML = ''; // Clear existing content
  
      data.forEach(banner => {
        const bannerItem = `
          <div class="slider-item">
            <img src="${banner.image}" alt="${banner.title}" class="banner-img">
            <div class="banner-content">
              <p class="banner-subtitle">${banner.subtitle}</p>
              <h2 class="banner-title">${banner.title}</h2>
            </div>
          </div>
        `;
        container.innerHTML += bannerItem;
      });
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    fetchBanners().catch(error => console.error('Error in fetchBanners:', error));
  });
  
  
  
  
  
  /*
  // Fetch the ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bannerId = urlParams.get('id');
  
  // Fetch the banner details from the backend
  async function fetchBannerDetails() {
    const response = await fetch(`/system/webdev/Tuxania/Python_Scripts/get_banner_byID?id=${bannerId}`);
    const banner = await response.json();
  
    if (banner.error) {
      // Handle the error (e.g., display a message)
      console.error('Banner not found');
      return;
    }
  
    document.getElementById('news-title').innerText = banner.title;
    document.getElementById('news-subtitle').innerText = banner.subtitle;
    document.getElementById('news-detail').innerText = banner.detail;
    document.getElementById('news-image').src = banner.image;
  }
  
  fetchBannerDetails();
  
  */