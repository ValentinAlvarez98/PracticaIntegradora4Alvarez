import {
    getDAOS
} from "../../daos/index.daos.js";
import {
    getDTOS
} from "../../dtos/index.dtos.js";

const {
    SaveProductDTO,
    LoadProductDTO,
    GetProductDTO,
    UpdateProductDTO,
    DeleteProductDTO
} = getDTOS();

const {
    productsMongoDAO
} = getDAOS();

export class ProductsRepository {

    constructor() {

        this.dao = productsMongoDAO;

    };

    async getAll({
        limit = 10,
        page = 1,
        sort,
        query
    }) {

        return await this.dao.getAll({
            limit,
            page,
            sort,
            query
        })

    };

    async getById(id) {

        return await this.dao.getById(id);

    };

    async addOne(payload, user) {

        const product = new SaveProductDTO(payload, user);

        const preparedProduct = await product.prepareData();

        return await this.dao.saveProduct(preparedProduct);

    };

    async updateOne(id, product, userPayload) {

        const user = userPayload.payload;

        if (!user.role === 'ADMIN' || !user.role === 'PREMIUM') {
            throw new Error('No tienes permisos para realizar esta acción')
        }

        const productToUpdate = this.getById(id);

        if (!productToUpdate) {
            throw new Error('El producto no existe');
        };

        if (productToUpdate.owner !== user._id) {
            throw new Error('El producto no te pertenece');
        };

        return await this.dao.updateById(id, product);

    };

    async deleteOne(id, userPayload) {

        const user = userPayload.payload;

        if (!user.role === 'ADMIN' || !user.role === 'PREMIUM') {
            throw new Error('No tienes permisos para realizar esta acción')
        }

        const productToUpdate = this.getById(id);

        if (!productToUpdate) {
            throw new Error('El producto no existe');
        };

        if (productToUpdate.owner !== user._id) {
            throw new Error('El producto no te pertenece');
        };

        return await this.dao.deleteById(id);

    };

}