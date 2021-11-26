// Error message Hide
document.getElementById('error-message').style.display = 'none';

// Enable Error message by function
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

// Search button click
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Clear Search Field Data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText === '') {
        // Call error message
        displayError();
    }
    else {
        // Load Data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }
}

// Error message hide
document.getElementById('error-message').style.display = 'none';
const displaySearchResult = docs => {
    // Error message hide
    document.getElementById('error-message').style.display = 'none';
    const searchResult = document.getElementById('search-result');
    // Clear Search Result Data
    searchResult.textContent = '';
    if(docs.length === 0) {
        // Call Error message
        displayError();
    }
    docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <div class="card h-100">
            <img width="250" height="200" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">Book Title: ${book.title}</h5>
              <p class="card-text text-center">Author: ${book.author_name}</p>
              <p class="card-text text-center">First Publish: ${book.first_publish_year}</p>
            </div>
          </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}