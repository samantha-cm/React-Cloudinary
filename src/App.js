import "./App.css";
import axios from "axios";

import React, { useState } from "react";

function FileUplouad({ setImage }) {
  const cloudinaryAPi =
    //samanthacmic -> El mio
    //---------------------------------->Su nombre de cloudName
    "https://api.cloudinary.com/v1_1/samanthacmic/image/upload";
  //Nombre de la configuracion (Preset)
  const namePreset = "React_ProyectM3";
  const onFileChange = async (e) => {
    // e.target.files devuelve es un FileList que se comporta como un arreglo a pesar de que no lo es.
    console.log(e.target.files);

    // Para poder subir archivos a Cloudinary, vamos a necesitar usar un elemento llamado FormData.
    // Form data es una estructura que simula lo que un formulario en modulo 2 enviaba al backend, una estructura como un objeto con llave y valor.

    const data = new FormData();
    //data.append('firstName', 'Sam') // -> <input name="firstName"/>
    // Agregamos la data necesaria para cloudinary (upload_preset = Configuracion en cloudinary y el archivo que vamos a subir)
    data.append("upload_preset", namePreset);
    data.append("file", e.target.files[0]);

    //Enviamos el request a la api para subir el archivo
    const result = await axios.post(cloudinaryAPi, data);
    console.log(result);
    setImage(result.data.secure_url);
  };

  return (
    <>
      <input type="file" onChange={onFileChange} />
    </>
  );
}

function App() {
  const [image, setImage] = useState(null);
  return (
    <>
      <h1>Subida de archivos con Cloudinary</h1>
      {image && <img src={image} alt="fotograp" />}
      <FileUplouad setImage={setImage} />
    </>
  );
}

export default App;
