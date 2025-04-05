const productContainer = document.getElementById("all_products_cards");
const filter_options = document.querySelectorAll(".filter_option");
const filterLabels = document.querySelector(".filterLabels");
const totalProduct = document.getElementById("total_products");
const productSearch = document.getElementById("productSearch");

const filters_label = document.getElementById("filters_label");
const filterName = document.getElementById("change_filter_name");
const openNavBar = document.getElementById("hamburgerIcon");
const closeNavBar = document.getElementById("closeIcon");
const navbarDrawer = document.getElementById("navBarList_optoins");

const toggleDrawer = (open) => {
    navbarDrawer.style.left = open ? "0" : "-100%";
    cartOverlay.classList.toggle("active", open);
    openNavBar.classList.toggle("active", !open);
    closeNavBar.classList.toggle("active", open);
};

openNavBar.addEventListener("click", () => toggleDrawer(true));
closeNavBar.addEventListener("click", () => toggleDrawer(false));




let products = [];
const intialCall = async () => {
    const resonse = await fetch("data/products.json");
    const data = await resonse.json();
    const sortedData = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    products = sortedData;
    sortedProducts("all", sortedData)

}
intialCall();
function handleToggle(event) {
    event.stopPropagation();
    filterLabels.classList.toggle('visible');
    filterLabels.classList.toggle('hidden');
    cartOverlay.classList.toggle("active")
}

function handleOutsideClick(event) {
    if (!filterLabels.contains(event.target) && !filters_label.contains(event.target)) {
        filterLabels.classList.add('hidden');
        filterLabels.classList.remove('visible');
        cartOverlay.classList.remove("active")
    }
}

function MobileFilter() {
    if (window.innerWidth < 768) {
        filters_label.addEventListener('click', handleToggle);
        document.addEventListener('click', handleOutsideClick);
    } else {
        filters_label.removeEventListener('click', handleToggle);
        document.removeEventListener('click', handleOutsideClick);
        filterLabels.classList.remove('hidden');
        filterLabels.classList.remove('visible');
    }
}

MobileFilter();
window.addEventListener('resize', MobileFilter);

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
    const name = filter_option.innerText;
    sortedProducts(category, products)
});
const addToCartFun = () => {
    const elements = document.querySelectorAll('[data-size="sizeSelection"]');
    elements.forEach(item => {
        item.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const sizeId = e.currentTarget.dataset.sizeid;
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
        default: return size;
    }
};
const formatProductSizeNumber = (size) => {
    switch (size) {
        case "xs": return "38";
        case "small": return "39";
        case "medium": return "40";
        case "large": return "44";
        case "xl": return "48";
        default: return size;
    }
};


function product_cards(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product_card");
    const discountRate = ((Number(product.compare_at_price) - Number(product.price)) / Number(product.compare_at_price)) * 100;
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
                        <p class="discount">(${discountRate.toFixed(0)}% OFF)</p>
                    </div>
                </div>`;
    productContainer.appendChild(productCard);
}

filter_options.forEach(option => {
    option.addEventListener('click', (e) => {
        filter_options.forEach(option => {
            option.classList.remove("active");
            if (window.innerWidth < 768) {
                cartOverlay.classList.remove("active")
                filterLabels.classList.remove('visible');
                filterLabels.classList.add('hidden');
            }
        })
        e.target.classList.add("active")
        const category = e.target.dataset.category;
        const name = e.target.innerText;
        sortedProducts(category, products, name);
    })
})
productSearch.addEventListener('input', () => {
    const selectedcategory = document.querySelector(".filter_option.active");
    const category = selectedcategory.dataset.category;
    const name = selectedcategory.innerText;
    sortedProducts(category, products, name);
})
const sortedProducts = (category, products, name) => {
    productContainer.innerHTML = "";
    productContainer.classList.remove("empty_products")
    const searchItemName = productSearch.value;
    products.forEach(product => {
        if (category === "all" && product.vendor.toLowerCase().includes(searchItemName.toLowerCase())) {
            product_cards(product)
        } else if (product.tag === category && product.vendor.toLowerCase().includes(searchItemName.toLowerCase())) {
            product_cards(product)
        }
    })
    const filteredProduct = document.querySelectorAll(".product_card");
    if (filteredProduct.length === 0) {
        productContainer.classList.add("empty_products")
        productContainer.innerHTML = "<div class='empty_msg'>Products not found</div>";
    }
    filterName.innerText = name?.trim() || "All Products";
    totalProduct.textContent = filteredProduct.length
    addToCartFun();
}