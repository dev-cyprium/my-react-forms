import React from 'react'

import './style.css';

const ModalContext = React.createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {}
});

export const ModalConsumer = ModalContext.Consumer;

export class ModalProvider extends React.Component {
  showModal = (component) => {
    this.setState({
      component
    })
  }

  hideModal = () => {
    this.setState({
      component: null,
    })
  }

  state = {
    component: null,
    showModal: this.showModal,
    hideModal: this.hideModal
  }
  
  render() {
    return (
      <ModalContext.Provider value={this.state}>
        <ModalRoot />
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

const ModalRoot = () => (
  <ModalContext.Consumer>
    {({component: Component, hideModal}) => 
      Component ? <Component onRequestClose={hideModal} /> : null
    }
  </ModalContext.Consumer>
)

class Modal extends React.Component {
  state = {
    open: true
  }
  
  componentDidUpdate() {
    if (!this.state.open) {
      if (this.props.onRequestClose) {
        this.props.onRequestClose();
      }
    }
  }

  hideModal = () => {
    this.setState({open: false})
  }

  render() {
    return (
      <div className={`modal ${this.state.open ? '':'modal--is-closed'}`}>
        <div className='modal--title'>
          {this.props.title}
          <button type='button' className='modal--close' onClick={this.hideModal}>
            x
          </button>
        </div>
        <div className='modal--content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export class ErrorModal extends React.Component {
  render() {
    return (
      <Modal {...this.props} title="Please check the error below">
        <p className="is-error">
          Something bad has happend
        </p>
      </Modal>
    )
  }
}

export class MessageModal extends React.Component {
  render() {
    return (
      <Modal {...this.props} title="Something happaned">
        <p className="is-primary">
          I'm alerting something to user
        </p>
      </Modal>
    )
  }
}