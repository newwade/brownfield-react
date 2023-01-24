import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center ">
          <h4 className="text-danger">Oops, Someting went wrong!</h4>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="btn btn-outline-danger"
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
