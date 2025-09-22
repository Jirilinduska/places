"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { IPinsWithPopup } from "@/interfaces/interfaces"
import { Box, Button, Typography } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place';
import dayjs from "dayjs"
import { useEffect } from "react"
import { DateRangeIcon } from "@mui/x-date-pickers"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon: typeof L.Icon.Default = L.Icon.Default;
delete (DefaultIcon.prototype as any)._getIconUrl;
DefaultIcon.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Icon.Default = DefaultIcon;

const iconBeedThere = new L.Icon({
  iconUrl: '/images/red_pin.png',
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

const iconWantVisit = new L.Icon({
  iconUrl: '/images/black_pin.png',
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

export type AppMapProps = {
  center: LatLngExpression
  height: string
  zoom: number
  pins?: [number, number][]
  pinsWithPopup?: IPinsWithPopup[]
}


const MapController = ({ center, zoom }: { center: LatLngExpression; zoom: number }) => {
  
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, zoom)
  }, [center, zoom, map])

  return null
}

export const AppMap = ({ center, height, zoom, pins, pinsWithPopup }: AppMapProps) => {


      console.log

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: height, width: "100%" }}
    >
      <MapController center={center} zoom={zoom} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

      {pins && pins.map(([lat, lon], i) => (
        <Marker key={i} position={[lat, lon]} icon={iconBeedThere}>
          <Popup>Pin {i + 1}</Popup>
        </Marker>
      ))}

      {pinsWithPopup && pinsWithPopup.map((x) => (
        <Marker
          key={x._id}
          position={[x.lat, x.lon]}
          icon={x.beenThere ? iconBeedThere : iconWantVisit}
        >
          <Popup maxHeight={300} minWidth={300}>
            <Box display="flex" gap={2} alignItems="center">
              <Box height="100%" width={100}>
                <img
                  alt={x.images[0] || "/images/fallback.png"}
                  src={x.images.length > 0 ? x.images[0] : "/images/fallback.png"}
                  className="w-full h-full"
                />
              </Box>
              <Box>
                <Typography fontWeight={600}>{x.placeTitle}</Typography>
                <Typography>
                  <PlaceIcon fontSize="small" /> {x.placeName}
                </Typography>
                <Typography>
                  <DateRangeIcon fontSize="small" /> 
                  {dayjs(new Date(x.tripDate)).format("DD.MM.YYYY")}
                </Typography>
                <Button
                  size="small"
                  href={`/post/${x._id}`}
                  target="_blank"
                  fullWidth
                >
                  Go to post 
                </Button>
              </Box>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
