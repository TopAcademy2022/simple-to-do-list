import React from "react";

export const Navbar: React.FunctionComponent = () => (
    <>
        <nav className="row navbar navbar-expand-lg navbar-light bg-primary" id="main-menu">
            <div className="col-2">
                <a className="navbar-brand" href="#">
                    <i className="bi bi-app-indicator h2"></i>
                    <span>simple-to-do-list</span>
                </a>
            </div>
            <div className="col-2">
                <ul className="ms-3 navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <label htmlFor="file-open">
                                <i className="bi bi-arrow-bar-up h3" title="Загрузить задачи из файла"></i>
                            </label>
                            <input id="file-open" type="file" accept=".json" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a id="btn-save" className="nav-link" href="#" role="button">
                            <i className="bi bi-arrow-down-square h3" title="Сохранить задачи в файл"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="col-6"></div>
            <div className="col-2">
                <div className="btn-group dropstart">
                    <button id="btnDropDown" type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="bi bi-back"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li className="d-flex justify-content-evenly">
                            <a className="dropdown-item bg-primary background-color-item"></a>
                            <a className="dropdown-item bg-success background-color-item"></a>
                            <a className="dropdown-item bg-danger background-color-item"></a>
                        </li>
                        <li className="d-flex justify-content-evenly mt-2">
                            <a className="dropdown-item bg-warning background-color-item"></a>
                            <a className="dropdown-item bg-info background-color-item"></a>
                            <a className="dropdown-item bg-secondary background-color-item"></a>
                        </li>
                        <li className="d-flex justify-content-center mt-2">
                            <a className="nav-link" href="#">
                                <label htmlFor="file-open-image">
                                    <i className="bi bi-arrow-up-square-fill h1"></i>
                                </label>
                                <input id="file-open-image" className="dropdown-item" type="file" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
);