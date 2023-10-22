import {
    getRepositories
} from '../../models/repositories/index.repository.js';

import {
    verifyJWT
} from '../../utils/JWT/jwt.utils.js';

const {
    productsRepository
} = getRepositories();

export class ProductsController {

    static async getAll(req, res, next) {

        try {

            let {
                limit = 10, page = 1, sort, query
            } = req.query;

            limit = parseInt(limit);
            page = parseInt(page);
            query !== undefined ? query = query.toString() : query = undefined;

            const result = await productsRepository.getAll({
                limit,
                page,
                sort,
                query
            });

            res.send({
                ...result
            });

        } catch (error) {

            next(error);

        };

    };

    static async getById(req, res, next) {

        try {
            const {
                id
            } = req.params;

            const product = await productsRepository.getById(id);

            res.send({
                status: 'success',
                payload: product
            });

        } catch (error) {
            next(error);
        };

    };

    static async addOne(req, res, next) {

        try {

            const product = req.body;
            const token = req.cookies.auth;

            const user = verifyJWT(token);

            const result = await productsRepository.addOne(product, user);

            res.send({
                status: 'success',
                payload: `Producto con id: ${result.id}, guardado correctamente en la base de datos`
            });

        } catch (error) {

            next(error);

        };

    };

    static async updateOne(req, res, next) {

        try {

            const {
                id
            } = req.params;

            const product = req.body;
            const token = req.cookies.auth;

            const user = verifyJWT(token);
            const result = await productsRepository.updateOne(id, product, user);

            res.send({
                status: 'success',
                payload: `Producto con id: ${id}, actualizado correctamente en la base de datos`
            });

        } catch (error) {

            next(error);

        };

    };

    static async deleteOne(req, res, next) {

        try {

            const {
                id
            } = req.params;

            const token = req.cookies.auth;

            const user = verifyJWT(token);
            const result = await productsRepository.deleteOne(id, user);

            res.send({
                status: 'success',
                payload: `Producto con id: ${id}, eliminado correctamente de la base de datos`
            });

        } catch (error) {

            next(error);

        };

    };

};