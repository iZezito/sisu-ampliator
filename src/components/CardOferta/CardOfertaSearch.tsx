import React from 'react';
import {Flex, Card, Col, Divider, Typography, Button} from 'antd';
import { CardSearchProps} from "./index";
const { Text } = Typography;

const CardOfertaSearch: React.FC<CardSearchProps> = ({ oferta, loading,onButtonClick }) => {
    return (
        <Card title={oferta?.no_curso} style={{ width: '50%', minWidth: 350, marginTop:20 }} loading={loading}>
            <Flex vertical={true}>
                <Text strong={true}>{oferta?.no_ies}</Text>
                <Text strong={true}>{oferta?.no_campus}</Text>
                <Text>{oferta?.no_turno} - {oferta?.no_grau}</Text>
            </Flex>
            <Divider type={'horizontal'}/>
            <Flex vertical={false} gap="middle" align="center">
                <Col>
                    <Text>Total de Vagas</Text>
                    <p style={{color:'#5ABA8E', fontWeight:'bold'}}>{oferta?.qt_vagas_sem1 !== '0' ? oferta?.qt_vagas_sem1: oferta?.qt_vagas_sem2 }</p>
                </Col>
                <Col>
                    <Text>Ações Afirmativas</Text>
                    <p style={{color:'#5ABA8E', fontWeight:'bold' }}>{oferta?.st_possui_afirmativa=== '1' ? 'Sim' : 'Não'}</p>
                </Col>
            </Flex>
            <Divider type={'horizontal'}/>
            <Flex vertical={true}>
                <Button type={'text'} style={{color:'blue'}} onClick={() => onButtonClick(oferta.co_oferta)}>Adicionar as minhas ofertas</Button>
            </Flex>
        </Card>
    );
}

export default CardOfertaSearch;