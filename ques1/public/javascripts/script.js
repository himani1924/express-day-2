const searchInput = document.getElementById('searchInput')
const rsltList = document.getElementById('results')
let debounceTimer;

    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer); 

      debounceTimer = setTimeout(async () => {
        const query = searchInput.value;

        if (query) {
          const res = await fetch(`/users/search?q=${query}`);
          const data = await res.json();

          rsltList.innerHTML = '';
          data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.username;
            rsltList.appendChild(li);
          });
        } else {
          rsltList.innerHTML = '';
        }
      }, 1000); 
    });