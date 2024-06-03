import React from "react";

export const TaskCreator: React.FunctionComponent = () => (
    <>
        <div className="row mt-5">
            <div className="col-4"></div>
            <div className="col-4">
                <p className="text-center">Создать задачу</p>
                <div className="input-group">
                    <input id="task-text" type="text" className="form-control" placeholder="Введите название задачи" aria-label="Введите название задачи" aria-describedby="button-addon" />
                    <button id="button-addon" className="btn btn-outline-secondary" type="reset">Добавить задачу в список</button>
                </div>
            </div>
        </div>
        <div id="container" className="row mt-2"></div>
    </>
);