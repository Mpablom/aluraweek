import { clientService } from "./client.js"; 

const productsBox = document.querySelector('.all-products-stock')

const renderProducts = async () => {
    try {
        const dataProducts = await clientService.readProducts();
        showProducts(dataProducts);
    } catch (error) {
        console.log(error);
    }
};

const showProducts = (arrProducts) => {
    if(arrProducts.length > 0) {
        productsBox.innerHTML = '';
        arrProducts.forEach(product => {
            const card = createCard(product);
            productsBox.appendChild(card);
            const buttonDelete = document.getElementById(product.id);
            buttonDelete.addEventListener('click', deleteProduct);
        });
    } else {
        // mostrar mensaje que no hay productos
    }
};

const createCard = (product) => {
    const card = document.createElement('div');
    card.classList.add('category-product');
    card.innerHTML = createContentCard(product);
    return card
}

const createContentCard = ({id, name, category, url, price}) => {
    // agregar ruta detail-product con ID
    return `<img class="category-img" src="${url}" alt="${category}" onerror="imgErrorHTML(this)">
            <div class="category-text">        
                <p class="category-category">${category}</p>
                <h4 class="category-name">${name}</h4>
                <p class="category-price">$ ${price}</p>
                <div class="category-actions-box">
                    <a class="category-product-edit" href="edit-prod.html?id=${id}"><i class="fa-solid fa-pen-to-square"></i></a>
                    <button id=${id} class="category-product-delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            `;
};

const deleteProduct = (e) => {
    console.log(e)
    console.log(e.currentTarget.parentNode.parentNode.parentNode)
    const id = e.currentTarget.id;
    const card = e.currentTarget.parentNode.parentNode.parentNode;
    clientService.deleteProduct(id);
    card.remove();
    
}

renderProducts();