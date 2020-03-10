'use strict';

module.exports = app => {
  // 先得到mongoose模块，通过它定义骨架模型和modal
  const mongoose = app.mongoose;
  // 先定义额schema,通过它可以定义集合里文档的属性名和类型
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  // 用户集合的模型骨架，它不链接也不能操作数据库
  const ArticleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // 用户名
    user: { type: ObjectId, ref: 'User' },
    // 分类
    category: { type: ObjectId, ref: 'Category' },
    pv: { type: Number, default: 0 },
    // 评论
    comments: [
      {
        user: { type: ObjectId, ref: 'User' }, // ref是模型的名字
        content: String,
        createAt: { type: Date, default: Date.now },
      },
    ],
    // 创建时间
    createAt: { type: Date, default: Date.now },
  });
  // 返回一个用户模型，可以操作数据库
  return mongoose.model('Articles', ArticleSchema);
};
