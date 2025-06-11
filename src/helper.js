// MAIN task list
const TASK_LIST = new TaskList();

let AddEventEnterKeyUp = (taskText) => {
    const ENTER_KEY_CODE = 13;
    
    taskText.addEventListener('keyup', (event) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            AddTask();
        }
    });
}
let AddEvents = (taskText) => {
    AddEventEnterKeyUp(taskText);
}

let GetTextFromTaskInputField = () => {
    let taskText = document.getElementById('task-text').value;
    return taskText;
}
let ClearTextFromTaskInputField = () => {
    let taskText = document.getElementById('task-text');
    taskText.value = null;
}

let CheckStringAllCharsIsSpace = (str) => {
    let result = true;

    for (let charInString of String(str)) {
        if (charInString != ' ') {
            result = false;
            break;
        }
    }

    return result;
}
let AddTask = () => {
    let taskText = GetTextFromTaskInputField();

    if (String(taskText) && !CheckStringAllCharsIsSpace(taskText)) {
        let newTask = new Task(taskText);
        TASK_LIST.AddTask(newTask);
        TASK_LIST.RenderAllTasks();
    }

    ClearTextFromTaskInputField();
}
let LoadDataFromFile = (eventOpenFile) => {
    TASK_LIST.LoadTasksFromFile(eventOpenFile);
}
let SaveDataToFile = (downloadButton, fileName = 'data') => {
    TASK_LIST.SaveTasksToFile(downloadButton, fileName);
}
let ChangeBackgroundColor = (newBackgroundColor) => {
    let navbarMenu = document.getElementById('main-menu');
    let currentBackgroundColor = navbarMenu.classList[navbarMenu.classList.length - 1];

    if (navbarMenu.style.backgroundImage) {
        navbarMenu.style.backgroundImage = null;
        navbarMenu.style.backgroundRepeat = null;
        navbarMenu.style.backgroundSize = null;
        navbarMenu.style.backgroundPosition = null;
    }

    if (newBackgroundColor != currentBackgroundColor) {
        navbarMenu.classList.remove(currentBackgroundColor);
        navbarMenu.classList.add(newBackgroundColor);
    }
}

let LoadImageAsBackgroundColor = (eventOpenFile) => {
    let navbarMenu = document.getElementById('main-menu');

    let reader = new FileReader();
    reader.readAsDataURL(eventOpenFile.files[0]);

    reader.onload = function () {
        navbarMenu.style.backgroundImage = `url(${reader.result})`;
        navbarMenu.style.backgroundRepeat = 'no-repeat';
        navbarMenu.style.backgroundSize = 'cover';
        navbarMenu.style.backgroundPosition = 'center center';
    };

    let openImageInput = document.getElementById('file-open-image');
    openImageInput.value = null;
}