import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css'

// /movie/popular?api_key=4e059ea6e686381cc29209028a78c2fa&language=pt-BR

// parte da interface/ tela inicial
function Home() {
    const [movies, setMovies] = useState([]); // guarda os filmes, inicia com um array vazio pq a api retornará um Array.

    const [loading, setLoading] = useState(true); // responsavel por controlar o carregamento, a pagina ainda está carregando ou seja a api ainda está fazendo a requisição, por isso o true.

    useEffect(() => { //quando a página abrir, execute esse código.
        async function loadFilmes() {
            const response = await api.get('/movie/popular', { //quero buscar os filmes populares
                params: {
                    api_key: '4e059ea6e686381cc29209028a78c2fa', // chave de acesso, quem está fazendo a requisição.

                    language: "pt-BR", // define idioma da resposta.
                    page: 1, // define pagina da api, busque os filmes da primeira página.
                }
            })
            //    console.log(response.data.results.slice(0,10)) //slice para pegar apenas 10 filmes.

            setMovies(response.data.results.slice(0, 10)) // jogar o resultado da api em movies, como o uso do useState, ATUALIZE A LISTA DE FILMES DA PÁGINA.

            setLoading(false) // só joga os filmes na tela se a aquisição for feitas, se não joga oq está dentro do if loading.

        }
        loadFilmes();
    }, []);


    if (loading) {
        return (
            <div className="load">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }



    return (
        <div>
            <div className="listaFilmes">
                {movies.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}></img>
                            <Link to={`/filme/${filme.id}`} >Acessar</Link>
                        </article>)
                })}
            </div>
        </div>
    )
}

export default Home;