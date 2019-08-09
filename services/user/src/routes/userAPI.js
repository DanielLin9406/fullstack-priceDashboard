import userRouter from '../libs/router/router';
import ensureAuthenticated from '../libs/auth/authorization';

userRouter.get('/user', ensureAuthenticated, (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user
  });
});

export default userRouter;
