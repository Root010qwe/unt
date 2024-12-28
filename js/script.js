document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");

  // Загрузка данных из JSON
  fetch("data/cards.json")
    .then((response) => response.json())
    .then((cards) => {
      cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.textContent = card.question;

        let flipped = false;

        // Обработка клика на карточке
        cardElement.addEventListener("click", () => {
          flipped = !flipped;
          cardElement.textContent = flipped ? card.answer : card.question;
          cardElement.classList.toggle("flipped", flipped);
        });

        cardContainer.appendChild(cardElement);
      });
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
});
