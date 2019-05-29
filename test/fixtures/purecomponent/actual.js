const { PureComponent } = require('react');

class TestComponent extends PureComponent {
  ERRORBOUNDARY_render() {
    return <p>text</p>;
  }

  render() {
    return <div />;
  }
}

module.exports = TestComponent;
