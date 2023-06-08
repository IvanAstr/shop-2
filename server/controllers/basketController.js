const {BasketProduct} = require("../models/models")
const ApiError = require("../error/apiError")
class BasketController {
    async addProduct(req, res, next) {
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
    
      async removeProduct(req, res, next) {
        try {
          const { basketId, productId } = req.params;
    
          // Удаляем запись о товаре из корзины
          await BasketProduct.destroy({
            where: {
              BasketId: basketId,
              ProductId: productId,
            },
          });
    
          return res.json({ message: "Товар удален из корзины" });
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
    
      async getBasket(req, res, next) {
        try {
          const { basketId } = req.params;
    
          // Получаем информацию о корзине и связанных товарах
          const basket = await Basket.findOne({
            where: { id: basketId },
            include: [{ model: Product, through: BasketProduct }],
          });
    
          return res.json(basket);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
        
}

module.exports = new BasketController();