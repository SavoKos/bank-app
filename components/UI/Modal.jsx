import React, { Component } from 'react';
import styled from 'styled-components';

import Overlay from './Overlay';
import { createFromIconfontCN } from '@ant-design/icons';
const Icon = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2539603_1qmncth3xnb.js', // icon-shoppingcart, icon-python
  ],
});

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
            onClick={this.props.closeModal}
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
  transform: translate(-35%, -50%) !important;
  border-radius: 10px;
  padding: 50px 100px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all ease 0.5s;
  transform: translateY(100vh);
  z-index: 6;

  &.active {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
    transition: all ease 0.5s;
  }

  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 26px;
    cursor: pointer;
  }
`;

export default Modal;
