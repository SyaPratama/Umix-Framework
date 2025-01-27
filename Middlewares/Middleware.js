export default class Middleware {
  constructor(server) {
    this.server = server;
    this.before = this.before.bind(this);
  }
  async before() {
    
  }
}
