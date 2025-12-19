function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

/* Start slider */
showSlide(currentSlide);
setInterval(nextSlide, 5000);

// Get elements
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const products = document.querySelectorAll('.product-item');

// Filter function
function filterProducts() {
  const searchText = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedCategory = categorySelect ? categorySelect.value : 'all';

  products.forEach(product => {
    const productName = product.querySelector('h4').textContent.toLowerCase();
    const productCategory = product.dataset.category;

    const matchesSearch = productName.includes(searchText);
    const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Event listeners
if (searchInput) {
  searchInput.addEventListener('input', filterProducts);
}
if (categorySelect) {
  categorySelect.addEventListener('change', filterProducts);
}

// Collections section
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRS8XYBDHT-9Nml-YCNstptrVSNCzVEsa2l5p9SnN2NcfFQ6txVpwynETQWCj-dIAJvXVL5jbuxzV97/pub?output=csv";
let allProducts = [];

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    allProducts = rows.map(row => {
      const [id, name, category, image] = row.split(",");
      return { id, name, category, image };
    });
    displayProducts(allProducts);
  });

function displayProducts(products) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  products.forEach(p => {
    if (!p.name) return;
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
      </div>
    `;
  });
}

function applyFilters() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categorySelect").value;

  let filtered = [];
  for (let product of allProducts) {
    if (product.name.toLowerCase().includes(searchText) && (selectedCategory === "all" || product.category === selectedCategory)) {
      filtered.push(product);
    }
  }

  displayProducts(filtered);
}