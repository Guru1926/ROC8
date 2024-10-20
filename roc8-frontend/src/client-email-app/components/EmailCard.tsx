import styled from "styled-components";
import { colorCodes, emailListDataType, filters } from "../constant";

type emailCardPropType = {
  emailData: emailListDataType;
  isSelected: boolean;
  onClickEmail: (id: string, isRead: boolean) => void;
};

const EmailCard = (props: emailCardPropType) => {
  const { emailData, isSelected = false, onClickEmail } = props;
  const isRead = emailData?.statuses?.includes(filters.READ) ?? false;
  const isFavorite = emailData?.statuses?.includes(filters.FAVORITES) ?? false;

  return (
    <EmailCardContainer
      $isRead={isRead}
      $isSelected={isSelected}
      onClick={() => onClickEmail(emailData.id, isRead)}
    >
      <UserNameBadge>
        <h3>{emailData?.from?.name?.charAt(0)?.toUpperCase() ?? ""}</h3>
      </UserNameBadge>
      <EmailInfoContainer>
        <div>
          From: <strong>{`${emailData?.from?.name ?? ''} <${emailData?.from?.email ?? ''}>`}</strong>
        </div>
        <div>
          Subject: <strong>{`${emailData?.subject ?? ''}`}</strong>
        </div>
        <div>{emailData?.short_description ?? 'N/A'}</div>
        <DateContainer>
          {emailData?.formattedDate}
          {isFavorite && <FavoriteEmailIndicator>Favorite</FavoriteEmailIndicator>}
        </DateContainer>
      </EmailInfoContainer>
    </EmailCardContainer>
  );
};

export default EmailCard;

const EmailCardContainer = styled.div<{ $isRead: boolean; $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 1rem;
  align-items: flex-start;
  border: solid 2px ${props => props.$isSelected ? colorCodes.ACCENT : colorCodes.BORDER};
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${colorCodes.TEXT};
  background-color: ${props => props.$isRead ? colorCodes.INACTIVE : 'white'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;
 const UserNameBadge = styled.div`
  background-color: ${colorCodes.ACCENT};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const EmailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.5rem;
  flex-grow: 1;
  overflow: hidden;

  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
  font-size: 0.9em;
  color: ${colorCodes.TEXT};
`;

const FavoriteEmailIndicator = styled.div`
  color: ${colorCodes.ACCENT};
  font-weight: 600;
`;