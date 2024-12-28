document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const newCardBtn = document.getElementById("new-card-btn");
  const modal = document.getElementById("editor-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const saveCardBtn = document.getElementById("save-card-btn");
  const questionInput = document.getElementById("question");
  const answerInput = document.getElementById("answer");

  let cards = JSON.parse(localStorage.getItem("flashcards")) || [];

  const saveCards = () => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  };

  const renderCards = () => {
    cardContainer.innerHTML = "";
    cards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.innerText = card.question;
      cardEl.addEventListener("click", () => {
        if (cardEl.classList.contains("flipped")) {
          cardEl.innerText = card.question;
        } else {
          cardEl.innerText = card.answer;
        }
        cardEl.classList.toggle("flipped");
      });
      cardContainer.appendChild(cardEl);
    });
  };

  newCardBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  saveCardBtn.addEventListener("click", () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question && answer) {
      cards.push({ question, answer });
      saveCards();
      renderCards();
      modal.classList.add("hidden");
      questionInput.value = "";
      answerInput.value = "";
    }
  });

  renderCards();
});
