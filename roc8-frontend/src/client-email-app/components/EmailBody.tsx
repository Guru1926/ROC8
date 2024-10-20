import styled from "styled-components";
import { colorCodes, emailListDataType, filters } from "../constant";
import Loader from "./Loader";

type EmailBodyPropsType = {
  emailData: emailListDataType;
  markAsFavourite:() => void
  emailContentLoading:boolean
};

const EmailBody = (props:EmailBodyPropsType) => {
    const { emailData,markAsFavourite ,emailContentLoading} =props

    const isFavorite = emailData?.statuses?.includes(filters.FAVORITES) ?? false
  return (
    <EmailDetailsContainer>
      <HeaderContainer>
        <UserNameBadge>
          <h1>{emailData?.from?.name?.charAt(0)?.toUpperCase() ?? ""}</h1>
        </UserNameBadge>

        <EmailInfoContainer>
          <h2>{emailData?.subject ?? ""}</h2>
          <p>{emailData?.formattedDate}</p>
        </EmailInfoContainer>

       {!isFavorite && <MarkFavoriteButton onClick={markAsFavourite}>Mark as favorite</MarkFavoriteButton>}
      </HeaderContainer>

      {emailContentLoading ?<Loader/>: (
        emailData?.body && <EmailBodyContainer dangerouslySetInnerHTML={{ __html:`${emailData.body}`}} />
      )}
    </EmailDetailsContainer>
  );
};

export default EmailBody;

const EmailDetailsContainer = styled.div`
  color: ${colorCodes.TEXT};
`;

const UserNameBadge = styled.div`
  background-color: ${colorCodes.ACCENT};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
`;

const EmailInfoContainer = styled.div`
  flex-grow: 1;
`;

const MarkFavoriteButton = styled.button`
color: white;
background-color: ${colorCodes.ACCENT};
outline: none;
border: none;
height: 2rem;
border-radius: 1rem;
padding: 0 1rem;
`;

const EmailBodyContainer = styled.div`
    padding: 1rem 3rem;
`