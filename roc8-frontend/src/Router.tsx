import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListPage from './client-email-app/components/ListPage'
import DashBoard from './visualization-dashboard/components/DashBoard'
import Auth from './visualization-dashboard/components/Auth'
import AuthContextProvider from './visualization-dashboard/auth/AuthContextProvider'
import ProtectedRoute from './visualization-dashboard/auth/ProtectedRoute'
import ProjectFolder from './ProjectFolder'



function Router() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProjectFolder />} />
      <Route path="/email" element={<ListPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  )
}

export default Router
