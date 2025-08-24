import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Register from './pages/Register'
import Footer from './components/Footer'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import DoctorRegister from './pages/DoctorRegister';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard'; 
import DoctorAppointments from './pages/DoctorAppointments';
const App = () => {
  const { darkMode,role } = useContext(AppContext);



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); 
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className='mx-4 sm:mx-[10%] min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors'>
        <Navbar role={role}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/patient-register' element={<Register />} />
          <Route path='/patient-dashboard' element={<PatientDashboard />} />
          <Route path='/home' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/profile' element={<MyProfile />} />
        </Routes>
        <Routes>
          <Route path='/doctor-register' element={<DoctorRegister />} />
          <Route path='/doctor-dashboard' element={ <DoctorDashboard/>} />
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>

        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
