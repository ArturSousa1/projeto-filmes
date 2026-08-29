import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Filmes from "./pages/Filmes";
import Navegaçao from "./componentes/Header";
import Favoritos from "./pages/Favoritos";
import Erro from "./pages/Erro";

function Rotas() { // ferramenteas que controlam as rotas do site.
    return (
        <BrowserRouter>
            <Navegaçao />
            <Routes>
                <Route path="/" element={<Home />}>Início</Route>
                <Route path="/filme/:id" element={<Filmes />} >Filmes</Route>
                <Route path="/favoritos" element={<Favoritos />} >Favoritos</Route>
                <Route path="*" element={<Erro />} >Erro</Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;