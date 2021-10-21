import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'antd';
import React from 'react';
import SaleWidget from '../../../containers/Widgets/sale/sale-widget.js';
import IsoWidgetsWrapper from '../../../containers/Widgets/widgets-wrapper';
import Technowiz from '../../../image/technowiz.png';

export default function () {
    return (
        <div>
            <div>
                <h3><img alt="Technowiz" src={Technowiz} width="10%" /></h3>
                <Col md={6} sm={12} xs={24}>
                    <IsoWidgetsWrapper>
                        {/* Sale Widget */}
                        <SaleWidget price={<a href="/jms/eVoting">{<FontAwesomeIcon icon={faPoll} />} Data Tracking</a>}
                            premium={true}
                            details=""
                        />
                    </IsoWidgetsWrapper>
                </Col>
            </div>
        </div>
    );
}
