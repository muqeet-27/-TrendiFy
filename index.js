const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Popup
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide-popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide-popup");
    }, 1000);
  });
}

// cart

// Retrieve the cart from localStorage or initialize it
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');
const openCartModalButton = document.getElementById('openCartModal');

// Function to update the cart display in the modal
function updateCart() {
  cartItemsContainer.innerHTML = ''; // Clear previous cart items
  let total = 0;

  // Loop through cart items and display them
  cart.forEach((item, index) => {
    total += item.quantity * item.price;
    cartItemsContainer.innerHTML += `
      <div class="cart-item-wrapper">
        <span>${item.name} - $${item.price} x </span>
        <input type="number" value="${item.quantity}" min="0" class="quantity" data-index="${index}" />
        <span> = $${(item.quantity * item.price).toFixed(2)}</span>
      </div>
    `;
  });

  // Show the total price
  cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to open the cart modal
function openCartModal() {
  cartModal.style.display = 'flex'; // Show the modal
  updateCart(); // Update cart content
}

// Function to close the cart modal
function closeModal() {
  cartModal.style.display = 'none'; // Hide the modal
}

// Add event listener to close the cart modal
closeCartModal.addEventListener('click', closeModal);

// Add event listener to open the cart modal button
openCartModalButton.addEventListener('click', openCartModal);

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = parseFloat(button.getAttribute('data-product-price'));

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.id == productId);
    if (existingProduct) {
      existingProduct.quantity++; // Increase quantity if product is already in the cart
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }

    updateCart(); // Update cart immediately
    openCartModal(); // Open cart modal
  });
});

// Add event listener for quantity changes in the cart modal
cartItemsContainer.addEventListener('input', (e) => {
  if (e.target.classList.contains('quantity')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const newQuantity = parseInt(e.target.value);

    if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
    } else {
      // Remove the item if quantity is set to 0
      cart.splice(index, 1);
    }

    updateCart(); // Update cart display after quantity change
  }
});
