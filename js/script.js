let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let products = [];


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image) {

  cart.push({
    name:name,
    price:price,
    image:image
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  alert("🛒 Product added to cart!");

}




/* =========================
   BUY NOW
========================= */

function buyNow(name, price){

const message =
`🛍️ NEW ORDER - VOLENCIA

Product: ${name}
Price: Rs ${price}

👤 Name:
📞 Phone:
📍 Address:
🏙️ City:
📝 Note:`;


window.open(
"https://wa.me/923079489816?text="+encodeURIComponent(message),
"_blank"
);

}




/* =========================
   CART COUNT
========================= */

function updateCartCount(){

const count=document.getElementById("cartCount");

if(count){

count.innerText=cart.length;

}

}




/* =========================
   LOAD PRODUCTS FROM SUPABASE
========================= */

async function loadProducts(){


const box=document.getElementById("productList");


if(!box) return;



const {data,error}=await supabaseClient

.from("products")

.select("*")

.order("created_at",{ascending:false});



if(error){

console.log(error);

return;

}



products=data || [];


box.innerHTML="";



if(products.length===0){

const empty=document.getElementById("emptyMessage");

if(empty){

empty.innerText="No Products Available";

}

return;

}



products.forEach(p=>{


box.innerHTML += `


<div class="card"
onclick="openProduct('${p.id}')"
style="cursor:pointer;">



<img src="${p.image}" class="product-img">



<h3>${p.name}</h3>



<p>${p.description}</p>



<p><b>Rs ${p.price}</b></p>




<button onclick="event.stopPropagation(); addToCart('${escapeText(p.name)}',${p.price},'${p.image}')">

🛒 Add to Cart

</button>




<button onclick="event.stopPropagation(); buyNow('${escapeText(p.name)}',${p.price})">

🟢 Buy Now

</button>




<button onclick="event.stopPropagation(); addWishlist('${escapeText(p.name)}',${p.price},'${p.image}')">

❤️ Wishlist

</button>



</div>


`;



});



}



/* =========================
   ESCAPE TEXT
========================= */

function escapeText(text){

return text.replace(/'/g,"\\'");

}



/* =========================
   OPEN PRODUCT DETAIL
========================= */

function openProduct(id){

window.location.href =
"pages/product.html?id="+id;

}





/* =========================
   WISHLIST
========================= */

function addWishlist(name,price,image){


wishlist.push({

name:name,

price:price,

image:image

});


localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);



alert("❤️ Added to Wishlist");


}




/* =========================
   LOAD CART
========================= */


function loadCart(){


const box=document.getElementById("cartItems");


if(!box) return;



box.innerHTML="";


let total=0;



cart.forEach((item,index)=>{


total += Number(item.price);



box.innerHTML += `


<div class="card">


<img src="${item.image}" class="product-img">



<h3>${item.name}</h3>



<p>Rs ${item.price}</p>



<button onclick="removeItem(${index})">

❌ Remove

</button>


</div>


`;



});



const totalBox=document.getElementById("cartTotal");


if(totalBox){

totalBox.innerText="Total: Rs "+total;

}



}




/* =========================
 REMOVE CART ITEM
========================= */


function removeItem(index){


cart.splice(index,1);



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



loadCart();


updateCartCount();



}





/* =========================
 SEARCH
========================= */


function searchProducts(){


const input=document.getElementById("searchInput");


if(!input) return;



const value=input.value.toLowerCase();



document.querySelectorAll(".card").forEach(card=>{


card.style.display =

card.innerText.toLowerCase().includes(value)

?"block"

:"none";


});


}





/* =========================
 START
========================= */


window.onload=function(){


updateCartCount();


loadProducts();


loadCart();


};