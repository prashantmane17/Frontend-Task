const cartDrawer = document.getElementById("cartDrawer");
const cart = document.getElementById("product_cart");
const closeDrawer = document.getElementById("closeCartDrawer");
let itemSizes = [];
cart.addEventListener("click", () => {
    cartDrawer.classList.add("active")
})
closeDrawer.addEventListener("click", () => {
    cartDrawer.classList.remove("active")
})

const elements = document.querySelectorAll('[data-size="sizeSelection"]');
elements.forEach(item => {
    item.addEventListener('click', (e) => {
        const id = item.dataset.id;
        itemSizes.push(id);

    })
})