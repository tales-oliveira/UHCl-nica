import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api"; //biblioteca react-google-maps de api

function LocalMap() {
  const estiloMapa = {
    width: "80%",
    height: "450px",
  };

  const localEmpresa = {
    //setar o local da empresa para ficar centralizado no mapa
    lat: -22.413812,
    lng: -45.450254,
  };

  return (
    //chave da api para usar no mapa
    <div className="flex flex-col justify-center ml-20">
      <h1 className="text-greeny text-3xl mb-3 mt-6 ">LOCALIZAÇÃO</h1>
      <div className="z-0 mb-10">
        <LoadScript googleMapsApiKey="AIzaSyA5OfhakTgvAVPdnmy7L8umVe3mHvhBBwM">
          <GoogleMap
            mapContainerStyle={estiloMapa}
            center={localEmpresa}
            zoom={16}
          />
        </LoadScript>
      </div>
    </div>
  );
}

export default LocalMap;
