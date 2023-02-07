import express from 'express';
import controller from '../controllers/House';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.house.create), controller.createHouse);
router.get('/', controller.readAll);
router.get('/:houseId', controller.readHouse);
router.patch('/:houseId', ValidateSchema(Schemas.house.update), controller.updateHouse);
router.delete('/:houseId', controller.deleteHouse);

export = router;
