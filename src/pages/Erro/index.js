import { Link } from "react-router-dom"
import './erro.css'


function Erro() {
    return (
        <div className="error">
            <h2>Ops página não existe erro 404</h2>
            <Link to="/">Página de filmes </Link>
            <div >
            </div>
        </div>
    )
}

export default Erro;