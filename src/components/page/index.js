/* global process */
/**
 * Author: DrowsyFlesh
 * Create: 2019-07-01
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export function Page(props) {
    const Wrapper = styled.div.attrs({id: `${process.env.PREFIX}-page`})`
      display: flex;
      flex-direction: column;
      float: right;
      margin: 0 auto;
      width: 280px;
      min-width: 280px;
      min-height: 288px;
      background-color: #FFFFFF;
    `;
    const Header = styled.div.attrs({ id: `${process.env.PREFIX}-page-header`})`
      width: 244px;
      border-bottom: 1px solid #E5E5E5;
      padding-bottom: 11px;
      margin: 18px auto 0;
    `;
    const Content = styled.div.attrs({ id: `${process.env.PREFIX}-page-content`})`
      padding: 8px 0 0;
    `;
    const {header, content, className} = props;
    return (
        <Wrapper className={className}>
            <Header>{header}</Header>
            <Content>{content}</Content>
        </Wrapper>
    );
}

Page.propTypes = {
    header: PropTypes.any,
    content: PropTypes.any,
    className: PropTypes.any,
}
