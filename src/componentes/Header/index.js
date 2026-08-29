import { Link } from "react-router-dom";

function Navegaçao() {
    return (
        <header>
            <Link to='/' className="logo">
                <h1>Prime Flix</h1>
            </Link>

            <nav>
                <Link to='/favoritos' className="favoritos" >Meus Filmes</Link>
                {/* <Link to='/filmes' className="favoritos">Filmes</Link> */}
            </nav>
        </header>
    )
}

export default Navegaçao;