/* eslint-disable react/jsx-pascal-case */
import './App.css';
import Chat from "../src/components/chat.component.tsx";
import Chat_interface from "../src/interfaces/chat.interface.tsx"
function App() {
  return (
    <div className="App">
      <Chat_interface Component ={Chat} />
    </div>
  );
}

export default App;
