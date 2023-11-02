const productsList = [
  {
    id: 1,
    img: "./assets/img/Beepure-Belguian.png",
    name: "Beepure",
    type: "Belguian White x500ml",
    ibu: 14,
    alcohol: "4,7%",
    price: 1000,
  },

  {
    id: 2,
    img: "./assets/img/Blest-Ipa.png",
    name: "Blest",
    type: "IPA x355ml",
    ibu: 48,
    alcohol: "6,5%",
    price: 1290,
  },

  {
    id: 3,
    img: "./assets/img/Blest-Apa.png",
    name: "Blest",
    type: "APA x355ml",
    ibu: 50,
    alcohol: "5,5%",
    price: 1290,
  },

  {
    id: 4,
    img: "./assets/img/Rastel-Honey.png",
    name: "Rastel",
    type: "Honey x1000ml",
    ibu: 17,
    alcohol: "5,6%",
    price: 1260,
  },

  {
    id: 5,
    img: "./assets/img/BarbaRoja-Calafate.png",
    name: "Barba Roja",
    type: "Negra con frutos rojos x500ml",
    ibu: 18,
    alcohol: "4,5%",
    price: 1500,
  },

  {
    id: 6,
    img: "./assets/img/Blest-Honey.png",
    name: "Blest",
    type: "Honey x473ml",
    ibu: 16,
    alcohol: "5,3%",
    price: 990,
  },

  {
    id: 7,
    img: "./assets/img/Kira-Takeshi.png",
    name: "Kira - Takeshi",
    type: "American IPA x473ml",
    ibu: 50,
    alcohol: "6,5%",
    price: 1600,
  },

  {
    id: 8,
    img: "./assets/img/Kira-Haruki.png",
    name: "Kira - Haruki",
    type: "Kolsch x473ml",
    ibu: 23,
    alcohol: "5,1%",
    price: 1290,
  },

  {
    id: 9,
    img: "./assets/img/BarbaRoja-DIpa.png",
    name: "Barba Roja",
    type: "Doble IPA x500ml",
    ibu: 68,
    alcohol: "8,7%",
    price: 1200,
  },

  {
    id: 10,
    img: "./assets/img/Baum-Ipa.png",
    name: "Baum",
    type: "IPA x473",
    ibu: 49,
    alcohol: "6,0%",
    price: 1650,
  },
];

const cartMenu = document.querySelector('.cart');
const cartIcon = document.querySelector('.cart-icon');
const overlay = document.querySelector('.overlay');
const navMenu = document.querySelector('.nav-list');
const containerCardProducts = document.querySelector('.container-products');



const contactForm = document.getElementById('form_contact')
const inputName = document.getElementById('nombre')
const inputMail = document.getElementById('mail')
const inputPhone = document.getElementById('tel')
const inputMsg = document.getElementById('msg')


// LOCALSTORAGE//
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


//CARRITO

const toggleCart = () => {
  cartMenu.classList.toggle('open-cart');
  // if(barsMenu.classList.contains('open-menu')){
  //   barsMenu.classList.remove('open-menu');
  //   return;
  // }
  // overlay.classList.toggle('show-overlay');
  overlay.classList.toggle('show-overlay');
}

const closeOnOverlayClick = () => {
  // barsMenu.classList.remove('open-menu');
  cartMenu.classList.remove('open-cart');
  overlay.classList.remove('show-overlay');
}

const closeOnClick = (e) => {
  if(!e.target.classList.contains('nav-link')) return;
  barsMenu.classList.remove('open-menu');
  overlay.classList.remove('show-overlay');
}


//CARD PRODUCTOS

const cardProductTemplate = (product) => {
    const { id, img, name, type, ibu, alcohol, price } = product
    return `
    <div class="card-products">
        <img src="${img}" alt="${name}">
        <h2>${name}</h2>
        <h3>${type}</h3>
        <div class="descrip-prod">
            <p>IBU ${ibu}</p>
            <span>/</span>
            <p>Alcohol ${alcohol}</p>
        </div>
        <p class="product-price">$${price}</p>
        <button class="product-btn"
            data-id=${id}
            data-name=${name}
            data-type=${type}
            data-price=${price}
            data-img=${img}
        ><span>Agregar al carrito</span></button>
    </div>
    `;
};

const renderProducts = () => {
    containerCardProducts.innerHTML = productsList.map((product) => cardProductTemplate(product)).join('');
}

//VALIDACIÓN FORMULARIO

//Auxiliares
const isEmpty = (input) => {
  return !input.value.trim().length;
}

const isMin = (input, min) => {
  return input.value.length >= min;
}

const isEmailValid = (input) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(input.value.trim());
}

const isPhoneValid = (input) => {
  const re = /^\d{7,15}$/;
  return re.test(input.value.trim());
}

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
}

const showError = (input, msg) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');
  const error = formField.querySelector("small");
  error.style.display = 'block';
  error.textContent = msg;
}

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');
  const error = formField.querySelector("small");
  error.textContent = '';
}

//Validación
const checkName = (input) => {
  const minChar = 3;

  if(isEmpty(input)){
    showError(input, "Este campo es obligatorio");
    return false;
  }

  if(!isMin(input, minChar)){
    showError(input,
      `El nombre debe tener al menos ${minChar} caracteres`
    );
    return false;
  }

  showSuccess(input);
  return true;
}


const checkMail = (input) => {
  if(isEmpty(input)){
    showError(input, "Este campo es obligatorio");
    return false;
  }

  if(!isEmailValid(input)) {
    showError(input, "El mail no es válido");
    return false;
  }

  showSuccess(input);
  return true;
}

const checkPhone = (input) => {
  if(isEmpty(input)){
    showError(input, "Este campo es obligatorio");
    return false;
  }

  if(!isPhoneValid(input)){
    showError(input, `El teléfono no es valido`);
    return false;
  }

  showSuccess(input);
  return true;
}

const checkMsg = (input) => {
  const minChar = 15;
  const maxChar = 300;

  if(isEmpty(input)){
    showError(input, "Este campo es obligatorio");
    return false;
  }

  if(!isBetween(input, minChar, maxChar)){
    showError(input, `El mensaje debe tener entre ${minChar} y ${maxChar} caracteres`);
    return false;
  }
  showSuccess(input);
  return true;
}

const validateForm = (e) => {
  e.preventDefault();

  const isNameValid = checkName(inputName);
  const isEmailValid = checkMail(inputMail);
  const isPhoneValid = checkPhone(inputPhone);
  const isMsgValid = checkMsg(inputMsg);

  const isValidForm = 
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isMsgValid;

  if(isValidForm) {
    alert('El mensaje fue enviado!');
    contactForm.reset();
  }
};



const init = () => {
  cartIcon.addEventListener('click', toggleCart);
  overlay.addEventListener('click', closeOnOverlayClick);
  navMenu.addEventListener('click', closeOnClick)
  document.addEventListener('DOMContentLoaded', renderProducts);

  
  contactForm.addEventListener('submit', validateForm);
  inputName.addEventListener('input', () => checkName(inputName));
  inputMail.addEventListener('input', () => checkMail(inputMail));
  inputPhone.addEventListener('input', () => checkPhone(inputPhone));
  inputMsg.addEventListener('input', () => checkMsg(inputMsg));

};

init();