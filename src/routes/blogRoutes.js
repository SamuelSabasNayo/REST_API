import Router from 'express';
import blogController from '../controllers/blogController';

const router = Router();

router
  .get('/', blogController.blogIndex)
  .get('/:id', blogController.blogDetails);

export default router;
