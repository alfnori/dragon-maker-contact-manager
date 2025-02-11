import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Contact } from '../../types/Contact';

interface ContactMapProps {
  contacts: Contact[];
}

export const ContactMap: React.FC<ContactMapProps> = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  console.log({ API_KEY });

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{
          width: '100%',
          minHeight: 'auto',
          maxWidth: '400px',
          maxHeight: '400px',
        }}
        defaultCenter={{ lat: -14.944785, lng: -48.867188 }}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};
