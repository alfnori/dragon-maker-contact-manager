import { keyframes } from '@emotion/react';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';

interface LogoProps {
  size?: number | 'sm' | 'md' | 'lg';
  link?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'lg', link = '/' }) => {
  const dragonRoar = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 1;
  }
  20% {
    transform: scale(1) translateY(-5px); // Anticipation (inhale)
    opacity: 0.8;
  }
  40% {
    transform: scale(1.2) translateY(10px); // Roar explosion
  }
  60%, 80% {
    transform: scale(1.1) rotateZ(5deg); // Vibration effect
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

  const navigate = useNavigate();

  const parseSize = (size: number | 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return 48;
      case 'md':
        return 64;
      case 'lg':
        return 84;
      default:
        return size;
    }
  };

  const parsedSize = parseSize(size);

  return (
    <IconButton onClick={() => navigate(link)}>
      <Avatar
        alt="Dragon Maker"
        src="/dragon-maker.png"
        sx={{
          width: parsedSize,
          height: parsedSize,
          ':hover': {
            cursor: 'pointer',
            animation: `${dragonRoar} 1.5s ease-out infinite`,
          },
        }}
        title="Dragon Maker - ROARR!"
      />
    </IconButton>
  );
};

export default Logo;
