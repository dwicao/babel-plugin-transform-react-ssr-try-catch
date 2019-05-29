const React = require('react');

class TestComponent extends React.PureComponent {
  render() {
    try {
      return this.__originalRenderMethod__();
    } catch (e) {
      return this.ERRORBOUNDARY_render(e, this.constructor.name);
    }
  }

  ERRORBOUNDARY_render() {
    return <p>text</p>;
  }

  __originalRenderMethod__() {
    return <div />;
  }
}

module.exports = TestComponent;
