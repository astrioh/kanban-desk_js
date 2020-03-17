class MainFrame {
    constructor(type) {
        this.type = type;
        this.taskLists = [];
    }
    addTaskList(type) {
        let taskList = new TaskList(type);
        this.taskLists.push(taskList);
        const hook = document.querySelector('.task-wrapper__add');
        taskList.renderTaskList(type, hook);
        console.log(this.taskLists);
    }
    updateUI(type) {
        document.querySelector('.task-wrapper__main').remove();
        let mainFrame = document.createElement('div');
        mainFrame.classList.add('.task-wrapper__main');
        for (let taskList of this.taskLists) {
            let taskListEl = new TaskList(type);
            taskListEl.renderTaskList(type, document.querySelector('.task-wrapper__add'));
            for (let task of taskList.tasks) {
                if (task.type === type) {

                }
            }
        }
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
        task.renderTaskEl('active', hook);
    }
    renderTaskList(type, hook) {
        let taskListEl = document.createElement('div');
        taskListEl.innerHTML = `
            <div class="task-list task-list_${type}">
                <div class="task-list__header">
                    <h2 class="task-list__title">Sample name</h2>
                    <img class="task-list__edit" src="./img/edit.png" alt="edit">
                </div>
                <ul class="task-list__tasks"></ul>
            </div>`;
        if (type === 'active') {
            let addBtn = document.createElement('li');
            addBtn.innerHTML = `<button class="add-btn task-list__add">+</button>`;
            
            addBtn.addEventListener('click', e => {
                let name = prompt('Enter task name: ');
                let hook = e.currentTarget;
                this.addTask(name, hook);
            });
            
            taskListEl.querySelector('.task-list__tasks').append(addBtn);
        }
        hook.before(taskListEl);
    }
}

class Task {
    constructor(name) {
        this.type = 'active';
        this.name = name;
    }
    renderTaskEl(type, hook) {
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
mainFrame.addTaskList('active');
let addTaskListBtn = document.querySelector('.task-wrapper__add');
addTaskListBtn.addEventListener('click', mainFrame.addTaskList.bind(mainFrame, 'active'));