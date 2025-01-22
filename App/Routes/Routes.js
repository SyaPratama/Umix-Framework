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
        }
    ];