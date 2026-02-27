import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import Page from './components/Page/Page';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

function App() {


  
return (
  <BrowserRouter >
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<h2>Маршрут не найден</h2>}/>
    </Routes>
  </BrowserRouter>
);

}

export default App
