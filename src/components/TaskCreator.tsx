import React from "react";
import ReactDOM from "react-dom/client";
import { Task } from "../entityes/Task";
import { Task as TaskComponent } from "./Task";

const RenderTaskInContainer = (containerName: string) =>
{
	const taskContainer: ReactDOM.Root = ReactDOM.createRoot(
		document.getElementById(containerName) as HTMLElement
	);

	if (taskContainer)
	{
		taskContainer.render(<TaskComponent />);
	}
}

const CheckStringAllCharsIsSpace = (str: string) =>
{
	let result: boolean = true;

	for (const charInString of str)
	{
		if (charInString != ' ')
		{
			result = false;
			break;
		}
	}

	return result;
}

const CreateTask = () =>
{
	let taskTextInput = document.getElementById("task-text") as HTMLElement;

	if (taskTextInput.innerText != undefined && !CheckStringAllCharsIsSpace(taskTextInput.innerText))
	{
		let newTask: Task = new Task(taskTextInput.innerText);
		//TASK_LIST.AddTask(newTask);
		//TASK_LIST.RenderAllTasks();
	}

	taskTextInput.innerText = "";

	const TASK_CONTAINER_NAME = "container";
	RenderTaskInContainer(TASK_CONTAINER_NAME);
}

export const TaskCreator: React.FunctionComponent = () => (
	<>
		<div className="row mt-5">
			<div className="col-4"></div>
			<div className="col-4">
				<p className="text-center">Создать задачу</p>
				<div className="input-group">
					<input id="task-text" type="text" className="form-control" placeholder="Введите название задачи" aria-label="Введите название задачи" aria-describedby="button-addon" />
					<button id="button-addon" className="btn btn-outline-secondary" type="reset" onClick={CreateTask}>Добавить задачу в список</button>
				</div>
			</div>
		</div>
		<div id="container" className="row mt-2"></div>
	</>
);