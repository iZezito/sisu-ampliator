import React, {PropsWithChildren} from 'react';
import {Row, Typography} from "antd";

const TituloPagina: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <Row justify="center">
            <Typography.Title level={2} style={{color: '#029D8F', marginTop: 10}}>
                {children}
            </Typography.Title>
        </Row>
    )
};

export default TituloPagina;