import { clientService } from "./client.js";

const url = new URL(window.location);
const search = url.searchParams.get('search');

const title = document.querySelector('.category-title');
const productsBox = document.querySelector('.all-products-stock');

title.textContent = `Resultados de la busqueda: "${search}"`;

const getProducts = async (search) => {
    try {
        const arrProducts = await clientService.readProducts();
        productsBox.innerHTML = '';
        findProducts(arrProducts, search);
    } catch (error) {
        console.log(error);
    }
}

const findProducts = (arrProducts, search) => {
    let coincidence = 0 ;
    arrProducts.forEach(product => {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();
        const regex = search.toLowerCase(); 
        if(name.includes(regex) || category.includes(regex)){
            showProduct(product);
            coincidence++;
        }
    })
    if(coincidence == 0){
        noCoincidence();
    }
}

const showProduct = (product) => {
    const card = createCard(product);
    productsBox.appendChild(card);
};

const createCard = (product) => {
    const card = document.createElement('a');
    card.classList.add('category-product');
    card.href = `detail-prod.html?id=${product.id}`;
    card.innerHTML = createContentCard(product);
    return card
}

const createContentCard = ({name, category, url, price}) => {
    // agregar ruta detail-product con ID
    return `<img class="category-img" src="${url}" alt="${category}" onerror="imgErrorHTML(this)">
            <div class="category-text">
                <p class="category-category">${category}</p>        
                <h4 class="category-name">${name}</h4>
                <p class="category-price">$ ${price}</p>
                <p class="category-detail">Ver producto <i class="fa-solid fa-arrow-right-to-bracket"></i></p>
            </div>`;
};

const noCoincidence = () => {
    productsBox.innerHTML = `<div class="no-coincidence">
                                <i class="fa-brands fa-searchengin gigant-icon"></i>
                                <p>No se encontró ningún resultado que coincida con la búsqueda.</p>
                             </div>`;
}

getProducts(search);