import styled from "styled-components";
import { colorCodes, emailListDataType, filters } from "../constant";
import { useEffect, useState } from "react";
import { getEmailDetails, getEmails } from "../api/axios";
import EmailCard from "./EmailCard";
import { updateUserActivity } from "../api/indexedDB";
import EmailBody from "./EmailBody";
import Loader from "./Loader";
import Pagination from "./Pagination";

const ListPage = () => {
  const [activeFilter, setActiveFilter] = useState<filters | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<emailListDataType | null>(
    null
  );
  const [emailList, setEmailList] = useState<emailListDataType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [emailListLoading, setEmailListLoading] = useState<boolean>(false);
  const [emailContentLoading, setEmailContentLoading] =
    useState<boolean>(false);

  const onClickEmail = (emailData: emailListDataType) => {
    setSelectedEmail(emailData);
    if (!emailData.statuses?.includes(filters.READ)) {
      updateUserActivity("Read", emailData.id);
      setEmailList((prevList) =>
        prevList.map((email) =>
          email.id === emailData.id
            ? { ...email, statuses: [...(email.statuses || []), filters.READ] }
            : email
        )
      );
    }
  };

  const markAsFavourite = () => {
    if (!selectedEmail?.statuses?.includes(filters.FAVORITES)) {
      updateUserActivity("Favorites", selectedEmail?.id ?? "");
      setEmailList((prevList) =>
        prevList.map((email) =>
          email.id === selectedEmail?.id
            ? {
                ...email,
                statuses: [...(email.statuses || []), filters.FAVORITES],
              }
            : email
        )
      );
    }
  };

  const updateFilter = (filterKey: filters) => {
    setActiveFilter(filterKey);
    setPageNumber(1);
    setSelectedEmail(null);
  };

  const handleChangePagination = (direction: "next" | "prev") => {
    if (direction === "next") {
      setPageNumber((prev) => prev + 1);
    } else {
      setPageNumber((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setEmailListLoading(true);
    getEmails(pageNumber, activeFilter).then((mails) => {
      setEmailList(mails);
      setEmailListLoading(false);
    });
  }, [pageNumber, activeFilter]);

  useEffect(() => {
    if (!selectedEmail?.body && selectedEmail?.id) {
      setEmailContentLoading(true);
      getEmailDetails(selectedEmail?.id).then((data) => {
        setSelectedEmail({ ...(selectedEmail ?? {}), body: data });
        setEmailContentLoading(false);
      });
    }
  }, [selectedEmail]);

  return (
    <EmailPageContainer>
      <FilterButtonContainer>
        Filter By:
        {Object.values(filters)?.map((filterKey: filters) => (
          <FilterButton
            key={filterKey}
            $active={filterKey === activeFilter}
            onClick={() => updateFilter(filterKey)}
          >
            {filterKey}
          </FilterButton>
        ))}
      </FilterButtonContainer>

      {emailListLoading ? (
        <Loader />
      ) : (
        <MasterSlaveContainer>
          <EmailListContainer >
            <EmailList>
            {emailList?.map((emailData) => (
              <EmailCard
                emailData={emailData}
                key={emailData?.id}
                isSelected={emailData.id === selectedEmail?.id}
                onClickEmail={() => onClickEmail(emailData)}
              />
            ))}
            </EmailList>
        
            <Pagination
              isNextEnabled={emailList?.length === 10}
              isPrevEnabled={pageNumber > 1}
              onPageChange={handleChangePagination}
            />
          </EmailListContainer>
          {selectedEmail && (
            <EmailContainer>
              <EmailBody
                emailData={selectedEmail}
                markAsFavourite={markAsFavourite}
                emailContentLoading={emailContentLoading}
              />
            </EmailContainer>
          )}
        </MasterSlaveContainer>
      )}
    </EmailPageContainer>
  );
};

export default ListPage;

const EmailPageContainer = styled.div`
  background-color: ${colorCodes.BACKGROUND};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  box-sizing: border-box;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 16px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  border-radius: 1rem;
  outline: ${(props) => (props.$active ? "1px" : "none")};
  border: ${(props) =>
    props.$active ? `solid 1px ${colorCodes.BORDER}` : "none"};
  background-color: ${(props) =>
    props.$active ? colorCodes.ACTIVE_BUTTON : "transparent"};
  padding: 0.5rem 1rem;
  text-align: center;
`;

const MasterSlaveContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
`;

const EmailListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  flex-grow: 1;
  padding-right: 1rem;
  transition: width 0.3s ease-in-out;
`;

const EmailList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  row-gap: 0.5rem;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 1rem;

  //Hide Scroll bar
    ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 60%;
  background-color: white;
  border: solid 1px ${colorCodes.BORDER};
  border-radius: 1rem;
  overflow-y: auto;
  padding: 1rem;

    //Hide Scroll bar
    ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
