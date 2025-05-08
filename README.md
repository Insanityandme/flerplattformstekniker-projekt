<div align="center">
  <table>
    <tr>
      <td>
        <img alt="Frontend GUI" src="insert image here">
      </td>
    </tr>
  </table>
</div>

## url-shortener 
Url Shortener is a web application that helps users to shorten the length of their URLs.
Users can also customize the shortened link with their own alias, making the link more personal and easier to remember.

The application is built with Vue 3, which enables a component-based architecture. It is responsive, making it usable on mobile devices, tablets, and desktops.

The application uses LocalStorage to save previously shortened links locally in the browser. This keeps the application as simple as possible, since no account is needed to use the service.

### Technologies used

#### Frontend

| Name                                                  | Description                                        |
|-------------------------------------------------------|----------------------------------------------------|
| [Vue 3](https://vuejs.org/)                           | Frontend javascript framework for building UIs     |
| [Vite](https://vite.dev/)                             | Build tool                                         |
| [eslint](https://eslint.org/)                         | Static code analyzer                               |
| [prettier](https://prettier.io/)                      | Code formatter                                     |

#### Api

| Name                                                  | Description                                        |
|-------------------------------------------------------|----------------------------------------------------|
| [Tinyurl](https://tinyurl.com/app/dev)                | shorten long URLS into TinyURLs                    |

#### Standards 

| Name                                                  | Description                                        |
|-------------------------------------------------------|----------------------------------------------------|
| [Semantic Versioning](https://semver.org/)            | Versioning scheme for software releases            |
| [Conventional Commits](https://tinyurl.com/cchellyeah)| Naming convention for commit messages              |


## Framework comparisons 
### Vue vs React

Vue uses HTML templating to integrate JavaScript into HTML. Vue is similar to traditional web development, where CSS, HTML, and JavaScript are separated. React, on the other hand, uses JavaScript Expressions (JSX) to include HTML within JavaScript files. Both Vue and React have components with a lifecycle that allows the application to re-render only the parts that need to be updated when a component changes. According to the author, Vue does this in an easier and better way.

React is actually not a framework, even though many refer to it as such. React is a library, unlike Vue, which is a complete framework. This means that React itself does not provide everything you need to build a full application, such as routing and state management. These require external libraries to be added. Vue, on the other hand, includes all the necessary features, and no external libraries are needed unless you want to build more complex functionality.

We chose Vue as the framework instead of React, primarily because we had significantly less experience with Vue and wanted to learn a new framework, but also because it is easier to use when building a smaller application.

Source: https://hackr.io/blog/react-vs-vue

### Vue vs Angular


## Project Setup

### Prerequisites
* [Git](https://git-scm.com) version >= 2.13
* [Node.js](https://nodejs.org) version >= 22

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).


