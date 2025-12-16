// ===== NAVBAR =====
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// klik di luar
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-items");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  let cart = [];

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".menu-card");
      const title = card.querySelector(".menu-title").innerText;
      const price = parseInt(card.querySelector(".menu-card-price").innerText);

      addToCart(title, price);
    });
  });

  function addToCart(title, price) {
    const existingItem = cart.find((item) => item.title === title);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ title, price, qty: 1 });
    }

    renderCart();
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        "<p style='padding:1rem'>Keranjang masih kosong ☕</p>";
      return;
    }

    cart.forEach((item, index) => {
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <h4>${item.title}</h4>
          <p>
            ${item.qty} x Rp ${item.price.toLocaleString("id-ID")}
          </p>
          <strong>
            Rp ${(item.qty * item.price).toLocaleString("id-ID")}
          </strong>
          <span class="remove-item" data-index="${index}">❌</span>
        </div>
      `;
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        renderCart();
      });
    });
  }
});
