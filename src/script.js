let AddEventEnterKeyUp = () =>
{
	const ENTER_KEY_CODE = 13;
	let textAddedTask = document.getElementById('task-text');
	
	textAddedTask.addEventListener('keyup', (event) => {
		if(event.keyCode === ENTER_KEY_CODE)
		{
			AddTask(textAddedTask.value);
		}
	});
}

let AddEvents = () =>
{
	AddEventEnterKeyUp();
}

let GetTextFromTaskInputField = () =>
{
	let taskText = String(document.getElementById('task-text').value);
	return taskText;
}

let ClearTextFromTaskInputField = () =>
{
	let resultText = document.getElementById('task-text');
	resultText.value = null;
}

let CheckStringAllCharsIsSpace = (str) =>
{
	let result = true;
	
	for(let charInString of String(str))
	{
		if(charInString != ' ')
		{
			result = false;
			break;
		}
	}
	
	return result;
}

let AddTask = (taskText, taskIsDone = false) =>
{
	const INDENT_LEFT = 3;
	const CENTER_DIV_SIZE = 6;
	
	if(String(taskText) && !CheckStringAllCharsIsSpace(taskText))
	{
		let newRow = document.createElement('div');
		newRow.classList.add('row');
		
		let divMarginLeft = document.createElement('div');
		divMarginLeft.classList.add(`col-${INDENT_LEFT}`);
		
		let divInputGroup = document.createElement('div');
		divInputGroup.classList.add(`col-${CENTER_DIV_SIZE}`);
		
		let inputGroup = document.createElement('div');
		inputGroup.classList.add('input-group');
		inputGroup.classList.add('mb-3');
		inputGroup.classList.add('mt-3');
		
		let inputTaskText = document.createElement('input');
		inputTaskText.classList.add('form-control');
		inputTaskText.classList.add('text-center');
		
		if(taskIsDone)
		{
			inputTaskText.classList.add('text-success');
		}
		else
		{
			inputTaskText.classList.add('text-danger');
		}
		
		inputTaskText.value = String(taskText);
		
		let switchStatusButton = document.createElement('button');
		switchStatusButton.classList.add('btn');
		switchStatusButton.classList.add('btn-primary');
		
		let iconForSwitchStatusButton = document.createElement('i');
		iconForSwitchStatusButton.classList.add('bi');
		iconForSwitchStatusButton.classList.add('bi-calendar-check');
		
		switchStatusButton.appendChild(iconForSwitchStatusButton);
		
		switchStatusButton.addEventListener('click', (event) => {
			let targetElement = event.target;
			let taskTextAsHtml;
			
			if(targetElement.classList.contains('bi'))
			{
				taskTextAsHtml = targetElement.parentNode.parentNode.firstChild;
			}
			else
			{
				taskTextAsHtml = targetElement.parentNode.firstChild;
			}
			
			if(taskTextAsHtml.classList.contains('text-success'))
			{
				taskTextAsHtml.classList.remove('text-success');
				taskTextAsHtml.classList.add('text-danger');
			}
			else
			{
				taskTextAsHtml.classList.remove('text-danger');
				taskTextAsHtml.classList.add('text-success');
			}
		});
		
		let deleteButton = document.createElement('button');
		deleteButton.classList.add('btn');
		deleteButton.classList.add('btn-outline-danger');
		deleteButton.innerText = 'Delete';
		deleteButton.addEventListener('click', (event) => {
			let deleteRow = event.target.parentNode.parentNode.parentNode;
			let rowContainer = document.getElementById('container');
			rowContainer.removeChild(deleteRow);
		});
		
		inputGroup.appendChild(inputTaskText);
		inputGroup.appendChild(switchStatusButton);
		inputGroup.appendChild(deleteButton);
		
		divInputGroup.appendChild(inputGroup);
		
		newRow.appendChild(divMarginLeft);
		newRow.appendChild(divInputGroup);

		let adminElement = document.getElementById('container');
		adminElement.appendChild(newRow);
	
		ClearTextFromTaskInputField();
	}
}

let CheckAvailableTask = () =>
{
	let result = Boolean(false);
	
	let taskContainer = document.getElementById('container');
	let taskListAsHtml = taskContainer.childNodes;
	
	if(taskListAsHtml.length)
	{
		result = true;
	}
	
	return result;
}

let LoadDataFromFile = (eventOpenFile) =>
{
	if(!CheckAvailableTask())
	{
		let reader = new FileReader();
		reader.readAsText(eventOpenFile.files[0]);
	
		reader.onload = function() {
		let dataFromFile = JSON.parse(reader.result);
		
			for(let taskFromFile of dataFromFile)
			{
				AddTask(taskFromFile.taskName, taskFromFile.taskStatus);
			}
		};
	}
	else
	{
		if(confirm('Хотите ли удалить уже существующие задачи?'))
		{
			alert('Функционал в разработке..................');
		}
	}
}

let SaveDataToFile = (downloadButton, fileName = 'data') =>
{
	const FILE_TYPE = '.json';
	
	let taskList = [];
	const keysForJsonFile = ['taskName', 'taskStatus'];
	
	let taskListAsHtml = document.getElementById('container').childNodes;
	
	if(CheckAvailableTask())
	{
		for(let taskAsHtml of taskListAsHtml)
		{
			let taskTextAsHtml = taskAsHtml.lastChild.firstChild.firstChild;
			
			let taskStatus = false;
			if(taskTextAsHtml.classList.contains('text-success'))
			{
				taskStatus = true;
			}
			
			let taskAsObject = {[keysForJsonFile[0]] : taskTextAsHtml.value,
				[keysForJsonFile[1]] : taskStatus};
			taskList.push(taskAsObject);
		}
	
		const taskListAsJson = JSON.stringify(taskList);
	
		var file = new Blob([taskListAsJson], {type: 'text/plain'});
	
		downloadButton.href = URL.createObjectURL(file);
		downloadButton.download = fileName + FILE_TYPE;
	}
	else
	{
		if(Number(String(downloadButton.href).indexOf('blob')) != -1)
		{
			downloadButton.href = '#';
			downloadButton.download = null;
		}
		alert('Задач для сохранения не существует!');
	}
}