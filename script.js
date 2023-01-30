var opencart = document.querySelector(".cart-icon");
var mycart = document.querySelector(".cart");
var closecart = document.querySelector("#cart-close");

// **************Open and close cart
opencart.addEventListener("click", () => {
  mycart.classList.add("active");
});

closecart.addEventListener("click", () => {
  mycart.classList.remove("active");
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  console.log("DOM entièrement chargé et analysé");
  start();
}
/****************** FUNCTION START *********************/

function start() {
  addEvent();
}
/*****************FUNCTION UPDATE ***********************/
function update() {
  updateTotal();
  addEvent();
}

/****************** FUNCTION ADDEVENTS *******************/
function addEvent() {

  //  Likeed elements
  var listlikedbtn = document.querySelectorAll(".heart");
  listlikedbtn.forEach((likeBtn) => {
    likeBtn.addEventListener("click", function () {
      likeBtn.classList.toggle("isLiked");
    });
  });

  // Remove element from cart
  var cartRemove = document.querySelectorAll(".cart-remove");
  cartRemove.forEach((btn) => {
    btn.addEventListener("click", removeCartElement);
  });

  //   Change quantity
  var cartQuantity = document.querySelectorAll(".cart-quantity");
  cartQuantity.forEach((qut) => {
    qut.addEventListener("change", changeElementQuantity);
  });

  //   Add element to cart
  var addCartBtn = document.querySelectorAll(".btn");
  addCartBtn.forEach((btn) => {
    btn.addEventListener("click", addCartElement);
  });

  //   Buy Command
  var buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", buyCommand);
}

/*******************EVENT FUNCTIONS*********************/

// Function Add PRODUCT to cart

var elementAdd = [];
function addCartElement() {
  var product = this.parentElement;
  var title_prod = product.querySelector(".card-title").innerHTML;
  var prix_Prod = product.querySelector(".prix").innerHTML;
  var img_prod = product.querySelector(".card-img-top").src;
  // console.log(title_prod, prix_Prod, img_prod);

  var newAdd = {
    title_prod,
    prix_Prod,
    img_prod,
  };
  if (elementAdd.find((el) => el.title_prod === newAdd.title_prod)) {
    alert("this product is Exist!");
    return;
  } else {
    elementAdd.push(newAdd);
  }

  var cartBoxElement = CartBoxComponent(title_prod, prix_Prod, img_prod);
  var newlist = document.createElement("div");
  newlist.innerHTML = cartBoxElement;
  var cartContent = mycart.querySelector(".content");
  cartContent.appendChild(newlist);
  console.log(cartBoxElement);

  update();
}

// Function Remove Product to cart

function removeCartElement() {
  this.parentElement.remove();
  update();
}
function changeElementQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }

  this.value = Math.floor(this.value);

  updateTotal();
}

// Function UPDATE TOTAL 

function updateTotal() {
  var cartBoxes = document.querySelectorAll(".cart-box");
  var totalElement = mycart.querySelector(".total-prix");
  var total = 0;
  cartBoxes.forEach((cartBox) => {
    var prixElement = cartBox.querySelector(".cart-prix");
    var prix = parseFloat(prixElement.innerHTML.replace("DT", ""));
    var quantity = cartBox.querySelector(".cart-quantity").value;

    total += quantity * prix;
  });

  totalElement.innerHTML = total + "DT";
}

// Function Cart-Box 

function CartBoxComponent(title_prod, prix_Prod, img_prod) {
  return `<div class="cart-box">
  <img src=${img_prod} alt="" class="cart-img">
  <div class="detail">
      <div class="cart-product-title">${title_prod}</div>
      <div class="cart-prix">${prix_Prod}</div>
      <input type="number" value="1" class="cart-quantity">
  </div>

  <i class="bx bxs-trash-alt cart-remove"></i>
</div> `;
}

//Function BTN BUY

function buyCommand() {
  if (elementAdd.length <= 0) {
    alert("Please Make An Order First...!");
    return;
  }
  var cartContent = mycart.querySelector(".content");
  cartContent.innerHTML = "";
  alert("Your Command Is Placed Successfully...!");
  elementAdd = [];
  update();
}
