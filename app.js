const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryContainer = document.querySelector(".js-gallery");

function createGalleryItemMarkup(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" alt="${item.description}">
      </a>
    </li>
`;
}

function renderGalleryItems(items) {
  const galleryMarkup = items.map(createGalleryItemMarkup).join("");
  galleryContainer.innerHTML = galleryMarkup;
}

renderGalleryItems(galleryItems);

const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');

function getLargeImageURL(item) {
  return item.original;
}

function openLightbox(url) {
  lightbox.classList.add('is-open');
  lightboxImage.src = url;
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
}

function handleGalleryItemClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  const galleryItem = target.closest('.gallery__item');
  const itemIndex = Array.from(galleryContainer.children).indexOf(galleryItem);
  const largeImageURL = getLargeImageURL(galleryItems[itemIndex]);
  openLightbox(largeImageURL);
}

function clearLightboxImage() {
  lightboxImage.src = '';
}

galleryContainer.addEventListener('click', handleGalleryItemClick);

closeButton.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closeLightbox();
  }
});

lightbox.addEventListener('transitionend', function (event) {
  if (event.propertyName === 'opacity' && !lightbox.classList.contains('is-open')) {
    clearLightboxImage();
  }
});

function handleKeyPress(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}

function handleKeyPressNavigation(event) {
  if (lightbox.classList.contains('is-open')) {
    const currentIndex = galleryItems.findIndex(
      (item) => item.original === lightboxImage.src
    );
    if (event.code === 'ArrowLeft') {
      const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      lightboxImage.src = galleryItems[newIndex].original;
    } else if (event.code === 'ArrowRight') {
      const newIndex = (currentIndex + 1) % galleryItems.length;
      lightboxImage.src = galleryItems[newIndex].original;
    }
  }
}

window.addEventListener('keydown', handleKeyPress);

window.addEventListener('keydown', handleKeyPressNavigation);

//! Не змогла реалізувати ось цей пункт: - Закриття модального вікна при натисканні на `div.lightbox__overlay`.
