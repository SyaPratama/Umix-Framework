export const Route = () => [
        {
            method: 'GET',
            path: '/',
            handler: function (request,h){
               return h.response('Lorem Ipsum').code(200);
            }
        }
    ];