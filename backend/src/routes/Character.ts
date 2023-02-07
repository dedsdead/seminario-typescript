import express from 'express';
import controller from '../controllers/Character';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.character.create), controller.createCharacter);
router.get('/', controller.readAll);
router.get('/:characterId', controller.readCharacter);
router.patch('/:characterId', ValidateSchema(Schemas.character.update), controller.updateCharacter);
router.delete('/:characterId', controller.deleteCharacter);

export = router;
