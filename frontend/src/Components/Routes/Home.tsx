import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../Api/Axios";
import styled from "styled-components";
import { IImageBankShowProps } from "../Types";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
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

const ImagesStyled = styled.div`
  width: 100%;
  padding: 40px;
  column-count: 4;
  img {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Home = () => {
  const [allImages, setAllImages] = useState<IImageBankShowProps[]>([]);
  const [openContainerViewDataImage, setOpenContainerViewDataImage] =
    useState<boolean>(false);
  const [imageDataSelect, setImageDataSelect] = useState<IImageBankShowProps>(
    {} as IImageBankShowProps
  );
  const urlImageLocalHost: string = `http://localhost:3000/images`;
  const [randomNumber, setRandomNumber] = useState<number[]>([]);
  const [dateImage, setDateImage] = useState<string>('')

  useEffect(() => {
    Api.get("/images/allimages").then((response) => {
      setAllImages(response.data);
      getRandomNumber(response.data.length, 0, response.data.length - 1);
    });
  }, []);

  const ImageDataSelectView = (data: IImageBankShowProps) => {
    setImageDataSelect(data);
    ImageDateCreated(data.createdAt)
    setOpenContainerViewDataImage(true);
  };

  const getRandomNumber = (quant: number, min: number, max: number) => {
    const uniqueNumber = new Set<number>(); //resolver o problema de 'O tipo 'unknown' não pode ser atribuído ao tipo 'number'.ts'
    while (uniqueNumber.size < quant) {
      if (uniqueNumber.size < 15) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        uniqueNumber.add(number);
      } else {
        break;
      }
    }
    setRandomNumber(Array.from(uniqueNumber));
  };
  const ImageDateCreated = (data:string) =>{
    const date = new Date(data);
    setDateImage(date.toLocaleDateString())
  }

  const { id } = useParams();
  return (
    <>
      {id ? (
        <p>{id}</p>
      ) : (
        <ImagesStyled>
          {randomNumber.map((value: number, key: number) => {
            return (
              <div
                key={key}
                onClick={() => ImageDataSelectView(allImages[value])}
                className="containerImage"
              >
                <img
                  src={`${urlImageLocalHost}/${allImages[value].image}`}
                  alt=""
                />
              </div>
            );
          })}
        </ImagesStyled>
      )}

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
          <Typography gutterBottom marginTop={5}>
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
};
export default Home;
