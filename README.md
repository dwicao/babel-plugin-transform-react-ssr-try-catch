# dwicao-babel-plugin-transform-react-ssr-try-catch

Babel plugin to wrap render() method in React.Component with try-catch statement.

## Motivation

React 16 has [error handling](https://reactjs.org/blog/2017/09/26/react-v16.0.html#better-error-handling) but for [client rendering only](https://github.com/facebook/react/issues/10442).

This plugin performs simple transform which wraps `render()` method with try-catch.
Just make sure to put `ERRORBOUNDARY_render()` method in your Class-based components.
Example:

```js
// MyComponent.js
class MyComponent extends React.PureComponent {
  ERRORBOUNDARY_render() {
    return <p>An error happened. Please try again later!</p>;
  }

  render() {
    return <div />;
  }
}
```

This component will be transformed to:

```js
// MyComponent.js
class MyComponent extends React.PureComponent {
  render() {
    try {
      return this.__originalRenderMethod__();
    } catch (e) {
      return this.ERRORBOUNDARY_render(e, this.constructor.name);
    }
  }

  ERRORBOUNDARY_render() {
    return <p>An error happened. Please try again later!</p>;
  }

  __originalRenderMethod__() {
    return <div />;
  }
}
```

Actually, this is a temporary solution until React has support error handling in SSR.

## Installation

```sh
npm install --save-dev dwicao-babel-plugin-transform-react-ssr-try-catch
```

## Usage

**.babelrc**

```json
{
  "plugins": [
    ["react-ssr-try-catch"]
  ]
}
```
