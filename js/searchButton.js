const searchButton = document.querySelector('.menu-search-icon');
const inputSearch = document.querySelector('.menu-search-input');

const searchProduct = () => {
    if(inputSearch.value){
        window.location.href = `search.html?search=${inputSearch.value}`;
    }
}

searchButton.addEventListener('click', searchProduct);
inputSearch.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        searchProduct();
    }
});