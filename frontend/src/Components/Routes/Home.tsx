import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../Api/Axios";
import styled from "styled-components";
import { IImageBankShowProps } from "../Types";
import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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
  const nameImage: string = `http://localhost:3000/images`;
  const [randomNumber, setRandomNumber] = useState<number[]>([]);

  useEffect(() => {
    Api.get("/images/allimages").then((response) => {
      setAllImages(response.data);
      getRandomNumber(response.data.length, 0, response.data.length);
    });
  }, []);

  const ImageDataSelectView = (data: IImageBankShowProps) => {
    setImageDataSelect(data);
    setOpenContainerViewDataImage(true);
  };

  const getRandomNumber = (quant: number, min: number, max: number) => {
    const uniqueNumber = new Set<number>(); //resolver o problema de 'O tipo 'unknown' não pode ser atribuído ao tipo 'number'.ts'
    while (uniqueNumber.size < quant) {
      const number = Math.floor(Math.random() * (max - min + 1) + min);
      uniqueNumber.add(number);
    }
    setRandomNumber(Array.from(uniqueNumber))
  };

  const { id } = useParams();
  return (
    <>
      {id ? (
        <p>{id}</p>
      ) : (
        <ImagesStyled>
          {allImages.map((value: IImageBankShowProps, key: number) => {
            return (
              <div
                key={key}
                onClick={() => ImageDataSelectView(value)}
                className="containerImage"
              >
                <img src={`${nameImage}/${value.image}`} alt="" />
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
            image={`${nameImage}/${imageDataSelect.image}`}
            // height={}
          />
          <Typography gutterBottom marginTop={5}>
            {imageDataSelect.description
              ? imageDataSelect.description
              : `No have description`}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Home;
