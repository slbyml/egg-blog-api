'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/singup', controller.users.singup);
  router.post('/api/user/singin', controller.users.singin);
  router.get('/api/user/singout', controller.users.singout);

  // 分类
  // RESTful 风格的 URL 定义,会自动生成get\post\delete等方法
  router.resources('categories', '/api/categories', controller.categories);

  // 文章
  router.resources('articles', '/api/articles', controller.articles);
  // 文章评论
  router.post('articles', '/api/articles/comment/:id', controller.articles.addComment);

};
