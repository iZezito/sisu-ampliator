import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../stores/RootStore.tsx";
import {Empty, Flex, FloatButton,Row, Spin} from "antd";
import {OfertaCurso} from "../stores/sisu";
import CardOferta from "../components/CardOferta/CardOferta.tsx";
import {AiOutlinePlus} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TituloPagina from "../components/TituloPagina.tsx";

const Home: React.FC = observer(() => {
    const navigate = useNavigate();
    const {sisuStore} = useRootStore();

    useEffect(() => {
        const fetchData = async () => {
            //await sisuStore.getOfertas('4');
        };
        fetchData();
    }, [sisuStore]);

    const navToHome = () => {
        navigate('/addOferta');
    }

    return (
        <React.Fragment>
            <TituloPagina>MINHAS ESCOLHAS</TituloPagina>
            <Row justify="center">
                <Flex gap="middle" wrap="wrap" justify="center" style={{height: '100%'}}>
                    {sisuStore.loading ? (
                        <Spin size="large"/>
                    ) : sisuStore.ofertas.length === 0 ? (
                        <Empty description={'Nenhuma oferta foi escolhida!'}/>
                    ) : (
                        sisuStore.ofertas.map((oferta: OfertaCurso) => (
                            <CardOferta oferta={oferta} loading={false} key={oferta?.co_oferta} onButtonClick={sisuStore.removeOfertaPreferencia}/>
                        ))
                    )}
                </Flex>
            </Row>
            <FloatButton icon={<AiOutlinePlus/>} type={'primary'} style={{height: '7%', width: '3.5%'}}
                         tooltip={'Adiconar nova oferta'}
                         onClick={navToHome}
            />
        </React.Fragment>
    );
});

export default Home;