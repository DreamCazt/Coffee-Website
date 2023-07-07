function getAllCoffees() {
  const content = document.querySelector(".content");

  fetch("https://insta-api-api.0vxq7h.easypanel.host/coffees")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((coffee) => {
        //Créer la publication
        const publication = document.createElement("div");
        publication.className = "publication";
        content.appendChild(publication);

        //effacer coffee
        const deleteButton = document.createElement("span");
        deleteButton.className = "delete material-symbols-outlined";
        deleteButton.innerHTML = "delete";

        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();

          deleteCoffee(coffee.id);
        });

        publication.appendChild(deleteButton);

        //Créer le la balise img
        const imgSection = document.createElement("img");
        imgSection.className = "img-container";
        // Trouver la photo du caffee
        const coffeePicture = coffee.pictureUrl;
        // Afficher la photo dans l'élément img
        imgSection.src = coffeePicture;
        publication.appendChild(imgSection);

        const nameSection = document.createElement("h1");
        nameSection.className = "name-section";
        nameSection.innerHTML = coffee.name;
        publication.appendChild(nameSection);

        const desSection = document.createElement("p");
        desSection.className = "des-section";
        const coffeeDescription = coffee.description;
        desSection.innerHTML = coffeeDescription;
        publication.appendChild(desSection);
      });
    });
}
function deleteCoffee(coffeeId) {
  fetch(`https://insta-api-api.0vxq7h.easypanel.host/coffees/${coffeeId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((coffee) => {
      console.log("ID:", coffee, "Deleted");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
getAllCoffees();
