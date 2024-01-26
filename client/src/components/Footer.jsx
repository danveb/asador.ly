import GitHubIcon from '@mui/icons-material/GitHub';
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <h3>© All rights reserved – @danveb</h3>
      <a href="https://www.github.com/danveb" target="_blank" rel="noreferrer noopener"><GitHubIcon /></a>
    </div>
  )
}

export default Footer 