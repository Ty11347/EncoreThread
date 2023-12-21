import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Sidebar = () => {
  return (
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>

        </ul>
      </nav>
  );
};

const TopLevelPage = () => {
  return (
      <Router>
        <div style={{ display: 'flex', height: "100vh" }}>
          <div style={{ width: '20%', background: '#f0f0f0' }}>
            <Sidebar />
          </div>
          <div style={{ width: '80%' }}>
            <main>
              <Routes>
                {/*here to add page components*/}
                <Route exact path="/" element={<HomeComponent />} />
                <Route path="/products" element={<ProductsComponent />} />

              </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
};

// temp use
const HomeComponent = () => <div>Home Page Component</div>;
const ProductsComponent = () => <div>Products Page Component</div>;

export default TopLevelPage;
