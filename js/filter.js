const productContainer = document.getElementById("all_products_cards");
const filter_options = document.querySelectorAll(".filter_option");
const totalProduct = document.getElementById("total_products");
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
    addToCartFun();
}).catch(error => {
    console.error("err")
})
document.getElementById("sort_select").addEventListener("change", (e) => {
    const value = e.target.value;
    if (value === "low_high") {
        products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
        products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    productContainer.innerHTML = "";
    const filter_option = document.querySelector(".filter_option.active");
    const category = filter_option.dataset.category;
    sortedProducts(category, products)
});
const addToCartFun = () => {
    const elements = document.querySelectorAll('[data-size="sizeSelection"]');
    elements.forEach(item => {
        item.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const sizeId = e.currentTarget.dataset.sizeid;
            console.log("Selected Size ID:", sizeId);
            const addToCartButton = document.getElementById(`addToCartButton_${id}`);
            const sizeText = document.querySelector(`[data-title="sizeTitle${id}"]`);
            const sizes = document.getElementById(`productSizes_number${id}`);
            addToCartButton.style.display = "block";
            addToCartButton.dataset.sizeid = sizeId
            sizeText.style.display = "none";
            sizes.style.display = "none";
        });
    });
}

const formatProductSize = (size) => {
    switch (size) {
        case "xs": return "XS";
        case "small": return "SM";
        case "medium": return "M";
        case "large": return "L";
        case "xl": return "XL";
        case "38": return "XS";
        case "39": return "SM";
        case "40": return "M";
        case "44": return "L";
        case "48": return "XL";
        case "46": return "XL";
        default: return "Unknown"; // Handle unexpected values
    }
};
const formatProductSizeNumber = (size) => {
    switch (size) {
        case "xs": return "38";
        case "small": return "39";
        case "medium": return "40";
        case "large": return "44";
        case "xl": return "48";
        default: return size; // Handle unexpected values
    }
};


function product_cards(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product_card");
    productCard.innerHTML = ` <div class="product-image">
                    <img src=${product.image_src} class=""
                        alt=${product.name} />
                </div>
                <div class="productActions">
                
                <div id="addToCartButton_${product.id}" data-id=${product.id} data-sizeid="0"  class="addToCartButton">Add to Cart</div>
                    
                    <p data-title="sizeTitle${product.id}" class="sizeTitle">Select Size</p>
                    <div id="productSizes_number${product.id}" class="productSizes_number">
                     ${product.options.map((option) =>
        `<button data-size="sizeSelection" data-id=${product.id} data-sizeid=${option.id}>${formatProductSizeNumber(option.value)}</button>`
    ).join('')
        } 
                    </div>
                    <div class="productSizes_tag">
                        <span>Sizes:</span>
                        ${product.options.map((option) =>
            `<button>${formatProductSize(option.value)}</button>`
        ).join('')
        }
                    </div>
                    <div class="product-pricing">
                        <p class="price">$${product.price}</p>
                        <p class="mrp-price"> $${product.compare_at_price}</p>
                        <p class="discount">(50% OFF)</p>
                    </div>
                </div>
                <div class="product-details">
                    <p class="product-title">${product.vendor}</p>
                    <p class="product-name">${product.name}</p>
                    <div class="product-pricing">
                        <p class="price">$${product.price}</p>
                        <p class="mrp-price"> $${product.compare_at_price}</p>
                        <p class="discount">(50% OFF)</p>
                    </div>
                </div>`;
    productContainer.appendChild(productCard);
}

filter_options.forEach(option => {
    option.addEventListener('click', (e) => {
        filter_options.forEach(option => {
            option.classList.remove("active");
        })
        e.target.classList.add("active")
        const category = e.target.dataset.category;
        sortedProducts(category, products);
    })
})

const sortedProducts = (category, products) => {
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
    addToCartFun();
}