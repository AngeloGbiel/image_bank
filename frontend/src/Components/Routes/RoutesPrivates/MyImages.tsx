import { useCallback, useContext, useEffect, useState } from "react";
import Api from "../../Api/Axios";
import { UserContext } from "../../Context/UserContext";
import { IImageBankShowProps } from "../../Types";
import * as Ai from "react-icons/ai"; //AiFillEdit AiFillDelete AiFillEye
import styled from "styled-components";
import DialogUtils from "../../Utils/Dialog";

const MyImagesStyled = styled.div`
  width: 100%;
  padding: 40px 20px 20px 20px;
  column-count: 4;
  .imageContainer {
    img {
      width: 100%;
      margin-bottom: -10px;
      border-radius: 10px;
      cursor: pointer;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      border-left: 1px solid #000;
      border-radius: 10px 10px 0px 0px;
    }
    .action {
      padding: 10px 0 0 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.6rem;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      border-left: 1px solid #000;
      border-radius: 0px 0px 10px 10px;
      span {
        cursor: pointer;
      }
    }
  }
`;

export default function MyImage() {
  const urlImageLocalHost: string = `http://localhost:3000/images`;
  const { token } = useContext(UserContext);
  const [imageBytokenForUser, setImageBytokenForUser] = useState<
    IImageBankShowProps[]
  >([]);
  const [openContainerViewDataImage, setOpenContainerViewDataImage] =
    useState<boolean>(false);
  const [imageDataSelect, setImageDataSelect] = useState<IImageBankShowProps>(
    {} as IImageBankShowProps
  );
  const [dateImage, setDateImage] = useState<string>("");
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

  const DeleteImage = async (id: number) => {
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
  };

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
      <MyImagesStyled>
        <div className="container">
          {imageBytokenForUser.map(
            (value: IImageBankShowProps, key: number) => {
              return (
                <div key={key} className="imageContainer">
                  <img
                    src={`${urlImageLocalHost}/${value.image}`}
                    alt={value.title}
                  />
                  <div className="action">
                    <span>
                      <Ai.AiFillEdit />
                    </span>
                    <span onClick={() => DeleteImage(value.id)}>
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
      <DialogUtils
        openContainerViewDataImage={openContainerViewDataImage}
        imageDataSelect={imageDataSelect}
        dateImage={dateImage}
        setOpenContainerViewDataImage={setOpenContainerViewDataImage}
        urlImageLocalHost={urlImageLocalHost}
      />
    </>
  );
}
