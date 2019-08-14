"use strict";
const path = require("path");
const mkdirp = require("mkdirp");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

function toHump(str) {
  let res = str.replace(/-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
  res = res[0].toUpperCase() + res.substr(1);
  return res;
}

global.props = {};

module.exports = class extends Generator {
  initialzing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the divine ${chalk.red(
          "generator-thoughts-wc-polymer"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "component_name",
        message: "What's your component name?",
        default: this.appname
      },
      {
        type: "input",
        name: "description",
        message: "Description: ",
        default: "A web compoents developed by cigaret based on polymer."
      },
      {
        type: "input",
        name: "project_homepage",
        message: "Project homepage url: ",
        default: "https://thoughts.vip"
      },
      {
        type: "input",
        name: "npm_scope",
        message: "What's your npm scope name?",
        default: "we_thoughts"
      },
      {
        type: "input",
        name: "package_keywords",
        message: "Package keywords (Spilt by commas): ",
        default: "web component,polymer"
      },
      {
        type: "input",
        name: "author_name",
        message: "Author's name: ",
        default: "cigaret"
      },
      {
        type: "input",
        name: "author_email",
        message: "Author's email: ",
        default: "kcigaret@outlook.com"
      },
      {
        type: "input",
        name: "author_homepage",
        message: "Author's homepage: ",
        default: "https://thoughts.vip"
      },
      {
        type: "confirm",
        name: "if_github_repository",
        message: "Already have a GitHub repository?",
        default: false
      },
      {
        type: "input",
        name: "github_username",
        message: "GitHub username or organization: ",
        default: "we-thoughts"
      },
      {
        type: "confirm",
        name: "if_local_typescript",
        message: "Do you want to install typescript locally?",
        default: false
      },
      {
        type: "confirm",
        name: "if_local_polymer_cli",
        message: "Do you want to install polymer-cli locally?",
        default: false
      },
      {
        type: "confirm",
        name: "if_auto_npm_install",
        message: "Do you want run 'npm install' automatically?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      global.props = props;
    });
  }

  default() {
    this.props = global.props;
    // 创建项目目录
    if (path.basename(this.destinationPath()) !== this.props.component_name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.component_name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.component_name);
      this.destinationRoot(this.destinationPath(this.props.component_name));
    }
  }

  writing() {
    // This.fs.copy(from, to)
    // this.fs.copyTpl(from, to, context)
    mkdirp(this.destinationPath("build"));
    this.fs.copyTpl(
      this.templatePath("demo/index.html"),
      this.destinationPath("demo/index.html"),
      {
        component_name: this.props.component_name
      }
    );
    mkdirp(this.destinationPath("dist"));
    mkdirp(this.destinationPath("src"));
    this.fs.copyTpl(
      this.templatePath("test/index.html"),
      this.destinationPath("test/index.html"),
      {
        component_name: this.props.component_name
      }
    );
    this.fs.copyTpl(
      this.templatePath("test/thoughts-test_test.html"),
      this.destinationPath(`test/${this.props.component_name}_test.html`),
      {
        component_name: this.props.component_name
      }
    );
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("index.html"),
      { component_name: this.props.component_name }
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        component_name: this.props.component_name,
        description: this.props.description,
        project_homepage: this.props.project_homepage,
        package_name:
          this.props.npm_scope === ""
            ? this.props.component_name
            : `@${this.props.npm_scope}/${this.props.component_name}`,
        package_keywords: this.props.package_keywords.split(",").join(`","`),
        author_name: this.props.author_name,
        author_email: this.props.author_email,
        author_homepage: this.props.author_homepage,
        repository: `${this.props.github_username}/${this.props.component_name}`,
        if_local_typescript: this.props.if_local_typescript,
        if_local_polymer_cli: this.props.if_local_polymer_cli
      }
    );
    this._writingPkgJSON();
    this.fs.copy(
      this.templatePath("polymer.json"),
      this.destinationPath("polymer.json")
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        component_name: this.props.component_name,
        description: this.props.description,
        package_name:
          this.props.npm_scope === ""
            ? this.props.component_name
            : `@${this.props.npm_scope}/${this.props.component_name}`,
        package_name_encode:
          this.props.npm_scope === ""
            ? this.props.component_name
            : encodeURIComponent(
                `@${this.props.npm_scope}/${this.props.component_name}`
              ),
        repository: `${this.props.github_username}/${this.props.component_name}`,
        repository_encode: encodeURIComponent(
          `${this.props.github_username}/${this.props.component_name}`
        )
      }
    );
    this.fs.copyTpl(
      this.templatePath("thoughts-test.ts"),
      this.destinationPath(`${this.props.component_name}.ts`),
      {
        component_name: this.props.component_name,
        element_name: toHump(this.props.component_name)
      }
    );
    this.fs.copy(
      this.templatePath("travis.yml"),
      this.destinationPath(".travis.yml")
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json"),
      {
        component_name: this.props.component_name
      }
    );
    this.fs.copyTpl(
      this.templatePath("wct.conf.json"),
      this.destinationPath("wct.conf.json"),
      {
        component_name: this.props.component_name
      }
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      {
        component_name: this.props.component_name
      }
    );
    this.fs.copyTpl(
      this.templatePath("LICENSE"),
      this.destinationPath("LICENSE"),
      {
        author_name: this.props.author_name,
        author_email: this.props.author_email,
        author_homepage: this.props.author_homepage
      }
    );
  }

  _writingPkgJSON() {
    let { if_local_typescript, if_local_polymer_cli } = this.props;
    const pkgJson = {
      keywords: [],
      devDependencies: {}
    };
    pkgJson.keywords = this.props.package_keywords.split(",");
    if (if_local_typescript) {
      pkgJson.devDependencies.typescript = "^3.5.3";
    }

    if (if_local_polymer_cli) {
      pkgJson.devDependencies["polymer-cli"] = "^1.9.11";
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  install() {
    if (this.props.if_auto_npm_install) {
      this.npmInstall();
    }

    this.spawnCommandSync("npm run init");
    if (this.props.if_github_repository) {
      this.log(`\nYou already have a GitHub repository named:
        ${this.props.github_username}/${this.props.component_name}\n
        I will automatically run the first push for you.\n`);
      this.spawnCommandSync("npm run push");
    } else {
      this.log(`\nThere haven't been a GitHub repository named:
        ${this.props.github_username}/${this.props.component_name}\n
        You can use 'npm run push' to run the first push later.\n`);
    }
  }

  end() {
    this.log(yosay(`${chalk.red("Enjoy your development !")}`));
  }
};
