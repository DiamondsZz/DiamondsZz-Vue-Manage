const Generator = require("yeoman-generator");

//generator入口文件
module.exports = class extends (
  Generator
) {
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
      "src/api/auth.js",
      "src/assets/css/common.css",
      "src/components/Menu.vue",
      "src/components/Logo.vue",
      "src/components/TipModal.vue",
      "src/components/Layout.vue",
      "src/components/User.vue",
      "src/components/Table.vue",
      "src/components/Search.vue",
      "src/components/Upload.vue",
      "src/components/VerificationCode.vue",
      "src/components/Form.vue",
      "src/components/Area/area.vue",
      "src/components/Area/area.js",
      "src/filters/index.js",
      "src/plugins/index.js",
      "src/plugins/ant-design-vue.js",
      "src/plugins/vue-ls.js",
      "src/router/index.js",
      "src/store/index.js",
      "src/store/initStore.js",
      "src/store/modules/user.js",
      "src/utils/common.js",
      "src/utils/request.js",
      "src/utils/util.js",
      ".env.dev",
      ".env.prod",
      "package.json",
      "vue.config.js",
      "prettier.config.js",
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
