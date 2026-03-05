import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import Page from './components/Page/Page';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

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
      </Route>
      <Route path='*' element={<h2>Маршрут не найден</h2>}/>
    </Routes>
  </BrowserRouter>
);

}

export default App
