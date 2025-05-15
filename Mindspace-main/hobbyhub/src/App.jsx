import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import EditPostPage from './pages/EditPostPage';
import './App.css';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
