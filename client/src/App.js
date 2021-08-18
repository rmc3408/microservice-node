import './App.css';
import PostCreate from './PostCreate';
import "antd/dist/antd.css";
import PostList from './PostList';


function App() {
  return (
    <div className="App">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
