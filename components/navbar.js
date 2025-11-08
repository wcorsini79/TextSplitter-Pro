class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: white;
          text-decoration: none;
          transition: opacity 0.2s;
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
        }
        a:hover {
          opacity: 0.9;
        }
        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s;
        }
        a:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            padding: 1rem;
          }
          ul {
            margin-top: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      </style>
      <nav>
        <div class="logo">
          <i data-feather="scissors"></i>
          <span>TextSplitter Pro</span>
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="https://github.com" target="_blank">GitHub</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);