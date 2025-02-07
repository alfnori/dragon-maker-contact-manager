import { keyframes } from '@emotion/react';
import { Avatar } from '@mui/material';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 84 }) => {
  const dragonRoar = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  20% {
    transform: scale(1.1) translateY(-10px); // Anticipation (inhale)
    opacity: 0.8;
  }
  40% {
    transform: scale(1.3) translateY(20px); // Roar explosion
    filter: blur(1.5px); // Simulate intensity
  }
  60%, 80% {
    transform: scale(1.2) rotateZ(5deg); // Vibration effect
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

  return (
    <Avatar
      alt="Dragon Maker"
      src="/dragon-maker.png"
      sx={{
        width: size,
        height: size,
        ':hover': {
          cursor: 'pointer',
          animation: `${dragonRoar} 1.5s ease-out infinite`,
        },
      }}
      title="Dragon Maker - ROARR!"
    />
  );
};

export default Logo;
