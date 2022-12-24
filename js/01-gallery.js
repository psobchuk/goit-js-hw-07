import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");
const galleryMarkup = buildGallery(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);

/**
  |============================
  | Будуємо галерею
  |============================
*/
function buildGallery(galleryItems) {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");

  return markup;
}

/**
  |============================
  | Обробляємо кліки
  |============================
*/
gallery.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}"
    width="800"
    height="600">
    `,
    {
      onShow: () => {
        document.addEventListener("keydown", closeModalWindow);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeModalWindow);
      },
    }
  );

  instance.show();

  function closeModalWindow(evt) {
    if (evt.code !== "Escape") {
      return;
    }

    return instance.close();
  }
}
