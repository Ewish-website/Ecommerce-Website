import { User } from "./user.js";
const cartModule = document.querySelector(".cart-section");

export class Cart {
  #userList;
  #cartItems;
  #QuantityContainer;
  #QuantityBtn;
  #deleteCart;
  #promoButtom;
  #checkoutBtn;

  constructor() {
    this.showModalCart();
    this.#cartItems = document.querySelector(".cartItems");
    this.user = new User();
    this.renderCartList();
  }

  destructor() {
    cartModule.innerHTML = "";
  }

  renderCartList() {
    this.#userList = this.user.isUserLoggedIn();
    if (this.#userList.cartList.length > 0) {
      this.#userList.cartList.forEach((item) => {
        this.AddItem(item);
      });
    } else {
      document.querySelector(".emptyCart").classList.remove("d-none");
    }
    this.displayPrice();
    this.cartEventListener();
  }

  createCartModal() {
    cartModule.innerHTML = `
    <div class="modal fade modal-lg cart-modal" id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable rounded-4">
            <div class="modal-content p-0 w-100">
                <button type="button" class="cart-model-close btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-body cartLargeScreen  w-100 row m-0 p-0">
                    <div class="shopping-cart col-12 col-lg-8 py-5 px-4">
                        <div class="shopping-cart-heading d-flex justify-content-between align-items-center mb-3">
                            <h3 class="fw-bold mb-0 text-black fs-4 text-uppercase cart-heading">Cart Details</h3>
                            <h3 class="fw-bold mb-0 text-black fs-4 text-uppercase d-none shipping-heading">Shipping Information</h3>
                            <h6 class="mb-0 text-muted itemsCount">0 items</h6>
                        </div>
                        <hr class="my-3">
                        <div class="cart-items-checkout">
                            <div class="cartItems">
                              <div class="emptyCart h-100 w-100 d-flex justify-content-center align-items-center d-none">
                                <p class="text-center text-muted"> Your cart is currently empty. </p>
                              </div>
                            </div>
                            <div class="cartCheckout checkout-from iphone h-100 w-100 d-none py-2">
                              <form action="https://httpbin.org/post" class="form" method="POST">
                                  <div class="addressBlock">
                                    <div class="fields fields--2">
                                      <label class="field">
                                        <span class="field__label" for="firstname">First name</span>
                                        <input class="field__input" type="text" required id="firstname"/>
                                      </label>
                                      <label class="field">
                                        <span class="field__label" for="lastname">Last name</span>
                                        <input class="field__input" type="text" required id="lastname"/>
                                      </label>
                                    </div>
                                    <label class="field my-2">
                                      <span class="field__label" for="address">Address</span>
                                      <input class="field__input" type="text" required id="address" />
                                    </label>
                                    <div class="fields fields--3">
                                      <label class="field">
                                        <span class="field__label" for="phoneNum">phone number</span>
                                        <input class="field__input" type="text" required id="phoneNum" />
                                      </label>
                                      <label class="field">
                                        <span class="field__label" for="city">City</span>
                                        <input class="field__input" type="text" required id="city" />
                                      </label>
                                      <label class="field">
                                        <span class="field__label" for="country">country</span>
                                        <input class="field__input" type="text" required id="country" />
                                      </label>
                                    </div>  
                                  </div>
                                  <fieldset class= "p-0 pt-3">
                                    <h5 class="payment-method1 p-0">Payment Method</h5>
                                    <div class="form__radios d-flex justify-content-evenly">
                                      <div class="form__radio p-1">
                                        <input checked id="visa" name="payment-method" type="radio" />
                                        <label class="ps-2" for="visa">
                                          <img src="../assets/visa.png" style="width: 30px" alt="VISA">
                                        </label>
                                      </div>
                                      <div class="form__radio p-1">
                                        <input checked id="master" name="payment-method" type="radio" />
                                        <label class="ps-2" for="master">
                                          <img src="../assets/master.png" style="width: 30px" alt="MASTER">
                                        </label>
                                      </div>
                                      <div class="form__radio p-1" style="relative">
                                        <input id="paypal" name="payment-method" type="radio" />
                                        <label class="ps-2" for="paypal">
                                          <img src="../assets/payPal.png" style="width: 30px" alt="payPal Img">
                                        </label>
                                      </div>

                                      <div class="form__radio p-1">
                                        <input id="cash" name="payment-method" type="radio" />
                                        <label class="ps-2" for="cash">
                                          <img src="../assets/cash.png" style="width: 30px" alt="payPal Img">
                                        </label>
                                      </div>
                                    </div>
                                  </fieldset>
                                  <div class="payBlock"></div>
                                  <div class="btn1">
                                    <button id="conf-btn1" class="button button--full"  type="button"  data-bs-dismiss="modal">
                                      Confirm
                                    </button>
                                  </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="shopping-summary col-12 col-lg-4 p-0">
                        <div class="py-5 px-4 h-100 summary-container w-100">
                            <h3 class="shopping-summary-heading fw-bold mb-3 fs-4 text-uppercase">Summary</h3>
                            <hr class="my-3">
                            <form class="pt-3 border-0">
                                <div class="cart-promoCode row justify-content-between w-100">
                                    <div class="form-outline col-6 col-lg-12 p-0">
                                        <input type="text" id="form3Examplea2" class="promoInput form-control form-control-lg w-100" />
                                        <label class="form-label" for="form3Examplea2">Promo code</label>
                                    </div>
                                    <button type="button" class="btn btn-primary btn-lg col-5 col-lg-12 mt-lg-2 prompCodeBtn"> 
                                        Apply
                                    </button>
                                </div>
                            </form>
                            <hr class="my-4">
                            <div class="cart-price mb-3">
                                <div class="d-flex justify-content-between">
                                    <h5>Products</h5>
                                    <h5 class="product">$ 0.00</h5>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h5>Shipping</h5>
                                    <h5 class="shipping">$ 0.00</h5>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h5>Discount</h5>
                                    <h5 class="discount">$ 0.00</h5>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h5>Total</h5>
                                    <h5 class="total">$ 0.00</h5>
                                </div>
                            </div>
                            <button type="button" class="btn btn-dark btn-block btn-lg col-md-12 checkoutBtn"
                                data-mdb-ripple-color="dark">checkout
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer cart-backToShopping m-0 justify-content-start">
                    <h6 class="mb-0">
                        <a href="products.html" class="text-decoration-none text-black border-1">
                            <i class="bi bi-arrow-left "></i> Back to shopping
                        </a>
                    </h6>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  showModalCart() {
    this.createCartModal();
    var modal = bootstrap.Modal.getOrCreateInstance(
      cartModule.querySelector("#cartModal")
    );
    modal.show();
  }

  cartEventListener() {
    this.#QuantityBtn = document.querySelectorAll(".quantityBtn");
    this.#QuantityContainer = document.querySelectorAll(".QuantityContainer");
    this.#deleteCart = document.querySelectorAll(".cart-delete-product");
    this.#promoButtom = document.querySelector(".prompCodeBtn");
    this.#checkoutBtn = document.querySelector(".checkoutBtn");
    const checkoutFormElm = document.querySelector(".checkout-from");
    const confBtm = document.querySelector("#conf-btn1");

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
    this.#deleteCart.forEach((container) => {
      container.addEventListener("click", (e) => {
        this.RemoveItem(e);
      });
    });

    this.#promoButtom.addEventListener("click", (e) => {
      e.preventDefault();
      let input = document.querySelector(".promoInput").value;
      if (input == "123") {
        this.displayPrice(0.05);
      }
    });

    this.#checkoutBtn.addEventListener("click", () => {
      if (this.#userList.cartList.length > 0) {
        this.#cartItems.classList.toggle("d-none");
        checkoutFormElm.classList.toggle("d-none");
        document.querySelector(".cart-heading").classList.toggle("d-none");
        document.querySelector(".shipping-heading").classList.toggle("d-none");
      }
    });

    confBtm.addEventListener("click", () => {
      this.togglee();
    });

    document.querySelector("#conf-btn").addEventListener("click", () => {
      this.togglee();
    });
  }

  AddItem(item) {
    this.#cartItems.insertAdjacentHTML(
      "beforeend",
      ` <div class="item" id="${item.id}">
          <div class="w-100 mb-4 d-flex justify-content-between align-items-center">
            <div class="col-2 p-0">
                <img
                    src="${item.images[0]}"
                    class="cart-product-image img-fluid rounded-3" alt="${item.title}">
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
        <hr class="mx-4">
      </div>`
    );
    this.displayPrice();
  }

  RemoveItem(e, i) {
    let child = e.target.closest(".item");
    this.user.DeleteFromCart(this.#userList, child.id);
    this.#cartItems.removeChild(child);
    this.displayPrice();
    if (this.#userList.cartList.length == 0) {
      document.querySelector(".emptyCart").classList.remove("d-none");
    }
    this.displayPrice();
  }

  changeQuantity(e, i) {
    if (e.target.classList.contains("bi")) {
      let clickedElement = e.target.closest("button");
      if (clickedElement.classList.contains("minusbtn")) {
        if (this.#userList.cartList[i].quantity > 1) {
          this.#userList.cartList[i].quantity--;
          this.#QuantityBtn[i].value = this.#userList.cartList[i].quantity;
        }
      } else if (clickedElement.classList.contains("plusbtn")) {
        this.#userList.cartList[i].quantity++;
        this.#QuantityBtn[i].value = this.#userList.cartList[i].quantity;
      }
    } else if (e.target.classList.contains("quantityBtn")) {
      this.#userList.cartList[i].quantity = this.#QuantityBtn[i].value;
    }
    this.user.updateUser(this.#userList);
    this.displayPrice();
  }

  displayPrice(discountValue = 0) {
    let AllProductcount = 0;
    let productPrice = 0;
    let ShippingPrice = 0;
    let product = document.querySelector(".product");
    let total = document.querySelector(".total");
    let discount = document.querySelector(".discount");
    let itemsCount = document.querySelector(".itemsCount");
    let Shipping = document.querySelector(".shipping");

    this.#userList.cartList.forEach((item) => {
      productPrice += item.quantity * item.price;
      AllProductcount += item.quantity;
    });

    if (this.#userList.cartList.length > 0) {
      ShippingPrice = 5;
    }

    product.innerHTML = ` ${"$ " + productPrice.toFixed(2)}`;
    discountValue *= -productPrice;
    discount.innerHTML = `${"$ " + discountValue.toFixed(2)}`;
    Shipping.innerHTML = `${"$ " + ShippingPrice.toFixed(2)}`;
    total.innerHTML = ` ${
      "$ " + (productPrice + discountValue + ShippingPrice).toFixed(2)
    }`;
    itemsCount.innerHTML = `${AllProductcount} items`;
  }

  payCard(img, name){
    let card = `
            <div class="paymentCard col-12 col-sm-11 col-md-10 mx-auto">
              <div class="card-inner">
                  <div class="front">
                      <img src="../assets/map.png" class="map-img" alt="map">
                      <div class="cardRow">
                          <img src="../assets/chip.png" style="width: 45px; height: 40px;" alt="chip">
                          <img src="${img}" style="width: 80px;" alt="${name}">
                      </div>
                      <div class="cardRow card-no">
                          <input type="text" name="numOnCard" id="numOnCard" maxlength="16" placeholder="enter your card number">
                      </div>
                      <div class="cardRow-2">
                          <div class="cardRow card-holder">
                              <p class="m-0">CARD HOLDER</p>
                              <p class="m-0">VALID TILL</p>
                          </div>
                          <div class="cardRow name">
                              <input type="text" name="NameOnCard" id="nameOnCard" placeholder="Name on card">
                              <div class="expDate">
                                  <input type="text" name="cardMonth" maxlength="2" placeholder="MM" id="month">
                                  <p class="my-auto"> / </p>
                                  <input type="text" name="cardYear" maxlength="2" placeholder="YY" id="year">
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="back">
                      <img src="../assets/map.png" class="map-img" alt="map">
                      <div class="bar"></div>
                          <div class="cardRow card-cvv">
                              <img src="../assets/pattern.png" alt="">
                              <input type="text" name="cardCVV" maxlength="3" placeholder="CVV" id="cvv">
                          </div>
                      <div class="cardRow card-text">
                          <p class="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. d quam. Molestiae voluptatem itaque.</p>
                      </div>
                      <div class="cardRow signature">
                          <img src="${img}" style="width: 70px;" alt="${name}">
                      </div>
                  </div>
              </div>
            </div>
          `;
    return card;
  }

  payMethod() {
    let container = document.querySelector(".payBlock");
    let options = document.getElementsByName("payment-method");
    console.log(options);
    let option = 0;
    options.forEach((e) => {
      console.log(e);
      if (e.checked) {
        option = e.id;
        console.log(option);
      }
    });

    switch (option) {
      case "cash":
        container.style.display = "none";

        break;

      case "visa":
        container.style.display = "block";
        container.insertAdjacentHTML(
          "afterbegin",
          this.payCard("../assets/visaLogo.png", "visa")
        );
        break;

      case "master":
        container.style.display = "block";
        container.insertAdjacentHTML(
          "afterbegin",
          this.payCard("../assets/MasterLogo.png", "master")
        );
        break;

      case "payPal":
        container.style.display = "block";
        break;

      default:
        break;
    }
  }

  togglee() {
      var popup2 = document.getElementById("conf-pop-up");
      popup2.classList.toggle("active");
  }
}

// class ShippingInfo{
//   constructor(){
//     this.payMethod();
//   }

//   userInfo(){
//     let fName = document.querySelector(".firstname");
//     let lName = document.querySelector(".lastname");
//     let number = document.querySelector(".address");
//     let address = document.querySelector(".phoneNum");
//     let city = document.querySelector(".city");
//     let country = document.querySelector(".country");
//   }
// }


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

/* checkout button */

// const checkoutBtnElm = document.querySelector(".checkoutBtn")
// const shoppingCartContainerElm = document.querySelector(".shopping-cart-container")

// const checkoutFormElm = document.querySelector(".checkout-from")

// checkoutBtnElm.addEventListener('click', () => {
//     console.log('testt')
//     shoppingCartContainerElm.classList.toggle('d-none')
//     checkoutFormElm.classList.toggle('d-none')

// })

// /* confirm button */
// function togglee(){
//     var blurr = document.getElementById("blurr");
//     blurr.classList.toggle("active");

//     var popup2 = document.getElementById("conf-pop-up");
//     popup2.classList.toggle("active");
// }


