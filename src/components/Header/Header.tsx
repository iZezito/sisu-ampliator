import {Image, Row} from 'antd';
import React from 'react';

const Cabecalho: React.FC = () => {
    return (

        <Row justify="center" style={{backgroundColor: '#029D8F'}}>
            <Image width={200} src="https://logodownload.org/wp-content/uploads/2016/11/sisu-logo.png"
                   preview={false}/>
        </Row>
    );
}
export default Cabecalho;
