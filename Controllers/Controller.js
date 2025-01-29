import { Authentication } from "../Services/Authentication.js";
class Controller {
  constructor() {
    this.login = this.login.bind(this);
    this.dashboard = this.dashboard.bind(this);
    this.regist_handler = this.regist_handler.bind(this);
    this.login_handler = this.login_handler.bind(this);
  }

  async login(req, h) {
    return h.view("main/authentication/login", { title: "Welcome To " });
  }

  async dashboard(req, h) {
    return h.view("main/dashboard/main", {
      title: "Dashboard Admin",
      username: "Rasya Putra Pratama",
    });
  }

  async register(req, h) {
    return h.view("main/authentication/register", { title: "Register User" });
  }

  async regist_handler(req, h) {
    const data = req.payload;
    const Service = new Authentication();
    if (data.password !== data.password_confirmation) {
      const response = h
        .response({
          status: "Failed",
          message: "Password Anda Tidak Sama!",
          code: 400,
        })
        .code(400);
      response.header("Content-Type", "application/json");
      response.header("Accept", "application/json");
      return response;
    } else {
      const result = await Service.registration(data);
      const response = h.response(result).code(result.code);
      response.header("Content-Type", "application/json");
      response.header("Accept", "application/json");
      return response;
    }
  }

  async login_handler(req, h) {
    const data = req.payload;
    const Service = new Authentication();
    const result = await Service.login(data);
    if (result.code === 200) {
      req.cookieAuth.set({
        id: result.account[0].id,
        token: result.token,
        user: result.account,
      });
      req.cookieAuth.ttl(result.expired_at);  
      const res = {
        status: result.status,
        message: result.message,
        redirect: result.redirect,
        code: result.code,
      };
      const response = h.response(res).code(res.code);
      response.header("Content-Type", "application/json");
      response.header("Accept", "application/json");
      return response;
    } else {
      const response = h.response(result).code(result.code);
      response.header("Content-Type", "application/json");
      response.header("Accept", "application/json");
      return response;
    }
  }

  async signout(req, h) {
    req.cookieAuth.clear();
    const response = h
      .response({
        status: 200,
        message: "Berhasil Logout",
        redirect: "/login",
        code: 200,
      })
      .code(200);
    response.header("Content-Type", "application/json");
    response.header("Accept", "application/json");
    return response;
  }
}

export default Controller;
