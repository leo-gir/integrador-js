const productsContainer = document.querySelector(".container-products");
const seeMoreBtn = document.querySelector(".see-more-btn");
const productsFilter = document.querySelector(".filter");
const productsCategories = document.querySelectorAll(".category");
const menuIcon = document.querySelector(".menu-icon");
const overlay = document.querySelector(".overlay");
const navList = document.querySelector(".nav-list");
const cartMenu = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const productBuyBtn = document.querySelector(".product-buy-btn");
const itemHandler = document.querySelector(".quantity-handler");
const deleteBtn = document.querySelector(".delete-cart");
const buyBtn = document.querySelector(".buy-btn");
const cartTotal = document.querySelector(".cart-total");
const cartQtyBubble = document.querySelector(".cart-icon-qty");
const addProductModal = document.querySelector(".modal");
const contactForm = document.getElementById("form-contact");
const inputName = document.getElementById("name");
const inputMail = document.getElementById("mail");
const inputPhone = document.getElementById("tel");
const inputMsg = document.getElementById("msg");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

//RENDERIZADO CARDS PRODUCTOS

const cardProductTemplate = (product) => {
    const { id, img, name, type, ibu, alcohol, price } = product;
    return `
    <div class="product-cards">
        <img src="${img}" alt="${name}">
        <h2>${name}</h2>
        <h3>${type}</h3>
        <div class="descrip-prod">
            <p>IBU ${ibu}</p>
            <span>/</span>
            <p>Alcohol ${alcohol}</p>
        </div>
        <p class="product-price">$${price}</p>
        <button class="product-buy-btn"
            data-id=${id}
            data-name=${name}
            data-type=${type}
            data-price=${price}
            data-img=${img}>
            <span class="product-buy-btn-span"
            data-id=${id}
            data-name="${name}"
            data-type="${type}"
            data-price=${price}
            data-img=${img}> Agregar al carrito </span>
        </button>
        <div class="success-product id='succes-prod'"></div>
    </div>
    
    `;
};

const renderProductsCards = (productsList) => {
    productsContainer.innerHTML += productsList.map((product) =>
        cardProductTemplate(product)
    );
};

const seeMoreProducts = () => {
    appState.currentProductsIndex++;
    let { products, currentProductsIndex } = appState;
    if (!seeMoreBtn.classList.contains("see-more-btn")) return;
    renderProductsCards(products[currentProductsIndex]);
    hideSeeMoreBtn();
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
};

const hideSeeMoreBtn = () => {
    if (isLastIndexOf() || appState.activeFilter) {
        seeMoreBtn.classList.add("hide");
        return;
    }
    seeMoreBtn.classList.remove("hide");
};

//FILTROS

const changeFilterState = ({ target }) => {
    appState.activeFilter = target.dataset.category;
    activateFilter(appState.activeFilter);
    hideSeeMoreBtn();
};

const activateFilter = (filter) => {
    categories = [...productsCategories];
    categories.forEach((li) => {
        if (li.dataset.category !== filter) {
            li.classList.remove("active");
            return;
        }
        li.classList.add("active");
    });
};

const filterProducts = (productsData) => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    return filteredProducts;
};

const isIniactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};

const applyFilter = ({ target }) => {
    if (!isIniactiveFilterBtn(target)) return;
    changeFilterState({ target });
    productsContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderProductsCards(filterProducts(productsData));
        appState.currentProductsIndex = 0;
        return;
    }
    renderProductsCards(appState.products[0]);
};

// MENU HAMBURGUESA
const openMenu = () => {
    if (cartMenu.classList.contains("show-cart")) {
        cartMenu.classList.remove("show-cart");
        navList.classList.toggle("show-menu");
        return;
    }
    navList.classList.toggle("show-menu");
    overlay.classList.toggle("show-overlay");
};

const closeOnClick = () => {
    cartMenu.classList.remove("show-cart");
    navList.classList.remove("show-menu");
    overlay.classList.toggle("show-overlay");
};

//CARRITO

const openCart = () => {
    if (navList.classList.contains("show-menu")) {
        navList.classList.remove("show-menu");
        cartMenu.classList.toggle("show-cart");
        return;
    }
    cartMenu.classList.toggle("show-cart");
    overlay.classList.toggle("show-overlay");
};

const cartProductTemplate = (product) => {
    const { id, img, name, type, price, quantity } = product;
    return `
    <div class="cart-item">
        <img src=${img} alt="${name}">
        <div class="item-info">
            <h3 class="item-tittle">${name}</h3>
            <p>${type}</p>
        </div>
        <div class="item-price">
            <span>$${price}</span>
        </div>
    </div>

    <div class="item-handler">
        <div class="item-qty">
            <span class="quantity-handler down" id="down" data-id=${id} data-quantity=${quantity}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
        <div class="item-delete">
            <span class="delete" data-id=${id}> Eliminar </span>
        </div>
    </div>`;
};

const renderCartProducts = () => {
    if (!cart.length) {
        cartContainer.innerHTML =
            '<p class="empty-cart"> El carrito está vacío </p>';
        return;
    }
    cartContainer.innerHTML = cart.map((product) =>
        cartProductTemplate(product)
    );
};

const createProductData = (product) => {
    const { id, name, type, price, img } = product;
    return { id, name, type, price, img };
};

const addProductToCart = (e) => {
    if (!e.target.classList.contains("product-buy-btn-span") &&
        !e.target.classList.contains("product-buy-btn")) return;

    const product = createProductData(e.target.dataset);
    if (isExistingProduct(product)) {
        addProductUnit(product);
        showModal("Se ha agregado una unidad al carrito");
    } else {
        cart = [...cart, { ...product, quantity: 1 }];
        showModal("El producto se ha agregado al carrito");
    }
    updateCart();
};

const isExistingProduct = (product) => {
    return cart.some((productCart) => productCart.id === product.id);
};

const addProductUnit = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};

const minusCartBtn = (e) => {
    if (!e.target.classList.contains("down")) return;
    if (Number(e.target.dataset.quantity) === 1) {
        if (window.confirm("¿Querés eliminar el producto del carrito?")) {
            deleteProduct(e.target.dataset.id);
            updateCart();
            return;
        } else return;
    };
    substractUnitToCart(e.target.dataset.id);
    updateCart();
};

const plusCartBtn = (e) => {
    if (!e.target.classList.contains("up")) return;
    const product = e.target.dataset;
    addProductUnit(product);
    updateCart();
};

const deleteCartProductBtn = (e) => {
    if (!e.target.classList.contains("delete")) return;
    if (window.confirm("¿Querés eliminar el producto del carrito?")) {
        deleteProduct(e.target.dataset.id);
    }
    updateCart();
};

const deleteProduct = (id) => {
    cart = cart.filter((cartProduct) => cartProduct.id !== id);
};

const clearCart = () => {
    cart = [];
    updateCart();
};

const deleteAll = (e) => {
    if (!e.target.classList.contains("delete-cart"));
    if (window.confirm("¿Querés vaciar el carrito?")) {
        clearCart();
    }
};

const buyProducts = () => {
    if (window.confirm("¿Querés finalizar la compra?")) {
        clearCart();
        alert("Compra realizada con éxito");
        updateCart();
    }
};

const substractUnitToCart = (id) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === id
            ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
            : cartProduct
    );
};

const cartQuantityHandler = (e) => {
    minusCartBtn(e);
    plusCartBtn(e);
    deleteCartProductBtn(e);
};

const updateCart = () => {
    saveCart();
    renderCartProducts();
    renderCartBubble();
    renderTotal();
};

const renderCartBubble = () => {
    cartQtyBubble.textContent = cart.reduce(
        (acc, product) => acc + product.quantity,
        0
    );
};

const renderTotal = ()=>{
    cartTotal.textContent = `$ ${cart.reduce((acc, product) => acc + product.quantity*product.price, 0)}`
};

const showModal = (msg) => {
    addProductModal.classList.add("active-modal");
    addProductModal.textContent = msg;
    setTimeout(() => {
        addProductModal.classList.remove("active-modal");
    },2000);
};


//VALIDACIÓN FORMULARIO

//Auxiliares
const isEmpty = (input) => {
    return !input.value.trim().length;
};

const isMin = (input, min) => {
    return input.value.length >= min;
};

const isEmailValid = (input) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(input.value.trim());
};

const isPhoneValid = (input) => {
    const re = /^\d{7,15}$/;
    return re.test(input.value.trim());
};

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

const showError = (input, msg) => {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = msg;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = "";
};

//Validación
const checkName = (input) => {
    const minChar = 3;

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return false;
    }

    if (!isMin(input, minChar)) {
        showError(input, `El nombre debe tener al menos ${minChar} caracteres`);
        return false;
    }

    showSuccess(input);
    return true;
};

const checkMail = (input) => {
    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return false;
    }

    if (!isEmailValid(input)) {
        showError(input, "El mail no es válido");
        return false;
    }

    showSuccess(input);
    return true;
};

const checkPhone = (input) => {
    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return false;
    }

    if (!isPhoneValid(input)) {
        showError(input, `El teléfono no es valido`);
        return false;
    }

    showSuccess(input);
    return true;
};

const checkMsg = (input) => {
    const minChar = 15;
    const maxChar = 300;

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio");
        return false;
    }

    if (!isBetween(input, minChar, maxChar)) {
        showError(
            input,
            `El mensaje debe tener entre ${minChar} y ${maxChar} caracteres`
        );
        return false;
    }
    showSuccess(input);
    return true;
};

const validateForm = (e) => {
    e.preventDefault();

    const isNameValid = checkName(inputName);
    const isEmailValid = checkMail(inputMail);
    const isPhoneValid = checkPhone(inputPhone);
    const isMsgValid = checkMsg(inputMsg);

    const isValidForm =
        isNameValid && isEmailValid && isPhoneValid && isMsgValid;

    if (isValidForm) {
        alert("El mensaje fue enviado!");
        inputName.parentElement.classList.remove("success");
        inputMail.parentElement.classList.remove("success");
        inputPhone.parentElement.classList.remove("success");
        inputMsg.parentElement.classList.remove("success");
        contactForm.reset();
    }
};

const init = () => {
    renderProductsCards(appState.products[0]);
    seeMoreBtn.addEventListener("click", seeMoreProducts);
    productsFilter.addEventListener("click", applyFilter);
    menuIcon.addEventListener("click", openMenu);
    cartIcon.addEventListener("click", openCart);
    overlay.addEventListener("click", closeOnClick);
    document.addEventListener("DOMContentLoaded", renderCartProducts);
    productsContainer.addEventListener("click", addProductToCart);
    cartContainer.addEventListener("click", cartQuantityHandler);
    deleteBtn.addEventListener("click", deleteAll);
    buyBtn.addEventListener("click", buyProducts);
    renderCartBubble();
    contactForm.addEventListener("submit", validateForm);
    inputName.addEventListener("input", () => checkName(inputName));
    inputMail.addEventListener("input", () => checkMail(inputMail));
    inputPhone.addEventListener("input", () => checkPhone(inputPhone));
    inputMsg.addEventListener("input", () => checkMsg(inputMsg));
};

init();