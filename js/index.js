document.addEventListener("DOMContentLoaded", () => {
    const gitHubForm = document.getElementById("github-form");
    const gitHubContainer = document.getElementById("github-container");
    const userList = document.getElementById("user-list");
    const reposList  = document.getElementById("repos-list");
  
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Clear previous results
      gitHubContainer.innerHTML = '';
      userList.innerHTML = '';
      reposList .innerHTML = '';
  
      const username = document.getElementById("search").value;
  
      try {
        // Search GitHub users
        const usersResponse = await fetch(`https://api.github.com/search/users?q=octocat${search}`);
        const usersData = await usersResponse.json();
  
        // Display user information
        usersData.items.forEach(user => {
          const userElement = document.createElement('div');
          userElement.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" />
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
          `;
          userElement.addEventListener('click', () => {
            // Fetch user repositories
            fetchUserRepos(user.login);
          });
  
          userList.appendChild(userElement);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });
  
    async function fetchUserRepos(search) {
      try {
        // Fetch user repositories
        const reposResponse = await fetch(`https://api.github.com/users/octocat/${search}/repos`);
        const reposData = await reposResponse.json();
  
        // Display repositories
        reposData.forEach(repo => {
          const repoElement = document.createElement('div');
          repoElement.innerHTML = `
            <p>${repo.name}</p>
            <a href="${repo.html_url}" target="_blank">Repository</a>
          `;
          repoList.appendChild(repoElement);
        });
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    }
  });
  