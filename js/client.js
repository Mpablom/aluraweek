const createProduct = async (jsonProduct) => {
    try {
        const response = await fetch(`https://e-commerce-alurageek-default-rtdb.firebaseio.com/products/products.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonProduct
        });
        return response.json;
    } catch (error) {
        return console.log(error);
    }
}

const readProducts = () => fetch('https://e-commerce-alurageek-default-rtdb.firebaseio.com/products/products.json').then(response => response.json());

const readProduct = (id) => fetch(`https://e-commerce-alurageek-default-rtdb.firebaseio.com/products/products/${id}.json`).then(response => response.json());

const deleteProduct = (id) => {
    return fetch(`https://e-commerce-alurageek-default-rtdb.firebaseio.com/products/products/${id}.json`, {
        method: 'DELETE'
    });
};

const updateProduct = (id, jsonProduct) => {
    return fetch(`https://e-commerce-alurageek-default-rtdb.firebaseio.com/products/products/${id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonProduct
    })
    .then(response => response.json)
    .catch(error => console.log(error))
}


export const clientService = {
    createProduct,
    readProducts,
    readProduct,
    updateProduct,
    deleteProduct,
};