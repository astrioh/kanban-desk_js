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
        taskListEl.querySelector('.task-list__add').addEventListener('click', (e) => {
            let name = prompt('Enter task name: ');
            taskList.addTask(name);
            let taskEl = taskList.renderTaskEl(name);
            e.currentTarget.before(taskEl);
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
    addTask(name) {
        let task = {
            type: 'active',
            name: name
        };
        this.tasks.push(task);

        
    }
    renderTaskEl(name) {
        let taskEl = document.createElement('li');
        taskEl.innerHTML = `
            <li class="task-list__task">
                <div>
                    <input id="do-${name}" type="checkbox" class="task-list__check">
                    <label for="do-${name}" class="task-list__description">${name}</label>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Del</button>
                </div>
            </li>
        `;
        return taskEl;
    }
}

let mainFrame = new MainFrame('active');
mainFrame.addTaskList();
let addTaskListBtn = document.querySelector('.task-wrapper__add');
addTaskListBtn.addEventListener('click', mainFrame.addTaskList.bind(mainFrame));

document.querySelector('.task-list__add').addEventListener('click', e => {
    
    let name = prompt('enter task name: ');
    
});