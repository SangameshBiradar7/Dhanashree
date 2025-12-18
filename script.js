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