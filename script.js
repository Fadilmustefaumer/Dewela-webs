function searchArticles() {
  const searchInput = document.getElementById('searchBar').value.trim();
  const input = searchInput.normalize("NFC").toLowerCase();
  
  // Select all searchable items
  const elements = document.querySelectorAll('li, summary');

  // Clear previous highlights
  elements.forEach(el => {
    el.classList.remove('highlight');
  });

  if (!input) return;

  const matches = [];
  elements.forEach(el => {
    const text = el.textContent.normalize("NFC").toLowerCase();
    if (text.includes(input)) {
      matches.push(el);
    }
  });

  if (matches.length > 0) {
    matches.forEach(match => {
      match.classList.add('highlight');
      
      // Expand all parent containers so the result is visible
      let parent = match.closest('details');
      while (parent) {
        parent.open = true;
        parent = parent.parentElement.closest('details');
      }
    });

    // Smooth scroll to the first result
    matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // Elegant toast or alert
    alert('ይቅርታ፣ የፈለጉት ርዕስ አልተገኘም!');
  }
}

// Allow "Enter" key to trigger search
document.getElementById("searchBar").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchArticles();
  }
});
