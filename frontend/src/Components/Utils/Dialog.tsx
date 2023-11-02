import {
  Avatar,
  CardMedia,
  Dialog,
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
  urlImageLocalHost: string
}

export default function DialogUtils({
  openContainerViewDataImage,
  imageDataSelect,
  dateImage,
  setOpenContainerViewDataImage,
  urlImageLocalHost
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
          <Typography style={{wordBreak: 'break-word'}} gutterBottom marginTop={5}>
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
    </>
  );
}
