/**
 * Author: DrowsyFlesh
 * Create: 2019-06-04
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PREFIX = 'wp-icon-';

const Svg = styled.svg.attrs({
    'aria-hidden': true,
})`
  width: 20px;
  height: 20px;
`;

const IconWrapper = styled.i`
  color: #C2CFDF;
`;

export function Icon({className, svg = false, type}) {
    if (!type) { return null; }
    let icon;
    if (svg) {
        icon = <Svg className={className}>
            <use xlinkHref={`#${PREFIX}${type}`}></use>
        </Svg>;
    } else {
        icon = <IconWrapper className={[className, `wpIcon ${PREFIX}${type}`]}/>;
    }
    return type ? icon : null;
}

Icon.propTypes = {
    className: PropTypes.string,
    svg: PropTypes.bool,
    type: PropTypes.string.required,
}
