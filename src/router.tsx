import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
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
import { DadosUsuarioPage } from "./pages/DadosUsuarioPage";
import { AlterarSenhaPage } from "./pages/AlterarSenhaPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";
import { useSelector } from "react-redux";
import { UsuarioType } from "./types/usuario";


function ProtectedRoute() {
    const isAuthenticated = useSelector(

        (state: any) => !!state.autenticacao.usuarios?.token
    );

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/" replace />;
}


function PublicRoute() {
    const isAuthenticated = useSelector(

        (state: any) => !!state.autenticacao.usuarios?.token
    );

    return isAuthenticated
        ? <Navigate to="/pedidos" replace />
        : <Outlet />;
}



function RouterApp() {

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<LoginPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainComponent />}>
                        <Route path="/caixa" element={<CaixaPage />} />
                        <Route path="/mais" element={<MaisPage />} />
                        <Route path="/pedidos" element={<PedidosPage />} />
                        <Route path="/produtos" element={<ProdutosPage />} />
                        <Route path="/usuario" element={<UsuarioPage />} />
                        <Route path="/empresa" element={<EmpresaPage />} />
                        <Route path="/relatorios" element={<RelatoriosPage />} />
                    </Route>
                    <Route path="/compra/:compraId" element={<CompraPage />} />
                    <Route path="/categoria" element={<CategoriaPage />} />
                    <Route path="/dados" element={<DadosUsuarioPage />} />
                    <Route path="/alterar-senha" element={<AlterarSenhaPage />} />
                    <Route path="/produto/:produtoId?" element={<EditeProdutoPage />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default RouterApp;