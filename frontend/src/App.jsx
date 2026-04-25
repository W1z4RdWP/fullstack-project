import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import Page from './components/Page/Page';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {


  
return (
  <BrowserRouter >
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/create_post' element={<CreatePostPage />} />
        <Route path='/edit_post/:id' element={<EditPostPage />} />

        {/* Регистрация и авторизация */}
        <Route path='/register/' element={<RegisterPage />}/>
        <Route path='/login/' element={<LoginPage />}/>
      </Route>
      <Route path='*' element={
        <>
          <h2>Маршрут не найден</h2>
          <Link to='/'>На главную</Link>
        </>
        }/>
    </Routes>
  </BrowserRouter>
);

}

export default App
