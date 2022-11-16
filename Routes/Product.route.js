const express = require('express');
const ProductController = require('../Controllers/Product.Controller');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     description: All products
 *     responses:
 *       200:
 *         description: Returns all the products
 */

router.get('/', ProductController.getAllProducts);
/**
 * @swagger
 * /products:
 *   post:
 *     parameters:
 *      - in: body
 *        name: product
 *        description: New product
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            price:
 *              type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', ProductController.createNewProduct);

router.get('/:id', ProductController.findProductById);

router.patch('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;