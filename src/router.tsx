import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CaixaPage } from "./pages/CaixaPage";
import { MaisPage } from "./pages/MaisPage";
import { PedidosPage } from "./pages/PedidosPage";
import { ProdutosPage } from "./pages/ProdutosPage";
import { UsuarioPage } from "./pages/UsuarioPage";
import { EmpresaPage } from "./pages/EmpresaPage";
import { LoginPage } from "./pages/LoginPage";
import { MainComponent } from "./components/layouts/MainComponent";
import { CompraPage } from "./pages/CompraPage";
import { CategoriaPage } from "./pages/CategoriaPage";
import { EditeProdutoPage } from "./pages/EditeProdutoPage";

function RouterApp() {
    
    const location = useLocation();

    return (
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<LoginPage />}/>
                    <Route element={<MainComponent />}>
                        <Route path="/caixa" element={<CaixaPage />}/>
                        <Route path="/mais" element={<MaisPage />}/>
                        <Route path="/pedidos" element={<PedidosPage />}/>
                        <Route path="/produtos" element={<ProdutosPage />}/>
                        <Route path="/usuario" element={<UsuarioPage />}/>
                        <Route path="/empresa" element={<EmpresaPage />}/>
                    </Route>
                    <Route path="/compra/:compraId" element={<CompraPage />}/>
                    <Route path="/categoria" element={<CategoriaPage />}/>
                    <Route path="/produto" element={<EditeProdutoPage />}/>
                </Routes>
            </AnimatePresence>
    )
}

export default RouterApp;