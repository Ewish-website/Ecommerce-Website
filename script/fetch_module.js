export default async function fetchJson() {
  var response = await fetch("../script/products.json");
  var fetched = await response.text();
  var products = JSON.parse(fetched);
  return products;
}
