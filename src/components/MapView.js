import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from '@monsonjeremy/react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import locationArrow from '../images/icon-location.svg';

const locationPin = new Icon({
  iconUrl: locationArrow,
  iconSize: [25, 32],
});

// Allows the center of the map to be set
const MapController = (props) => {
  const { center } = props;

  const map = useMap();

  useEffect(() => {
    map.setView(center, 10);
  }, [center, map]);

  return null;
};

export const MapView = (props) => {
  const { position } = props;

  if (!position) return null;
  return (
    <Section data-testid="mapView">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false}
        dragging={true}
        id="mapId"
      >
        <MapController center={position} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={locationPin}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Section>
  );
};

const Section = styled.section`
  height: calc(100vh - 215px);
`;
