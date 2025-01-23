export const Route = (handler) => [
        {
            method: 'GET',
            path: '/login',
            handler: handler.login,
        },
        {
            method: 'GET',
            path: '/dashboard',
            handler: handler.dashboard
        }
    ];