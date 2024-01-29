function addPostHTML(post, userName) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;
  postDiv.append(titleElement);

  const userNameElement = document.createElement("p");
  userNameElement.innerHTML = `By: <b>${userName}</b>`;
  postDiv.append(userNameElement);

  const completedElement = document.createElement("p");
  completedElement.textContent = `Completed: true`;
  postDiv.append(completedElement);

  const showCommentsButton = document.createElement("button");
  showCommentsButton.setAttribute("id", post.id);
  showCommentsButton.classList.add("button");
  showCommentsButton.textContent = "Show comments";
  postDiv.append(showCommentsButton);

  const listElement = document.getElementById("list");
  listElement.append(postDiv);

  showCommentsButton.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${showCommentsButton.id}`)
    .then(response => response.json())
    .then(comments => console.log(comments))
    .catch(err => console.error(err));
  });
}

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(postRes => {
    postRes.forEach(post => {
      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then(response => response.json())
        .then(user => addPostHTML(post, user.name))
        .catch(err => console.error(err));
    });
  })
  .catch(err => console.error(err));