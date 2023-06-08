const Router = require("express")
const router = new Router();
const productController = require("../controllers/productController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/",checkRoleMiddleware("ADMIN"), productController.create)
router.get("/", productController.getAll)
router.get("/:id", productController.getOne)
router.delete('/:id',checkRoleMiddleware("ADMIN"), productController.delete);
router.put('/:id', checkRoleMiddleware("ADMIN"),productController.update);


module.exports = router