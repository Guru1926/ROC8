
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colorCodes } from '../constant';

type LoaderProps ={
  size?: number;
  color?: string;
  thickness?: number;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 30, 
  color = colorCodes.ACCENT, 
  thickness = 5 
}) => {
  return (
    <LoaderContainer>
      <SpinnerContainer size={size}>
        <Spinner color={color} thickness={thickness} />
      </SpinnerContainer>
    </LoaderContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const Spinner = styled.div<{ color: string; thickness: number }>`
  border: ${props => props.thickness}px solid #f3f3f3;
  border-top: ${props => props.thickness}px solid ${props => props.color};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 1s linear infinite;
`;

export default Loader;