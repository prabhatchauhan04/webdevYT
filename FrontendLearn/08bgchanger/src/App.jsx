import { useState } from 'react';

function App() {
  const [color, setColor] = useState("black");

  return (
    <div
      style={{ backgroundColor: color }}
      className="min-h-screen flex flex-col w-full items-center justify-center transition-all duration-500"
    >
      <div className="flex gap-4 p-4 rounded-3xl w-fit mt-auto bg-white/20 backdrop-blur-md">
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setColor("red")}>Red</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setColor("blue")}>Blue</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setColor("green")}>Green</button>
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setColor("black")}>Black</button>
        <button className="bg-violet-500 text-white px-4 py-2 rounded" onClick={() => setColor("violet")}>Violet</button>
      </div>
    </div>
  );
}

export default App;
