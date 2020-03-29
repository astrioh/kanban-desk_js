class MainFrame {
    constructor(type) {
        this.type = type;
        this.taskLists = [];
    }
    
    addTaskList(type) {
        let taskList = new TaskList(type);
        this.taskLists.push(taskList);
        const hook = document.querySelector('.task-wrapper__main');
        let taskListEl = taskList.renderTaskList(type);
        hook.append(taskListEl);
        console.log(this.taskLists);
    }

    updateUI(type) {
        let mainFrame = document.querySelector('.task-wrapper__main');
        let taskLists = mainFrame.querySelectorAll('.task-list');

        taskLists.forEach(taskList => {
            taskList.querySelectorAll('.task-list__task').forEach(task => task.style.display = 'none');
            taskList.querySelectorAll(`.task-list__task_${type}`).forEach(task => task.style.display = 'flex');

            const addTaskBtn = taskList.querySelector('.task-list__add');
            if (type === 'finished') {
                addTaskBtn.style.display = 'none';
            } else {
                addTaskBtn.style.display = 'block';
            }
        });
    }
}

class TaskList {
    constructor(type) {
        this.type = type;
        this.tasks = [];
    }
    
    clearDeleted() {
        this.tasks.forEach((task, index) => {
            if (task.type === 'deleted') {
                this.tasks.splice(index, 1);
            }
        });
    }

    addTask(name, hook) {
        let task = new Task('active', name);
        this.tasks.push(task);
        let taskEl = task.renderTaskEl();
        hook.prepend(taskEl);
        this.clearDeleted();
    }
    
    renderTaskList(type) {
        let taskListEl = document.createElement('div');

        taskListEl.innerHTML = `
            <div class="task-list task-list_${type}">
                <div class="task-list__header task-list__header_${type}">
                    <h2 class="task-list__title">Sample name</h2>
                    <img class="task-list__edit" src="./img/edit.png" alt="edit">
                </div>
                <ul class="task-list__tasks"></ul>
            </div>`;

        const editTaskListTitle = taskListEl.querySelector('.task-list__edit');
        editTaskListTitle.addEventListener('click', e => {
            let text = prompt('Введите название списка: ');
            e.currentTarget.parentNode.querySelector('.task-list__title').textContent = text;
        });
        
        if (type === 'active') {
            let addBtn = document.createElement('li');
            addBtn.innerHTML = `<button class="add-btn task-list__add">+</button>`;
            
            addBtn.addEventListener('click', e => {
                let name = prompt('Enter task name: ');
                let hook = e.currentTarget.parentNode;
                this.addTask(name, hook);
            });
            
            taskListEl.querySelector('.task-list__tasks').append(addBtn);
        }
        return taskListEl;
    }
}

class Task {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }

    renderTaskEl() {
        let taskEl = document.createElement('li');

        taskEl.innerHTML = `
            <li class="task-list__task task-list__task_${this.type}">
                <div>
                    <input id="do-${this.name}" type="checkbox" class="task-list__check">
                    <label for="do-${this.name}" class="task-list__description">${this.name}</label>
                </div>
                <div>
                    <button class="task-list__edit-task">Edit</button>
                    <button class="task-list__delete-task">Del</button>
                </div>
            </li>
        `;

        const checkBtn = taskEl.querySelector('.task-list__check');
        checkBtn.addEventListener('click', e => {
            if (this.type === 'active') {
                this.type = 'finished';
                e.currentTarget.parentNode.parentNode.classList = 'task-list__task task-list__task_finished';
                e.currentTarget.parentNode.parentNode.style.display = 'none';
            }
        });
        
        const editBtn = taskEl.querySelector('.task-list__edit-task');
        editBtn.addEventListener('click', e => {
            let text = prompt('Введите новое название: ');
            this.name = text;
            e.currentTarget.parentNode.parentNode.querySelector('.task-list__description').textContent = text;
        });

        const deleteBtn = taskEl.querySelector('.task-list__delete-task');
        deleteBtn.addEventListener('click', e => {
            e.currentTarget.parentNode.parentNode.remove();
            this.type = 'deleted';
        });

        return taskEl;
    }
}

const mainFrame = new MainFrame('active');

mainFrame.addTaskList('active');

const addTaskListBtn = document.querySelector('.task-wrapper__add'),
    activeBtn = document.querySelector('.task-wrapper__switch-active'),
    finishedBtn = document.querySelector('.task-wrapper__switch-finished');

addTaskListBtn.addEventListener('click', mainFrame.addTaskList.bind(mainFrame, 'active'));

activeBtn.addEventListener('click', e => {
    activeBtn.classList.add('task-wrapper__switch-btn_selected');
    finishedBtn.classList.remove('task-wrapper__switch-btn_selected');
    mainFrame.updateUI('active');
});

finishedBtn.addEventListener('click', e => {
    finishedBtn.classList.add('task-wrapper__switch-btn_selected');
    activeBtn.classList.remove('task-wrapper__switch-btn_selected');
    mainFrame.updateUI('finished');
});