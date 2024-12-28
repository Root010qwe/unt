document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    themeToggle.textContent = body.classList.contains("light-theme")
      ? "Тёмная тема"
      : "Светлая тема";
  });

  let cards = [];
  let currentCard = 0;
  let hardCards = [];
  let completed = 0;

  fetch(jsonFile)
    .then((res) => res.json())
    .then((data) => {
      cards = data;
      document.getElementById("total").textContent = cards.length;
      loadCard();
    });

  function loadCard() {
    const container = document.getElementById("card-container");
    container.innerHTML = `<div class="card">${cards[currentCard].question}</div>`;
    const card = container.querySelector(".card");
    card.addEventListener("click", () => {
      card.textContent =
        card.textContent === cards[currentCard].question
          ? cards[currentCard].answer
          : cards[currentCard].question;
    });
  }

  document.getElementById("easy-btn").addEventListener("click", () => {
    completed++;
    currentCard++;
    updateStats();
    if (currentCard < cards.length) loadCard();
  });

  document.getElementById("hard-btn").addEventListener("click", () => {
    hardCards.push(cards[currentCard]);
    completed++;
    currentCard++;
    updateStats();
    if (currentCard < cards.length) loadCard();
  });

  document.getElementById("retry-hard").addEventListener("click", () => {
    cards = hardCards;
    currentCard = 0;
    hardCards = [];
    loadCard();
  });

  function updateStats() {
    document.getElementById("completed").textContent = completed;
  }
});
