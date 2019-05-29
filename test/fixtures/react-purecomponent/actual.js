const React = require('react');

class TestComponent extends React.PureComponent {
  ERRORBOUNDARY_render() {
    return <p>text</p>;
  }

  render() {
    return <div />;
  }
}

module.exports = TestComponent;
