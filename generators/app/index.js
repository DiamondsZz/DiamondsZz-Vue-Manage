
const Generator = require("yeoman-generator");

//generator入口文件
module.exports = class extends Generator {
  writing() {
      this.fs.write(this.destinationPath('temp.txt'),'222');
  }    
};
