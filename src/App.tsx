
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";


const UserList = lazy(() => import('./pages/UserList'));
const AddNewUser = lazy(() => import('./pages/AddNew'));

import './App.css'

const App = () => {

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add/new/user" element={<AddNewUser />} />

          </Routes>
        </Suspense>
      </Router>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
