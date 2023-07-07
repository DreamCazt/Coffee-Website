/** @format */

const form = document.querySelector("#my-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = document.querySelector("#name").value;
  let picture = document.querySelector("#picture").value;
  let description = document.querySelector("#description").value;

  fetch("https://insta-api-api.0vxq7h.easypanel.host/coffees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      pictureUrl: picture,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Success:", res);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
