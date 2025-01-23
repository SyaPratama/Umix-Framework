export const Route = (handler) => [
        {
            method: 'GET',
            path: '/',
            handler: handler.login,
        },
        {
            method: 'GET',
            path: '/dashboard',
            handler: handler.dashboard
        },
        {
            method: 'GET',
            path: '/register',
            handler: handler.register
        }
    ];