import { User } from "./user.js";
let user = new User();

export function AddToCart(product, quantity){
    const cartNotificationBox = document.querySelector("#cartCount");
    const cartNotification = document.querySelector("#cartCount #number");
    let loggedInUser = user.isUserLoggedIn();
    if(loggedInUser.active){
        if( product.stock >= quantity ){
            let item = {
                id: product.id,
                title: product.title,
                image: product.images[0],
                category: product.category,
                price: product.price,
                quantity: quantity,
            };
            product.stock -= item.quantity;
            user.AddToCart(item);
            cartNotification.innerText = user.ItemsCount();
            var toastElList = [].slice.call(
                document.querySelectorAll(".toast")
            );
            var toastList = toastElList.map(function (toastEl) {
                return new bootstrap.Toast(toastEl);
            });
            toastList.forEach((toast) => toast.show());
        }
    }else{
        location.assign("./log-in.html");
        cartNotificationBox.style.display = "none";
    }
}