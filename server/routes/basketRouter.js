const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

// Добавить товар в корзину
router.post("/add-product", basketController.addProduct);
// Удалить товар из корзины
router.delete("/:basketId/remove-product/:productId", basketController.removeProduct);
// Получить информацию о корзине
router.get("/:basketId", basketController.getBasket);

module.exports = router;
