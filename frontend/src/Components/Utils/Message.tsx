import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function Message() {
  const { open, messageError, handleClose } = useContext(UserContext);
  let message = "";
  if (messageError) {
    message = messageError.message;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        style={{ background: "#CB1818", color: "white"}}
        onClose={handleClose}
        severity="warning"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
