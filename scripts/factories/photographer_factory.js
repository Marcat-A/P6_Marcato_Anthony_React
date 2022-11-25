class PhotographerFactory {
  constructor(data) {
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.tagline = data.tagline;
    this.price = data.price;
    this.country = data.country;
    this.id = data.id;
    // Création de l'objet

    const picture = `./assets/photographers/Photographers ID Photos/${this.portrait}`;
    //Récupération de l'image de profil

    const hrefPhotographer = `./photographer.html?id=${this.id}`;

    this.article = document.createElement("article");
    this.a = document.createElement("a");
    this.img = document.createElement("img");
    this.h1 = document.createElement("h1");
    this.h2 = document.createElement("h2");
    this.divCity = document.createElement("div");
    this.divTagline = document.createElement("div");
    this.divPrice = document.createElement("div");
    this.divPhotographerInfos = document.createElement("div");
    // Création du DOM pour le photographe

    this.img.setAttribute("src", picture);
    this.a.setAttribute("href", hrefPhotographer);
    this.a.setAttribute("aria-label", this.name);
    this.divCity.classList.add("city");
    this.divTagline.classList.add("tagline");
    this.divPrice.classList.add("price");
    this.divPhotographerInfos.classList.add("photographer-infos");
    // Crétions des classes, sources etc
  }

  getUserCardDOM() {
    this.h2.textContent = this.name;
    this.divCity.textContent = `${this.city}, ${this.country}`;
    this.divTagline.textContent = this.tagline;
    this.divPrice.textContent = `${this.price}€/jour`;
    // Display du texte

    this.article.appendChild(this.a);
    this.a.appendChild(this.img);
    this.a.appendChild(this.h2);
    this.article.appendChild(this.divCity);
    this.article.appendChild(this.divTagline);
    this.article.appendChild(this.divPrice);
    // Mise en forme du DOM

    const article = this.article;
    const price = this.price;
    return { article, price };
  }

  getPhotographerInfos() {
    this.h1.textContent = this.name;
    this.divCity.textContent = `${this.city}, ${this.country}`;
    this.divTagline.textContent = this.tagline;
    // Display du texte

    this.divPhotographerInfos.appendChild(this.h1);
    this.divPhotographerInfos.appendChild(this.divCity);
    this.divPhotographerInfos.appendChild(this.divTagline);
    // Mise en forme du DOM

    const photographerName = this.name;
    const photographerPic = this.img;
    const divPhotographerInfos = this.divPhotographerInfos;
    return { photographerPic, photographerName, divPhotographerInfos };
  }
}
