document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");

  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = item.question;

        let flipped = false;

        card.addEventListener("click", () => {
          flipped = !flipped;
          card.textContent = flipped ? item.answer : item.question;
          card.classList.toggle("flipped", flipped);
        });

        cardContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading cards:", error));
});
