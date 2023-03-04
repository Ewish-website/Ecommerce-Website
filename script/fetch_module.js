import {
  appendCards,
  applyFilter,
  getAllProducts,
  cardEventListner,
} from "../script/filter.js";

var productsData; //All data in the json file
fetch("../script/products.json")
  .then(function (response) {
    let jsonData = response.json();
    //console.log(jsonData);
    return jsonData;
  })
  .then(function (jsonData) {
    productsData = jsonData.products;
    appendCards(productsData);
    return productsData;
  })
  .then(function (productsData) {
    /****************Filter Button***************** */
    applyFilter();
    /**********All Button******* ***************** */
    getAllProducts();
    /*************Products Cart******************************* */
    cardEventListner();
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

export { productsData };
