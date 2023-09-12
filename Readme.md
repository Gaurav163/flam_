Enviornment Variables:
1. DATABASE_URL : connection string for MongoDB
2. JWT_SECRET_TOKEN : some random bytes for creating JWT token for authentication

User Modules:

1. Signup:
    - url : /users/signup (POST)
    - body {name,email,password} (user with email should not exist already)
    - return created user
2. Signin:
    - url : /users/signin (POST)
    - body {email, password}
    - set cookies for further authtication and return the jwt token

** To access all below endpoints user should be logged in

Auth Middle ware:
    - it check user is loggedin or not
    - it also add user to req and user details from req are used by next funtions

Book Modules:

1. Create Book:
    - url : /books/ (POST)
    - body {barcode,title,author,genre,price}
    - it default set quantity to 0
    - return the created book

2. Get all books:
    -   url : /books/ (GET)

3. Get book by barcode:
    -   url : /books/:barcode (GET)

4. Update book by barcode (POST)
    - url : /books/update/:barcode
    - body {title, author, genre, price}

5. Enter book into store ( new books come into intentory so increase their quantity)
    - url : /books/entry (POST)
    - body {barcode, quantity}


Cart Module:

1. Add book to cart
    - url : /cart/ (POST)
    - body {barcode, quantity}
    - add given quantity of book into user cart

2. Remove book from cart
    - url : /cart/remove/:barcode (GET)
    - remove all book with gievn barcode from users cart

3. Get cart
    - url : /cart/ (GET)
    - return cart of the loggedin user

Order Module:

1. Create order from user cart
    - url : /orders/ (POST)
    - get user cart and create and order for it

2. Get order
    - url : /orders/ (GET)
    - return all order of the current user
    



