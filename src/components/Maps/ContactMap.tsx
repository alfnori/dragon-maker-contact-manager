import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Contact } from '../../types/Contact';

interface ContactMapProps {
  contacts: Contact[];
}

export const ContactMap: React.FC<ContactMapProps> = () => {
  const API_KEY = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '80vw', height: '50vh' }}
        defaultCenter={{ lat: -14.944785, lng: -48.867188 }}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};
