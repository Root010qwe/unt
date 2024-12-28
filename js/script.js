document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");

  // Укажите правильный путь к JSON-файлу
  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        cardContainer.innerHTML = "<p>Нет данных для отображения.</p>";
        return;
      }

      data.forEach((item) => {
        // Проверяем наличие ключей question и answer
        if (item.question && item.answer) {
          const card = document.createElement("div");
          card.className = "card";
          card.textContent = item.question;

          let flipped = false;

          // Логика переворачивания карточки
          card.addEventListener("click", () => {
            flipped = !flipped;
            card.textContent = flipped ? item.answer : item.question;
            card.classList.toggle("flipped", flipped);
          });

          cardContainer.appendChild(card);
        } else {
          console.warn("Пропущен элемент из-за отсутствия question или answer:", item);
        }
      });
    })
    .catch((error) => {
      console.error("Ошибка загрузки JSON-файла:", error);
      cardContainer.innerHTML = "<p>Ошибка загрузки данных.</p>";
    });
});
