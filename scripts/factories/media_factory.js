/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class MediaFactory {
  constructor(uniqueMedia, uniquePhotographer) {
    this.mediaData = uniqueMedia;
    this.likes = uniqueMedia.likes;
    this.image = uniqueMedia.image;
    this.title = uniqueMedia.title;
    this.video = uniqueMedia.video;
    this.name = uniquePhotographer.name;
    // Création de l'objet

    const nameOfPhotographer = this.name.split(" ");
    const pathName = nameOfPhotographer[0].replace("-", " ");
    this.mediaPath = `assets/photographers/${pathName}/${
      this.image ? this.image : this.video
    }`;
    // Récupération de la route pour les images / vidéos
  }

  getMediaCardDOM() {
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    const p = document.createElement("p");
    const media = document.createElement(this.image ? "img" : "video");
    const divLikes = document.createElement("div");
    const likesNb = document.createElement("span");
    const btnLike = document.createElement("button");
    const heart = document.createElement("i");
    // Création du DOM

    media.setAttribute("src", this.mediaPath);
    media.setAttribute("alt", this.title);
    media.setAttribute("tabindex", "0");
    divLikes.classList.add("likes");
    heart.classList.add("fa-regular", "fa-heart");
    heart.setAttribute("aria-label", "likes");
    // Crétions des classes, sources etc

    p.textContent = `${this.title}`;
    likesNb.textContent = `${this.likes}`;
    // Display du texte

    figure.appendChild(media);
    figure.appendChild(figcaption);
    figcaption.appendChild(p);
    figcaption.appendChild(divLikes);
    btnLike.appendChild(heart);
    divLikes.appendChild(likesNb);
    divLikes.appendChild(btnLike);
    // Mise en forme du DOM

    return { figure };
  }

  createMediaCard(currentMedias, currentPhotographer) {
    this.mediasSection = document.querySelector("#medias_section");
    let likesCount = 0;
    this.likesCount = likesCount;
    this.currentPhotographer = currentPhotographer;
    // Récupération et initialisation

    currentMedias.forEach((media) => {
      const photographerMedia = new MediaFactory(media, currentPhotographer);
      const mediaCardDOM = photographerMedia.getMediaCardDOM();
      this.mediasSection.appendChild(mediaCardDOM.figure);

      this.likesCount += photographerMedia.likes;
    });
    // Création de chaque photographie
  }

  createPhotographerHeader() {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerInfo = new PhotographerFactory(this.currentPhotographer);
    this.photographerInfo = photographerInfo;
    this.photographerPic =
      this.photographerInfo.getPhotographerInfos().photographerPic;
    this.photographerName =
      this.photographerInfo.getPhotographerInfos().photographerName;
    this.divPhotographerInfos =
      this.photographerInfo.getPhotographerInfos().divPhotographerInfos;
    this.photographerPic.setAttribute("alt", this.photographerName);
    photographHeader.appendChild(this.photographerPic);
    photographHeader.insertBefore(
      this.divPhotographerInfos,
      photographHeader.firstChild
    );
    // Crétion du Header pour chaque photographe
  }

  createLikesCountCard() {
    const divLikesPrice = document.createElement("div");
    divLikesPrice.classList.add("likes-price");
    divLikesPrice.innerHTML = `<span class="likes-count">${this.likesCount}</span><i class="fa-solid fa-heart"></i><span>${this.photographerInfo.price}€ / jour</span>`;
    this.mediasSection.appendChild(divLikesPrice);
    // Création de la partie Like / Price
  }

  displayNameInModal() {
    const modalH2 = document.querySelector(".modal h2");
    modalH2.insertAdjacentHTML("beforeend", "<br/>" + this.photographerName);
    // Display du nom dans la modal
  }

  createSortList() {
    this.divSortList = document.createElement("div");
    this.divSortSection = document.createElement("div");
    this.divSortList.classList.add("sort_list");
    this.divSortSection.classList.add("sort_section");
    this.divSortSection.innerHTML = `<label id="listboxlabel" role="label" for="selected" name="Order by">Trier par</label>`;
    this.divSortList.innerHTML = `<button class="selected" id="selected" aria_labelledby="listboxlabel" aria-haspopup="listbox" aria-label="Populaire">Populaire<i class="fas fa-chevron-down"></i></button>
           <div class="options hidden">  
               <button class="optDate" role="option" aria-label="Date">Date</button>
               <button class="optTitle" role="option" aria-label="Titre">Titre</button>
           </div>`;
    document
      .querySelector("#main")
      .insertBefore(this.divSortSection, this.mediasSection);
    this.divSortSection.appendChild(this.divSortList);
    //Création de la partie filtres
  }
}
