const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");
// Récupération de l'ID

async function getPhotographers() {
  return fetch("./data/photographers.json")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      alert("Erreur : " + err);
    });
}
// Récupération des photographes

async function displayData(medias, photographer) {
  const mediaFactory = new MediaFactory(medias, photographer);
  mediaFactory.createMediaCard(medias, photographer);
  mediaFactory.createPhotographerHeader();
  mediaFactory.createLikesCountCard();
  mediaFactory.displayNameInModal();
  mediaFactory.createSortList();
}
// Display de toutes les fonction crées pour le display

async function likesClick() {
  const likeBtn = document.querySelectorAll(".likes button");
  const totalLikes = document.querySelector(".likes-count");

  likeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const likeNumber = btn.parentNode.firstChild;

      if (btn.firstChild.classList.contains("fa-regular")) {
        btn.firstChild.classList.replace("fa-regular", "fa-solid");
        likeNumber.textContent = parseInt(likeNumber.textContent) + 1;
        totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
        // Si coeur vide, ajout d'un like à la photo et au total
      } else if (btn.firstChild.classList.contains("fa-solid")) {
        btn.firstChild.classList.replace("fa-solid", "fa-regular");
        likeNumber.textContent = parseInt(likeNumber.textContent) - 1;
        totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
        // Si coeur plein, like retiré à la photo et au total
      }
    });
  });
}

async function init() {
  const { photographers, media } = await getPhotographers();
  // Récupération des datas
  const currentPhotographer = photographers.find(
    (id) => id.id == photographerId
  );
  // Récupération du photographe
  const mediasOfPhotographer = media.filter(
    (media) => media.photographerId == photographerId
  );
  // Récupération des photographies correspondantes
  let currentMedias = mediasOfPhotographer.sort((a, b) => b.likes - a.likes);
  // Tri des photographies par nombre de likes

  displayData(currentMedias, currentPhotographer);
  likesClick();
  Lightbox.init();
  sortList(currentMedias, currentPhotographer);
}

init();
