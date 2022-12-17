const port = process.env.PORT || 4000;

const createProduct = async (jsonProduct) => {
    try {
        const response = await fetch(``, {
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

const readProducts = () => fetch('').then(response => response.json());

const readProduct = (id) => fetch(`${id}`).then(response => response.json());

const deleteProduct = (id) => {
    return fetch(`${id}`, {
        method: 'DELETE'
    });
};

const updateProduct = (id, jsonProduct) => {
    return fetch(`${id}`, {
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