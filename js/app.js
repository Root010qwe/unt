document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const progressElement = document.getElementById("progress");
  const knowBtn = document.getElementById("know-btn");
  const dontKnowBtn = document.getElementById("dont-know-btn");

  let cards = [];
  let currentCardIndex = 0;
  let completed = 0;

  // Загружаем JSON
  fetch(jsonFile)
    .then((res) => {
      if (!res.ok) throw new Error("Ошибка загрузки JSON");
      return res.json();
    })
    .then((data) => {
      cards = data;
      if (cards.length === 0) throw new Error("JSON пуст");
      renderCard();
      updateProgress();
    })
    .catch((err) => {
      cardContainer.innerHTML = `<p class="error">Ошибка: ${err.message}</p>`;
    });

  // Рендеринг текущей карточки
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
        <div class="card-content">${cardData.question}</div>
      </div>
    `;

    const card = document.querySelector(".card");
    card.addEventListener("click", () => {
      const content = card.querySelector(".card-content");
      content.textContent =
        content.textContent === cardData.question
          ? cardData.answer
          : cardData.question;
    });
  }

  // Обновление прогресса
  function updateProgress() {
    const progress = Math.round((completed / cards.length) * 100);
    progressElement.textContent = `${progress}%`;
  }

  // Кнопки "Знаю" и "Не знаю"
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
