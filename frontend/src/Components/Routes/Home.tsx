import { useCallback, useContext, useEffect, useState } from "react";
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
  Pagination,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../Context/UserContext";

const ImagesStyled = styled.div`
  width: 100%;
  padding: 40px 20px 20px 20px;
  column-count: 3;
  img {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Home = () => {
  const { search } = useContext(UserContext);
  const [allImages, setAllImages] = useState<IImageBankShowProps[]>([]);
  const [page, setPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openContainerViewDataImage, setOpenContainerViewDataImage] =
    useState<boolean>(false);
  const [dateImage, setDateImage] = useState<string>("");

  const [imageDataSelect, setImageDataSelect] = useState<IImageBankShowProps>(
    {} as IImageBankShowProps
  );
  const urlImageLocalHost: string = `http://localhost:3000/images`;

  const fetchImages = useCallback(async () => {
    const startIndex = currentPage == 1 ? 0 : (currentPage - 1) * (15 - 1);
    const endIndex = currentPage * (15 - 1);
    const randomNumberArray:number[] = getRandomNumber(15, startIndex, endIndex);
    await Api.get('/images/allimages').then((response)=>{
      setPage(Math.ceil(response.data.length / 15));
    })
    await Api.get("/images/getimagesbypage", { params: { ids: randomNumberArray } })
      .then((response) => {
        setAllImages(response.data);
      })
      .catch((err) => {
        throw err
      });
  }, [currentPage]);

  useEffect(() => {
    fetchImages(); //ela não será recriada a cada renderização do componente.
  }, [fetchImages]);

  const ImageDataSelectView = (data: IImageBankShowProps) => {
    setImageDataSelect(data);
    ImageDateCreated(data.createdAt);
    setOpenContainerViewDataImage(true);
  };

  const getRandomNumber = (quant: number, min: number, max: number) => {
    const uniqueNumber = new Set<number>();
    while (uniqueNumber.size < quant) {
      const number = Math.floor(Math.random() * (max - min + 1) + min);
      uniqueNumber.add(number);
    }
    return Array.from(uniqueNumber);
  };

  const ImageDateCreated = (data: string) => {
    const date = new Date(data);
    setDateImage(date.toLocaleDateString());
  };

  return (
    <>
      {search ? (
        <ImagesStyled>
          {allImages
            .filter((value: IImageBankShowProps) => {
              const TitleNormalized = value.title.toLowerCase();
              const DescriptionNormalized = value!.description!.toLowerCase();
              return (
                TitleNormalized.includes(search) ||
                DescriptionNormalized.includes(search)
              );
            })
            .map((value: IImageBankShowProps, key: number) => {
              return (
                <>
                  <div
                    key={key}
                    onClick={() => ImageDataSelectView(value)}
                    className="containerImage"
                  >
                    <img src={`${urlImageLocalHost}/${value.image}`} alt="" />
                  </div>
                </>
              );
            })}
        </ImagesStyled>
      ) : (
        <>
          <ImagesStyled>
            {allImages.map((value: IImageBankShowProps, key: number) => {
              return (
                <div
                  key={key}
                  onClick={() => ImageDataSelectView(value)}
                  className="containerImage"
                >
                  <img src={`${urlImageLocalHost}/${value.image}`} alt="" />
                </div>
              );
            })}
          </ImagesStyled>
          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0 10px 0",
            }}
            count={page}
            onChange={(e, newPage) => {
              setCurrentPage(newPage);
              e;
            }}
          />
        </>
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
