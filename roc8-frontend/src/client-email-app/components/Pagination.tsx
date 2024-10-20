import styled from 'styled-components';
import { colorCodes } from '../constant';

type PaginationPropsType ={
  onPageChange: (direction: 'next' | 'prev') => void;
  isNextEnabled: boolean;
  isPrevEnabled: boolean;
}

const Pagination = (props:PaginationPropsType) => {
    const  {
        onPageChange,
        isNextEnabled,
        isPrevEnabled
      } = props
  return (
    <PaginationContainer>
      <PaginationButton 
        onClick={() => onPageChange('prev')} 
        disabled={!isPrevEnabled}
      >
        Previous
      </PaginationButton>
      <PaginationButton 
        onClick={() => onPageChange('next')} 
        disabled={!isNextEnabled}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background-color: ${colorCodes.ACCENT};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
   opacity: 0.7;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Pagination;