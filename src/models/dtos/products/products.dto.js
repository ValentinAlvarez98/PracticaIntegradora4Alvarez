import productsModel from "../../schemas/products.schema.js";

export class SaveProductDTO {

    constructor(payload, user) {

        this.payload = payload;
        this.user = user;

    };

    async prepareData() {

        const user = this.user.payload;

        if (!user.role === 'ADMIN' || !user.role === 'PREMIUM') {
            throw new Error('No tienes permisos para realizar esta acción')
        };



        const product = {
            title: this.payload.title,
            description: this.payload.description,
            code: this.payload.code,
            price: this.payload.price,
            status: this.payload.status,
            stock: this.payload.stock,
            category: this.payload.category,
            thumbnails: this.payload.thumbnails,
            id: this.payload.id,
            owner: user.id ? user.id : 'ADMIN',
        }

        console.log(product);

        const campos = [];

        Object.keys(product).forEach(key => {

            if (product[key] === undefined) {
                campos.push(key.toUpperCase());
            }

        });

        if (campos.length > 0) {
            throw new Error(`Los campos: ${campos.join(', ')}, son obligatorios`);
        }

        const productInDB = await productsModel.findOne({
            id: product.id
        } || {
            code: product.code
        });

        if (productInDB) {
            throw new Error('El producto ya existe');
        };

        return product;

    }


};