const cartDrawer = document.getElementById("cartDrawer");
const cart = document.getElementById("product_cart");
const closeDrawer = document.getElementById("closeCartDrawer");

cart.addEventListener("click", () => {
    cartDrawer.classList.add("active")
})
closeDrawer.addEventListener("click", () => {
    cartDrawer.classList.remove("active")
})