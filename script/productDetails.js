import { User } from "./user.js";

const detailsModal = document.querySelector(".detailsModal");

export class ProductDetails {
    #QuantityContainer = null;
    #QuantityBtn = null;
    #addToCartBtn = null;
    counter = 1;
    constructor(product) {
        this.user = new User();
        this.id = product.id;
        this.images = product.images;
        this.title = product.title;
        this.rating = product.rating;
        this.description = product.description;
        this.price = product.price;
        this.brand = product.brand;
        this.category = product.category;
        this.stock = product.stock ;
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
        detailsModal.insertAdjacentHTML(
        "beforeend",
        `<div class="modal fade modal-lg Details-modal mt-md-5" id="myModal">
                    <div class="modal-dialog ">
                        <div class="modal-content p-4 p-lg-5">
                            <button type="button" class="btn-close Details-model-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div class="modal-body row col-12 d-lg-flex justify-content-between p-0 py-4 ">
                                <div class="col-12 col-md-5 DetailsImage my-auto ml-lg-auto">
                                    <div class="Image-container DetailsLargeScreen">
                                        <div class="ActiveDetailsImage">
                                            <img src="${this.images[0]}" alt="green apple slice">
                                        </div>
                                        <div class="DetailsImageAlbum col-12 ">
                                            <ul class="DetailsImageList p-0 m-0">
                                                <li class="activeLiImage"><img src="${this.images[0]}" alt="${this.title} image 1"></li>
                                                <li><img src="${this.images[1]}" alt="${this.title} image 2"></li>
                                                <li><img src="${this.images[2]}" alt="${this.title} image 3"></li>
                                                <li><img src="${this.images[3]}" alt="${this.title} image 4"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-md-7 DetailsText my-auto pt-4 p-md-0 ml-lg-auto">
                                    <h3 class="fs-3 text-uppercase">${this.title}</h3>
                                    <div class="ProductDetails-rating pb-2">
                                    </div>
                                    <p class="">${this.description}</p>
                                    <p class="pb-1 m-0"><b>price: </b>$ ${this.price}</p>
                                    <p class="pb-1 m-0"><b>Brand: </b>${this.brand}</p>
                                    <p class="pb-1 m-0"><b>Category: </b>${this.category}</p>
                                    <p class="pb-1 m-0"><b>stock: </b>${(this.stock> 0) ? "In stock" : "out of stock"}</p>
                                    <div class="productDetailsForm d-flex justify-content-between pt-3">
                                        <div class="d-flex p-0 col-5 col-md-6 col-lg-4 productQuantityContainer">
                                            <button class="minusbtn btn btn-link p-0 pe-2">
                                                <i class="bi bi-dash fs-5"></i>
                                            </button>

                                            <input id="form1" min="1" name="quantity" value="1" type="number"
                                                class="quantityBtn form-control form-control-sm" />

                                            <button class="plusbtn btn btn-link p-0 ps-2">
                                                <i class="bi bi-plus fs-5"></i>
                                            </button>
                                        </div>
                                        <button type="button" class="btn btn-primary col-5 col-md-6 col-lg-4 addToCartBtn"> 
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        );
    }

    ratingStars(){
        let ratingContainer = document.querySelector(".ProductDetails-rating");
        while (ratingContainer.firstChild) {
          ratingContainer.firstChild.remove();
        }
        for(let i =1; i<= 5; i++){
            if(i <= this.rating){
                ratingContainer.insertAdjacentHTML(
                  "beforeend",
                  `
                    <i class="bi bi-star-fill text-warning-emphasis"></i>`
                );
            }
            else{
                ratingContainer.insertAdjacentHTML(
                  "beforeend",
                  `
                    <i class="bi bi-star text-warning-emphasis"></i>`
                );
            }
        }
    }

    showImages() {
        const ActiveDetailsImage = document.querySelector(
        ".ActiveDetailsImage img"
        );
        const ImagesList = document.querySelectorAll(".DetailsImageAlbum li");
        var i = 0;
        setInterval(() => {
            ActiveDetailsImage.src = this.images[i];
            ImagesList.forEach((li) => {
                if(li.classList.contains("activeLiImage")){
                    li.classList.remove("activeLiImage");
                }
            });
            ImagesList[i].classList.add("activeLiImage");
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
        let item = {
            id: this.id,
            title: this.title,
            images: this.images[0],
            category: this.category,
            price: this.price,
            quantity: this.counter,
        };
        this.#QuantityBtn.value = 1;
        if (this.stock >= this.counter){
            this.stock -= this.counter;
            this.user.AddToCart(item);
        }
    }

}