const { Product, ProductInfo } = require("../models/models")
const {BasketProduct} = require("../models/models")

const uuid = require('uuid');
const path = require("path");
const ApiError = require("../error/apiError");
class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, BrandId, TypeId, description } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"

            img.mv(path.resolve(__dirname, "..", "static", fileName));
            const product = await Product.create({ name, price, BrandId, TypeId, img: fileName,description });


            return res.json(product)

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async addBasketProduct(req, res,next) {
            try {
              const { basketId, productId } = req.body;
        
              // Создаем запись о товаре в корзине
              const basketProduct = await BasketProduct.create({
                BasketId: basketId,
                ProductId: productId,
              });
        
              return res.json(basketProduct);
            } catch (e) {
              next(ApiError.badRequest(e.message));
            }
          }
    
    async getAll(req, res) {

        let { BrandId, TypeId, limit, page } = req.query
        page = page || 1
        limit = limit || 12

        let offset = page * limit - limit
        let products;

        if (!BrandId && !TypeId) {
            products = await Product.findAndCountAll({ limit, offset });

        }
        if (BrandId && !TypeId) {
            products = await Product.findAndCountAll({ where: { BrandId }, limit, offset });

        }
        if (!BrandId && TypeId) {
            products = await Product.findAndCountAll({ where: { TypeId }, limit, offset });

        }
        if (BrandId && TypeId) {
            products = await Product.findAndCountAll({ where: { TypeId, BrandId }, limit, offset });
        }

        return res.json(products);
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id: req.params.id },

            }
        );

        return res.json(product)
    }

    async delete(req, res) {
        const product = await Product.findOne({
            where: {
                id: req.body.id
            }
        })

        if (!product) {
            return res.status(400).json({
                message: 'Товар не найден'
            });
        }

        await product.destroy({ where: { id: req.body.id } })
        res.status(200).json({ message: 'Товар удвлен' });
    }
    async update(req, res) {
        const products = await product.findOne({ where: { id: req.body.id } });
        if (!products) {
            res.status(400).json({ message: 'Товар не найден' });
        }
        product.update({
            name: req.body.name,
            articleNumber: req.body.articleNumber,
            gender: req.body.gender,
            category: req.body.category,
            store: req.body.store,
            price: req.body.price
        },
            { where: { id: req.body.id } });

        res.status(200).json({ message: "Товар обновлен" });
    }
}

module.exports = new ProductController();