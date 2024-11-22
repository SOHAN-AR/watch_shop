document.addEventListener("DOMContentLoaded", function() {
    let iconCart = document.querySelector('.iconCart');
    let cart = document.querySelector('.cart');
    let container = document.querySelector('.container');
    let close = document.querySelector('.close');

    iconCart.addEventListener('click', function(){
        if(cart.style.right == '-100%'){
            cart.style.right = '0';
            container.style.transform = 'translateX(-400px)';
        }else{
            cart.style.right = '-100%';
            container.style.transform = 'translateX(0)';
        }
    });

    close.addEventListener('click', function (){
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    });

    let products = null;

    // Fetching data from JSON file
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();
    });

    // Function to add data to HTML
    function addDataToHTML(){
        // Remove default data from HTML
        let listProductHTML = document.querySelector('.listProduct');
        listProductHTML.innerHTML = '';

        // Add new data
        if(products != null) {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addToCartBtn" data-id="${product.id}">Add To Cart</button>`;

                listProductHTML.appendChild(newProduct);
            });
        }
    }

    // Adding event listeners for "Add to Cart" buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('addToCartBtn')) {
            let productId = parseInt(event.target.getAttribute('data-id'));
            addCart(productId);
        }
        // Add event listener for plus and minus buttons in the cart
        if (event.target.classList.contains('quantity')) {
            let productId = parseInt(event.target.parentNode.parentNode.dataset.id);
            let action = event.target.dataset.action;
            changeQuantity(productId, action);
        }
    });

    // Function to add items to the cart
    function addCart(productId) {
        let productsCopy = JSON.parse(JSON.stringify(products));
        if (!listCart[productId]) {
            listCart[productId] = productsCopy.filter(product => product.id == productId)[0];
            listCart[productId].quantity = 1;
        } else {
            listCart[productId].quantity++;
        }
        document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
        addCartToHTML();
    }

    // Function to update cart items in HTML
    function addCartToHTML() {
        let listCartHTML = document.querySelector('.listCart');
        listCartHTML.innerHTML = '';

        let totalHTML = document.querySelector('.totalQuantity');
        let totalQuantity = 0;

        if (listCart) {
            Object.values(listCart).forEach(product => {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.dataset.id = product.id; // Set dataset id
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / ${product.quantity} product</div>
                    </div>
                    <div class="quantity">
                        <button class="quantity" data-action="-">-</button>
                        <span class="value">${product.quantity}</span>
                        <button class="quantity" data-action="+">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            });
        }
        totalHTML.innerText = totalQuantity;
    }

    // Function to change quantity of cart items
    function changeQuantity(productId, type) {
        switch (type) {
            case '+':
                listCart[productId].quantity++;
                break;
            case '-':
                listCart[productId].quantity--;
                if (listCart[productId].quantity <= 0) {
                    delete listCart[productId];
                }
                break;
            default:
                break;
        }
        document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
        addCartToHTML();
    }

    let listCart = {};

    function checkCart() {
        var cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('listCart='));
        if (cookieValue) {
            listCart = JSON.parse(cookieValue.split('=')[1]);
        } else {
            listCart = {};
        }
    }

    checkCart();
    addCartToHTML();
});
