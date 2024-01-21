import {Button, Card, Col, Divider, Flex} from "antd";
import React from "react";
import {CardProps} from "./index";
import { Typography } from "antd";
const { Text } = Typography;

const CardOferta: React.FC<CardProps> = ({oferta, loading, onButtonClick}) => {
    return (
        <Card title={oferta?.oferta.no_curso} style={{width: '28%', minWidth: 350}} loading={loading}>
            <Flex vertical={false} gap="middle" align="center" justify={'space-between'}>
                <Col>
                    <Text strong={true}>Grau</Text>
                    <p>{oferta?.oferta.no_grau}</p>
                </Col>
                <Col>
                    <Text strong={true}>Turno</Text>
                    <p>{oferta?.oferta.no_turno}</p>
                </Col>
                <Col>
                    <Text strong={true}>Código</Text>
                    <p>{oferta?.oferta.co_curso}</p>
                </Col>
                <Col>
                    <Text strong={true}>Ingresso</Text>
                    <p>2 Semestre</p>
                </Col>
            </Flex>
            <Divider type={'horizontal'}/>
            <Flex vertical={true}>
                <Text strong={true}>{oferta?.oferta.no_ies}</Text>
                <Text strong={true}>{oferta?.oferta.no_campus}</Text>
            </Flex>
            <Flex vertical={true}>
                <Button type={'text'} danger onClick={() => onButtonClick(oferta?.oferta.co_oferta)}>Remover Opção</Button>
            </Flex>
        </Card>
    );
}

export default CardOferta;