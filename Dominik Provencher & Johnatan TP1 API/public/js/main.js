/** @format */

const content = document.querySelector(".content");

const button = document.querySelector("button");

const userList = document.createElement("ol");

let likeCount = 0;
let active = false;
let postsList = [];
let currentIndex = 0;

function createElementDOMElement(post, user) {
  const publication = document.createElement("div");
  publication.className = "publication";

  // Créer la zone du Username
  const name = document.createElement("a");
  name.className = "username";
  name.href = "profil.html?userId=" + user.id;
  name.innerHTML = user.username;

  // Créer la zone de l'image
  const postImg = document.createElement("img");
  postImg.className = "img-container";
  postImg.src = post.pictureUrl;

  // Créer zone icon
  const iconSection = document.createElement("div");
  iconSection.className = "icon-section";

  // Créer icons
  const iconLike = document.createElement("div");
  iconLike.className = "icon-like";
  let likeCount = post.likes.length;
  iconLike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1" width="24" height="24">
  <path d="M12 21.35l-1.45-1.32C5.4 15.21 2 12.16 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.66-3.4 6.71-8.55 11.53L12 21.35z"/>
</svg>

 (${likeCount})`;

  iconLike.addEventListener("click", () => {
    active = !active; //  toggle on/off

    postLikes(post.id);

    if (active) {
      likeCount++; // increment the like count
      iconLike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24" height="24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.21 2 12.16 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.66-3.4 6.71-8.55 11.53L12 21.35z"/>
      </svg>
     (${likeCount})`; // update Like Count
    } else {
      likeCount--;
      iconLike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1" width="24" height="24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.21 2 12.16 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.66-3.4 6.71-8.55 11.53L12 21.35z"/>
      </svg>
     (${likeCount})`;
    }
  });

  const iconComment = document.createElement("span");
  iconComment.className = "icon-comment material-symbols-outlined";
  iconComment.innerHTML = "mode_comment";

  //Créer la zone display commentaire
  const commentElement = document.createElement("div");
  commentElement.className = "comment-element";

  //Créer la zone input commentaire
  const inputComment = document.createElement("textarea");
  inputComment.className = "commentaire";
  inputComment.placeholder = "Enter your comments here...";

  // Créer bouton commentaire
  const commentBtn = document.createElement("button");
  commentBtn.className = "btn-comment";
  commentBtn.innerHTML = "Send";

  commentBtn.addEventListener("click", () => {
    const comment = inputComment.value;
    postComment(comment, post.id, commentElement);
    inputComment.value = "";
  });

  // Créer le body de la publication contenant(Username, Commentaire et Like)
  const pubBody = document.createElement("div");
  pubBody.className = "pub-body";

  content.appendChild(publication);

  publication.appendChild(name);

  publication.appendChild(postImg);

  publication.appendChild(iconSection);

  iconSection.appendChild(iconLike);
  iconSection.appendChild(iconComment);

  publication.appendChild(pubBody);

  pubBody.appendChild(inputComment);

  pubBody.appendChild(commentBtn);

  publication.appendChild(commentElement);

  // Aller chercher toutes les comments de la publication
  iconComment.addEventListener("click", () => {
    post.comments.forEach((comment) => {
      const commentItem = document.createElement("div");
      commentItem.textContent = comment.content;
      commentElement.appendChild(commentItem);
    });
  });
}

function displayPosts() {
  if (currentIndex >= postsList.length) {
    clearInterval(intervalID);
    return;
  }
  if (currentIndex === 30) {
    clearInterval(intervalID);
  }

  const postsToDisplay = postsList.slice(currentIndex, currentIndex + 3);
  postsToDisplay.forEach((post) => {
    getUser(post.userId).then((user) => {
      createElementDOMElement(post, user);
    });
  });

  currentIndex += postsToDisplay.length;
}

function getUser(userId) {
  return fetch(`https://insta-api-api.0vxq7h.easypanel.host/users/${userId}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getAllPosts() {
  fetch("https://insta-api-api.0vxq7h.easypanel.host/posts")
    .then((res) => res.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postId = post.id;
        postLikes(postId);
        searchPosts(post.description);

        console.log(post);
      });

      // trier posts par post id
      //   posts.sort((a, b) => a.id - b.id);

      console.log("Success:", posts);

      // placer le post dans l'array global ( postsList[] )
      postsList = posts;

      // interval pour afficher les posts
      intervalID = setInterval(displayPosts, 3000);
    });
}

function postLikes(postId) {
  fetch("https://insta-api-api.0vxq7h.easypanel.host/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: postId }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function postComment(comment, postId, commentElement) {
  fetch("https://insta-api-api.0vxq7h.easypanel.host/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
      content: comment,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Comments: " + data);
      const commentItem = document.createElement("div");
      commentItem.textContent = comment;
      commentElement.appendChild(commentItem);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

searchButton.addEventListener("click", () => {
  const keyword = searchInput.value;
  const filteredPosts = searchPosts(keyword);
  displayFilteredPosts(filteredPosts);
});

// pour filtrer les keyword avec la search bar
function displayFilteredPosts(filteredPosts) {
  content.innerHTML = "";
  filteredPosts.forEach((post) => {
    getUser(post.userId).then((user) => {
      createElementDOMElement(post, user);
    });
  });
}

function searchPosts(keyword) {
  return postsList.filter((post) =>
    post.description.toLowerCase().includes(keyword.toLowerCase())
  );
}

getAllPosts();
