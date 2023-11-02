import { Request, Response } from "express";
import getToken from "../helpers/Get-token";
import User from "../Models/User";
import Images from "../Models/Images";
import { deleteImage } from "../helpers/deleteImage";
import { sequelize } from "../db/conn";

interface IBodyRequest {
  title: string;
  description?: string;
}

export default class ImagesControllers {
  static async addImage(req: Request, res: Response) {
    const { title, description }: IBodyRequest = req.body;
    let image: string = "";

    //validações
    if (req.file) {
      image = req.file.filename;
    } else {
      return res.status(422).json({ message: "Imagem é obrigatória" });
    }
    if (!title) {
      return res.status(422).json({ message: "O título é obrigatória" });
    }

    //pegar as informações do usuário
    const currentUserAuthenticate = await getToken(req.headers.authorization!);
    const UserDataAuthenticate = await User.findOne({
      where: { id: currentUserAuthenticate.id },
      attributes: { exclude: ["password"] },
      raw: true,
    });
    const newImageUpdate = {
      image,
      title,
      description: description || "",
      user: {
        id_user: UserDataAuthenticate!.id,
        name_user: UserDataAuthenticate!.name,
        email_user: UserDataAuthenticate!.email,
      },
      UserId: UserDataAuthenticate!.id,
    };

    //Salvar a imagem no banco de dados
    // console.log(newImageUpdate)
    await Images.create(newImageUpdate)
      .then(() => {
        return res.status(200).json({
          message: "Imagem salva com sucesso!!",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getImageByUser(req: Request, res: Response) {
    const currentUserAuthenticate = getToken(req.headers.authorization!);
    const ImageOfCurrentUserAuthenticate = await Images.findAll({
      where: { UserId: currentUserAuthenticate.id },
      raw: true,
      order: [["createdAt", "DESC"]],
    }).then((response) => {
      res.status(200).send(response);
    });
  }

  static async getAllImage(req: Request, res: Response) {
    await Images.findAll({
      raw: true,
    }).then((response) => {
      return res.status(200).send(response);
    });
  }

  static async getImageByPage(req: Request, res: Response) {
    const { ids } = req.query;
    let idsString = "";
    if (Array.isArray(ids)) {
      idsString = ids!.join(",");
    }
    if (ids) {
      await Images.findAll({
        where: {
          id: ids,
        },
        order: [sequelize.literal(`FIELD(id, ${idsString})`)],
        raw: true,
      }).then((response) => {
        return res.status(200).send(response);
      });
    }
  }

  static async deleteImage(req: Request, res: Response) {
    const id = req.params.id;
    const currentUserAuthenticate = getToken(req.headers.authorization!);
    await Images.findOne({
      where: { id },
    })
      .then((response) => {
        if (response!.UserId != currentUserAuthenticate.id) {
          return res.status(422).json({
            message: "Task Não encontrado",
          });
        }
        deleteImage(response!.image);
        Images.destroy({
          where: { id },
        }).then((response) => {
          return res.status(200).json({
            message: "Imagem deletada com sucesso!!",
          });
        });
      })
      .catch((err) => {
        return res.status(422).json({
          message: "Task Não encontrado",
        });
      });
  }

  static async editImage(req: Request, res: Response) {
    const id = req.params.id;
    const currentUserAuthenticate = getToken(req.headers.authorization!);
    const { title, description }: IBodyRequest = req.body;
    await Images.findOne({
      where: { id },
    })
      .then((response) => {
        if (response?.UserId != currentUserAuthenticate.id) {
          return res.status(422).json({
            message: "Task Não encontrado",
          });
        }
        const newImage = {
          title: title || response!.title,
          description: description || response!.description,
        };
        Images.update(newImage, {
          where: { id },
        }).then(() => {
          return res.status(200).json({
            message: "Atualizado com sucesso",
          });
        });
      })
      .catch((err) => {
        return res.status(422).json({
          message: "Task Não encontrado",
        });
      });
  }
}
