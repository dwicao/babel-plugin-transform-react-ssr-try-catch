const React = require('react');

class TestComponent extends React.Component {
  ERRORBOUNDARY_render() {
    return <p>text</p>;
  }

  render() {
    return <div />;
  }
}

module.exports = TestComponent;
