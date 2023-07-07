/** @format */
let PostCount = 0;

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

const container = document.querySelector(".container");
const profileContainer = document.createElement("div");
profileContainer.className = "profile-container";

function displayUserProfile(userId) {
  getUser(userId);
  userPosts(userId);
}

function getUser(userId) {
  fetch(`https://insta-api-api.0vxq7h.easypanel.host/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      const avatar = document.createElement("img");
      avatar.classList = "avatar";
      avatar.src = user.avatarUrl;
      profileContainer.appendChild(avatar);

      const username = document.createElement("h2");
      username.classList = "username";
      username.textContent = user.username;
      profileContainer.appendChild(username);

      const bio = document.createElement("p");
      bio.classList = "bio";
      bio.textContent = user.description;
      profileContainer.appendChild(bio);

      const postCountElement = document.createElement("p");
      postCountElement.classList = "countPost";
      postCountElement.textContent = `Total Posts: ${user.posts.length}`;
      profileContainer.appendChild(postCountElement);

      container.appendChild(profileContainer);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function userPosts() {
  fetch(`https://insta-api-api.0vxq7h.easypanel.host/posts`)
    .then((res) => res.json())
    .then((posts) => {
      const postCount = posts.userid.length;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

displayUserProfile(userId);
