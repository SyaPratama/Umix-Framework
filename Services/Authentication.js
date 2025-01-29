import { Database } from "../App/Core/Database.js";
import bcrypt from "bcrypt";

export class Authentication {
  constructor() {
    this.connection = new Database();
    this.registration = this.registration.bind(this);
    this.login = this.login.bind(this);
  }

  async registration({ username, password, email }) {
    const hashPassword = bcrypt.hashSync(password, 12);
    const findUser = await this.connection.where("users", "email", { email });
    if (findUser.length === 0) {
      await this.connection.insert("users", {
        username,
        email,
        password: hashPassword,
      });
      return {
        status: "Complete",
        message: "Berhasil registrasi!",
        redirect: "/",
        code: 201,
      };
    } else {
      return {
        status: "Failed",
        message: "Email User Sudah Digunakan!",
        code: 400,
      };
    }
  }

  async login({ email, password, remember}) {
    const findUser = await this.connection.where("users", "email", { email });
    if (findUser.length > 0) {
      const comparePassword = bcrypt.compareSync(
        password,
        findUser[0].password
      );
      if (comparePassword){
        let expired = /true/.test(remember) ? ( 24 * 60 * 60 * 1000 ) * 30.44  : 24 * 60 * 60 * 1000;
        const token = bcrypt.hashSync(`${findUser[0].id}`, 12);
        const currentDate = new Date().getTime();
        const expired_time = currentDate + expired;
        const expired_at = new Date(expired_time);
        const newObj = {
          user_id: findUser[0].id,
          token,
          expired_at,
        };
        await this.connection.insert("personal_access_tokens", newObj);
        return {
          status: "Complete",
          message: "Berhasil Login",
          account: findUser,
          token,
          expired_at: expired,
          redirect: "/",
          code: 200,
        };
      } else {
        return {
          status: "Failed",
          message: "Password Tidak Sama!",
          code: 404,
        };
      }
    } else {
      return {
        status: "Failed",
        message: "Email Tidak Ditemukan!",
        code: 404,
      };
    }
  }
}
