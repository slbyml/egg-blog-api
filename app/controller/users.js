'use strict';

const BaseController = require('./base');

class UsersController extends BaseController {
  // 注册
  async singup() {
    const { ctx } = this;
    const user = ctx.request.body;

    try {
      // 保存到数据库
      await ctx.model.User.create(user);
      this.success();
    } catch (error) {
      // 保存失败
      this.error({
        error,
      });
    }
  }
  // 登陆
  async singin() {
    const { ctx } = this;
    const user = ctx.request.body;
    try {
      const result = await ctx.model.User.findOne(user);
      if (result) {
        // 登录成功需要写入session会话
        // 可以判断ctx.session.user 是否为null来判断是否登录
        ctx.session.user = result;

        this.success();
      } else {
        this.error({
          error: '用户名或密码错误',
        });
      }
    } catch (error) {
      this.error({
        error,
      });
    }

  }
  // 登出
  async singout() {
    const { ctx } = this;
    ctx.session.user = null;
    this.success({
      data: '登出成功',
    });
  }
}

module.exports = UsersController;
