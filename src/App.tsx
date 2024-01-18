import React from 'react';
import {observer} from 'mobx-react-lite';
import './App.css';
import Cabecalho from "./components/Header/Header.tsx";
import Home from "./pages/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OfertaSearch from "./pages/OfertaSearch.tsx";

const App: React.FC = observer(() => {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Cabecalho/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={"/addOferta"} element={<OfertaSearch/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
});

export default App;