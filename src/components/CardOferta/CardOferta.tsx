import {Card, Col, Flex, Row} from "antd";
import React from "react";
import {CardProps} from "./index";
import { Typography } from "antd";
const { Text } = Typography;

const CardOferta: React.FC<CardProps> = ({oferta}) => {
    return (
        <Card title={'Teste'} style={{width: '28%', minWidth: 300}}>
            <Flex vertical={false} gap="middle" align="center" justify={'space-between'}>
                <Col>
                    <Text strong={true}>Grau</Text>
                    <p>Teste</p>
                </Col>
                <Col>
                    <Text strong={true}>Turno</Text>
                    <p>Teste</p>
                </Col>
                <Col>
                    <Text strong={true}>Código</Text>
                    <p>Teste</p>
                </Col>
                <Col>
                    <Text strong={true}>Ingresso</Text>
                    <p>Teste</p>
                </Col>
            </Flex>
            <Flex vertical={true}>
                <Text strong={true}>Nome</Text>
                <p>Teste</p>
            </Flex>
        </Card>
    );
}

export default CardOferta;