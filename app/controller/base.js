'use strict';
// 基类，为所有controller提供公用方法
const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  // 公用基础put方法，
  async baseUpdate(model) {
    const { ctx } = this;
    const id = ctx.params.id;
    const body = ctx.request.body;
    try {
      await ctx.model[model].findByIdAndUpdate(id, body);
      this.success();
    } catch (error) {
      this.error({ error });
    }
  }
  // 公用基础delete方法，
  async baseDestroy(model) {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      await ctx.model[model].findByIdAndRemove(id);
      this.success();
    } catch (error) {
      this.error({ error });
    }

  }
  success(data = {}) {
    this.ctx.body = {
      code: 0,
      ...data,
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      ...error,
    };
  }
}

module.exports = BaseController;
