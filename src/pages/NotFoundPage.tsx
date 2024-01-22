import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    }

    return(
    <Result
        status="404"
        title="404"
        subTitle=" A página que você está procurando não existe ou foi movida."
        extra={<Button type="primary" onClick={handleGoHome}>Ir para o início</Button>}
    />
    );
}


export default NotFoundPage;