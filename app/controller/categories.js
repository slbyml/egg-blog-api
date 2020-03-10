'use strict';
const BaseController = require('./base');

class CategoriesController extends BaseController {
  async index() {
    const { ctx } = this;
    // 定义接受的参数GET方法 /api/categories
    let { pageNum = 1, pageSize = 2, keyword } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
    // 匹配到关键字的会被返回
    const query = keyword ? { name: new RegExp(keyword) } : null;
    try {
      // skip:跳过n条，limit返回数量
      const result = await ctx.model.Category.find(query).skip((pageNum - 1) * pageSize).limit(pageSize);
      this.success({
        data: result,
      });
    } catch (error) {
      this.error({ error });
    }
  }
  // 创建分类POST方法 /api/categories
  async create() {
    const { ctx } = this;
    const category = ctx.request.body;
    try {
      const hasCategory = await ctx.model.Category.findOne(category);
      if (hasCategory) {
        this.error({
          error: '此分类已存在！',
        });
      } else {
        await ctx.model.Category.create(category);
        this.success();
      }
    } catch (error) {
      this.error({ error });
    }
  }
  // 更新分类PUT方法 /api/categories/:id
  async update() {
    await this.baseUpdate('Category');
  }
  /**
   * 删除分类 DELETE方法
   * /api/categories/:id
   */
  async destroy() {
    await this.baseDestroy('Category');
  }
}

module.exports = CategoriesController;
