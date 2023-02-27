export class User {
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
        var users = localStorage.getItem('users');
        var userData = JSON.parse(users);
        userData.forEach(element => {
            if (element.active === true) {
                loggedInUser = element;
            }
        });
        return loggedInUser;
    }

    updateUser(user){
        var users = JSON.parse(localStorage.getItem("users"));
        users.forEach((element) => {
            if (element.id === user.id) {
                element.active = user.active;
                element.cartList = user.cartList;
            }
        });
        localStorage.setItem("users", JSON.stringify(users));
    }

}