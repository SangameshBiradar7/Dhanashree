/* ================= MOBILE MENU ================= */
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

/* ================= COLLECTIONS ================= */

// Google Sheet CSV URL
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRS8XYBDHT-9Nml-YCNstptrVSNCzVEsa2l5p9SnN2NcfFQ6txVpwynETQWCj-dIAJvXVL5jbuxzV97/pub?output=csv";

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

// Store all products
let allProducts = [];

/* Fetch products */
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1);

    allProducts = rows.map(row => {
      const cols = row.split(",");

      // Convert Google Drive link to direct image link
      let imageLink = cols[3]?.trim();
      const fileIdMatch = imageLink?.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        imageLink = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }

      return {
        name: cols[1]?.trim(),
        category: cols[2]?.trim().toLowerCase(), // VERY IMPORTANT
        image: imageLink
      };
    }).filter(p => p.name && p.image);

    displayProducts(allProducts);
  })
  .catch(err => console.error("CSV Error:", err));

/* Display products */
function displayProducts(products) {
  productsGrid.innerHTML = "";

  if (products.length === 0) {
    productsGrid.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
    `;

    productsGrid.appendChild(card);
  });
}


/* Filter logic */
function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
}

/* Event listeners */
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
