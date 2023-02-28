const cartBtn = document.querySelector(".cartBtn");
const modalWrap = document.querySelector(".cart-section");

class Cart{
    #activeUser 
    #userList;
    #cartItems;
    #QuantityContainer;
    #QuantityBtn;
    #deleteCart;
    #itemsCount;

    constructor(){
        this.#cartItems = document.querySelector(".cartItems");
        this.renderCartList();
        window.addEventListener("resize", (e) => {
            let modalBody = document.querySelector(".modal-body");
            if(e.target.innerWidth < 992){
                if(modalBody.classList.contains("cartLargeScreen")){
                    modalBody.classList.remove("cartLargeScreen");
                }
            }
            else{
                if (! modalBody.classList.contains("cartLargeScreen")) {
                    modalBody.classList.add("cartLargeScreen");
                }
            }
        });
    }

    cartEventListener(){
        this.#QuantityBtn = document.querySelectorAll(".quantityBtn");
        this.#QuantityContainer = document.querySelectorAll(".QuantityContainer");
        this.#deleteCart = document.querySelectorAll(".cart-delete-product");

        this.#QuantityContainer.forEach((container, i) => {
            container.addEventListener("change", (e) => {
                this.IncItemCounter(e,i);
            });
        })
        this.#QuantityContainer.forEach((container, i) => {
            container.addEventListener("click", (e) => {
                this.IncItemCounter(e,i);
            });
        });
        this.#deleteCart.forEach((container, i) => {
            container.addEventListener("click", (e) => {
                this.RemoveItem(e, i);
            });
        });
    }

    AddItem(item){
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
    }
    
    // ----------------------------
    // remove from local storage
    RemoveItem(e, i){
        // -------------------------------------------------
        // remove cart list of index i from local storage
        // -------------------------------------------------
        let child = document.querySelectorAll(".cartItems div");
        let hr = this.#cartItems.querySelectorAll(".cartItems hr");
        this.#cartItems.removeChild(child[i]);
        this.#cartItems.removeChild(hr[i]);
    }

    // ----------------------------
    // Edit in local storage
    IncItemCounter(e,i){
        if (e.target.classList.contains("bi")) {
            let clickedElement = e.target.closest("button");
            if (clickedElement.classList.contains("minusbtn")) {
                // --------------------------------------------------------
                // check if quantity in local storage is less than1 
                // if yes: decrement it and insert the value in input value
                // ---------------------------------------------------------
                
            } else if (clickedElement.classList.contains("plusbtn")) {
                // -----------------------------------------------
                // increment quantity value in local storage
                // insert the new value in input value
                // ------------------------------------------------
            }
        } 
        else if (e.target.classList.contains("quantityBtn")) {
            // --------------------------------------------------
            // insert the input value in quantity local storage
            // --------------------------------------------------
        }
        localStorage.setItem("users", JSON.stringify(this.#userList));
    }

    // Display price
    displayPrice(item){

    }

    renderCartList(){
        this.#userList = JSON.parse(localStorage.getItem("users"));
        if (this.#userList == null || this.#userList == []){
            console.log("No List")
        }
        else{ 
            this.#userList.forEach((user, i) => {
                if(user.active){
                    this.#activeUser = i
                }
            })
            var modal = bootstrap.Modal.getOrCreateInstance(
                modalWrap.querySelector("#exampleModal")
            );
            modal.show()
            this.#userList[this.#activeUser].cartList.forEach((item) => {
              this.AddItem(item);
            });
        }
        this.cartEventListener();
    }
}

cartBtn.addEventListener("click", () => {
  let cart = new Cart();
})

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

const checkoutBtnElm = document.querySelector(".checkoutBtn")
const shoppingCartContainerElm = document.querySelector(".shopping-cart-container")

const checkoutFormElm = document.querySelector(".checkout-from")

checkoutBtnElm.addEventListener('click', () => {
    console.log('testt')
    shoppingCartContainerElm.classList.toggle('d-none')
    checkoutFormElm.classList.toggle('d-none')

})

/* confirm button */
function togglee(){
    var blurr = document.getElementById("blurr");
    blurr.classList.toggle("active");

    var popup2 = document.getElementById("conf-pop-up");
    popup2.classList.toggle("active");

}


