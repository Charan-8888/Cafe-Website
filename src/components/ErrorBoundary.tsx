import { Component } from 'react';
import Fallback from './Fallback';
import type { PropsWithChildren } from '../types';

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <Fallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}
