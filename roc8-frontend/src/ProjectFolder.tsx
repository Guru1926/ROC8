import styled from "styled-components";
import { colorCodes } from "./visualization-dashboard/constant";
import { useNavigate } from "react-router-dom";

const ProjectFolder = () => {
    const navigate = useNavigate();

    const openClientEmails = () =>{
        navigate('/email');
    }
    const openAnalyticsDashboard = () =>{
        navigate('/dashboard');
    }
  return (
    <ProjectFolderContainer>
     <EmailButton onClick={openClientEmails}>Open Client Emails</EmailButton>
      <AnalyticsButton onClick={openAnalyticsDashboard}>Open Analytics dashboard</AnalyticsButton>
    </ProjectFolderContainer>
  );
};

export default ProjectFolder

const ProjectFolderContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5rem;
`

const AnalyticsButton = styled.button`
  padding: 0.7rem;
  background-color: ${colorCodes.GRAPH};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EmailButton = styled.button`
  padding: 0.7rem;
  background-color: ${colorCodes.ACCENT};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


