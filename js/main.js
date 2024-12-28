document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const progress = document.getElementById("progress");
  const knowBtn = document.getElementById("know-btn");
  const dontKnowBtn = document.getElementById("dont-know-btn");

  let cards = [];
  let currentIndex = 0;
  let knownCards = 0;

  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      cards = data;
      updateProgress();
      renderCard();
    })
    .catch((error) => {
      console.error("Ошибка загрузки JSON:", error);
    });

  function renderCard() {
    cardContainer.innerHTML = "";
    if (currentIndex < cards.length) {
      const card = document.createElement("div");
      card.className = "card visible";
      card.textContent = cards[currentIndex].question;

      card.addEventListener("click", () => {
        card.textContent =
          card.textContent === cards[currentIndex].question
            ? cards[currentIndex].answer
            : cards[currentIndex].question;
      });

      cardContainer.appendChild(card);
    } else {
      cardContainer.innerHTML = "<p>Вы изучили все карточки!</p>";
      knowBtn.disabled = true;
      dontKnowBtn.disabled = true;
    }
  }

  function updateProgress() {
    const progressValue = Math.round((currentIndex / cards.length) * 100);
    progress.textContent = progressValue;
  }

  knowBtn.addEventListener("click", () => {
    knownCards++;
    currentIndex++;
    updateProgress();
    renderCard();
  });

  dontKnowBtn.addEventListener("click", () => {
    cards.push(cards[currentIndex]); // Повторяем карточку в конце списка
    currentIndex++;
    updateProgress();
    renderCard();
  });
});
