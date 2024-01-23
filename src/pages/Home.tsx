import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../stores/RootStore.tsx";
import {Empty, Flex, FloatButton,Row, Spin} from "antd";
import {DadosModalidade} from "../stores/sisu";
import CardOferta from "../components/CardOferta/CardOferta.tsx";
import {AiOutlinePlus, AiFillSetting, AiOutlineLogout} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TituloPagina from "../components/TituloPagina.tsx";

const Home: React.FC = observer(() => {
    const navigate = useNavigate();
    const {sisuStore, userStore, authStore } = useRootStore();

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                sisuStore.getMyOfertas(),
                userStore.getMyNotas(),
            ]);
        };
        fetchData();
    }, [sisuStore, userStore]);

    const navToAdd = () => {
        navigate('/addOferta');
    }

    const handleLogout = () => {
        authStore.logout();
        navigate('/login');
    }

    return (
        <React.Fragment>
            <TituloPagina>MINHAS ESCOLHAS</TituloPagina>
            <Row justify="center">
                <Flex gap="middle" wrap="wrap" justify="center" style={{height: '100%'}}>
                    {sisuStore.loading ? (
                        <Spin size="large"/>
                    ) : sisuStore.minhasOfertas.length === 0 ? (
                        <Empty description={'Nenhuma oferta foi escolhida!'}/>
                    ) : (
                        sisuStore.minhasOfertas.map((dados: DadosModalidade) => (
                            <CardOferta oferta={dados} loading={false} key={dados?.oferta.co_oferta} onButtonClick={() => sisuStore.removeOfertaPreferencia(dados?.oferta.co_oferta)}/>
                        ))
                    )}
                </Flex>
            </Row>
            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{ right: 40 }}
                icon={<AiFillSetting />}
            >
                <FloatButton icon={<AiOutlineLogout />} onClick={handleLogout} tooltip={'Sair'}/>
                <FloatButton icon={<AiOutlinePlus/>} tooltip={'Adiconar nova oferta'} onClick={navToAdd}/>
            </FloatButton.Group>
            {/*<FloatButton icon={} type={'primary'} style={{height: '7%', width: '3.5%'}}*/}
            {/*             tooltip={'Adiconar nova oferta'}*/}
            {/*             onClick={navToAdd}*/}
            {/*/>*/}
        </React.Fragment>
    );
});

export default Home;