import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login  from './components/auth/Login'
import SignUp  from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import UpDateProfileDialog from './components/UpDateProfileDialog'
import Companies from './components/Admin/Companies'
import AdminJobs  from './components/Admin/AdminJobs'
import CompanyCreate from './components/Admin/CompanyCreate'
import CompanySetUp from './components/Admin/CompanySetUp'
import AdminJobsCreate from './components/Admin/AdminJobsCreate'
import AdminJobsById from './components/Admin/AdminApplicants'

function App() {

  const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/updateProfile',
    element:<UpDateProfileDialog/>
  },
// admin satrt rounting

{
  path:'/admin/companies',
  element:<Companies/>
},
{
  path:'/admin/companies/create',
  element:<CompanyCreate/>
},
{
  path:'/admin/companies/:id',
  element:<CompanySetUp/>
},
{
  path:'/admin/jobs',
  element:<AdminJobs/>
},
{
  path:'/admin/jobs/create',
  element:<AdminJobsCreate/>
},
{
  path:'/admin/jobs/:id/applicants',
  element:<AdminJobsById/>
},



  
  ])
  return (
    <>

    <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
