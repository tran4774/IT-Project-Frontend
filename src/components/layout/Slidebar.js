import React from "react";

function Slidebar() {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-start">
          <div className="sidebar-head">
            <a href="/" className="logo-wrapper" title="Home">
              <span className="sr-only">Home</span>
              <span className="icon logo" aria-hidden="true" />
              <div className="logo-text">
                <span className="logo-title">PDTS</span>
                <span className="logo-subtitle">Ai Project</span>
              </div>
            </a>
            <button
              className="sidebar-toggle transparent-btn"
              title="Menu"
              type="button"
            >
              <span className="sr-only">Toggle menu</span>
              <span className="icon menu-toggle" aria-hidden="true" />
            </button>
          </div>
          <div className="sidebar-body">
            <ul className="sidebar-body-menu">
              <li>
                <a className="active" href="/">
                  <span className="icon home" aria-hidden="true" />
                  Dashboard
                </a>
              </li>
              <li>
                <a className="show-cat-btn" href="/textract">
                  <span className="icon document" aria-hidden="true" />
                  Textract
                  <span
                    className="category__btn transparent-btn"
                    title="Open list"
                  >
                    <span className="sr-only">Upload one Image</span>
                    <span className="icon arrow-down" aria-hidden="true" />
                  </span>
                </a>
                <ul className="cat-sub-menu">
                  <li>
                    <a href="/textract">Upload a Image</a>
                  </li>
                  <li>
                    <a href="/receiptmanage">Receipt Manage</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="show-cat-btn" href="##">
                  <span className="icon folder" aria-hidden="true" />
                  Set Daily Monthly
                  <span
                    className="category__btn transparent-btn"
                    title="Open list"
                  >
                    <span className="sr-only">Open list</span>
                    <span className="icon arrow-down" aria-hidden="true" />
                  </span>
                </a>
                <ul className="cat-sub-menu">
                  <li>
                    <a href="/daily">DAILY</a>
                  </li>
                  <li>
                    <a href="/monthly">MONTHLY</a>
                  </li>
                </ul>
               
              </li>
              
            

            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Slidebar;
