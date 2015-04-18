var React = require('react');

var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');


var Footer = React.createClass({
    render: function() {
        return (
                <footer className="site-footer">
                  <div className="container">
                    <a className="footer-logo" href="https://okfn.org/">
                      <img src="https://bytebucket.org/okfn/assets.okfn.org/raw/88b24904b8ecded5e6d530739743162d1c5b3d93/p/okfn/img/okfn-logo-landscape-white.png" alt="Open Knowledge" />
                    </a>
                
                    <div className="footer-links">
                      <ul>
                        <li><a href="https://okfn.org/privacy-policy/">Privacy policy</a></li>
                        <li><a href="https://okfn.org/ip-policy/">IP policy</a></li>
                        <li><a href="https://okfn.org/cookie-policy/">Cookie policy</a></li>
                        <li><a href="https://okfn.org/terms-of-use/">Terms of use</a></li>
                      </ul>

                      <ul className="footer-social">
                        <li><a href="https://facebook.com/OKFNetwork">
                          <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/facebook-logo-circle.png" alt="Facebook" />
                          </a></li>
                        <li>
                          <a href="https://twitter.com/okfn">
                            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/twitter-logo-circle.png" alt="Twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/user/openknowledgefdn">
                            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/youtube-logo-circle.png" alt="YouTube" />
                          </a>
                        </li>
                      </ul>
                    </div>
    
                    <hr />

                    <p>Open Knowledge Foundation is incorporated in England and Wales as a company Limited by guarantee. Company no. 05133759. Registered address: St. John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, UK. VAT Registration no. GB 984404989.</p>
            
                </div>
              </footer>
        );
    }
});


module.exports = Footer;
