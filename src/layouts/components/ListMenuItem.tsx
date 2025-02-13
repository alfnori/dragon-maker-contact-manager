import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ReactNode } from 'react';

export const ListMenuItem = ({
  title,
  onClick,
  MenuIcon,
  children,
  parentOpen,
}: {
  title: string;
  parentOpen: boolean;
  onClick: () => void;
  MenuIcon: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <ListItem
      key={`list-item-${title}`}
      disablePadding
      title={title}
      sx={{ display: 'block' }}
    >
      <ListItemButton
        onClick={onClick}
        sx={[
          {
            minHeight: 48,
          },
          parentOpen
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
            },
            parentOpen
              ? {
                  mr: 3,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
          {MenuIcon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={[
            {
              fontWeight: 'bold',
            },
            parentOpen
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />

        {children}
      </ListItemButton>
    </ListItem>
  );
};
