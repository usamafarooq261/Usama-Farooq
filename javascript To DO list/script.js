function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
  
    const taskText = newTaskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }
  
    const newTaskItem = document.createElement('li');
    newTaskItem.innerText = taskText;
  
    taskList.appendChild(newTaskItem);
    newTaskInput.value = '';
  }
  