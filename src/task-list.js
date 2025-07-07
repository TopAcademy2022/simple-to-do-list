class TaskList
{
	// List of tasks
	#_taskList;

	constructor()
	{
		this.#_taskList = new Array();
	}

	get taskList()
	{
		return this.#_taskList;
	}

	// Remove all tasks from task list
	#RemoveAllTasks()
	{
		this.#_taskList.splice(0, this.#_taskList.length);
	}

	#ClearRenderContainer()
	{
		let tasksContainer = document.getElementById('container');
		tasksContainer.innerHTML = null;
	}

	static FindIndexTaskInList(taskList, findedTask)
	{
		let indexOfTask = -1;
		let iterator = 0;

		for (let taskInList of taskList)
		{
			if (taskInList.name === findedTask.name &&
				taskInList.status === findedTask.status)
			{
				indexOfTask = iterator;
				break;
			}
			iterator++;
		}

		return indexOfTask;
	}

	#RenderTask(task, taskList)
	{
		let Input = document.createElement('input');

		// Render size
		const SIZE_INDENT_LEFT = 3;
		const SIZE_CENTER_DIV = 6;
	

		// Create main row for task
		let taskRowHtml = document.createElement('div');
		taskRowHtml.classList.add('row');

		// Create margin left for main row
		let divMarginLeft = document.createElement('div');
		divMarginLeft.classList.add(`col-${SIZE_INDENT_LEFT}`);

		// Create main div with task contents
		let divTaskContents = document.createElement('div');
		divTaskContents.classList.add(`col-${SIZE_CENTER_DIV}`);

		// Create input group for task text and control buttons
		let taskContentsInputGroup = document.createElement('div');
		taskContentsInputGroup.classList.add('input-group');
		taskContentsInputGroup.classList.add('mb-3');
		taskContentsInputGroup.classList.add('mt-3');

		// Create input with task text
		let taskAsInputField = document.createElement('input');
		taskAsInputField.classList.add('form-control');
		taskAsInputField.classList.add('text-center');


		// Set task color
		if (task.status)
		{
			taskAsInputField.classList.add('text-success');
		}
		else
		{
			taskAsInputField.classList.add('text-danger');
		}

		// Set task text
		taskAsInputField.value = task.name;

		// Create button for switch task status
		let switchTaskStatusButton = document.createElement('button');
		switchTaskStatusButton.classList.add('btn');
		switchTaskStatusButton.classList.add('btn-danger');

		// Create icon for button of switch task status
		let iconSwitchTaskStatusButton = document.createElement('i');
		iconSwitchTaskStatusButton.classList.add('bi');
		iconSwitchTaskStatusButton.classList.add('bi-calendar-check');

		// Add icon for button
		switchTaskStatusButton.appendChild(iconSwitchTaskStatusButton);

		// Create button for delete task
		let deleteTaskButton = document.createElement('button');
		deleteTaskButton.classList.add('btn');
		deleteTaskButton.classList.add('btn-outline-danger');
		deleteTaskButton.innerText = 'Delete';

		// Visible elements for task contents in input group
		
		taskContentsInputGroup.appendChild(Input);
		Input.setAttribute('type' , 'Date');
		Input.setAttribute('class' , 'input-group-text');
		taskContentsInputGroup.appendChild(taskAsInputField);
		taskContentsInputGroup.appendChild(switchTaskStatusButton);
		taskContentsInputGroup.appendChild(deleteTaskButton);
		
		// Visible input group with task contents
		divTaskContents.appendChild(taskContentsInputGroup);

		// Visible main div with task contents
		taskRowHtml.appendChild(divMarginLeft);
		taskRowHtml.appendChild(divTaskContents);

		// Get container for tasks
		let tasksContainer = document.getElementById('container');
		tasksContainer.appendChild(taskRowHtml);

		// Add event for task input of set new task text
		taskAsInputField.addEventListener('input', (event) =>
		{
			task.name = event.target.value;
		});

		// Add event for button of switch task status
		switchTaskStatusButton.addEventListener('click', (event) =>
		{
			let targetElement = event.target;
			let taskAsInputField;

			if (targetElement.classList.contains('bi'))
			{
				taskAsInputField = targetElement.parentNode.parentNode.firstChild;
			}
			else
			{
				taskAsInputField = targetElement.parentNode.firstChild;
			}

			task.status = Boolean(!task.status);

			if (task.status)
			{
				taskAsInputField.classList.remove('text-danger');
				taskAsInputField.classList.add('text-success');

				switchTaskStatusButton.classList.remove('btn-danger');
				switchTaskStatusButton.classList.add('btn-success');
			}
			else
			{
				taskAsInputField.classList.remove('text-success');
				taskAsInputField.classList.add('text-danger');

				switchTaskStatusButton.classList.remove('btn-success');
				switchTaskStatusButton.classList.add('btn-danger');
			}
		});

		// Add event for button of delete task
		deleteTaskButton.addEventListener('click', (event) =>
		{
			const DELETED_TASK_INDEX = TaskList.FindIndexTaskInList(taskList, task);
			taskList = taskList.splice(DELETED_TASK_INDEX, 1);

			let deletedTaskRow = event.target.parentNode.parentNode.parentNode;
			let tasksContainer = document.getElementById('container');
			tasksContainer.removeChild(deletedTaskRow);
		});
	}

	// Add new task in task list
	AddTask(task)
	{
		if (task instanceof Task)
		{
			this.#_taskList.push(task);
		}
		else
		{
			console.log('this object not Task member');
		}
	}

	RenderAllTasks()
	{
		this.#ClearRenderContainer();

		for (let task of this.#_taskList)
		{
			this.#RenderTask(task, this.#_taskList);
		}
	}

SaveTasksToFile(downloadButton, fileName)
{
	const FILE_TYPE = '.json';

	if (this.#_taskList.length)
	{
		let tasksAsJson = [];

		for (let task of this.#_taskList)
		{
let taskAsJson = {
	taskName: task.name,
	taskStatus: task.status,
	taskDate: task.date.toISOString(),
	taskPriority: task.priority
};

			tasksAsJson.push(taskAsJson);
		}

		let downloadFile = new Blob([JSON.stringify(tasksAsJson, null, 2)], { type: 'application/json' });

		downloadButton.href = URL.createObjectURL(downloadFile);
		downloadButton.download = fileName + FILE_TYPE;
	}
	else
	{
		if (String(downloadButton.href).includes('blob'))
		{
			downloadButton.href = '#';
			downloadButton.download = null;
		}
		alert('Задач для сохранения не существует!');
	}
}


LoadTasksFromFile(eventOpenFile)
{
	if (this.#_taskList.length)
	{
		if (confirm('Хотите ли удалить уже существующие задачи?'))
		{
			this.#RemoveAllTasks();
		}
	}

	let fileReader = new FileReader();
	fileReader.readAsText(eventOpenFile.files[0]);

	fileReader.onloadend = () => {
		try {
			let dataFromFile = JSON.parse(fileReader.result);

			for (let taskFromFile of dataFromFile)
			{
let newTask = new Task(
	taskFromFile.taskName,
	Number(taskFromFile.taskPriority),
	new Date(taskFromFile.taskDate),
	Boolean(taskFromFile.taskStatus)
);

				this.AddTask(newTask);
			}

			this.RenderAllTasks();
		} catch (e) {
			alert("Ошибка загрузки задач: " + e.message);
			console.error(e);
		}
	};
}

}