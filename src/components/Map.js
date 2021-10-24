import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Map = () => {
  useEffect(() => {
    const myMap = L.map('mapId').setView([51.505, -0.09], 13);
  });

  return (
    <section>
      <div className="mapId"></div>
    </section>
  );
};
