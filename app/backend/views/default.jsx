'use strict'

import React from 'react'

let DefaultView = React.createClass({
  render() {
    const { children, instance } = this.props
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <base href='/' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='description' content={instance.description} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>
            {instance.name} | {instance.organization}
          </title>
          <link rel='apple-touch-icon' href='images/apple-touch-icon.png' />
          <link rel='stylesheet' href='//okfnlabs.org/ok-panel/assets/css/frontend.css' />
          <link rel='stylesheet' type='text/css' href='/styles/app.min.css' />
        </head>
        <body>
          <div>
            <div id='ok-panel' className='closed'>
              <iframe src='//assets.okfn.org/themes/okfn/okf-panel.html'
                scrolling='no'>
              </iframe>

              </div>
            <nav className='navbar navbar-static-top'>
              <div className='container'>
                <div className='navbar-right'>
                  <a className='ok-ribbon' href='https://okfn.org/'>
                    <img src='//okfnlabs.org/ok-panel/assets/images/ok-ribbon.png'
                      alt='Open Knowledge'/>
                    </a>
                </div>
                <div className='navbar-header'>
                  <button type='button' className='navbar-toggle collapsed'
                    data-toggle='collapse' data-target='#navbar'
                    aria-expanded='false' aria-controls='navbar'>
                    <span className='sr-only'>Toggle navigation</span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                  </button>
                  <a className='navbar-brand has-icon' href='./'>
                    <span className='glyphicon glyphicon-ok'
                      aria-hidden='true'></span>
                    <span className='text'>{instance.name}</span>
                  </a>
                </div>
                <div id='navbar' className='collapse navbar-collapse'>
                  <ul className='nav navbar-nav'>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/pricing'>Pricing</a></li>
                    <li><a href='/faq'>FAQ</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {children}

          <footer className='site-footer'>
            <div className='container'>
              <a className='footer-logo' href='https://okfn.org/'>
                <img src='https://bytebucket.org/okfn/assets.okfn.org/raw/88b24904b8ecded5e6d530739743162d1c5b3d93/p/okfn/img/okfn-logo-landscape-white.png' alt='Open Knowledge' />
              </a>
              <div className='footer-links'>
                <ul>
                  <li>
                    <a href='https://okfn.org/privacy-policy/'>Privacy policy</a>
                  </li>
                  <li>
                    <a href='https://okfn.org/ip-policy/'>IP policy</a>
                  </li>
                  <li>
                    <a href='https://okfn.org/cookie-policy/'>Cookie policy</a>
                  </li>
                  <li>
                    <a href='https://okfn.org/terms-of-use/'>Terms of use</a>
                  </li>
                </ul>
                <ul className='footer-social'>
                  <li><a href='https://facebook.com/OKFNetwork'>
                    <img src='https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/facebook-logo-circle.png' alt='Facebook' />
                  </a></li>
                  <li>
                    <a href='https://twitter.com/okfn'>
                      <img src='https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/twitter-logo-circle.png' alt='Twitter' />
                    </a>
                  </li>
                  <li>
                    <a href='https://www.youtube.com/user/openknowledgefdn'>
                      <img src='https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/youtube-logo-circle.png' alt='YouTube' />
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <p>Open Knowledge Foundation is incorporated in England and Wales as a company Limited by guarantee. Company no. 05133759. Registered address: St. John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, UK. VAT Registration no. GB 984404989.</p>
            </div>
          </footer>
          <script src="/scripts/jquery.min.js"></script>
          <script src='/scripts/bootstrap.min.js'></script>
          <script src="/scripts/Chart.min.js"></script>
          <script src='/scripts/app.min.js'></script>
          <script src='//okfnlabs.org/ok-panel/assets/js/frontend.js'></script>
        </body>
      </html>
    )
  }
})

export default DefaultView
