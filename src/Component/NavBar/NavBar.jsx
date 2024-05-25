import React from 'react';
import './NavBar.css';

export default function NavBar() {
  return (
    <div className='NavBar fixed-top'> {/* Add fixed-top class */}
      <a className='text-decoration-none d-flex align-items-center justify-content-center text-white w-100'>
        <span className='logo fs-4'>Avion School</span>
      </a>
      <div className="w-90 border-top border-white mt-2 mx-auto"></div>
      
      <div className="dropdown open mt-auto">
        <a
          className="btn border-none dropdown-toggle text-white"
          type="button"
          id="triggerId"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className='bi bi-person fs-4'></i>
          <span className='fs-5 ms-1'>Johnneil</span>
        </a>
        <div className="dropdown-menu" aria-labelledby="triggerId">
          <a className="dropdown-item" href="#">Active, UserName</a>
          <a className="dropdown-item" href="#">Log-out</a>
        </div>
      </div>
    </div>
  );
}