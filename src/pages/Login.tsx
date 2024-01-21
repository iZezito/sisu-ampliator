import React from 'react';
import {observer} from 'mobx-react-lite';
import TituloPagina from "../components/TituloPagina.tsx";
import {Button, Flex, Form, Input} from "antd";
import {useRootStore} from "../stores/RootStore.tsx";
import { useNavigate } from "react-router-dom";

const Login: React.FC = observer(() => {
    const { authStore } = useRootStore();
    const navigate = useNavigate();

    const onFinish = async () => {
        await authStore.logar(navigate);
    };

    return (
        <>
            <TituloPagina>LOGIN</TituloPagina>
            <Flex justify="center" >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'por favor, insira seu username!'}]}
                >
                    <Input onChange={(e) => authStore.changeLogin('username', e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'por favor, insira sua senha!' }]}
                >
                    <Input.Password onChange={(e) => authStore.changeLogin('password', e.target.value)}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
            </Flex>
        </>
    );
});

export default Login;