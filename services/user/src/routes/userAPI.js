import createRouter from '../../../shared/libs/router/router';
import ensureAuthenticated from '../middleware/auth/authorization';

const userRouter = createRouter();

userRouter.get('/user', ensureAuthenticated, (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user
  });
});

export default userRouter;
