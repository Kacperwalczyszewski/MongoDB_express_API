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
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: Product Id.
 *     description: Get a product by id
 *     responses:
 *       200:
 *         description: Returns the requested product
 *       400:
 *         description: Not found
 */
router.get('/:id', ProductController.findProductById);
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: Update product ID.
 *      - in: body
 *        name: product
 *        description: Update product element
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
router.patch('/:id', ProductController.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The product ID.
 *     description: Delete a product by id
 *     responses:
 *       200:
 *         description: Returns the requested catachphrase
 */
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;