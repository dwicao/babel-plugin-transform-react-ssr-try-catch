'use strict';

const babylon = require('babylon');

const errorHandlerName = 'ERRORBOUNDARY_render';
const originalRenderMethodName = '__originalRenderMethod__';

const tryCatchRender = `try{return this.__originalRenderMethod__();}catch(e){return this.${errorHandlerName}(e, this.constructor.name)}`;
const tryCatchRenderAST = babylon.parse(tryCatchRender, {
  allowReturnOutsideFunction: true,
}).program.body[0];

const createReactChecker = t => node => {
  const superClass = node.superClass;
  return (
    t.isIdentifier(superClass, {name: 'Component'}) ||
    t.isIdentifier(superClass, {name: 'PureComponent'}) ||
    (t.isMemberExpression(superClass) &&
      (t.isIdentifier(superClass.object, {name: 'React'}) &&
        (t.isIdentifier(superClass.property, {name: 'Component'}) ||
          t.isIdentifier(superClass.property, {name: 'PureComponent'}))))
  );
};

module.exports = _ref => {
  const t = _ref.types;

  const isReactClass = createReactChecker(t);

  const bodyVisitor = {
    ClassMethod: function(path) {
      // finds render() method definition
      if (path.node.key.name === 'render') {
        this.renderMethod = path;
      }

      if (path.node.key.name === errorHandlerName) {
        this.hasErrorHandler = true;
      }
    },
  };

  return {
    visitor: {
      Class(path, pass) {
        if (!isReactClass(path.node)) {
          return;
        }

        const state = {
          renderMethod: null,
        };

        path.traverse(bodyVisitor, state);

        if (!state.renderMethod || !state.hasErrorHandler) {
          return;
        }

        // rename original render() method
        state.renderMethod.node.key.name = originalRenderMethodName;

        // generate new render() method
        path
          .get('body')
          .unshiftContainer(
            'body',
            t.classMethod(
              'method',
              t.identifier('render'),
              [],
              t.blockStatement([tryCatchRenderAST])
            )
          );
      },
    },
  };
};
