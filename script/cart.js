import { User } from "./user.js";
const cartModule = document.querySelector(".cart-section");

export class Cart {
  #userList;
  #cartItems;
  #QuantityContainer;
  #QuantityBtn;
  #deleteCart;
  #promoButtom;

  constructor() {
    this.#cartItems = document.querySelector(".cartItems");
    this.user = new User();
    while(this.#cartItems.firstChild){
      this.#cartItems.firstChild.remove();
    }
    this.renderCartList();
  }

  cartEventListener() {
    this.#QuantityBtn = document.querySelectorAll(".quantityBtn");
    this.#QuantityContainer = document.querySelectorAll(".QuantityContainer");
    this.#deleteCart = document.querySelectorAll(".cart-delete-product");
    this.#promoButtom = document.querySelector(".prompCodeBtn");

    this.#QuantityContainer.forEach((container, i) => {
      container.addEventListener("change", (e) => {
        this.changeQuantity(e, i);
      });
    });
    this.#QuantityContainer.forEach((container, i) => {
      container.addEventListener("click", (e) => {
        this.changeQuantity(e, i);
      });
    });
    this.#deleteCart.forEach((container, i) => {
      container.addEventListener("click", (e) => {
        this.RemoveItem(e, i);
      });
    });

    this.#promoButtom.addEventListener("click", (e) => {
      e.preventDefault();
      let input = document.querySelector(".promoInput").value;
      if (input == "123") {
        this.displayPrice(0.05);
      }
    });
  }

  AddItem(item) {
    this.#cartItems.insertAdjacentHTML(
      "beforeend",
      `<div class="row w-100 mb-4 d-flex justify-content-between align-items-center">
                <div class="col-2 p-0">
                    <img
                        src="${item.images[0]}"
                        class="cart-product-image img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-2 col-lg-3 p-0">
                    <h6 class="cart-product-name text-black mb-0">${item.title}</h6>
                    <h6 class="cart-product-category text-muted">${item.category}</h6>
                </div>
                <div class="col-4 col-sm-3 d-flex p-0 QuantityContainer">
                    <button class="minusbtn btn btn-link p-0 pe-2">
                        <i class="bi bi-dash fs-5"></i>
                    </button>

                    <input id="form1" min="0" name="quantity" value="${item.quantity}" type="number"
                        class="quantityBtn form-control form-control-sm" />

                    <button class="plusbtn btn btn-link p-0 ps-2">
                        <i class="bi bi-plus fs-5"></i>
                    </button>
                </div>
                <div class="col-2 p-0">
                    <h6 class="cart-product-price mb-0 text-center">${item.price}</h6>
                </div>
                <div class="col-1 p-0 text-muted cart-delete-product" style ="cursor: pointer;">
                    <i class="bi bi-x fs-5"></i>
                </div>
            </div>
            <hr class="mx-4">`
    );
    this.displayPrice();
  }

  RemoveItem(e, i) {
    this.#userList.cartList.splice(i, 1);
    this.user.updateUser(this.#userList);
    let child = document.querySelectorAll(".cartItems div");
    let hr = this.#cartItems.querySelectorAll(".cartItems hr");
    this.#cartItems.removeChild(child[i]);
    this.#cartItems.removeChild(hr[i]);
    this.displayPrice();
  }

  changeQuantity(e, i) {
    if (e.target.classList.contains("bi")) {
      let clickedElement = e.target.closest("button");
      if (clickedElement.classList.contains("minusbtn")) {
        if (this.#userList.cartList[i].quantity > 1) {
          this.#userList.cartList[i].quantity--;
          this.#QuantityBtn[i].value =
            this.#userList.cartList[i].quantity;
        }
      } else if (clickedElement.classList.contains("plusbtn")) {
        this.#userList.cartList[i].quantity++;
        this.#QuantityBtn[i].value =
          this.#userList.cartList[i].quantity;
      }
    } else if (e.target.classList.contains("quantityBtn")) {
      this.#userList.cartList[i].quantity =
        this.#QuantityBtn[i].value;
    }
    this.user.updateUser(this.#userList)
    this.displayPrice();
  }

  displayPrice(discountValue = 0) {
    let AllProductcount = 0;
    let productPrice = 0;
    let product = document.querySelector(".product");
    let total = document.querySelector(".total");
    let discount = document.querySelector(".discount");
    let itemsCount = document.querySelector(".itemsCount"); 

    this.#userList.cartList.forEach((item) => {
      productPrice += item.quantity * item.price;
      AllProductcount += item.quantity; 
    });
    product.innerHTML = ` ${"$ " + productPrice.toFixed(2)}`;
    discountValue *= -productPrice;
    discount.innerHTML = `${"$ " + discountValue.toFixed(2)}`;
    total.innerHTML = ` ${
      "$ " + (productPrice + discountValue + 5).toFixed(2)
    }`;
    itemsCount.innerHTML = `${AllProductcount} items`
  }

  renderCartList() {
    this.#userList = this.user.isUserLoggedIn();
    console.log(this.#userList)
    var modal = bootstrap.Modal.getOrCreateInstance(
      cartModule.querySelector("#exampleModal")
    );
    modal.show();
    this.#userList.cartList.forEach((item) => {
      this.AddItem(item);
    });
    this.displayPrice();
    this.cartEventListener();
  }
}

// document.querySelector(".cartBtn").addEventListener("click", () => {
//   let cart = new Cart();
// });


// let user = [
//   {
//     email: "radwaismail444@gmail.com",
//     id: "6c705a8c-bd55-4423-9652-a6a30a8d949a",
//     password: "123",
//     firstName: "radwa",
//     lastName: "nabil",
//     cartList: [
//       {
//         id: 1,
//         title: "Iphone",
//         description: "lorem1 jxjjx jjsjs jshjajja jahhah",
//         price: 12.96,
//         rating: 4.95,
//         brand: "apple",
//         category: "smartphones",
//         images: [
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png",
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png",
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png",
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png",
//         ],
//         stock: 94,
//         quantity: 1,
//       },
//       {
//         id: 2,
//         title: "Iphone",
//         description: "lorem1 jxjjx jjsjs jshjajja jahhah",
//         price: 12.96,
//         rating: 4.95,
//         brand: "apple",
//         category: "smartphones",
//         images: [
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png",
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png",
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png",
//           "https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png",
//         ],
//         stock: 94,
//         quantity: 1,
//       },
//     ],
//     active: true,
//   },
// ];

// localStorage.setItem("users", JSON.stringify(user));
