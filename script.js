document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  const ProductList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checOutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${[product.price.toFixed(2)]}</span>
      <button data-id="${product.id}">Add to cart</button>`;
    ProductList.appendChild(productDiv);
  });

  ProductList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      console.log(productId);
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function removeFromCart(item) {
    const index = cart.findIndex((product) => product.id === item.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItems");
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)}
          <button data-id="${item.id}">Remove</button>`;
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        saveCart();
        cartItems.appendChild(cartItem);
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      saveCart();
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const cartId = parseInt(e.target.getAttribute("data-id"));
      const ct = cart.find((c) => c.id === cartId);
      removeFromCart(ct);
    }
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  checOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successful");
    renderCart();
  });
});
