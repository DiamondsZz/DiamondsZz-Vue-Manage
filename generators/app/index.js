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
    //模板数据上下文
    const context = this.answers;

    //模板文件路径数组
    const templateArr = [
      "public/index.html",
      "src/api/index.js",
      "src/assets/css/common.css",
      "src/assets/js/common.js",
      "src/components/Main.vue",
      "src/filters/index.js",
      "src/plugins/index.js",
      "src/router/index.js",
      "src/router/routes.js",
      "src/store/index.js",
      "src/utils/index.js",
      "src/views/login/login.vue",
      "package.json",
      "vue.config.js",
    ];

    for (let template of templateArr) {
      //输出模板
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template),
        context
      );
    }
  }
};
