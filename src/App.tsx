import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRootStore} from './stores/RootStore.tsx';
import GenericTable from "./components/GenericTable/GenericTable.tsx";
import './App.css';
import {Card, Col, Flex, Image, Row, Typography} from "antd";
import CardOferta from "./components/CardOferta/CardOferta.tsx";
import {OfertaCurso} from "./stores/sisu";

const App: React.FC = observer(() => {
    const {sisuStore} = useRootStore();

    useEffect(() => {
        const fetchData = async () => {
            await sisuStore.getCategorias();
        };
        fetchData();
    }, [sisuStore]); // Adicionei sisuStore como dependência para evitar warnings

    return (
        <React.Fragment>
            <Row justify="center" style={{backgroundColor: '#029D8F'}}>
                    <Image width={200} src="https://logodownload.org/wp-content/uploads/2016/11/sisu-logo.png" preview={false}/>
            </Row>
            <Row justify="center">
                    <Typography.Title level={2} style={{color:'#029D8F'}}>
                        MINHAS ESCOLHAS
                    </Typography.Title>
            </Row>
            <Row justify="center">
                <Flex gap="middle" wrap="wrap" justify="center">
                    {/*{sisuStore.ofertas.map((oferta: OfertaCurso) => (*/}
                    {/*    <CardOferta oferta={oferta}/>*/}
                    {/*))}*/}
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                    <CardOferta oferta={{} as OfertaCurso}/>
                </Flex>
            </Row>
        </React.Fragment>
    );
});

export default App;