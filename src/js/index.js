class MainFrame {
    constructor(type) {
        this.type = type;
        this.taskLists = [];
    }
    addTaskList() {
        let taskList = new TaskList('active');
        this.taskLists.push(taskList);
        console.log(this.taskLists);

        let taskListEl = document.createElement('div');
        taskListEl.innerHTML = `
            <div class="task-list task-list_active">
                <div class="task-list__header">
                    <h2 class="task-list__title">Sample name</h2>
                    <img class="task-list__edit" src="./img/edit.png" alt="edit">
                </div>
                <ul class="task-list__tasks">
                    <li><button class="add-btn task-list__add">+</button></li>
                </ul>
            </div>`;
        taskListEl.querySelector('.task-list__add').addEventListener('click', e => {
            let name = prompt('Enter task name: ');
            let hook = e.currentTarget;

            taskList.addTask(name, hook);
        });
        let renderHookBefore = document.querySelector('.task-wrapper__add');
        renderHookBefore.before(taskListEl);
        console.log(this.taskLists);
    }
}

class TaskList {
    constructor(type) {
        this.type = type;
        this.tasks = [];
    }
    addTask(name, hook) {
        let task = new Task(name);
        this.tasks.push(task);
        task.renderTaskEl(hook);
    }
    
}

class Task {
    constructor(name) {
        this.type = 'active';
        this.name = name;
    }
    renderTaskEl(hook) {
        let taskEl = document.createElement('li');
        taskEl.innerHTML = `
            <li class="task-list__task">
                <div>
                    <input id="do-${this.name}" type="checkbox" class="task-list__check">
                    <label for="do-${this.name}" class="task-list__description">${this.name}</label>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Del</button>
                </div>
            </li>
        `;
        taskEl.querySelector('.task-list__check').addEventListener('click', e => {
            this.type = 'finished';
            e.currentTarget.parentNode.parentNode.remove();
        });
        hook.before(taskEl);
    }
}

let mainFrame = new MainFrame('active');
mainFrame.addTaskList();
let addTaskListBtn = document.querySelector('.task-wrapper__add');
addTaskListBtn.addEventListener('click', mainFrame.addTaskList.bind(mainFrame));