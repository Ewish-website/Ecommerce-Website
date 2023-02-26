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

}