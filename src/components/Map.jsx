import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useEffect } from "react";
import * as postcodeData from "../data/outer-postcodes.json";
import MarkerComponent from "./Marker";

//import { Icon } from "leaflet";

// export const icon = new Icon({
//   iconUrl: "/skateboarding.svg",
//   iconSize: [25, 25],
// });

const Map = ({ postcode, policeDataTicked }) => {
  const [crimes, setCrimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latlng, setLatlng] = useState([53.47734, -2.23508]);

  let lat = 0;
  let lng = 0;
  let coords = [];

  const allOuterPostcodes = postcodeData.default;

  useEffect(() => {
    allOuterPostcodes.forEach((outerPostcode) => {
      if (outerPostcode.postcode === postcode.toUpperCase()) {
        lat = outerPostcode.latitude;
        lng = outerPostcode.longitude;
        coords = [lat, lng];
        setLatlng(coords);

        console.log(outerPostcode.postcode, coords);
      }
    });

    const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCrimes(data);
        setIsLoading(false);
      });
  }, [postcode]);
  console.log(crimes, "<< crimes");

  if (isLoading) return <p>Loading...</p>;
  console.log(latlng);
  return (
    <MapContainer
      key={JSON.stringify(latlng, policeDataTicked)}
      className="leaflet-container "
      center={latlng}
      zoom={14}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerComponent policeDataTicked={policeDataTicked} crimes={crimes} />
    </MapContainer>
  );
};

export default Map;
