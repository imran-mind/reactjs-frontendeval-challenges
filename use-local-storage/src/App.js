import './App.css';
import useLocalStorage from './useLocalStorage';

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [count, setCount] = useLocalStorage('count', 0);
  const [form, setForm] = useLocalStorage('form', { name: 'sachin' });

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  return (
    <div className="App">
      <h1>Custom Hook useLocalStorage</h1>
      <h1>{theme}</h1>
      <button
        onClick={handleTheme}
      >Toggle Theme</button>

      <h1>{count}</h1>
      <button
        onClick={() => setCount((prev) => parseInt(prev) + 1)}
      >Counter</button>

      <h1>{form.name}</h1>
      <button
        onClick={() => setForm({ name: 'Raja' })}
      >Submit Form</button>
    </div>
  );
}

export default App;
