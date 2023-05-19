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

export const SearchContext = React.createContext()
function App() {
    const [inputValue, setInputValue] = React.useState('')
    console.log(inputValue, 'INPUT CHANGED')
  return (
      <div className="wrapper">
            <SearchContext.Provider value={{inputValue, setInputValue}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home value={inputValue}/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
  );
}

export default App;
