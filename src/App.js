//React
    import React from "react";
    import {Route, Routes} from "react-router-dom";
//Styles
import './Styles/index.scss';
//UI
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Cart} from "./pages/Cart";
//Component


function App() {
    const [inputValue, setInputValue] = React.useState('')
    console.log(inputValue, 'INPUT CHANGED')
  return (
      <div className="wrapper">
        <Header value={inputValue} setValue = {setInputValue}/>
        <div className="content">
              <Routes>
                  <Route path='/' element={<Home value={inputValue}/>}/>
                  <Route path='/cart' element={<Cart/>}/>
                  <Route path='*' element={<NotFound/>}/>
              </Routes>
          </div>
        </div>
  );
}

export default App;
