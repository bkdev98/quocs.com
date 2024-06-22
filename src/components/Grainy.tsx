import { grain } from "@/stitches.config";
import { styled } from "@stitches/react";

export const Grainy = styled('div', {
  backgroundImage: 'url("/static/images/grainy.png")',
  opacity: 0.03125,
  inset: '-150%',
  position: 'absolute',
  width: '300%',
  height: '300%',
  animation: `${grain} 10s steps(10) infinite`,
})

export const GrainWrapper = styled('div', {
  position: 'fixed',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
})

export const Gradient = styled('div', {
  background: `conic-gradient(from 195.7deg at 50% 50%, #7147FF 0deg, rgba(66, 232, 255, 0) 95.01deg, rgba(255, 126, 171, 0.5) 185.59deg, #7147FF 360deg)`,
  position: 'absolute',
  inset: '6rem',
  borderRadius: 999999,
  filter: 'blur(64px)',
})