import {
  Avatar,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { IImageBankShowProps } from "../Types";

interface IDialogProps {
  openContainerViewDataImage: boolean;
  setOpenContainerViewDataImage: (openContainerViewDataImage: boolean) => void;
  imageDataSelect: IImageBankShowProps;
  dateImage: string;
  urlImageLocalHost: string;
  setOpenDialogConfirmDelete: (openDialogConfirmDelete: boolean) => void;
  openDialogConfirmDelete: boolean;
  DeleteImage: () => void;
}

export default function DialogUtils({
  openContainerViewDataImage,
  imageDataSelect,
  dateImage,
  setOpenContainerViewDataImage,
  urlImageLocalHost,
  setOpenDialogConfirmDelete,
  openDialogConfirmDelete,
  DeleteImage
}: IDialogProps) {
  return (
    <>
      <Dialog
        onClose={() => setOpenContainerViewDataImage(false)}
        aria-labelledby="customized-dialog-title"
        open={openContainerViewDataImage}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {imageDataSelect.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenContainerViewDataImage(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <CardMedia
            component={"img"}
            image={`${urlImageLocalHost}/${imageDataSelect.image}`}
          />
          <Typography
            style={{ wordBreak: "break-word" }}
            gutterBottom
            marginTop={5}
          >
            {imageDataSelect.description
              ? imageDataSelect.description
              : `No have description`}
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BookmarkAddedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={` Created by ${
                  imageDataSelect &&
                  imageDataSelect.user &&
                  imageDataSelect.user.name_user
                }`}
                secondary={dateImage}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={() => setOpenDialogConfirmDelete(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialogConfirmDelete}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Deletar Imagem?
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialogConfirmDelete(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography
            style={{ wordBreak: "break-word" }}
            gutterBottom
            marginTop={5}
          >
            Tem certeza que deseja excluir essa imagem? Esta ação não poderá ser
            desfeita após a confirmação.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "white", background: "#011722" }}
            variant="contained"
            onClick={()=>setOpenDialogConfirmDelete(false)}
          >
            Cancelar
          </Button>
          <Button
            style={{ color: "white", background: "#011722" }}
            variant="contained"
            autoFocus
            onClick={()=>{
              DeleteImage()
              setOpenDialogConfirmDelete(false)
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
