//React
    import React from "react";
    import {Route, Routes} from "react-router-dom";
//Redux
    import {switchBool} from "./redux/Slices/stateSlice";
    import {changeInput} from "./redux/Slices/filterSlice";
    import {changeValue, changeName, changeValueDicrement} from "./redux/Slices/allstatesSlice";
import {useSelector, useDispatch} from "react-redux";
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
    const statem = useSelector((state) => state.stateManagement.stateMan)
    const value = useSelector((state) => state.states.value)
    const name = useSelector((state) => state.states.name)
    console.log(name)
    const dispatch = useDispatch()
    console.log(inputValue, 'INPUT CHANGED')
  return (
      <div className="wrapper">
          <button
              aria-label="Increment value"
              onClick={()=>dispatch(switchBool())}>Надпись</button>
          {statem && <h1>Ура</h1>}
          <input onChange={(e)=>dispatch(changeName(e.target.value))}/>
          <p>Ваше имя: {name}</p>
          <button onClick={()=>dispatch(changeValue())}>Incriment</button>
          <button onClick={()=>dispatch(changeValueDicrement())}>dicrement</button>
          <h2>{value}</h2>
          {}
            {/*<SearchContext.Provider value={{inputValue, setInputValue}}>*/}
            {/*    <Header />*/}
            {/*    <div className="content">*/}
            {/*        <Routes>*/}
            {/*            <Route path='/' element={<Home/>}/>*/}
            {/*            <Route path='/cart' element={<Cart/>}/>*/}
            {/*            <Route path='*' element={<NotFound/>}/>*/}
            {/*        </Routes>*/}
            {/*    </div>*/}
            {/*</SearchContext.Provider>*/}
        </div>
  );
}

export default App;
