import { User } from "./user.js";
import { AddToCart } from "./AddToCart.js";

const detailsModal = document.querySelector(".detailsModal");

export class ProductDetails {
    #QuantityContainer = null;
    #QuantityBtn = null;
    #addToCartBtn = null;
    counter = 1;
    constructor(product) {
        this.user = new User();
        this.product =  product
        this.init();
    }

    init() {
        this.showModalProductDetails();
        this.showImages();
        this.ratingStars();

        this.#QuantityContainer = document.querySelector(
        ".productQuantityContainer"
        );
        this.#QuantityBtn = document.querySelector(".quantityBtn");
        this.#addToCartBtn = document.querySelector(".addToCartBtn"); 

        this.#QuantityContainer.addEventListener("change", (e) => {
        this.changeQuantity(e);
        });
        this.#QuantityContainer.addEventListener("click", (e) => {
        this.changeQuantity(e);
        });
        this.#addToCartBtn.addEventListener("click", () => {
            this.AddItemcart();
        })
    }

    showModalProductDetails() {
        this.createProductDetaisModal();
        var modal = bootstrap.Modal.getOrCreateInstance(
            detailsModal.querySelector("#myModal")
        );
        modal.show();
    }

    createProductDetaisModal() {
        detailsModal.innerHTML = `<div class="modal fade modal-md Details-modal mt-md-5" id="myModal">
            <div class="modal-dialog ">
                <div class="modal-content py-5 px-4">
                    <button type="button" class="btn-close Details-model-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-body card border-0 w-100 col-12 p-0 ">
                        <div class="row g-0 col-12">
                            <div class="col-md-4 ActiveDetailsImage my-auto">
                                <img src="${
                                  this.product.images[0]
                                }" alt="$this.product.title}">
                            </div>
                            <div class="col-md-8 ps-md-4 pt-4 pt-md-0">
                                <div class="card-body DetailsText text-start p-0">
                                    <h3 class="fs-3 text-uppercase">${
                                      this.product.title
                                    }</h3>
                                    <div class="ProductDetails-rating pb-2"></div>
                                    <p class="">${this.product.description}</p>
                                    <p class="pb-1 m-0"><b>price: </b>$ ${
                                      this.product.price
                                    }</p>
                                    <p class="pb-1 m-0"><b>Brand: </b>${
                                      this.product.brand
                                    }</p>
                                    <p class="pb-1 m-0"><b>Category: </b>${
                                      this.product.category
                                    }</p>
                                    <p class="pb-1 m-0"><b>stock: </b>${
                                      this.product.stock > 0
                                        ? "In stock"
                                        : "out of stock"
                                    }</p>
                                    <div class="productDetailsForm d-sm-flex justify-content-between pt-3">
                                        <div class="d-flex p-0 col-6 col-sm-5  productQuantityContainer">
                                            <button class="minusbtn btn btn-link p-0 pe-2">
                                                <i class="bi bi-dash fs-5"></i>
                                            </button>

                                            <input id="form1" min="1" name="quantity" value="1" type="number"
                                                class="quantityBtn form-control form-control-sm" />

                                            <button class="plusbtn btn btn-link p-0 ps-2">
                                                <i class="bi bi-plus fs-5"></i>
                                            </button>
                                        </div>
                                        <button type="button" class="btn btn-primary col-6 col-sm-5 mt-3 mt-md-0 addToCartBtn"> 
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    ratingStars(){
        let ratingContainer = document.querySelector(".ProductDetails-rating");
        while (ratingContainer.firstChild) {
            ratingContainer.firstChild.remove();
        }
        for(let i =1; i<= 5; i++){
            if(i <= this.product.rating){
                ratingContainer.insertAdjacentHTML(
                    "beforeend",
                    `<i class="bi bi-star-fill text-warning-emphasis"></i>`
                );
            }
            else{
                ratingContainer.insertAdjacentHTML(
                    "beforeend",
                    `<i class="bi bi-star text-warning-emphasis"></i>`
                );
            }
        }
    }

    showImages() {
        const ActiveDetailsImage = document.querySelector(
        ".ActiveDetailsImage img"
        );
        var i = 0;
        setInterval(() => {
            ActiveDetailsImage.src = this.product.images[i];
            if (i < 3) {
                i++;
            } else {
                i = 0;
            }
        }, 3000);
    }

    changeQuantity(e) {
        if (e.target.classList.contains("bi")) {
        let clickedElement = e.target.closest("button");
        if (clickedElement.classList.contains("minusbtn")) {
            if (this.counter > 1) {
            this.counter--;
            this.#QuantityBtn.value = this.counter;
            }
        } else if (clickedElement.classList.contains("plusbtn")) {
            this.counter++;
            this.#QuantityBtn.value = this.counter;
        }
        } else if (e.target.classList.contains("quantityBtn")) {
        this.counter = e.target.value;
        }
    }

    AddItemcart() {
        AddToCart(this.product, this.counter);
    }
}