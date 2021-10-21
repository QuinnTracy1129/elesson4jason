import React, { Component } from 'react';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import LayoutContent from '../../../../components/utility/layoutContent';

export default class extends Component {
    render() {
        return (
            <LayoutContentWrapper >
                <LayoutContent>
                    <h1>Head Page</h1>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
