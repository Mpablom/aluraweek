import { clientService } from "./client.js";

const categoryNames = ['Juegos', 'Consolas', 'Amiibo']

const renderProducts = async () => {
    try {
        const dataProducts = await clientService.readProducts();
        filterProducts(dataProducts);
    } catch (error) {
        console.log(error);
    }
};

const filterProducts = (dataProducts) => {
    categoryNames.forEach( (category, index) => {
        const categoryProducts = dataProducts.filter(product => product.category == category);
        if(categoryProducts.length > 0){
            const main = document.querySelector(`main`);
            const section = main.children[index];
            writeTitle(section, category);
            showProducts(categoryProducts, section, index)
        } else {
            console.log(`"${category}" has not products`)
        }    
    })
};

const writeTitle = (section, categoryName) => {
    const title = section.querySelector('.category-title');
    title.textContent = categoryName;
}

const showProducts = (arrProducts, section) => {
        const categoryCarousel = section.querySelector('.category-carousel');
        categoryCarousel.innerHTML = '';
        arrProducts.forEach(product => {
            const card = createCard(product);
            categoryCarousel.appendChild(card);
        });

};

const createCard = (product) => {
    const card = document.createElement('a');
    card.classList.add('category-product');
    card.href = `detail-prod.html?id=${product.id}`;
    card.innerHTML = createContentCard(product)
    card.setAttribute("draggable", "false");
    return card
}

const createContentCard = ({name, category, url, price}) => {
    return `<img class="category-img" src="${url}" alt="${category}" onerror="imgErrorHTML(this)" draggable="false">
            <div class="category-text">
                <p class="category-category">${category}</p>        
                <h4 class="category-name">${name}</h4>
                <p class="category-price">$ ${price}</p>
                <p class="category-detail">Ver producto <i class="fa-solid fa-arrow-right-to-bracket"></i></p>
            </div>`;
};

renderProducts();

const seeMoreLinks = document.querySelectorAll('.category-seemore');
seeMoreLinks.forEach( seeMoreLink => {
    seeMoreLink.addEventListener('click', (e) => {
        const category = e.path[2].children[0].textContent;
        console.log(category)
        window.location.href = `./search.html?search=${category}`
    });
});