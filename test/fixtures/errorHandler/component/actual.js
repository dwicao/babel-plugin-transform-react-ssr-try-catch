const { Component } = require('react');

class TestComponent extends Component {
    ERRORBOUNDARY_render() {
        return <p>text</p>;
    }

    render() {
        return <div />;
    }
}

module.exports = TestComponent;
