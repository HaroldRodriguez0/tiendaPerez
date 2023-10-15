import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddsfbz6wq",
  api_key: "859687261894579",
  api_secret: "bxevAajSzilFCFpZbPa17JNPDY8",
});

export const cloudinaryHelper = async (pathFile, oldPathFile = "", fondo) => {

  /////////////////////////////////////////////////////////// COMPROBAR ////////////////////////////
  // Limpiar imagenes previas
  if (oldPathFile) {
    // hay que borrar la imagen de Cloudinary (pero la img se borra mediante su id)
    const nombreArr = oldPathFile.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");

    //console.log(public_id);

    cloudinary.uploader.destroy(public_id);
  }

  // ELIMINAR FONDO

  let img, pathFinal;
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append(
    "image_file",
    fs.createReadStream(pathFile),
    path.basename(pathFile)
  );

  if (fondo) {

    await cloudinary.uploader.upload(
      pathFile,
      {
        height: 400,
        width: 300,
        crop: "fill",
      },
      function (error, result) {
        if (error) {
          pathFinal = "";
        } else {
          pathFinal = result.secure_url;
        }
      }
    );

  } else {

    await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(), // crear .env
        "X-Api-Key": "Nt2ALaQoHSx98ZruDsbC62vg",
      },
      encoding: null,
    })
      .then(async (response) => {
        img = Buffer.from(response.data, "base64");
        //fs.writeFileSync("no-bg.png", response.data);
        // Mostrar img en la res
        //console.log(response.data)
        //res.set('Content-Type', 'image/png'); res.set('Content-Length', img.length);
        //res.send(img);

        // subir Buffer a cloudinary
        pathFinal = await new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
              height: 400,
              width: 300,
              crop: "fill",
            },
            function (error, result) {
              if (result) {
                resolve(result.secure_url); // Resolver la promesa con la URL
              }
            }
          );

          streamifier.createReadStream(img).pipe(cld_upload_stream);
        });
      })
      
      .catch(async (error) => {
        //console.log(error);
        await cloudinary.uploader.upload(
          pathFile,
          {
            height: 400,
            width: 300,
            crop: "fill",
          },
          function (error, result) {
            if (error) {
              pathFinal = "";
            } else {
              pathFinal = result.secure_url;
            }
          }
        );
      });
  }

  return pathFinal;
};
