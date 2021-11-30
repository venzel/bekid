import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/useCases/AuthenticateUser/AuthenticateUserMiddleware';
import { RegisterUserMiddleware } from '@modules/user/useCases/RegisterUser/RegisterUserMiddleware';
import { UpdatePasswordUserMiddleware } from '@modules/user/useCases/UpdatePasswordUser/UpdatePasswordUserMiddleware';
import { ForgotPasswordUserMiddleware } from '@modules/user/useCases/ForgotPasswordUser/ForgotPasswordUserMiddleware';
import { ResetPasswordUserMiddleware } from '@modules/user/useCases/ResetPasswordUser/ResetPasswordUserMiddleware';
import { UpdateAvatarUserMiddleware } from '@modules/user/useCases/UpdateAvatarUser/UpdateAvatarUserMiddleware';
import { UpdateProfileUserMiddleware } from '@modules/user/useCases/UpdateProfileUser/UpdateProfileUserMiddleware';
import { ToggleRoleUserMiddleware } from '@modules/user/useCases/ToggleRoleUser/ToggleRoleUserMiddleware';
import { ShowUserMiddleware } from '@modules/user/useCases/ShowUser/ShowUserMiddleware';
import { DeleteUserMiddleware } from '@modules/user/useCases/DeleteUser/DeleteUserMiddleware';
import { ListUserMiddleware } from '@modules/user/useCases/ListUser/ListUserMiddleware';
import { ToggleAllowUserMiddleware } from '@modules/user/useCases/ToogleAllowUser/ToggleAllowUserMiddleware';

class UserRoutes {
    public registerAll(router: Router): void {
        // Register user
        new RegisterUserMiddleware().register(router, 'post', 'ALL', '/users');

        // List
        new ListUserMiddleware().register(router, 'get', 'ADMIN', '/users');

        // Show
        new ShowUserMiddleware().register(router, 'get', ['ADMIN', 'USER'], '/users/:id');

        // Delete
        new DeleteUserMiddleware().register(router, 'delete', 'ADMIN', '/users/:id');

        // Login
        new AuthenticateUserMiddleware().register(router, 'post', 'ALL', '/login');

        // Change passsword
        new UpdatePasswordUserMiddleware().register(router, 'put', ['ADMIN', 'USER'], '/change_password');

        // Forgot password
        new ForgotPasswordUserMiddleware().register(router, 'put', 'ALL', '/forgot_password');

        // Reset password
        new ResetPasswordUserMiddleware().register(router, 'patch', 'ALL', '/reset_password');

        // Change avatar
        new UpdateAvatarUserMiddleware().register(router, 'patch', 'ALL', '/change_avatar');

        // Change profile
        new UpdateProfileUserMiddleware().register(router, 'put', ['ADMIN', 'USER'], '/change_profile');

        // Toggle role
        new ToggleRoleUserMiddleware().register(router, 'patch', 'ADMIN', '/toggle_role/:id');

        // Toggle allow
        new ToggleAllowUserMiddleware().register(router, 'patch', 'ADMIN', '/toggle_allow/:id');
    }
}

export { UserRoutes };
