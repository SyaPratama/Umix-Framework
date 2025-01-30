import { Database } from "../App/Core/Database.js";

export class Jurnal {
  constructor() {
    this.connection = new Database();
  }

  async add() {
    await this.connection.insert("jurnals", { title: "", content: "" });
    return {
      status: "Complete",
      message: "Berhasil Menambahkan Jurnal",
      redirect: "/",
      code: 201,
    };
  }

  async getAll() {
    const result = await this.connection.getAll("jurnals");
    return {
      status: "Complete",
      message: "Berhasil Mendapatkan Jurnal",
      code: 200,
      data: result,
    };
  }

  async getById(id) {
    const result = await this.connection.find("jurnals", id);
    if (result.length > 0) {
      return {
        status: "Complete",
        message: "Berhasil Mendapatkan Jurnal",
        code: 200,
        data: result[0],
      };
    } else {
      return {
        status: "Failed",
        message: "Gagal Mendapatkan Jurnal",
        code: 404,
      };
    }
  }

  async delete(id) {
    const res = await this.connection.deleted("jurnals", id);
    if (res[0].affectedRows == 1) {
      return {
        status: "Success",
        message: "Berhasil Menghapus Jurnal",
        redirect: "/",
        code: 200,
      };
    } else {
      return {
        status: "Failed",
        message: "Jurnal Tidak Ditemukan",
        code: 404,
      };
    }
  }

  async update(title = "", content = "", id) {
    const findJurnals = await this.connection.find("jurnals", id);
    if (findJurnals.length > 0) {
      if (title) {
        await this.connection.raw(
          `UPDATE jurnals SET title="${title}" WHERE id = ${id}`
        );
        return {
          status: "Success",
          message: "Berhasil Update Jurnal",
          code: 200,
        };
      } else if (content) {
        await this.connection.raw(
          `UPDATE jurnals SET content="${content}" WHERE id = ${id}`
        );
        return {
          status: "Success",
          message: "Berhasil Update Jurnal",
          code: 200,
        };
      }
    } else {
      return {
        status: "Failed",
        message: "Gagal Update Jurnal",
        code: 400,
      };
    }
  }
}
