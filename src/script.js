document.addEventListener("DOMContentLoaded", () => {
	let button_addon = document.getElementById("button-addon");
	button_addon.addEventListener('click', () => { AddTask(GetTextFromTaskInputField()) });

	let btn_fo = document.getElementById("file-open");
	btn_fo.addEventListener('change', () => { LoadDataFromFile(btn_fo) });

	let btn_save = document.getElementById("btn-save");
	btn_save.addEventListener('click', () => { SaveDataToFile(btn_save) });

	let load_image = document.getElementById("file-open-image");
	load_image.addEventListener('change', () => { LoadImageAsBackgroundColor(load_image) });

	var dropdown_menu = document.querySelectorAll('.dropdown-item');
	let array = ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-secondary"];

	dropdown_menu.forEach(function (item) {
		item.addEventListener('click', function (event) {

			const index = Array.prototype.indexOf.call(dropdown_menu, event.target);
			
			ChangeBackgroundColor(array[index]);
		});
	});

	let taskText = document.getElementById('task-text');
	AddEvents(taskText);
});






















