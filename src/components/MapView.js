import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from '@monsonjeremy/react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import locationArrow from '../images/icon-location.svg';

const Section = styled.section`
  height: calc(100vh - 215px);
`;

const locationPin = new Icon({
  iconUrl: locationArrow,
  iconSize: [25, 32],
});

export const MapView = (props) => {
  const { position } = props;

  return (
    <Section>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false}
        dragging={true}
        id="mapId"
      >
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
