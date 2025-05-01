import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  reassignSubcategory,
} from '../controllers/categoryController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/', authenticateToken, createCategory);
router.get('/', authenticateToken, getCategories);
router.put('/:categoryId', authenticateToken, updateCategory);
router.delete('/:categoryId', authenticateToken, deleteCategory);
router.put('/:categoryId/reassign/:subcategoryId', authenticateToken, reassignSubcategory);

export default router;