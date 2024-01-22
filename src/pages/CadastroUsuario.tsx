import React from 'react';
import { observer } from 'mobx-react-lite';
import TituloPagina from "../components/TituloPagina.tsx";
import {Button, Flex, Form, Input} from "antd";
import {useRootStore} from "../stores/RootStore.tsx";

const CadastroUsuario: React.FC = observer(() => {

    const { userStore } = useRootStore();



    return (
        <>
        <TituloPagina>CADASTRO DE USUÁRIO</TituloPagina>
            <Flex justify="center" >
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    onFinish={userStore.onSubmit}
                    layout="vertical"  // Alteração para layout vertical
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Nome de Usuário"
                        name="username"
                        rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
                    >
                        <Input onChange={(e) => {
                            userStore.changeFormData('username', e.target.value );
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
                    >
                        <Input type="email" onChange={(e) => {
                            userStore.changeFormData('email', e.target.value );
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!', min: 6 }]}
                    >
                        <Input.Password onChange={(e) => {
                            userStore.changeFormData('password', e.target.value );
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Ciências da Natureza"
                        name="cienciasNatureza"
                        rules={[{ required: true, message: 'Por favor, insira sua pontuação em Ciências da Natureza!' }]}
                    >
                        <Input type="number" onChange={(e) => {
                            userStore.changeFormData('cienciasNatureza', +e.target.value);
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Ciências Humanas"
                        name="cienciasHumanas"
                        rules={[{ required: true, message: 'Por favor, insira sua pontuação em Ciências Humanas!' }]}
                    >
                        <Input type="number" onChange={(e) => {
                            userStore.changeFormData('cienciasHumanas', +e.target.value);
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Linguagens"
                        name="linguagens"
                        rules={[{ required: true, message: 'Por favor, insira sua pontuação em Linguagens!' }]}
                    >
                        <Input type="number" onChange={(e) => {
                            userStore.changeFormData('linguagens', +e.target.value);
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Matemática"
                        name="matematica"
                        rules={[{ required: true, message: 'Por favor, insira sua pontuação em Matemática!' }]}
                    >
                        <Input type="number" onChange={(e) => {
                            userStore.changeFormData('matematica', +e.target.value);
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Redação"
                        name="redacao"
                        rules={[{ required: true, message: 'Por favor, insira sua pontuação em Redação!' }]}
                    >
                        <Input type="number" onChange={(e) => {
                            userStore.changeFormData('redacao', +e.target.value);
                        }}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Enviar
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    );
});

export default CadastroUsuario;