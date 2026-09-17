import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css"
import { toast } from "react-toastify";


function Filmes() {
    const { id } = useParams(); // pega o id da url e guarde na variavel id

    const navigate = useNavigate();  // função usada para mandar o usuario ir para algmuma página, após um erro por exemplo.

    const [filme, setFilme] = useState({});// começa com um objeto vazio pq o api vai retornar um objeto

    const [loading, setLoading] = useState(true); // começa com true pq está aguardando api carregar

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '4e059ea6e686381cc29209028a78c2fa',
                    language: "pt-BR",
                }
            }).then((response) => { //quando a api responder execute isso.

                setFilme(response.data) // salva os dados na variavel filme.

                setLoading(false) // finaliza o carregamento

            }).catch(() => { // execute isso se der erro

                navigate("/", { replace: true }) // está linha redireciona o usuario para a página inicial, sem o replace se o usuario apertar em voltar iria para a pagina invalida, por isso o replace true, substitui a invalida para home.  ou seja remova a pagina invalida do historico.

                return; //encerra a função / acabou/ pare tudo aqui
            })
        }

        loadFilme(); // chama a função quando o usuario entra na página.

    }, [navigate, id]) // se o id mudar ou seja usuario mudar de filme que é identificado por id , execute o useFfect novamanete ou seja busque o outro filme.


    function salvarFilme() {

        const minhaLista = localStorage.getItem("@primeflix") // essa linha pega os filmes que o usuario quer salvar/salvou  e armazena na variavel minhaLista. OBS LOCASTOREGE SAVA APENAS TEXTO, ENTÃO MINHA LISTA RECEBE TEXTO.

        //obs tem que passar a chave/nome que vai aparecer no localStorege e tranformar em Array pq a resposta vem em texto.

        let filmesSalvos = JSON.parse(minhaLista) || []; // pegue os filmes salvos em minhaLista, tranforme em um array e armazene na minha variavel filmesSalvos , se não tiver nada comece um array vazio. 


        //existe algum item salvo com esse id?
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id) // some verifica se algum item atende a condição e  retorna true or false.


        if (hasFilme) { // esse filme já foi salvo?

            toast.warn('Esse filme já foi salvo na sua lista') // notificação visual
            return; // para de executar.
        }

        filmesSalvos.push(filme) // adicione esse filme a minha lista
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos)) // tranforme filmesSalvos em texto e salve no navegador.

        toast.success('O filme foi salvo com sucesso')// notificação visual.
    }


    //Esse bloco controla a tela enquanto a api ainda está carregando, se ainda estiver carregandi. mostre a tela de loading.

    if (loading) { // loading é true? ,  true pq a api ainda não respondeu, linha 16.

        return ( // Motre isso para o usuario / oque sera renderizado na tela.
            <div className="filme-info">
                <h1>
                    Carregando detalhes
                </h1>
            </div>
        )
    }


    // Oque será mostrado na tela.
    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} ></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme} >Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} >Trailer</a>
                </button>


            </div>

        </div>
    )


}

export default Filmes;