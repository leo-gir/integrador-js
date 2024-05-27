const productsData = [
    {
    id: 1,
    img: "./assets/img/Beepure-Belguian.png",
    name: "Beepure",
    type: "Belguian White x500ml",
    category: "Belguian",
    ibu: 14,
    alcohol: "4,7%",
    price: 2700,
    },

    {
    id: 2,
    img: "./assets/img/Blest-Ipa.png",
    name: "Blest",
    type: "IPA x355ml",
    category: "IPA",
    ibu: 48,
    alcohol: "6,5%",
    price: 2200,
    },

    {
    id: 3,
    img: "./assets/img/Blest-Apa.png",
    name: "Blest",
    type: "APA x355ml",
    category: "APA",
    ibu: 50,
    alcohol: "5,5%",
    price: 2200,
    },

    {
    id: 4,
    img: "./assets/img/Rastel-Honey.png",
    name: "Rastel",
    type: "Honey x1000ml",
    category: "Honey",
    ibu: 17,
    alcohol: "5,6%",
    price: 2950,
    },

    {
    id: 5,
    img: "./assets/img/BarbaRoja-Calafate.png",
    name: "Barba Roja",
    type: "Negra con frutos rojos x500ml",
    category: "Negra",
    ibu: 18,
    alcohol: "4,5%",
    price: 2800,
    },

    {
    id: 6,
    img: "./assets/img/Blest-Honey.png",
    name: "Blest",
    type: "Honey x473ml",
    category: "Honey",
    ibu: 16,
    alcohol: "5,3%",
    price: 2950,
    },

    {
    id: 7,
    img: "./assets/img/Kira-Takeshi.png",
    name: "Kira - Takeshi",
    type: "American IPA x473ml",
    category: "IPA",
    ibu: 50,
    alcohol: "6,5%",
    price: 5700,
    },

    {
    id: 8,
    img: "./assets/img/Kira-Haruki.png",
    name: "Kira - Haruki",
    type: "Kolsch x473ml",
    category: "Kolsch",
    ibu: 23,
    alcohol: "5,1%",
    price: 5700,
    },

    {
    id: 9,
    img: "./assets/img/BarbaRoja-DIpa.png",
    name: "Barba Roja",
    type: "Doble IPA x500ml",
    category: "IPA",
    ibu: 68,
    alcohol: "8,7%",
    price: 2900,
    },

    {
    id: 10,
    img: "./assets/img/Baum-Ipa.png",
    name: "Baum",
    type: "IPA x473",
    category: "IPA",
    ibu: 49,
    alcohol: "6,0%",
    price: 2950,
    },
];


const divideProductsInParts = (size) => {
    productsList = [];

    for (let i = 0; i<productsData.length; i+=size) {
        productsList.push(productsData.slice(i,i+size));
    };
    return productsList;
};

const appState = {
    products: divideProductsInParts(3),
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(3).length,
    activeFilter: null
};