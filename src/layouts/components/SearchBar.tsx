import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  createFilterOptions,
  IconButton,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  maxWidth: '80vw',
  right: theme.spacing(4),
}));

export interface SearchBarPros {
  onSearchToggle?: (open: boolean) => void;
}

export const SearchBar = ({ onSearchToggle }: SearchBarPros) => {
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const toggleOpen = useCallback(() => {
    setOpen(!open);
    setSearchItem('');
    if (onSearchToggle) onSearchToggle(!open);
  }, [onSearchToggle, open]);

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stringify: (option: any) => option.title,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (open && searchItem.length === 0) {
        toggleOpen();
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [open, searchItem, toggleOpen]);

  return (
    <Search>
      <IconButton
        color="inherit"
        aria-label="open search"
        onClick={toggleOpen}
        title="Search contacts"
        edge="start"
      >
        <SearchIcon />
      </IconButton>
      <Autocomplete
        id="search-contacts"
        freeSolo
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getOptionLabel={(option: any) => option.title}
        options={[
          { key: 'abc', title: 'abc' },
          { key: 'asaad', title: 'aaabbbccc' },
        ]}
        filterOptions={filterOptions}
        sx={[
          {
            width: { sm: '300px', md: '400px' },
            minWidth: '250px',
            maxWidth: '90vw',
            display: 'none',
          },
          open && {
            display: 'flex',
          },
        ]}
        onClose={toggleOpen}
        renderInput={params => {
          return (
            <TextField
              {...params}
              placeholder="Search your contacts here!"
              variant="standard"
              onBlur={toggleOpen}
              value={searchItem}
              onChange={event => setSearchItem(event.target.value)}
              slotProps={{
                input: {
                  ...params.InputProps,
                  sx: [
                    {
                      maxHeight: '48px',
                    },
                  ],
                },
              }}
            />
          );
        }}
      />
    </Search>
  );
};
