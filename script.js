let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  const cartPanel = document.getElementById("cart-panel");
  cartPanel.classList.toggle("open");
  updateCartDisplay();
}

function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromCart(item.name);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
}

// Clear All Items from Cart
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = []; // Empty the cart array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
    updateCartCount(); // Update cart count badge
    updateCartDisplay(); // Refresh cart UI
  }
}

// Initialize cart count on page load
updateCartCount();
