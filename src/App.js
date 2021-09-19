import './App.css';
import Posts from './components/posts'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Johannes</h1>
        <p className="slogan">A blog about a creative technology process</p>
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;
