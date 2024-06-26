// Function to open the banner modal
function openModalBanner() {
  document.getElementById('addBannerModal').style.display = 'block';
}

// Function to close the banner modal
function closeModalBanner() {
  document.getElementById('addBannerModal').style.display = 'none';
}

// Function to open the edit banner modal
function openEditModalBanner(banner) {
  document.getElementById('editBannerModal').style.display = 'block';
  document.getElementById('edit-banner-title').value = banner.title;
  document.getElementById('edit-banner-subtitle').value = banner.subtitle;
  document.getElementById('edit-banner-image').value = banner.image;
  document.getElementById('edit-banner-form').dataset.bannerId = banner.id;
}

// Function to close the edit banner modal
function closeEditModalBanner() {
  document.getElementById('editBannerModal').style.display = 'none';
}

// Submit event handler for adding a new banner
document.getElementById('banner-form').onsubmit = async function(e) {
  e.preventDefault();

  const title = document.getElementById('banner-title').value;
  const subtitle = document.getElementById('banner-subtitle').value;
  const image = document.getElementById('banner-image').value;

  try {
    await fetch(`/system/webdev/Tuxania/Python_Scripts/banner/save_banner?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&image=${encodeURIComponent(image)}`, {
      method: 'POST'
    });

    // Reset form and close modal
    document.getElementById('banner-form').reset();
    closeModalBanner();

    // Reload the banners without refreshing the page
    fetchBanners();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Submit event handler for editing a banner
document.getElementById('edit-banner-form').onsubmit = async function(e) {
  e.preventDefault();

  const bannerId = document.getElementById('edit-banner-form').dataset.bannerId;
  const title = document.getElementById('edit-banner-title').value;
  const subtitle = document.getElementById('edit-banner-subtitle').value;
  const image = document.getElementById('edit-banner-image').value;

  try {
    await fetch(`/system/webdev/Tuxania/Python_Scripts/banner/edit_banner?id=${encodeURIComponent(bannerId)}&title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&image=${encodeURIComponent(image)}`, {
      method: 'POST'
    });

    // Reset form and close modal
    document.getElementById('edit-banner-form').reset();
    closeEditModalBanner();

    // Reload the banners without refreshing the page
    fetchBanners();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to delete a banner
async function deleteBanner() {
  const bannerId = document.getElementById('edit-banner-form').dataset.bannerId;

  try {
    await fetch(`/system/webdev/Tuxania/Python_Scripts/banner/delete_banner?id=${encodeURIComponent(bannerId)}`, {
      method: 'POST'
    });

    // Reset form and close modal
    document.getElementById('edit-banner-form').reset();
    closeEditModalBanner();

    // Reload the banners without refreshing the page
    fetchBanners();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch banners from the server
async function fetchBanners() {
  try {
    const response = await fetch('/system/webdev/Tuxania/Python_Scripts/banner/get_banners');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received');
    }

    const container = document.getElementById('banner-container');
    container.innerHTML = ''; // Clear existing content

    // Iterate through each banner data and create HTML elements
    data.forEach((banner, index) => {
      const bannerItem = document.createElement('div');
      bannerItem.classList.add('slider-item');
      bannerItem.innerHTML = `
        <img src="${banner.image}" alt="${banner.title}" class="banner-img">
        <div class="banner-content">
          <p class="banner-subtitle">${banner.subtitle}</p>
          <h2 class="banner-title">${banner.title}</h2>
        </div>`;
        
      // Add edit icon if authenticated
      if (authenticated) {
        const editIcon = document.createElement('ion-icon');
        editIcon.setAttribute('name', 'create-outline');
        editIcon.onclick = () => openEditModalBanner(banner);
        bannerItem.appendChild(editIcon);
      }

      container.appendChild(bannerItem);
    });

    // Start carousel behavior if there are banners to show
    if (data.length > 0) {
      startSlideShow();
    }
  } catch (error) {
    console.error('Error fetching banners:', error);
  }
}

// Function to start the banner slide show
function startSlideShow() {
  const sliderContainer = document.querySelector('.slider-container');
  const sliderItems = document.querySelectorAll('.slider-item');
  const intervalTime = 5000; // 5 seconds
  let currentIndex = 0;
  let slideInterval;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % sliderItems.length;
    scrollToCurrentSlide();
  }

  function scrollToCurrentSlide() {
    const scrollPosition = currentIndex * sliderItems[0].offsetWidth;
    sliderContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    if (currentIndex === sliderItems.length - 1) {
      setTimeout(() => {
        currentIndex = 0;
        sliderContainer.scrollTo({
          left: 0,
          behavior: 'auto'
        });
      }, intervalTime);
    }
  }

  // Add event listeners for pause and resume on hover
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  });

  // Start the slide show
  slideInterval = setInterval(nextSlide, intervalTime);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBanners().catch(error => console.error('Error in fetchBanners:', error));
  
  // Check authentication status from sessionStorage
  authenticated = sessionStorage.getItem('authenticated') === 'true';
  
  // Show add banner button if authenticated
  const addBannerBtn = document.getElementById('addBannerBtn');
  if (authenticated) {
    addBannerBtn.style.display = 'block';
  }
});

