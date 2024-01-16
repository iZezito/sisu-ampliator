import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRootStore} from './stores/RootStore.tsx';
import GenericTable from "./components/GenericTable/GenericTable.tsx";
import './App.css';
import {Col, Row} from "antd";
import Navbar from "./components/NavBar/NavBar.tsx";

const App: React.FC = observer(() => {
    const {sisuStore} = useRootStore();

    useEffect(() => {
        const fetchData = async () => {
            await sisuStore.getModalidades();
        };
        fetchData();
    }, [sisuStore]); // Adicionei sisuStore como dependência para evitar warnings

    return (
        <Row justify="center" align="middle" style={{height: "100vh"}}>
            {/*<Col span={24}>*/}
            {/*    <Navbar/> */}
            {/*</Col>*/}
            <Col span={24}>
                <GenericTable
                    title="Modalidades"
                    data={sisuStore.modalidades}
                    loading={sisuStore.loading}
                />
            </Col>
        </Row>
    );
});

export default App;