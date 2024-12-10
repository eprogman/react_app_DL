import { Link } from "react-router-dom"

export const Footer = () => {

    return (
        <footer>
            <div className="footer">
                <div className="footer-header">
                    <Link href="/">Volver arriba</Link>
                </div>
                <div className="footer-body">
                    <h5 className="footer-title">JM</h5>
                    <Link href="">Soporte al cliente</Link>
                </div>
                <div className="footer-fecha">
                    2024
                </div>
            </div>
        </footer>
    )

}
