class Task
{
	// Task name
	#_name;

	// Task priority
	#_priority;

	// Task date
	#_date;

	// Task status
	#_isDone;

	constructor(taskName, taskPriority = Number(0), taskDate = new Date(), taskIsDone = Boolean(false))
	{
		this.#_name = String(taskName);
		this.#_priority = Number(taskPriority);
		this.#_date = new Date(taskDate);
		this.#_isDone = Boolean(taskIsDone);
	}

	get name()
	{
		return this.#_name;
	}

	set name(newName)
	{
		this.#_name = String(newName);
	}

	get status()
	{
		return this.#_isDone;
	}

	set status(newStatus)
	{
		this.#_isDone = Boolean(newStatus);
	}
}

