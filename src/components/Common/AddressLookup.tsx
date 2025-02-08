/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
// import { getAddressByCEP } from '../../services/apiService';

interface AddressLookupProps {
  onAddressSelect: (address: any) => void;
}

export const AddressLookup: React.FC<AddressLookupProps> = ({
  onAddressSelect,
}) => {
  const [cep, setCEP] = useState('');
  const [addresses, setAddresses] = useState([]);

  const handleLookup = async () => {
    setAddresses([]);
    // const addressData = await getAddressByCEP(cep);
    // if (addressData) {
    //   setAddresses([addressData]);
    // }
  };

  return (
    <div>
      <TextField
        label="CEP"
        value={cep}
        onChange={e => setCEP(e.target.value)}
      />
      <Button onClick={handleLookup}>Lookup</Button>
      <List>
        {addresses.map((address: any) => (
          <ListItem key={address.cep} onClick={() => onAddressSelect(address)}>
            <ListItemText
              primary={`${address.logradouro}, ${address.localidade}`}
              secondary={`${address.uf} - ${address.cep}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
