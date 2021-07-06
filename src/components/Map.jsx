import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useEffect } from "react";
import * as postcodeData from "../data/outer-postcodes.json";

//import { Icon } from "leaflet";

// export const icon = new Icon({
//   iconUrl: "/skateboarding.svg",
//   iconSize: [25, 25],
// });

const Map = ({ postcode }) => {
  const [crimes, setCrimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latlng, setLatlng] = useState([53.47734, -2.23508]);

  let lat = 0;
  let lng = 0;
  let coords = [];

  const allOuterPostcodes = postcodeData.default;

  useEffect(() => {
    allOuterPostcodes.forEach((outerPostcode) => {
      if (outerPostcode.postcode === postcode) {
        lat = outerPostcode.latitude;
        lng = outerPostcode.longitude;
        coords = [lat, lng];
        setLatlng(coords);

        console.log(outerPostcode.postcode, coords);
      }
    });

    const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2019-12`;

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
      key={JSON.stringify(latlng)}
      className="leaflet-container "
      center={latlng}
      zoom={14}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {crimes.map((crime) => {
        return (
          <Marker
            key={crime.id}
            position={[crime.location.latitude, crime.location.longitude]}
          >
            <Popup>
              <div>
                <h2>{crime.category}</h2>
                <p>{crime.location.street.name}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
