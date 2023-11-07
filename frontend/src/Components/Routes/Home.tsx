import { useCallback, useContext, useEffect, useState } from "react";
import Api from "../Api/Axios";
import styled from "styled-components";
import { IImageBankShowProps } from "../Types";
import { Pagination } from "@mui/material";
import { UserContext } from "../Context/UserContext";
import DialogShowImage from "../Utils/DialogShowImage";

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
  const urlImageLocalHost: string = `https://imagebank-images-upload-s3.s3.amazonaws.com`;

  const fetchImages = useCallback(async () => {
    await Api.get("/images/allimages").then((response) => {
      setPage(Math.ceil(response.data.length / 15));
      const idsExtraidos = response.data.map((item:IImageBankShowProps) => item.id);
      const startIndex = currentPage == 1 ? 0 : (currentPage - 1) * (15 - 1);
      const endIndex = currentPage * (15 - 1);
      const IdImageByCurrentPageView = idsExtraidos.slice(startIndex, endIndex);
      const arrayWithRandomPosition = shuffleArray(IdImageByCurrentPageView) //vai exibir as imagens em posições aleatórias
      Api.get("/images/getimagesbypage", {
        params: { ids: arrayWithRandomPosition },
      })
        .then((response) => {
          setAllImages(response.data);
        })
        .catch((err) => {
          throw err;
        });
    });
  }, [currentPage]);

  function shuffleArray(array:number[]) {
    // Loop em todos os elementos
    for (let i = array.length - 1; i > 0; i--) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [array[i], array[j]] = [array[j], array[i]];
    }
    // Retornando array com aleatoriedade
    return array
  }

  useEffect(() => {
    fetchImages(); //ela não será recriada a cada renderização do componente.
  }, [fetchImages]);

  const ImageDataSelectView = (data: IImageBankShowProps) => {
    setImageDataSelect(data);
    ImageDateCreated(data.createdAt);
    setOpenContainerViewDataImage(true);
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
      <DialogShowImage
        openContainerViewDataImage={openContainerViewDataImage}
        imageDataSelect={imageDataSelect}
        dateImage={dateImage}
        setOpenContainerViewDataImage={setOpenContainerViewDataImage}
        urlImageLocalHost={urlImageLocalHost}
      />
    </>
  );
};
export default Home;
