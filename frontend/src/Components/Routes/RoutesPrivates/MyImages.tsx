import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Api from "../../Api/Axios";
import { UserContext } from "../../Context/UserContext";
import { IImageBankShowProps } from "../../Types";
import * as Ai from "react-icons/ai"; //AiFillEdit AiFillDelete AiFillEye
import styled from "styled-components";
import DialogMyImage from '../../Utils/DialogMyImage'
import DialogFullScreen from "../../Utils/DialogFullScreen";

const MyImagesStyled = styled.div`
  max-width: 80%;
  margin: auto;
  .imageContainer:nth-child(1) {
    margin-top: 2rem;
  }
  .imageContainer {
    height: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-top: 0.3px solid black;
    .image {
      max-width: 70%;
      display: flex;
      gap: 5%;
      align-items: center;
      height: 95%;
      word-break: break-word;
      overflow: hidden;
      img {
        width: 30%;
      }
    }
    .action {
      display: flex;
      gap: 1rem;
      span {
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
`;

export default function MyImage() {

  const IdDeleteRef = useRef<number>()
  const [openDialogConfirmDelete,setOpenDialogConfirmDelete] = useState<boolean>(false)
  const urlImageLocalHost: string = `https://imagebank-images-upload-s3.s3.amazonaws.com`;
  //para buscar a imagem

  const [editImage, setEditImage] = useState<boolean>(false);
  const [editImageData, setEditIMageData] = useState<IImageBankShowProps>(
    {} as IImageBankShowProps
  );
  const [dateImage, setDateImage] = useState<string>("");
  const [imageBytokenForUser, setImageBytokenForUser] = useState<
    IImageBankShowProps[]
  >([]);
  const [openContainerViewDataImage, setOpenContainerViewDataImage] =
    useState<boolean>(false);
  const [imageDataSelect, setImageDataSelect] = useState<IImageBankShowProps>(
    {} as IImageBankShowProps
  );
  //Os states da aplicação

  const { token } = useContext(UserContext);
  //pegando o token no Contexto

  const fetchImages = useCallback(async () => {
    await Api.get("/images/imageuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setImageBytokenForUser(response.data);
    });
  }, [token, setImageBytokenForUser]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);
  //Usando o useCallback junto com o useEffect

  const DeleteImage = async () => {
    const id = IdDeleteRef.current
    if(id){
      await Api.delete(`/images/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          fetchImages();
        })
        .catch((err) => {
          throw err;
        });
    }
  };
  //Função de deletar a imagem

  const ImageDataSelectView = (data: IImageBankShowProps) => {
    setImageDataSelect(data);
    ImageDateCreated(data.createdAt);
    setOpenContainerViewDataImage(true);
  };
  const ImageDateCreated = (data: string) => {
    const date = new Date(data);
    setDateImage(date.toLocaleDateString());
  };
  //Função de mostrar o Dialog para exibir a imagem

  const DialogEditImage = (data: IImageBankShowProps) => {
    setEditIMageData(data);
    setEditImage(true);
  };

  return (
    <>
      <MyImagesStyled>
        <div className="container">
          {imageBytokenForUser.map(
            (value: IImageBankShowProps, key: number) => {
              return (
                <div key={key} className="imageContainer">
                  <div className="image">
                    <img
                      src={`${urlImageLocalHost}/${value.image}`}
                      alt={value.title}
                    />
                    <div className="infor">
                      <h2>{value.title}</h2>
                      <p> {value.description}</p>
                    </div>
                  </div>
                  <div className="action">
                    <span onClick={() => DialogEditImage(value)}>
                      <Ai.AiFillEdit />
                    </span>
                    <span onClick={() => {
                      IdDeleteRef.current = value.id
                      setOpenDialogConfirmDelete(true)
                    }}>
                      <Ai.AiFillDelete />
                    </span>
                    <span onClick={() => ImageDataSelectView(value)}>
                      <Ai.AiFillEye />
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </MyImagesStyled>
      <DialogMyImage
        openContainerViewDataImage={openContainerViewDataImage}
        imageDataSelect={imageDataSelect}
        dateImage={dateImage}
        setOpenContainerViewDataImage={setOpenContainerViewDataImage}
        urlImageLocalHost={urlImageLocalHost}
        setOpenDialogConfirmDelete={setOpenDialogConfirmDelete}
        openDialogConfirmDelete={openDialogConfirmDelete}
        DeleteImage={DeleteImage}
      />
      <DialogFullScreen
        editImage={editImage}
        setEditImage={setEditImage}
        editImageData={editImageData}
      />
    </>
  );
}
