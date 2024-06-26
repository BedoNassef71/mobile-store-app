import { param } from 'express-validator';
import { handleValidationErrorsMiddleware } from '../../error-handling/validation-error';
import { CategoryInstance } from '../../instances/category.instance';
import { categoryService } from '../../ioc/services.ioc';

export const deleteCategoryPipe = [
  param('id')
    .isNumeric()
    .withMessage('Category ID must be a number.')
    .custom(async (id: number): Promise<boolean> => {
      const category: CategoryInstance | null =
        await categoryService.findByPk(id);

      if (!category) {
        throw new Error(`Category with ID ${id} does not exist.`);
      }

      const isParent: boolean = await categoryService.isParent(id);
      if (isParent) {
        throw new Error(
          `Cannot delete category ${id} because it has subcategories.`,
        );
      }

      return true;
    }),
  handleValidationErrorsMiddleware,
];
