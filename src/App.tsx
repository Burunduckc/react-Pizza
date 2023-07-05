//React
    import {Route, Routes} from "react-router-dom";
//Styles
import './Styles/index.scss';
//UI
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Cart} from "./pages/Cart";
import FullPizza from "./pages/FullPizzas";
import React from "react";
//Component

// @ts-ignore

function App() {
  return (
      <div className="wrapper">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/cart' element={<React.Suspense fallback={<div>Идет загрузка....</div>}>
                        <Cart/>
                        </React.Suspense>}/>
                        <Route path='/pizza/:id' element={<FullPizza/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
        </div>
  );
}

export default App;
