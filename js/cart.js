const cartDrawer = document.getElementById("cartDrawer");
const cartContainer = document.getElementById("cartContainer");
const cart = document.getElementById("product_cart");
const cartFooter = document.getElementById("cartFooter");
const cartValue = document.getElementById("cartValue");
const closeDrawer = document.getElementById("closeCartDrawer");
let cartProducts = [];
cart.addEventListener("click", () => {
    cartDrawer.classList.add("active")
})
closeDrawer.addEventListener("click", () => {
    cartDrawer.classList.remove("active")
})
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addToCartButton")) {
        const productId = e.target.dataset.id;
        addToCart(productId);
    }
    else if (e.target.classList.contains("clearCart_value")) {
        cartProducts = [];
        updateCart();
    }
});
const addToCart = (productId) => {
    const product = cartProducts.find(item => productId === item.id.toString());
    if (product) {
        product.quantity++;
    }
    else {
        const selectedItem = products.find(item => productId === item.id.toString());
        console.log("cart---", selectedItem)
        if (selectedItem) {
            cartProducts.push({ ...selectedItem, quantity: 1 });
        }
    }
    updateCart();
}
const updateCart = () => {
    console.log("cart---", cartProducts)
    let subTotal = 0;
    let totalItems = 0;
    cartContainer.innerHTML = '';
    cartFooter.innerHTML = "";
    cartValue.innerText = cartProducts.length;
    if (cartProducts.length === 0) {
        const cartEmptyMsg = `
        <div class="cartEmptyMsg">
                <p>
                    Your cart is empty
                </p>
                <p>Add your favorite items to your cart</p>
                <a href="/">Shop</a>
            </div>
        `;
        cartContainer.innerHTML = cartEmptyMsg;
        return;
    }
    cartProducts.forEach(product => {
        const totalItemValue = Number(product.price) * Number(product.quantity);
        subTotal += totalItemValue;
        totalItems += Number(product.quantity);
        const cartItem = `<div class="singleProduct">
                <div class="productImage">
                    <img src=${product.image_src} alt="">
                </div>
                <div class="productInfo">
                    <p class="itemTitle">${product.name}</p>
                    <p class="itemVendor">${product.vendor}</p>
                    <button class="deleteItem" onclick="deleteProduct(${product.id})"><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon"
                            viewBox="0 0 1024 1024" version="1.1"
                            style="width: 1em; height: 1em; vertical-align: middle; fill: currentcolor; overflow: hidden;">
                            <path
                                d="M707 992H317c-51.3 0-93.5-40.2-95.9-91.4l-29.1-611c-0.8-17.7 12.8-32.7 30.4-33.5 17.5-1.1 32.7 12.8 33.5 30.4l29.1 611c0.8 17.1 14.8 30.5 32 30.5h390c17.1 0 31.2-13.4 32-30.5l29.1-611c0.8-17.7 16.4-31.2 33.5-30.4 17.7 0.8 31.3 15.8 30.4 33.5l-29.1 611c-2.5 51.2-44.6 91.4-95.9 91.4zM864 192H160c-17.7 0-32-14.3-32-32s14.3-32 32-32h704c17.7 0 32 14.3 32 32s-14.3 32-32 32zM576 96H448c-17.7 0-32-14.3-32-32s14.3-32 32-32h128c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                fill="#243154"></path>
                            <path
                                d="M448 768c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32s32 14.3 32 32v352c0 17.7-14.3 32-32 32zM576 768c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32s32 14.3 32 32v352c0 17.7-14.3 32-32 32z"
                                fill="#243154"></path>
                        </svg>
                    </button>
                    <div class="itemQuantity">
                        <button class="itemQuantity_button" onclick="changeProductQty(-1, ${product.id})"> - </button>
                        <span class="itemQuantity_value">${product.quantity}</span>
                        <button class="itemQuantity_button" onclick="changeProductQty(1, ${product.id})"> + </button>
                    </div>
                    <div class="itemPrice">$ ${totalItemValue}</div>
                </div>
            </div>`;
        cartContainer.innerHTML += cartItem;
    })
    cartFooter.innerHTML = ` <div class="clear-cart__button">
                <button class="clearCart_value">Clear Cart</button>
            </div>
            <div class="cart_subTotal">
                <div class="subTotal_label">Sub total (${totalItems} items):</div>
                <div class="subTotal_value">$ ${subTotal}</div>
            </div>
            <div class="cartAction">
                <button class="checkout_Action">Checkout</button>
            </div>
    `
}

const changeProductQty = (value, id) => {
    const productIndex = cartProducts.findIndex(product => id === product.id);

    if (productIndex !== -1) { // Check if product exists
        let selectedProduct = cartProducts[productIndex];
        selectedProduct.quantity += value;

        if (selectedProduct.quantity <= 0) {
            cartProducts.splice(productIndex, 1); // Remove item if quantity is 0 or less
        }
    }
    updateCart();
};
const deleteProduct = (id) => {
    const productIndex = cartProducts.findIndex(product => id === product.id);
    cartProducts.splice(productIndex, 1);
    updateCart();
}

