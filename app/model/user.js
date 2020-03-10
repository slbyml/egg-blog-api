'use strict';

module.exports = app => {
  // 先得到mongoose模块，通过它定义骨架模型和modal
  const mongoose = app.mongoose;
  // 先定义额schema,通过它可以定义集合里文档的属性名和类型
  const Schema = mongoose.Schema;
  // 用户集合的模型骨架，它不链接也不能操作数据库
  const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
  });
  // 返回一个用户模型，可以操作数据库
  return mongoose.model('User', UserSchema);
};
