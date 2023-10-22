import {
      Router
} from "express";

import {
      UsersController
} from "../../controllers/users/users.controller.js";

import {
      authFromCookie as authMiddleware
} from "../../middlewares/auth.middleware.js";

import passport from "passport";

const usersRouter = Router();

usersRouter.get('/github', passport.authenticate('github', {
      scope: ['user: email']
}), UsersController.loginGithub);
usersRouter.get('/githubcallback', passport.authenticate('github', {
      failureRedirect: '/login'
}), UsersController.loginGithubCallback);
usersRouter.post('/login', UsersController.loginOne);
usersRouter.post('/login/admin', UsersController.loginAdmin);
usersRouter.post('/register', UsersController.addOne);
usersRouter.put('/update/:email', UsersController.updateOne);
usersRouter.post('/delete', UsersController.deleteOne);
usersRouter.post('/sendResetPassword', UsersController.resetPasswordRequest);
usersRouter.post('/resetPassword/:token', UsersController.resetPassword);

export default usersRouter;