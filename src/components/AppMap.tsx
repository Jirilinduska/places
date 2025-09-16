"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { IPinsWithPopup } from "@/interfaces/interfaces"
import { Box, Typography } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place';
import { AppButton } from "./AppButton"
import dayjs from "dayjs"

const DefaultIcon: any = L.Icon.Default;
delete DefaultIcon.prototype._getIconUrl;
DefaultIcon.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

L.Icon.Default = DefaultIcon;

const iconBeedThere = new L.Icon({
    iconUrl: '/images/red_pin.png',  // vlastní obrázek
    iconSize: [60, 60],                    // velikost markeru [šířka, výška]
    iconAnchor: [20, 40],                  // bod, který ukazuje přesně na pozici [x, y]
    popupAnchor: [0, -40],                 // kde se objeví popup relativně k markeru
})

const iconWantVisit = new L.Icon({
    iconUrl: '/images/black_pin.png',  // vlastní obrázek
    iconSize: [60, 60],                    // velikost markeru [šířka, výška]
    iconAnchor: [20, 40],                  // bod, který ukazuje přesně na pozici [x, y]
    popupAnchor: [0, -40],                 // kde se objeví popup relativně k markeru
})

// [50.0755, 14.4378] // prague

type Props = {
    center: LatLngExpression
    height: string
    zoom: number
    pins?: [number, number][]
    pinsWithPopup?: IPinsWithPopup[] 
}

export const AppMap = ({ center, height, zoom, pins, pinsWithPopup } : Props) => {
  return (
    <MapContainer
      center={center} // lat, long ... vychozi pozice mapy
      zoom={zoom}
      style={{ height: height, width: "100%" }} // h = 600px
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // standartní
        // url="//{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // moderní
        // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" // satelitní
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

        {pins && pins.map(([lat, lon], i) => (
          <Marker key={i} position={[lat, lon]} icon={iconBeedThere}>
            <Popup>Pin {i + 1}</Popup>
          </Marker>
        ))}

        {pinsWithPopup && pinsWithPopup.map((x) => (
          <Marker key={x._id} position={[x.lat, x.lon]} icon={x.beenThere ? iconBeedThere : iconWantVisit}>
            <Popup maxHeight={300} minWidth={300}>
              <Box display="flex" gap={2}>
                {<Box>
                  <img
                    width={100}
                    height={100}
                    src={x.images.length > 0 ? x.images[0] : "/images/fallback.png"}
                  />
                </Box>}
                <Box>
                  <Typography fontWeight={600}>{x.placeTitle}</Typography>
                  <Typography>
                      <PlaceIcon fontSize="small" />
                      {x.placeName}
                  </Typography>
                  <Typography>
                      <PlaceIcon fontSize="small" />
                      {dayjs(x.tripDate).format("DD.MM.YYYY")}
                  </Typography>
                  <AppButton 
                    size="small"
                    text="Go to post"
                    href={`/post/${x._id}`}
                  />
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
