const productContainer = document.getElementById("all_products_cards");
const filter_options = document.querySelectorAll(".filter_option");
const totalProduct = document.getElementById("total_products")
let products = [];
const intialCall = async () => {
    const resonse = await fetch("data/products.json");
    const data = await resonse.json();
    const sortedData = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    products = sortedData;
    return sortedData;
}
intialCall().then(data => {
    data.forEach(product => {
        product_cards(product)
        const filteredProduct = document.querySelectorAll(".product_card");
        if (filteredProduct.length === 0) {
            productContainer.classList.add("empty_products")
            productContainer.innerHTML = "<div class='empty_msg'>Products not found</div>";
        }
        totalProduct.textContent = filteredProduct.length
    });
}).catch(error => {
    console.error("err")
})

function product_cards(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product_card");
    productCard.innerHTML = ` <div class="product-image">
                    <img src=${product.image_src} class=""
                        alt=${product.name} />
                </div>
                <div class="product-details">
                    <p class="product-title">${product.vendor}</p>
                    <p class="product-name">${product.name}</p>
                    <div class="product-pricing">
                        <p class="price">$${product.price}</p>
                        <p class="mrp-price"> $${product.compare_at_price}</p>
                        <p class="discount">(50% OFF)</p>
                    </div>
                </div>`
    productContainer.appendChild(productCard);
}

filter_options.forEach(option => {
    option.addEventListener('click', (e) => {
        filter_options.forEach(option => {
            option.classList.remove("active");
        })
        e.target.classList.add("active")
        const category = e.target.dataset.category;
        productContainer.innerHTML = "";
        productContainer.classList.remove("empty_products")
        products.forEach(product => {
            if (category === "all") {
                product_cards(product)
            } else if (product.tag === category) {
                product_cards(product)
            }
        })
        const filteredProduct = document.querySelectorAll(".product_card");
        if (filteredProduct.length === 0) {
            productContainer.classList.add("empty_products")
            productContainer.innerHTML = "<div class='empty_msg'>Products not found</div>";
        }
        totalProduct.textContent = filteredProduct.length
    })
})