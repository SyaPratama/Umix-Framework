import Joi from "joi";

export const Route = (handler) => [
  {
    method: "GET",
    path: "/",
    handler: handler.dashboard,
  },
  {
    method: "GET",
    path: "/login",
    options: {
      auth: {
        mode: 'try'
      },
      handler: handler.login,
    },
  },
  {
    method: "GET",
    path: "/register",
    options: {
      auth: {
        mode: 'try'
      },
      handler: handler.register,
    },
  },
  {
    method: "POST",
    path: "/regist-handler",
    handler: handler.regist_handler,
    options: {
      auth: {
        mode: "try",
      },
      validate: {
        payload: Joi.object({
          username: Joi.string().min(5).required(),
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: ["com", "net", "id"] })
            .required(),
          password: Joi.string().min(5).required(),
          password_confirmation: Joi.string().min(5).required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/login-handler",
    handler: handler.login_handler,
    options: {
      auth: {
        mode: "try",
      },
      validate: {
        payload: Joi.object({
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: ["com", "net", "id"] })
            .required(),
          password: Joi.string().min(5).required(),
        }),
      },
    },
  },
];
