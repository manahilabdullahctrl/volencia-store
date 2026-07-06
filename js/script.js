let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price, image) {

  cart.push({ name, price, image });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("🛒 Product added to cart!");
}

/* =========================
   BUY NOW (WHATSAPP)
========================= */
function buyNow(name, price) {

  const message = `🛍️ NEW ORDER - VOLENCIA

Product: ${name}
Price: Rs ${price}

👤 Name:
📞 Phone:
📍 Address:
🏙️ City:
📝 Note:`;

  window.open(
    "https://wa.me/923079489816?text=" + encodeURIComponent(message),
    "_blank"
  );
}

/* =========================
   CART COUNT
========================= */
function updateCartCount() {

  const el = document.getElementById("cartCount");

  if (el) el.innerText = cart.length;
}

/* =========================
   LOAD PRODUCTS (MULTI IMAGE SLIDER)
========================= */
function loadProducts() {

  const box = document.getElementById("productList");
  if (!box) return;

  products = JSON.parse(localStorage.getItem("products")) || [];

  box.innerHTML = "";

  products.forEach((p, i) => {

    const images = (p.images && p.images.length)
      ? p.images
      : [p.image];

    let imgHTML = "";

    images.forEach((img, index) => {
      imgHTML += `
        <img src="${img}" class="product-img ${index === 0 ? "active" : ""}">
      `;
    });

    box.innerHTML += `
      <div class="card">

        <div class="slider" data-index="0">

          ${imgHTML}

          ${images.length > 1 ? `
            <button onclick="changeImage(this, -1)">❮</button>
            <button onclick="changeImage(this, 1)">❯</button>
          ` : ""}

        </div>

        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p><b>Rs ${p.price}</b></p>

        <button onclick="addToCart(\`${p.name}\`, ${p.price}, \`${images[0]}\`)">
          🛒 Add to Cart
        </button>

        <button onclick="buyNow(\`${p.name}\`, ${p.price})">
          🟢 Buy Now
        </button>

      </div>
    `;
  });
}

/* =========================
   IMAGE SLIDER (FIXED)
========================= */
function changeImage(btn, dir) {

  const slider = btn.parentElement;
  const images = slider.querySelectorAll("img");

  let index = parseInt(slider.getAttribute("data-index")) || 0;

  images[index].classList.remove("active");

  index += dir;

  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  images[index].classList.add("active");

  slider.setAttribute("data-index", index);
}

/* =========================
   LOAD CART
========================= */
function loadCart() {

  const box = document.getElementById("cartItems");
  if (!box) return;

  box.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {

    total += Number(item.price);

    box.innerHTML += `
      <div class="card">

        <img src="${item.image}" alt="cart item">

        <h3>${item.name}</h3>

        <p>Rs ${item.price}</p>

        <button onclick="removeItem(${i})">
          Remove
        </button>

      </div>
    `;
  });

  box.innerHTML += `<h2>Total: Rs ${total}</h2>`;
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(i) {

  cart.splice(i, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();

  updateCartCount();
}

/* =========================
   SEARCH
========================= */
function searchProducts() {

  const input = document.getElementById("searchInput");
  if (!input) return;

  const filter = input.value.toLowerCase();

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    const text = card.innerText.toLowerCase();

    card.style.display = text.includes(filter)
      ? "block"
      : "none";
  });
}

/* =========================
   INIT
========================= */
window.onload = function () {

  updateCartCount();

  loadProducts();

  loadCart();
};