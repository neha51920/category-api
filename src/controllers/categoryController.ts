import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    const newCategory = new Category({ name, parent: parent || null });
    await newCategory.save();

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (parentCategory) {
        parentCategory.subcategories.push(newCategory._id as mongoose.Types.ObjectId);
        await parentCategory.save();
      }
    }

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ parent: null }).populate('subcategories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const updates = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updates, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

export const reassignSubcategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categoryId, subcategoryId } = req.params;
    const newParent = await Category.findById(categoryId);
    const subcategory = await Category.findById(subcategoryId);

    if (!newParent || !subcategory) {
      return res.status(404).json({ message: 'Category or subcategory not found' });
    }

    if (subcategory.parent) {
      const oldParent = await Category.findById(subcategory.parent);
      if (oldParent) {
        oldParent.subcategories = oldParent.subcategories.filter(
          (id: mongoose.Types.ObjectId) => !id.equals(subcategory._id)
        );
        await oldParent.save();
      }
    }

    subcategory.parent = newParent._id;
    await subcategory.save();

    if (!newParent.subcategories.includes(subcategory._id as mongoose.Types.ObjectId)) {
      newParent.subcategories.push(subcategory._id as mongoose.Types.ObjectId);
      await newParent.save();
    }

    return res.status(200).json({ message: 'Subcategory reassigned successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
