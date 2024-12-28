document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const progressElement = document.getElementById("progress");
  const knowBtn = document.getElementById("know-btn");
  const dontKnowBtn = document.getElementById("dont-know-btn");

  let cards = [];
  let currentCardIndex = 0;
  let completed = 0;

  fetch(jsonFile)
    .then((res) => res.json())
    .then((data) => {
      cards = data;
      renderCard();
      updateProgress();
    })
    .catch((err) => console.error("Ошибка загрузки JSON:", err));

  function renderCard() {
    if (currentCardIndex >= cards.length) {
      cardContainer.innerHTML = "<p>Вы изучили все карточки!</p>";
      knowBtn.disabled = true;
      dontKnowBtn.disabled = true;
      return;
    }

    const cardData = cards[currentCardIndex];
    cardContainer.innerHTML = `
      <div class="card">
        ${cardData.question}
      </div>
    `;

    const card = document.querySelector(".card");
    card.addEventListener("click", () => {
      card.textContent =
        card.textContent === cardData.question
          ? cardData.answer
          : cardData.question;
    });
  }

  function updateProgress() {
    const progress = Math.round((completed / cards.length) * 100);
    progressElement.textContent = progress;
  }

  knowBtn.addEventListener("click", () => {
    completed++;
    currentCardIndex++;
    updateProgress();
    renderCard();
  });

  dontKnowBtn.addEventListener("click", () => {
    currentCardIndex++;
    renderCard();
  });
});
