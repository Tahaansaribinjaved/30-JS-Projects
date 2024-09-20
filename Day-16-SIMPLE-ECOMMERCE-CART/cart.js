document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];

    // Function to update cart display
    function updateCart() {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<li class="text-gray-500">Your cart is empty</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('flex', 'justify-between', 'py-2');
                li.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="text-red-500 remove-from-cart" data-id="${item.id}">Remove</button>
                `;
                cartItems.appendChild(li);
            });
        }
        cartTotal.textContent = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    }

    // Function to add item to cart
    function addToCart(id, name, price) {
        cart.push({ id, name, price });
        updateCart();
    }

    // Function to remove item from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    // Event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });

    // Event listener for remove-from-cart buttons
    cartItems.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        }
    });
});
