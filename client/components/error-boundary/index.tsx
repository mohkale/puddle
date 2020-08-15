import React from 'react';
import '@cstyles/error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  error?: string
}

export class ErrorBoundary
extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error.stack || error.toString() })
  }

  render() {
    if (this.state.error !== undefined) {
      return (
        <div className="error-boundary">
          <h1>Error</h1>

          <p>Puddle ran into an issue while rendering the dashboard.</p>

          <p>
            Please open an issue
            at <a href="https://github.com/mohkale/puddle/issues/new">github</a> describing
            this problem and please include the following backtrace:
          </p>

          <div className="stacktrace">
            <textarea cols={80} rows={12} value={this.state.error}></textarea>
          </div>
        </div>
      )
    }

    return this.props.children;
  }
}
