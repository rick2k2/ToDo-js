const task_name = document.getElementById("task_heading");
const task_description= document.getElementById("task_description");
const message = document.getElementById("message");
const addtask_btn = document.getElementById("add_task");
const tasks_count = document.getElementById("show_num_tasks");


const weakday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const d =  new Date();
const time = `${d.getHours()}:${d.getMinutes()}`;
const dd= d.getDate();
const d1 = d.getDay();
let day = 0;
for(i=0;i<weakday.length;i++){
    day = weakday[d1];
}
let mm = d.getMonth();
let month=0;
if(mm+1 < 10){
    month = `0${mm+1}`;
}
else{
    month = `${mm+1}`;
}
const y = d.getFullYear();
const date = `${dd}-${month}-${y} | Day:${day}`;


// Array
let task = JSON.parse(localStorage.getItem("new_task")) || [];
const total_task = task.length;

tasks_count.innerHTML=`Total tasks Count: ${total_task}`;


// const time =`12:00 AM`;
// const date =`31-07-2023`;
// Loop through existing tasks and render them
for (const t of task) {
    newTaskDiv(t.name, t.description, time, date);
}


// when click the button add task in arr and later set in localStorage
addtask_btn.addEventListener("click",()=>{
    const tn = task_name.value;
    const td = task_description.value;

    const newTask = {
        name: tn,
        description: td,
    };

    // newtask.name =  tn;
    // newtask.description = td;

    task.push(newTask);

    const task_object_convert_string = JSON.stringify(task);
    localStorage.setItem("new_task",task_object_convert_string);
    newTaskDiv(tn, td, time, date);

    task_name.value = ""; // Clear the input fields after adding a new task
    task_description.value = "";

    tasks_count.innerHTML = `Total tasks Count: ${task.length}`; // Update the total_task count      
}); 


  
// function new task div
function newTaskDiv(task_title="Default",task_description="Default",time="Default",date="Default"){
const tc = document.getElementById("tasks_container");
const div1 = document.createElement("div");
div1.setAttribute("class","task_list_item");
tc.append(div1);
const h3 = document.createElement("h3");
h3.innerHTML = `Title: ${task_title}`
div1.append(h3);
const delete_btn = document.createElement("button");
delete_btn.setAttribute("id","delete_task");
delete_btn.innerHTML ="X";
h3.append(delete_btn);
const span = document.createElement("span");
span.innerHTML = `Description: ${task_description}`;
div1.append(span);
const div2 = document.createElement("div");
div2.setAttribute("class","date_time");
div1.append(div2);
const p1 = document.createElement("p");
p1.innerHTML = `Time: ${time}`;
const p2 = document.createElement("p");
p2.innerHTML = `Date: ${date}`
div2.append(p1);
div2.append(p2);
const message = document.getElementById("message");
message.innerHTML = `Your Task has been added Successfully`;
message.style.color ="green";

// Delete button work
delete_btn.addEventListener("click",deleteTask);

// delete task function
function deleteTask(){
    div1.remove();
    message.innerHTML = `Your Task has been deleted Successfully`;
    message.style.color = "red";

    // Remove the task from the array based on its name and description
    task = task.filter((t) => t.name !== task_title && t.description !== task_description);

    // Update the total_task count after deleting a task
    tasks_count.innerHTML = `Total tasks Count: ${task.length}`;

    // Update the localStorage after deleting the task
    const task_object_convert_string = JSON.stringify(task);
    localStorage.setItem("new_task", task_object_convert_string);
}
}