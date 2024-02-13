const addRef = document.querySelector('.action-wrapper .add');
const removeRef = document.querySelector('.action-wrapper .delete');
const modalRef = document.querySelector('.modal');
const textareaRef = document.querySelector('.modal .left-section textarea');
const taskWrapperRef = document.querySelector('.tasks-wrapper');
const rightCategorySelection = document.querySelectorAll('.right-section .category');
const taskListDeleteRef = document.querySelectorAll('.tasks-wrapper .task .task-delete-icon');


const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
function addTasksInData(newTask) {
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


textareaRef.addEventListener('keydown',function(e){

    if (e.key == "Enter") {
        console.log(e.key);
        const rightSelectedCategory = document.querySelector('.right-section .category.selected');
        const selectedCategoryName = rightSelectedCategory.getAttribute('data-category');
        const newTask = {
            id: Math.random(),
            title: e.target.value,
            category: selectedCategoryName,
        };
        addTasksInData(newTask);
        e.target.value = "";
        toggleModal();
        createTask(newTask);
    }
})

function createTask(task) {
        const taskRef = document.createElement('div');
        taskRef.className = 'task';
        //taskRef.dataset.id = task.id;
        taskRef.innerHTML =  `
            <div class="task-category ${task.category}"> </div>
            <div class="task-id">${task.id}</div>
             <div class="task-title">${task.title}</div>
             <div class="task-delete-icon"><i class="fa-solid fa-trash"></i></div>
        `;
        taskWrapperRef.appendChild(taskRef);

       
    
}
rightCategorySelection.forEach(function(categoryRef) {
    categoryRef.addEventListener('click', function(e) {
        removeAllCategorySelection();
        e.target.classList.add("selected");
    })
});

function removeAllCategorySelection() {
    rightCategorySelection.forEach(function(categoryRef) {
        categoryRef.classList.remove('selected');
    })
}

addRef.addEventListener('click',function(e){
    toggleModal();
   
})

function toggleModal(){
    const isHidden = modalRef.classList.contains('hide');
    
    if(isHidden){
        modalRef.classList.remove('hide');
    }
    else{
        modalRef.classList.add('hide');
    }
}



function deleteTaskFromData(taskId){
    const selectedTaskIdx= tasks.findIndex((task)=>Number(task.id)===Number(taskId));
    tasks.splice( selectedTaskIdx,1);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//event Bubbling
taskWrapperRef.addEventListener('click',function(e){
    //console.log(e.target.classList.contains('fa-trash'));
 
    if(e.target.classList.contains('fa-trash')){
        const currentTaskRef= e.target.closest('.task');
        currentTaskRef.remove();
        //const taskId= e.target.getAttribute('task-id');
       const taskId = currentTaskRef.dataset.id;
        deleteTaskFromData(taskId);
    }

})
function renderTaskList() {
    tasks.forEach((task) => {
        createTask(task);
    })
}
renderTaskList();
