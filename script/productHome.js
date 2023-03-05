import { ProductDetails } from "./ProductDetails.js";
//import { User } from "./user.js";
import { AddToCart } from "./AddToCart.js";
import fetchJson from "../script/fetch_module.js";

function appendCardsBestSellers(products) {
  //console.log(products);
  //let count = 0;
  var productsContainer = document.querySelector(".product");
  for (let i = 0; i < products.length; i++) {
    if (Math.round(products[i].rating) == 5) {
      var item = document.createElement("div");
      productsContainer.appendChild(item);
      item.classList.add("col-6", "col-md-4", "col-lg-3", "item", "my-2");

      var card = document.createElement("div");
      item.appendChild(card);
      card.classList.add("card", "box-shadow", "my-5", "px-5", "py-2");
      /*
      var detailsLink = document.createElement('a')
      detailsLink.href = "_blank";
      card.appendChild(detailsLink);
*/
      var image = document.createElement("img");
      card.appendChild(image);
      image.classList.add("card-img-top");
      image.src = products[i].images[0];

      var cardBody = document.createElement("div");
      card.appendChild(cardBody);
      cardBody.classList.add("card-body");
      cardBody.classList.add("card-body");

      var title = document.createElement("div");
      cardBody.appendChild(title);
      title.classList.add(
        "card-title",
        "d-flex",
        "justify-content-evenly",
        "flex-column"
      );

      var productName = document.createElement("span");
      title.appendChild(productName);
      productName.classList.add("pname");
      productName.textContent = products[i].title;
      productName.style.fontSize = "1rem";
      productName.style.fontWeight = "900";

      var productPrice = document.createElement("span");
      title.appendChild(productPrice);
      productPrice.classList.add("card-text", "price");
      productPrice.textContent = products[i].price + "$";
      productPrice.style.fontSize = "1rem";
      productPrice.style.fontWeight = "700";

      var ratings = document.createElement("span");
      cardBody.appendChild(ratings);
      ratings.classList.add("rates");
      ratings.style.fontSize = "0.8rem";

      for (let j = 0; j < 5; j++) {
        var star = document.createElement("i");
        ratings.appendChild(star);
        star.classList.add("bi", "bi-star-fill");
        star.classList.add(`rate${i}`);
      }

      if (products[i].rating > 4) {
        for (let x = 0; x < 5; x++) {
          document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
        }
      } else if (products[i].rating > 3 && products[i].rating <= 4) {
        for (let x = 0; x < 4; x++) {
          document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
        }
      } else if (products[i].rating <= 3 && products[i].rating > 2) {
        for (let x = 0; x < 3; x++) {
          document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
        }
      } else if (products[i].rating <= 3 && products[i].rating > 2) {
        for (let x = 0; x < 2; x++) {
          document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
        }
      } else {
        document.getElementsByClassName(`rate${i}`)[0].style.color = "gold";
      }

      var productPrand = document.createElement("p");
      cardBody.appendChild(productPrand);
      productPrand.classList.add("card-text", "prand");
      productPrand.textContent = products[i].brand;

      var cartButton = document.createElement("button");
      cartButton.classList.add("cartBtn");
      cardBody.appendChild(cartButton);

      var cart = document.createElement("i");
      cartButton.appendChild(cart);
      cart.classList.add("bi", "bi-cart-plus", "d-block", "w-100", "cart");
      //count++;
    }
  }
}

/***********************************************************connect to product details******************************************************************** */
function SearchForProduct(ClickedId) {
  let clickedProduct;
  if (productsData) {
    productsData.forEach((product) => {
      if (product.id == ClickedId) {
        clickedProduct = product;
      }
    });
  }
  return clickedProduct;
}

function cardEventListner() {
  let productsContainer = document.querySelector(".product");
  if (productsContainer) {
    productsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("card-img-top")) {
        let imageSource = e.target.src.split("/");
        let ClickedId = imageSource[imageSource.length - 2];
        let clickedProduct = SearchForProduct(ClickedId);
        let product = new ProductDetails(clickedProduct);
      } else if (e.target.classList.contains("cart")) {
        let imageSource = e.target.closest(".card").firstChild.src.split("/");
        let ClickedId = imageSource[imageSource.length - 2];
        let clickedProduct = SearchForProduct(ClickedId);
        AddToCart(clickedProduct, 1);
      }
    });
  }
}

fetchJson()
  .then(function (data) {
    //console.log(data);
    appendCardsBestSellers(data.products);
    return data.products;
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
