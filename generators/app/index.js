const Generator = require("yeoman-generator");

//generator入口文件
module.exports = class extends Generator {
  //接受用户输入
  prompting() {
    return this.prompt([
      {
        type: "input",
        //问题字段名
        name: "projectName",
        //描述信息
        message: "请输入你的项目名字",
        //默认为当前文件夹名字
        default: this.appname,
      },
    ]).then((answers) => {
      //接受用户回答的数据对象
      this.answers = answers;
    });
  }

  //generator的输出方法
  writing() {
    //模板文件的路径
    const templatePath = this.templatePath("test.txt");
    //输出文件的路径
    const outputPath = this.destinationPath("test.txt");

    //模板数据上下文
    const context = this.answers;

    //输出模板
    this.fs.copyTpl(templatePath, outputPath, context);
  }
};
