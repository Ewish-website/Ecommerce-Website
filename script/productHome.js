function appendCards(products) {
    var productsContainer = document.querySelector('.product');
    for(let i=0;i<8;i++){
      var item = document.createElement('div');
      productsContainer.appendChild(item);
      item.classList.add("col-12","col-md-4","col-lg-3","item","my-2");
      
      var card = document.createElement('div');
      item.appendChild(card);
      card.classList.add("card", "box-shadow" ,"my-5","p-2");
/*
      var detailsLink = document.createElement('a')
      detailsLink.href = "_blank";
      card.appendChild(detailsLink);
*/
      var image = document.createElement('img');
      card.appendChild(image);
      image.classList.add('card-img-top');
      image.src=products[i].images[0];

      var cardBody = document.createElement('div');
      card.appendChild(cardBody);
      cardBody.classList.add('card-body');
      cardBody.classList.add('card-body');

      var title = document.createElement('div');
      cardBody.appendChild(title);
      title.classList.add("card-title", "d-flex", "justify-content-evenly", "flex-column");


      var productName = document.createElement('span');
      title.appendChild(productName);
      productName.classList.add('pname');
      productName.textContent=products[i].title;
      productName.style.fontSize='15px';
      productName.style.fontWeight='900';

      
      var productPrice = document.createElement('span');
      title.appendChild(productPrice);
      productPrice.classList.add("card-text","price");
      productPrice.textContent=products[i].price+"$";
      productPrice.style.fontSize='18px';
      productPrice.style.fontWeight='900';


      var ratings = document.createElement('rates');
      cardBody.appendChild(ratings);
      ratings.classList.add('rates');

      for(let j=0;j<5;j++){
        var star = document.createElement('i');
        ratings.appendChild(star);
        star.classList.add("bi","bi-star-fill");
        star.classList.add(`rate${i}`);
      }
    
      
        if(products[i].rating>4){
          for(let x=0;x<5;x++){
            document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
  
          } 
        }
        else if(products[i].rating>3 && products[i].rating<=4){
          for(let x=0;x<4;x++){
            document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
          }
        }
        else if(products[i].rating<=3 && products[i].rating>2){
          for(let x=0;x<3;x++){
            document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
        }
      }
       else if(products[i].rating<=3 && products[i].rating>2){
        for(let x=0;x<2;x++){
          document.getElementsByClassName(`rate${i}`)[x].style.color = "gold";
       }
      }
        else{
          document.getElementsByClassName(`rate${i}`)[0].style.color = "gold";
        }
      

      var productPrand = document.createElement('p');
      cardBody.appendChild(productPrand);
      productPrand.classList.add("card-text","prand");
      productPrand.textContent=products[i].brand;

      var cartButton = document.createElement('a');
      cardBody.appendChild(cartButton);
      cartButton.href = "_blank";

      var cart = document.createElement('i');
      cartButton.appendChild(cart);
      cart.classList.add("bi", "bi-cart-plus","d-block","w-100","cart");

    } 
  }


  /***********************************************Fetch Data**********************************************/
  fetch('../script/products.json')
  .then(function (response){
      let jsonData = response.json();
      console.log(jsonData);
      return jsonData;
  })
  .then(function (jsonData) {
    let productsData= jsonData.products;
    appendCards(productsData);
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });  
  