#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
function CopyDirectory(src, target) {
    if (process.cwd() !== target && !fs.existsSync(__dirname+target)) {
      fs.mkdirSync(target);
    }
    if (fs.existsSync(src) == false) {
      return false;
    }
    // 拷贝新的内容进去
    var dirs = fs.readdirSync(src);
    dirs.forEach(function(item){
      var item_path = path.join(src, item);
      var temp = fs.statSync(item_path);
      if (temp.isFile()) { // 是文件
        fs.copyFileSync(item_path, path.join(target, item));
      } else if (temp.isDirectory()){ // 是目录
        CopyDirectory(item_path, path.join(target, item));
      }
    });
  }
  // CopyDirectory(__dirname+'/dist', process.cwd());
  let target_folder = process.argv[2];
  if(!target_folder) {
    // console.log('没有目标文件夹，将在命令操作位置直接生成');
    console.log('warning: The standard format is:');
    console.log('           p-to-cli [project_name]');
    console.log('There is no target folder, it will be generated directly at the command operation location.');
    CopyDirectory(__dirname+'/dist', process.cwd());
  } else {
    CopyDirectory(__dirname+'/dist', process.cwd()+`/${target_folder}`);
    console.log('Generated successfully');
    console.log(`please: cd  ${target_folder}`);
    console.log('        npm install');
    console.log('        npm run start');
  }