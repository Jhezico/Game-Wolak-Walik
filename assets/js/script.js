const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardSatu, cardDua;
let disableDeck = false;

function flipCard(e) {
  let clickCard = e.target;
  if (clickCard !== cardSatu && !disableDeck) {
    clickCard.classList.add("flip");
    if (!cardSatu) {
      return cardSatu = clickCard
    }
    cardDua = clickCard;
    disableDeck = true
    let cardSatuImg = cardSatu.querySelector("img").src,
      cardDuaImg = cardDua.querySelector("img").src;
    matchCards(cardSatuImg, cardDuaImg);
  }
}

function matchCards(img1, img2) {
  if (img1 == img2) {
    matchedCard++;
    if (matchedCard == 8) {
      setTimeout(() => {
        Swal.fire({
          title: 'Are you sure?',
          text: "Selamat kamu berhasil, ingin bermain lagi?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FF5733',
          cancelButtonColor: '#3374ff',
          confirmButtonText: 'Iya',
          cancelButtonText: 'Tidak'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Selamat Bermain !',
            })
            randomCard();
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Yuhuu',
              text: 'Terima Kasih Telah bermain !',
            })
            cards.forEach(card => {
              card.classList.add("flip");
            })
          }
        })
      }, 1000)
    }
    cardSatu.removeEventListener("click", flipCard);
    cardDua.removeEventListener("click", flipCard);
    cardSatu = cardDua = "";
    return disableDeck = false;
  }

  setTimeout(() => {
    cardSatu.classList.add("shake");
    cardDua.classList.add("shake");
  }, 400)

  setTimeout(() => {
    cardSatu.classList.remove("shake", "flip");
    cardDua.classList.remove("shake", "flip");
    cardSatu = cardDua = "";
    disableDeck = false;
  }, 1200);
}

function randomCard() {
  matchedCard = 0;
  cardSatu = cardDua = "";
  disableDeck = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `assets/Img/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard)
  })
}

randomCard();

cards.forEach(card => {
  card.addEventListener("click", flipCard)
})
