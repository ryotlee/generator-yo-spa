'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('generator-yo-spa') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: '项目名 : ',
      default: "spa-pro"
    }, {
      type: 'input',
      name: 'version',
      message: '版本号 : ',
      default: "0.0.1"
    }, {
      type: 'input',
      name: 'author',
      message: '开发者 : ',
      default: "dev"
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    // 拷贝package.json文件
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        version: this.props.version,
        author: this.props.author
      }
    );
    // 拷贝首页
    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );
    // src
    this.fs.copy(
      this.templatePath('src/**'),
      this.destinationPath('src/')
    );
    // build
    this.fs.copy(
      this.templatePath('build/**'),
      this.destinationPath('build/')
    );
    // bin
    this.fs.copy(
      this.templatePath('bin/**'),
      this.destinationPath('bin/')
    );
  },

  install: function() {
    this.installDependencies();
  }
});
