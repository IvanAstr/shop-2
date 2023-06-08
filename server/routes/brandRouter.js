const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/',checkRoleMiddleware("ADMIN"),brandController.create);
router.get('/',brandController.getAll);
router.delete('/:id',checkRoleMiddleware("ADMIN"),brandController.delete);
router.put('/:id',checkRoleMiddleware("ADMIN"), brandController.update);

module.exports = router