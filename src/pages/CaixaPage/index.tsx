import {
    Container,
    Box,
    Tabs,
    Tab,
} from "@mui/material";
import { MovimentosPage } from "../MovimentosPage";
import { useState } from "react";
import { ConferenciaPage } from "../ConferenciaPage";


export function CaixaPage() {

    const [tab, setTab] = useState(0);

    const tabsContent = [
        <MovimentosPage key="movimento-diario" />,
        <ConferenciaPage key="conferencia-fechamento" />,
    ];

    return (
        <Container sx={{ mt: 2, p: 1 }}>
            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
            >
                <Tab label="Movimento Diário" />
                <Tab label="Conferência e Fechamento" />
            </Tabs>

            {tabsContent[tab]}
        </Container>
    );
}