export const Route = (handler) => [
        {
            method: 'GET',
            path: '/',
            handler: handler.main,
        }
    ];