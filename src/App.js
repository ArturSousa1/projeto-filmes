import Rotas from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// import { useState } from "react";
// import { useEffect } from "react";


function App() {
  // const [minhaApi, setApi] = useState();

  // let url = 'https://api.themoviedb.org/3/movie/popular?api_key=4e059ea6e686381cc29209028a78c2fa&language=pt-BR'

  // useEffect(() => {
  //   fetch(url)
  //     .then((resposta) => resposta.json())
  //     .then((oqueChegou) => {
  //       setApi(oqueChegou.results)
  //     })
  // }, [])


  return (
    <div className="App">
      <ToastContainer />
      <Rotas />
    </div>
  );
}

export default App;
