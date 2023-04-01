import GitHubIcon from '@mui/icons-material/GitHub';
import "../styles/Footer.scss"; 

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-left">
                <h3>© All rights reserved – Danny Bae</h3>
            </div>
            <div className="footer-right">
                <a href="https://www.github.com/danveb" target="_blank" rel="noreferrer noopener"><GitHubIcon /></a>
            </div>
        </div>
    )
}

export default Footer 