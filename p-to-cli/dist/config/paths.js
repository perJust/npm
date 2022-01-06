const path = require('path');
const fs = require('fs');
// 获取当前目录
const appDirectory = fs.realpathSync(process.cwd());
// 解析绝对路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
// 模块默认解析的扩展名  携带.的形式
const resolveExtensions = ['.tsx', '.js', '.jsx', '.ts', '.json'];
// 解析模块路径
const resolveModule = (resolveFn, filePath) => {
  // 查看文件是否存在
  const extension = resolveExtensions.find((ext) => {
    // 默认filePath没写扩展名，这个函数执行find的目的是依次查看文件配哪个扩展名是存在的
    return fs.existsSync(resolveFn(`${filePath}${ext}`));
  });
  if (extension) {
    return resolveFn(`${filePath}${extension}`);
  }
  // 否则当js处理
  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appBuild: resolveApp('dist'), // 打包
  appPublic: resolveApp('public'), // 静态资源路径
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'), // 打包入口
  appNodeModules: resolveApp('node_modules'),
  appSrc: resolveApp('src'), // 主入口
  resolveExtensions, // 模块扩展名
};
