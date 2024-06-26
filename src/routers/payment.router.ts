import { Router } from 'express';
import { isAuthMiddleware } from '../utils/middlewares/is-auth.middleware';
import { paymentController } from '../utils/ioc/controllers.ioc';
import { paymentMiddleware } from '../utils/middlewares/payment.middleware';
import { twoFAMiddleware } from '../utils/middlewares/2fa.middleware';
import { isUserUpdatedMiddleware } from '../utils/middlewares/is-user-updated.middleware';

export const router: Router = Router();

router
  .route('/:orderId')
  .post(
    isAuthMiddleware,
    isUserUpdatedMiddleware,
    twoFAMiddleware,
    paymentMiddleware,
    paymentController.create.bind(paymentController),
  );

router.get('/success', paymentController.success.bind(paymentController));
router.get('/cancel', paymentController.cancel.bind(paymentController));
