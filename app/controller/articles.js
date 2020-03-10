'use strict';
const BaseController = require('./base');

class ArticlesController extends BaseController {
  // 获取文章GET方法 /api/articles
  async index() {
    const { ctx } = this;
    // 定义接受的参数
    let { pageNum = 1, pageSize = 2, keyword } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
    // 匹配到关键字的会被返回
    const query = {};
    if (keyword) {
      query.$or = [{ title: new RegExp(keyword) }, { content: new RegExp(keyword) }];
    }
    try {
      // skip:跳过n条，limit返回数量
      const total = await ctx.model.Articles.count(query);
      const result = await ctx.model.Articles.find(query).populate('category').skip((pageNum - 1) * pageSize)
        .limit(pageSize);
      this.success({
        pageNum,
        pageSize,
        data: result,
        total,
      });
    } catch (error) {
      console.log(error);

      this.error({ error });
    }
  }
  // 创建文章POST方法 /api/articles
  async create() {
    const { ctx } = this;
    const articles = ctx.request.body;
    articles.user = this.user;

    try {
      await ctx.model.Articles.create(articles);
      this.success();
    } catch (error) {
      this.error({ error });
    }
  }
  // 更新文章PUT方法 /api/articles/:id
  async update() {
    await this.baseUpdate('Articles');
  }
  /**
   * 删除文章 DELETE方法
   * /api/articles/:id
   */
  async destroy() {
    await this.baseDestroy('Articles');
  }

  async addComment() {
    const { ctx } = this;
    const id = ctx.params.id;
    const comment = ctx.request.body;
    comment.user = this.user;
    try {
      await ctx.model.Articles.findByIdAndUpdate(id, { $push: { comments: comment } });
      this.success();
    } catch (error) {
      this.error({ error });
    }

  }
}

module.exports = ArticlesController;
