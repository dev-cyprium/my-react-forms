import React from 'react';

const RouterProvider = React.createContext({
  path: '/'
});

export class Link extends React.Component {
  static contextType = RouterProvider

  onLinkActivate = (ev) => {
    ev.preventDefault();
    if (window.history) {
      window.history.pushState(null, null, this.props.to)
    }
    this.context.setPath(this.props.to);
  }
  
  render() {
    return (
      <a href={this.props.to} onClick={this.onLinkActivate}>
        {this.props.children}
      </a>
    ) 
  }
}

export const Route = ({component: Component, path: userPath}) => (
  <RouterProvider.Consumer>
    {({path: navigatedPath}) => (
      userPath === navigatedPath ? 
        <Component /> : null
    )}
  </RouterProvider.Consumer>
);


export class Router extends React.Component {
  setPath = (newPath) => {
    this.setState(state => ({
      history: [...state.history, state.path],
      path: newPath
    }))
  }

  state = {
    path: '/',
    history: [],
    setPath: this.setPath
  }

  onPopState = () => {
    if (this.state.history.length === 0) {
      return;
    }

    const index = this.state.history.length - 1
    const navigateTo = this.state.history[index];
    
    this.setState(state => ({
      history: state.history.splice(0, index),
      path: navigateTo
    }))
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPopState)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState)
  }

  render() {
    return (
    <RouterProvider.Provider value={this.state}>
      {this.props.children}
    </RouterProvider.Provider>);
  }
}