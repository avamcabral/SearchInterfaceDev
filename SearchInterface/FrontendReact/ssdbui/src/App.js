import './App.css';
import Parent from './components/Parent';
import {motion} from "framer-motion";

function App() {
  return (
    <motion.div className="App" 
    initial={{x:-300, opacity:0}}
    animate={{x:0, opacity:1}}
    transition={{
      duration:.65,
      ease: "easeInOut",
      type:"spring"
    }}>
      <Parent />
    </motion.div>
  );
}

export default App;
