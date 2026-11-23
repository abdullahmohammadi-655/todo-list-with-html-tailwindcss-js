

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";


const taskEl = document.getElementById('task');
const registerBtn = document.getElementById('register');
const displayEl = document.getElementById('display');
const confirmEl = document.querySelector(".confirm");
const deleteBtnEl = document.querySelector(".deletebtn");
const nodeleteBtnEl = document.querySelector(".nodeletebtn");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


let selectedId;
registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const taskValue = taskEl.value;
      if (!taskValue) {
            Toastify({
                  text: "لطفا تسک را نوشته کنید",
                  close: true,
                  duration: 700,
                  gravity: "top",
                  style: {
                        background: "red"
                  }
            }).showToast();
            return;
      }
      
      
      const task = { id: Date.now(), title: taskValue, completed: false };
      tasks.push(task);
      localStorage.setItem("tasks",JSON.stringify(tasks));
      renderTasks();
})


function renderTasks() {
      displayEl.innerHTML = "";
      if(tasks.length === 0){
            const h1 = document.createElement('h1');
            h1.classList.add("w-full","text-center","font-bold","text-red-700","text-xl")
            h1.innerHTML = "هنوز هیچ تسک ثبت نشده است."
           displayEl.append(h1);
            
      }
      tasks.forEach(task => {
            displayEl.innerHTML += `
                       <div>
                           <div class="flex justify-between items-center space-y-3">
                           
                           <p class="font-kaj title ${task.completed ? "line-through" : ""}">
                                <i class="fa-solid fa-tag text-red-700"></i>
                                 ${task.title}
                           </p>

                           <div class="flex w-1/4 space-x-4">
                              <i class="fa-solid fa-trash  hover:cursor-pointer text-red-700 delete" data-id="${task.id}"></i>
                              <i class="fa-solid fa-edit hover:cursor-pointer text-orange-400"></i>
                             <i class="fa-solid ${task.completed ? "fa-check" : "fa-hourglass-half"} text-indigo-700 toggle" data-id="${task.id}"></i>
                           </div>
                           </div>
                       </div>
                     `
      });


      taskEl.value = "";


}

renderTasks();
// event delegation
displayEl.addEventListener('click', (e) => {

      //  change task status 
        if(e.target.classList.contains('toggle')){
            const id = Number(e.target.dataset.id);
            const task = tasks.find((t) => t.id === id);
            task.completed = !task.completed

            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }


        // delete task section 
        if(e.target.classList.contains("delete")){
               confirmEl.classList.remove('hidden');
            const id = Number(e.target.dataset.id);
            selectedId = id;
            renderTasks();


        }





        
})


nodeleteBtnEl.addEventListener('click', () => {
        confirmEl.classList.add('hidden')
})


deleteBtnEl.addEventListener('click', () => {

const task = tasks.findIndex((t) => t.id === selectedId);

            if(task !== -1){
                  tasks.splice(task,1);
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));
             confirmEl.classList.add('hidden')
            renderTasks();
})


// module 
 // thirt party module
 // toasitify-js






