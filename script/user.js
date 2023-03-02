export class User {
    #users = JSON.parse(localStorage.getItem("users"));
    constructor(id, email, password, firstName, lastName, cartList, active) {
        this.email = email;
        this.id = id;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cartList = cartList;
        this.active = active;
    }

    isUserLoggedIn() {
        let loggedInUser;
        this.#users.forEach(element => {
            if (element.active === true) {
                loggedInUser = element;
            }
        });
        return loggedInUser;
    }

    updateUser(user) {
        this.#users.forEach(element => {
            if (element.id == user.id) {
                element.active = user.active;
                element.cartList = user.cartList;
            }
        })
        localStorage.setItem("users", JSON.stringify(this.#users));
    }

    AddToCart(item) {
        let loggedInUser = this.isUserLoggedIn();
        let flag = 0;
        loggedInUser.cartList.forEach(cartItem => {

            if (cartItem.id == item.id) {
                cartItem.quantity += item.quantity;
                flag = 1;
            }
        })

        if (!flag) {
            console.log("added")
            loggedInUser.cartList.push(item);
        }
        localStorage.setItem("users", JSON.stringify(this.#users));

    }
    ItemsCount() {
        let itemsCount = 0;
        let loggedInUser = this.isUserLoggedIn();
        if (loggedInUser) {
            loggedInUser.cartList.forEach(cartItem => {
                itemsCount++;

            })
            return itemsCount;
        }
    }

}