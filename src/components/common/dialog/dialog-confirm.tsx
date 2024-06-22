import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  question: string;
  open: boolean;
  onClose: () => void;
  onSuccessClick: () => void;
}
const DialogConfirm: FC<Props> = ({
  open,
  onClose,
  question,
  onSuccessClick
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Подтвердите своё действие</DialogTitle>
        <DialogContent>
          <DialogContentText>{question}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} sx={{ color: "black" }}>
            Отмена
          </Button>
          <Button onClick={onSuccessClick} sx={{ color: "black" }}>
            Подтверждаю
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogConfirm;
