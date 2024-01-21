import React from 'react';
import {observer} from 'mobx-react-lite';
import './App.css';
import Cabecalho from "./components/Header/Header.tsx";
import Home from "./pages/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OfertaSearch from "./pages/OfertaSearch.tsx";
import CadastroUsuario from "./pages/CadastroUsuario.tsx";
import {useRootStore} from "./stores/RootStore.tsx";
import Login from "./pages/Login.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const App: React.FC = observer(() => {
    const { authStore } = useRootStore();

    return (
        <React.Fragment>
            <BrowserRouter>
                <Cabecalho/>
                <Routes>
                    {authStore.isAuth && <Route path="/" element={<Home/>}/> }
                    {!authStore.isAuth && <Route path="*" element={<Login/>}/>}
                    {authStore.isAuth && <Route path="/addOferta" element={<OfertaSearch/>}/>}
                    {!authStore.isAuth && <Route path="/addUsuario" element={<CadastroUsuario/>}/>}
                    {authStore.isAuth && <Route path="*" element={<NotFoundPage/>}/>}
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
});

export default App;