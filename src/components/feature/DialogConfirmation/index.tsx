import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


type DialogProps = {
    titulo: string;
    descricao: string;
    open: boolean;
    onConfirmar: () => void;
    onCancelar: () => void;
}

export function DialogConfirmation({ titulo, descricao, open, onConfirmar, onCancelar }: DialogProps) {

    return (
            <Dialog
                open={open}
                onClose={onCancelar}
                aria-labelledby="draggable-dialog-title"
                >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {titulo}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color:'#000'}}>
                    {descricao}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onCancelar}>
                    Cancelar
                    </Button>
                    <Button onClick={onConfirmar}>Confirmar</Button>
                </DialogActions>
                </Dialog>
    );
}