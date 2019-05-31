const {
  PureComponent
} = require('react');

class TestComponent extends PureComponent {
  render() {
    try {
      return this.__originalRenderMethod__();
    } catch (e) {
      return this.ERRORBOUNDARY_render(e, this.constructor.name);
    }
  }

  __originalRenderMethod__() {
    return <div />;
  }

  ERRORBOUNDARY_render() {
    return <span>oops!</span>;
  }

}

module.exports = TestComponent;
