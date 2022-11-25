class Lightbox {
  static init() {
    const medias = Array.from(
      document.querySelectorAll("#medias_section img, #medias_section video")
    );
    // Récupération des images / vidéos
    const gallery = medias.map((media) => media.getAttribute("src"));
    // Création d'une galerie en mappant le tableau

    medias.forEach((media) =>
      media.addEventListener("click", (e) => {
        const mediaURL = e.currentTarget.getAttribute("src");
        // Récupération de l'image cliquée
        new Lightbox(mediaURL, gallery);
        document.querySelector("#main").ariaHidden = "true";
        document.querySelector(".lightbox__close").focus();
      })
    );
    medias.forEach((media) =>
      media.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          // Récupération de l'image sélectionnée avec le clavier
          const mediaURL = e.currentTarget.getAttribute("src");
          new Lightbox(mediaURL, gallery);
          document.querySelector("#main").ariaHidden = "true";
          document.querySelector(".lightbox__close").focus();
        }
      })
    );
  }

  constructor(url, images) {
    this.buildDOM();
    this.url = url;
    this.images = images;
    this.loadImage(url);
    // Création de l'objet

    document
      .querySelector("#main")
      .parentNode.insertBefore(
        this.divLightbox,
        document.querySelector(".contact_modal")
      );
    this.keyboardAcces = this.keyboardAcces.bind(this);
    document.addEventListener("keyup", this.keyboardAcces);
  }
  // Display LightBox

  loadImage(url) {
    const container = this.divLightbox.querySelector(".lightbox__container");
    const image = document.createElement("img");
    const video = document.createElement("video");
    container.innerHTML = "";

    if (url.endsWith(".jpg")) {
      container.appendChild(image);
      image.setAttribute("src", url);
      this.url = url;
    } else if (url.endsWith(".mp4")) {
      container.appendChild(video);
      video.setAttribute("src", url);
      video.controls = true;
      video.autoplay = true;
      this.url = url;
    }
    // Display de l'image dans la LightBox
  }

  keyboardAcces(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  // Navigation au clavier

  close() {
    this.divLightbox.classList.add("fade-out");
    document.querySelector("#main").ariaHidden = "false";

    window.setTimeout(() => {
      this.divLightbox.parentElement.removeChild(this.divLightbox);
    }, 500);
    document.removeEventListener("keyup", this.keyboardAcces);
  }
  // Fermeture de la lightbox

  next() {
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    i++;
    this.loadImage(this.images[i]);
  }
  // Suivant

  prev() {
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    i--;
    this.loadImage(this.images[i]);
  }
  // Précédent

  buildDOM() {
    this.divLightbox = document.createElement("div");
    this.divLightbox.classList.add("lightbox");
    this.divLightbox.ariaHidden = "false";
    this.divLightbox.setAttribute("role", "dialog");
    this.divLightbox.setAttribute("aria-label", "image closeup view");
    this.divLightbox.innerHTML = `<button class="lightbox__close" aria-label="Close dialog"></button>
            <button class="lightbox__next" aria-label="Next image"></button>
            <button class="lightbox__prev" aria-label="Previous image"></button>
            <div class="lightbox__container"></div>`;
    this.divLightbox
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    this.divLightbox
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    this.divLightbox
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
  }
  // Display
}
