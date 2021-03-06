# DevExtreme with Angular

This starter project has been created by [generator-devextreme](https://github.com/oliversturm/generator-devextreme) and includes [Angular](https://angular.io/) and [DevExtreme](https://js.devexpress.com/) widgets. 

Based on options used when the generator was run, localization support has been included on the basis of [Intl](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) and the [DevExtreme-Intl](https://github.com/DevExpress/DevExtreme-Intl) library. No language files apart from those for the standard 'en' locale have been added.

The template for this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Install dependencies

```shell
npm install
```

## Executing `ng`

Note that the generated project installs the required version of `ng`. However, for a command like `ng serve`, only a globally installed version would be found. Maintenance of *generator-devextreme* tries to keep up with Angular CLI releases, but theoretically your installed global version could be incompatible with the project setup.

To use the version of `ng` that is definitely compatible with the generated project, you need to execute `node_modules/.bin/ng`. Alternatively, you can use the scripts defined in `package.json`, since these automatically use the local `ng` version. For instance, instead of `ng serve` you can run `npm start`, and `ng build` can be replaced by `npm run build`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
