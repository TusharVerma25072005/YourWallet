
import { BrowserRouter as Router  ,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Transfer from './components/Transfer';
import Transactions from './components/Transactions';
import Profile from './components/Profile';
import { RecoilRoot } from 'recoil';
import NotFound from './components/NotFound';
import TopBar from './components/TopBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <RecoilRoot>
    <Router>
      <ToastContainer position='bottom-right' />
      <MyApp />
    </Router>
    </RecoilRoot>
  )  
}

export default App

function MyApp() {
  const token = localStorage.getItem('token');
  return (
    <>
    <TopBar />
    <Routes>
      <Route path="/" element={token ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={ <Register />} />
      <Route path="/transfer" element={token ? <Transfer /> : <Login />} />
      <Route path="/transactions" element={token ? <Transactions /> : <Login />} />
      <Route path="/profile" element={token ? <Profile /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}