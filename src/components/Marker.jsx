import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MarkerComponent = ({ policeDataTicked, crimes }) => {
  console.log("Police data ticked!!", policeDataTicked);
  if (!policeDataTicked) return <p></p>;

  return crimes.map((crime) => {
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
  });
};

export default MarkerComponent;
