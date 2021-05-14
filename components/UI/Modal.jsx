import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from './Icon';

import Overlay from './Overlay';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.active !== this.props.active ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <StyledModal className={this.props.active && 'active'}>
          <Icon
            type="icon-close"
            className="close-modal"
            clicked={this.props.closeModal}
          />
          {this.props.children}
        </StyledModal>
        <Overlay active={this.props.active} clicked={this.props.closeModal} />
      </>
    );
  }
}

const StyledModal = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%) !important;
  border-radius: 10px;
  padding: 50px 100px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all ease 0.5s;
  transform: translateY(100vh);
  z-index: 6;

  .anticon {
    position: absolute;
    top: 10px;
    color: #fff;
    right: 10px;
    font-size: 26px;
    cursor: pointer;
  }

  &.active {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
    transition: all ease 0.5s;
  }
`;

export default Modal;
