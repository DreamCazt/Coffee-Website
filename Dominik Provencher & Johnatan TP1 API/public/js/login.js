const form = document.querySelector("#my-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let username = document.querySelector("#username").value;
  let avatar = document.querySelector("#avatar").value;
  let description = document.querySelector("#description").value;

  fetch("https://insta-api-api.0vxq7h.easypanel.host/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      avatarUrl: avatar,
      description: description,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
});
