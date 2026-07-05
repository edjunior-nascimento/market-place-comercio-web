import { Box, Button, Card, CardContent, Container, Divider, FormControlLabel, Switch, Checkbox, TextField, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { Header } from "../../components/layouts/Header";
import { useState } from "react";

const diasSemana = [
    { label: "Dom", name: "domingo" },
    { label: "Seg", name: "segunda" },
    { label: "Ter", name: "terca" },
    { label: "Qua", name: "quarta" },
    { label: "Qui", name: "quinta" },
    { label: "Sex", name: "sexta" },
    { label: "Sab", name: "sabado" },
];

export function EmpresaPage() {
    const [aberto, setAberto] = useState(true);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [empresa, setEmpresa] = useState({
        nome: "MacDonald`s",
        endereco: "Rua Coronel João Cicero Memória",
        numero: "12345",
        telefone: "(88) 99999 9080",
    });
    const [horarios, setHorarios] = useState(
        diasSemana.reduce((acc, dia) => {
            acc[dia.name] = { aberto: dia.label === "Dom" ? false : true, inicio: "08:00", fim: "17:00" };
            return acc;
        }, {} as Record<string, { aberto: boolean; inicio: string; fim: string }>)
    );

    const handleEmpresaChange = (field: string, value: string) => {
        setEmpresa((prev) => ({ ...prev, [field]: value }));
    };

    const handleHorarioChange = (day: string, field: "inicio" | "fim" | "aberto", value: string | boolean) => {
        setHorarios((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value,
            },
        }));
    };

    return (
        <Container sx={{ pb: 4, px: { xs: 2, md: 4 } }}>
            {!isDesktop && (<Header link="/mais" showCartButton={false} />)}

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 2 }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        Status Atual
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                        {aberto ? "Aberto" : "Fechado"}
                    </Typography>
                </Box>
                <FormControlLabel
                    control={<Switch checked={aberto} onChange={(_, checked) => setAberto(checked)} color="success" />}
                    label=""
                />
            </Box>

            <Card sx={{ borderRadius: 4, mb: 3, p: 3, boxShadow: 0, backgroundColor: "#ffffffdd" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Box
                        sx={{
                            width: 96,
                            height: 96,
                            borderRadius: 2,
                            bgcolor: "#f1f3f8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <AddPhotoAlternateOutlined sx={{ fontSize: 38, color: "#9e9e9e" }} />
                    </Box>

                    <Button variant="text" sx={{ textTransform: "none" }}>
                        Alterar Imagem
                    </Button>
                </CardContent>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Nome da Empresa"
                    value={empresa.nome}
                    onChange={(e) => handleEmpresaChange("nome", e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Endereço"
                    value={empresa.endereco}
                    onChange={(e) => handleEmpresaChange("endereco", e.target.value)}
                    fullWidth
                    variant="outlined"
                />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Número"
                            value={empresa.numero}
                            onChange={(e) => handleEmpresaChange("numero", e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Telefone"
                            value={empresa.telefone}
                            onChange={(e) => handleEmpresaChange("telefone", e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ pt: 1, pb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Horário de Funcionamento
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {diasSemana.map((dia) => (
                        <Card
                            key={dia.name}
                            sx={{ backgroundColor: "#fafafa", borderRadius: 3, p: 2, boxShadow: 0 }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                                <Typography fontWeight={700}>{dia.label}</Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={horarios[dia.name].aberto}
                                            onChange={(_, checked) => handleHorarioChange(dia.name, "aberto", checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Fechado"
                                    labelPlacement="end"
                                    sx={{ mr: 0 }}
                                />
                            </Box>

                            <Divider sx={{ my: 1, borderColor: "#e0e0e0" }} />

                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={5} sm={4}>
                                    <TextField
                                        label="De"
                                        type="time"
                                        value={horarios[dia.name].inicio}
                                        onChange={(e) => handleHorarioChange(dia.name, "inicio", e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={5} sm={4}>
                                    <TextField
                                        label="Até"
                                        type="time"
                                        value={horarios[dia.name].fim}
                                        onChange={(e) => handleHorarioChange(dia.name, "fim", e.target.value)}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 2, flexWrap: "wrap" }}>
                    <Button variant="outlined" color="inherit" sx={{ minWidth: 140, textTransform: "none" }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="error" sx={{ minWidth: 140, textTransform: "none" }}>
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
