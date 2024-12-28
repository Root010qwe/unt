document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");

  fetch("data/lessons.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(lesson => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${lesson.title}</h2>
          <p>${lesson.content}</p>
        `;
        contentDiv.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading lessons:", error);
    });
});
