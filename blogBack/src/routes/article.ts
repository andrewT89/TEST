import { Router, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

// Imports models
import { ArticleModel } from "../models";

// Inicialización del router express
const router = Router();

router.get("/", async (req: Request, res: Response, next) => {
  // tslint:disable-next-line: no-bitwise
  let ofSet = req.query.ofSet || 0;
  ofSet = Number(ofSet);

  ArticleModel.find({}, "title description createdAt")
    .skip(ofSet)
    .limit(5)
    .exec((err, articles) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error al cargar los articulos",
          errors: err,
        });
      }

      ArticleModel.countDocuments({}, (_err, conteo) => {
        res.status(200).json({
          ok: true,
          articles,
          total: conteo,
        });
      });
    });
});

router.get("/allArticles", async (req: Request, res: Response, next) => {

  // tslint:disable-next-line: no-bitwise
  let ofSet = req.query.ofSet || 0;
  ofSet = Number(ofSet);

  await ArticleModel.find({}, "title description createdAt")
    .skip(ofSet)
    .limit(5)
    .exec((err, articles) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error al cargar los articulos",
          errors: err,
        });
      }

      ArticleModel.countDocuments({}, (_err, conteo) => {
        res.status(200).json({
          ok: true,
          articles,
          total: conteo,
        });
      });
    });
});

router.get("/artById/:id", async (req: Request, res: Response, next) => {
  const idArticle = req.params.id;
  ArticleModel.findById(idArticle).exec((err, article) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar Articulo",
        errors: err,
      });
    }

    if (!article) {
      return res.status(400).json({
        ok: false,
        err: {
          message: `El articulo con ID: ${idArticle} no existe`,
        },
      });
    }

    res.status(200).json({
      ok: true,
      article
  });
  });
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const artModel = new ArticleModel({
    title,
    description
  });

  artModel.save((err, artSave) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear articulo",
        errors: err,
      });
    }

    res.status(201).json({
      ok: true,
      article: artSave,
    });
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  const idArticle = req.params.id;

  // Verificamos si existe el producto antes de actualizar
  const artUpdate = await ArticleModel.findById(idArticle);

  if (!artUpdate) {
    return res.status(400).json({
      ok: false,
      err: {
        message: `El articulo con ID: ${idArticle} no existe`,
      },
    });
  }

  // Si existe el producto hacemos el update
  return await ArticleModel.findOneAndUpdate(
    { _id: idArticle },
    req.body,
    { new: true },
    (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        message: "Articulo actualizado correctamente",
      });
    }
  );
});

router.delete("/:id", async (req: Request, res: Response) => {
  const idArticle = req.params.id;

  await ArticleModel.findByIdAndRemove(
    idArticle,
    (err: any, artDelete: any) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error al eliminar articulo",
          errors: err,
        });
      }

      if (!artDelete) {
        return res.status(400).json({
          ok: false,
          message: "No existe un articulo con ese ID",
          errors: { message: "No existe un medico con ese ID" },
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Articulo eliminado correctamente",
      });
    }
  );
});

export default router;
