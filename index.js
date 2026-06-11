const taskInput = document.getElementById("task1");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
addBtn.addEventListener("click",() =>{
    if(taskInput.value.trim() === ""){
        alert("Enter a task");
        return;
    }
    const li=document.createElement("li");
    li.innerHTML= `
      <input type ="checkbox" class="checkTask">
      <span>${taskInput.value}</span>
      <button class="deleteBtn">❌</button>
      `;
    
    taskList.appendChild(li);
    setupTask(li);
    saveTasks();
    taskInput.value="";
    li.querySelector(".deleteBtn").addEventListener("click",()=>{
      li.remove();
      saveTasks();
    });
    const checkbox=li.querySelector(".checkTask");
    checkbox.addEventListener("change",() =>{
        const taskText = li.querySelector("span");
        if(checkbox.checked){
            taskText.style.textDecoration="line-through";
            taskText.style.opacity="0.6";
        }else{
            li.querySelector("span").style.textDecoration="none";
            taskText.style.opacity="1";
        }
    })
    saveTasks();
});
taskInput.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        addBtn.click();
    }
});
function saveTasks(){
    localStorage.setItem("tasks",taskList.innerHTML);
}
taskList.innerHTML = localStorage.getItem("tasks")||"";
document.querySelectorAll("#taskList li").forEach(setupTask);
function setupTask(li) {

    li.querySelector(".deleteBtn").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    const checkbox = li.querySelector(".checkTask");

    checkbox.addEventListener("change", () => {
        const taskText = li.querySelector("span");

        if (checkbox.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.6";
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.opacity = "1";
        }

        saveTasks();
    });
}