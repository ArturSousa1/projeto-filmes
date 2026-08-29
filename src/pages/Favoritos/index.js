import { useEffect, useState } from "react";
import "./favoritos.css"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
    const [filmes, setFilmes] = useState([]) // variavel criada para armazezar os filmes.


    //useEffect, quando a página abrir, carregue os filmes salvos.

    useEffect(() => {
        //const minhaLista, criada para armazezar os filmes salvos no localStorage/navegador.

        //@primeflix é o nome do armazenamento que vai aparecer no localStorege/navegador.

        const minhaLista = localStorage.getItem("@primeflix")  //pegue os filmes salvos com o nome @primeflix no localStorege/navegador e armazene em minhaLista.

        //pegue os filmes que já estão na minhaLista transforme em array, pq o localStorege retorna em texto/"string" e coloque na variavel filmes.

        setFilmes(JSON.parse(minhaLista) || [])  // se não tiver nada na minhaLista/localStorege, vira um array vazio.

    }, [])


        //Quando clicar em excluir, remova o filme da variavel filmes, atualize a tela, atualizar o localStore e mostrar mensagem.

        // 1- excluirFilme, está recebendo o id do filme como parametro na chamada fa função.

        // 2 - Qual filme deve ser removido? , por isso o id tem que ser passado na chamada da função.

    function excluirFilme(id) { // recebendo id do filme que vai ser excluido.



        //Filter percorre todos os itens/filmes, e retorne uma nova Array com os filmes que tenham id diferente, ou seja o id que veio como parametro vai ser excluido.

        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id) // retorne filmes com id diferentes
        })

        // setFilmes vai atualizar a variavel filmes , após o filter.

        setFilmes(filtroFilmes) 

        // 1 -se não excluir o filme do localStorege ele volta a aparecer ao recarregar a tela.

        // 2- pegue a lista de filmes após o filter, tranforme em texto e salve no navegador.

        //3- - salvar um item na memoria do navegador,qual chave exemplo:@primeflix, e valor ex: filtroFilmes ,json para tranformar em texto,para salvar na memoria do navegador.

        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success('Filme excluido com sucesso')
    }

    //oque vai ser Mostrado na tela/ jsx

    return (
        <div className="meus-filmes">
            <h1>
                Meus Filmes
            </h1>
            {/* //verifica se tem filmes na lista. a lista está vazia? && se verdadeiro mostre o próximo elemento */}

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
            <ul>
                {filmes.map((item) => { //percorre todos os filmes, para cada filme crie um html
                    return (

                        //o react precisa identificar cada item da lista por isso o key =item.id 
                        <li key={item.id} > 

                            <span>
                                {item.title} 
                            </span>
                            <div>

                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>

                                {/* // quando cliclar remove o filme, tem que passar o id como parametro para saber qual o filme que quer remover. */}
                                <button onClick={() => excluirFilme(item.id)}>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;