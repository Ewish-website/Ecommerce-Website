
  var wantedProducts = [];
  var filteredProducts = {'category':0,'price':0,'rating':0};

  function appendCards(products) {
    var productsContainer = document.querySelector('.product');
    for(let i=0;i<products.length;i++){
      var item = document.createElement('div');
      productsContainer.appendChild(item);
      item.classList.add("col-12","col-md-6","col-lg-3","item","my-2");
      
      var card = document.createElement('div');
      item.appendChild(card);
      card.classList.add("card", "box-shadow" ,"my-5","p-2");

      var detailsLink = document.createElement('a')
      detailsLink.href = "_blank";
      card.appendChild(detailsLink);

      var image = document.createElement('img');
      detailsLink.appendChild(image);
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

function intializeData(allData){
  var allCategories = allData.map(({ category }) => category);
  var Prices = allData.map(({ price }) => price);
  var allPrices =[];
  for(let j=0;j<Prices.length;j++){
    if(Prices[j]<=300){
       allPrices.push('low'); 
    }
    else if(Prices[j]>300 && Prices[j]<900){
      allPrices.push('medium');
    }
    else{
      allPrices.push('high');
    }
  }
  var allRatings = allData.map(({ rating }) => rating);
  filteredProducts = {'category':allCategories,'price':allPrices,'rating':allRatings};
  console.log(filteredProducts);
  return filteredProducts;
}

function resetPage(){
  wantedProducts=[];
  while (document.querySelector('.product').hasChildNodes()){
    document.querySelector('.product').removeChild(document.querySelector('.product').firstChild);
  }
}

function filterProducts(allData,wantedData){
  var allProducts = intializeData(allData);
  let flag=0;
  console.log()
  for(let i=0;i<allData.length;i++){
    if(wantedData['category']!=0&& wantedData['rating']!=0 && wantedData['price']!=0){
      if(allProducts['category'][i]==wantedData['category'] && Math.ceil(allProducts['rating'][i])==wantedData['rating'] && allProducts['price'][i]==wantedData['price'] ){
        wantedProducts.push(allData[i]);
        flag=1;
      }
    }
    if(wantedData['category']== 0&& wantedData['rating']!=0 && wantedData['price']!=0){
      console.log('hi');
      if(Math.ceil(allProducts['rating'][i])==wantedData['rating'] && allProducts['price'][i]==wantedData['price'] ){
        wantedProducts.push(allData[i]);
        flag=1;
      }
    }
    if(wantedData['category']!=0&& wantedData['rating']==0 && wantedData['price']!=0){
      if(allProducts['category'][i]==wantedData['category'] && allProducts['price'][i]==wantedData['price'] ){
        wantedProducts.push(allData[i]);
        flag=1;
      }
    } 
    if(wantedData['category']!=0&& wantedData['rating']!=0 && wantedData['price']==0){
      if(allProducts['category'][i]==wantedData['category'] && Math.ceil(allProducts['rating'][i])==wantedData['rating']){
        wantedProducts.push(allData[i]);
        flag=1;
      }
    } 
  }
  if(flag==0){
    var notFoundMsg = document.createElement('p');
    document.querySelector('.product').appendChild(notFoundMsg);
    notFoundMsg.id='notFound';
    notFoundMsg.textContent="No Result Found!";
  }
  else{
    appendCards(wantedProducts);
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
    return productsData;
  })
  .then(function (productsData) {
    /******************************************Filter Button************************************************ */
    document.querySelector(".applyFilter").addEventListener('click',function(){
      var category = document.getElementsByName("flexRadioDefault1");
      var rates = document.getElementsByName("stars");
      var price = document.getElementsByName("flexRadioDefault3");
      var flag=0;
      for(i = 0; i < category.length; i++) {
          if(category[i].checked){
            filteredProducts['category']=category[i].value;
            flag=1;
          } 
        }
        if(flag==0){
          filteredProducts['category']=0;
          flag=0;
        }
        for(i = 0; i < rates.length; i++) {
          if(rates[i].checked){
            filteredProducts['rating']=rates[i].value;
          }  
        }
        if(flag==0){
          filteredProducts['rating']=0;
          flag=0;
        }        
        for(i = 0; i < price.length; i++) {
          if(price[i].checked){
            filteredProducts['price']=price[i].value;
          }   
        }
        if(flag==0){
          filteredProducts['price']=0;
          flag=0;          
        }
        resetPage();
        filterProducts(productsData,filteredProducts);     
   })
   /*****************************************************All Button************************************************************** */
   document.querySelector("#all").addEventListener('click',function(e){
    var category = document.getElementsByName("flexRadioDefault1");
    var rates = document.getElementsByName("stars");
    var price = document.getElementsByName("flexRadioDefault3");
    for(i = 0; i < category.length; i++) {
        category[i].checked = false;
      }
      for(i = 0; i < rates.length; i++) {
        rates[i].checked = false; 
      }
      for(i = 0; i < price.length; i++) {
        price[i].checked = false; 
      } 
      resetPage();
      appendCards(productsData);   
   })
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });  
  
  

