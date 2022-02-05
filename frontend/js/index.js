
// Variaveis para trabalhar com a manipulacao do DOM

const listName = document.querySelector('#listName')
const tasksList = document.querySelector('#tasksList')
const task = document.querySelector('#task')
const main = document.querySelector('#main')

// Principal function, onde renderiza os elementos e faz o link do API com o Front-end

async function print (){
    const tasksAll = await fetch(`http://localhost:8000/api/tasks`)
    const tasksData = await tasksAll.json()
    const tasksListAll = await fetch(`http://localhost:8000/api/tasksList`)
    const tasksListData = await tasksListAll.json()

    // Variavel onde sera gerado o corpo da pagina
    let container = ''

    // Geracao de TaskList, aqui renderiza a tasklist e usa o component de tasks
    tasksListData.forEach((tasksListData, index) => {
        container += 
        `                
        <article class="tasksList" id="tasksList">
        
            <div class="headerList">
            <h3 id="listName"> ${tasksListData.name} </h3> 
                <div class="headerList-span"> 
                    <span class="material-icons" data-add="${tasksListData.id}">add</span>

                    <div class="dropdown-list">
                        <span class="material-icons" id="data-optionsList" data-optionsList="${tasksListData.id}">more_vert</span> 

                        <div class="dropdown-content" data-contentList="">
                            <span class="material-icons" id="data-editList" data-nameList="${tasksListData.name}" data-descList="${tasksListData.description}" data-editList="${tasksListData.id}" >edit</span>
                            <span class="material-icons" id="data-deleteList" data-deleteList="${tasksListData.id}" >delete</span>
                        </div>

                    </div>
                </div>

            </div>
            
                ${component(tasksListData.id)}
                
        </article>

        `
    })

    // Esse "component" sao as tasks
    function component (list_id, description) {

        let container = ''

        let result = tasksData.filter(function(item, index) { 
            return String(item.list_id) === String(list_id) 

        }) 

        result.forEach((tasksData, index) =>{
            container += `
            <div class="task">
                <input type="checkbox" ${tasksData.done == true ? "checked": ""} data-done="${tasksData.done}" data-checkbox="${tasksData.id}" data-checkboxDesc="${tasksData.description}" data-checkboxList="${tasksData.list_id}" id="checkBox" class="checkbox-round"> 
                <label for="checkbox" class="strikethrough" id="label"> ${tasksData.description} </label>
                <span class="material-icons" class="data-edit" id="data-edit" data-label="${tasksData.description}" data-edit="${tasksData.id}" data-list="${tasksData.list_id}" >edit</span>
                <span class="material-icons" data-remove="${tasksData.id}" >delete</span>
            </div>

        `
        })

        return container

    }


    main.innerHTML = container
}

/* Tasks HTTP requests */

// Delete task
function destroyTask(taskId){

   fetch('http://localhost:8000/api/tasks/' + taskId, {
       method: 'DELETE'
   })
    .then(res => print(tasksList)) 
    
}

document.body.addEventListener('click', function (event) {
    const taskId = event.target.getAttribute('data-remove')    

    if(taskId){
        if (window.confirm("Você realmente quer deletar essa tarefa?")) {
            destroyTask(taskId)
        }
        
    }

})

//Update task

function updateTask(taskId, tasksListId, taskNewDesc){

    fetch('http://localhost:8000/api/tasks/' + taskId, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json' // Indicates the content 
           },
        body: JSON.stringify(
            {
                "description": taskNewDesc,
                "done":false,
                "list_id": tasksListId
            }
        ) // We send data in JSON format
          
    })
     .then(res => print(tasksList)) 
     
 }

document.body.addEventListener('click', function (event) {

        const taskId = event.target.getAttribute('data-edit')   
        const taskDesc = event.target.getAttribute('data-label')   
        const tasksListId = event.target.getAttribute('data-list')
       

          if(taskId){
            if(taskNewDesc = window.prompt("Modifique sua mensagem:", taskDesc)){
                updateTask(taskId, tasksListId, taskNewDesc) 
                }
            } 
    })

    // Create task
    function createTask(tasksListId){

        fetch('http://localhost:8000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json' // Indicates the content 
               },
            body: JSON.stringify(
                {
                    "description": newTask,
                    "list_id": tasksListId
                }
            ) // We send data in JSON format
              
        })
         .then(res => print(tasksList)) 
         
     }

     document.body.addEventListener('click', function (event) {
    
            const tasksListId = event.target.getAttribute('data-add')
                          
            if(tasksListId){
                if (newTask = window.prompt("Descreva sua terefa:")) {
                        createTask(tasksListId, newTask)
                }
            }
        })

 /* TasksList HTTP requests */

 // Create taskList
    function createTasksList(TasksListName, TasksListDesc){

        fetch('http://localhost:8000/api/tasksList', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json' // Indicates the content 
               },
            body: JSON.stringify(
                {
                    "name": TasksListName,
                    "description": TasksListDesc
                }
            ) // We send data in JSON format
              
        })
         .then(res => print(tasksList)) 
         
     }

     document.querySelector('#material-icons-add').addEventListener('click', function (event) {
    
            
           if(TasksListName = window.prompt("Qual nome da sua lista?")){
               if(TasksListDesc = window.prompt("Descreva sua lista")){
                   createTasksList(TasksListName, TasksListDesc)
               }   
           }
        })

// Update taskList
function updateTasksList(tasksListId, tasksListNewName, tasksListNewDesc){

    fetch('http://localhost:8000/api/tasksList/' + tasksListId,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json' // Indicates the content 
           },
        body: JSON.stringify(
            {
                "name": tasksListNewName,
                "description": tasksListNewDesc
            }
        ) // We send data in JSON format
          
    })
     .then(res => print(tasksList)) 
     
 }

 document.body.addEventListener('click', function (event) {

   
    const tasksListId = event.target.getAttribute('data-editList')
    const tasksListName = event.target.getAttribute('data-nameList')
    const tasksListDesc = event.target.getAttribute('data-descList')

    if(tasksListId){
        if(tasksListNewName = window.prompt('Modifique o nome da sua lista:', tasksListName)){
            if(tasksListNewDesc = window.prompt('Modifique a descricao da sua lista:', tasksListDesc)){
                updateTasksList(tasksListId, tasksListNewName, tasksListNewDesc)
            }
        }
    }


            
 })

 // Delete taskList

 function destroyTasksList(tasksListId){

    fetch('http://localhost:8000/api/tasksList/' + tasksListId, {
               method: 'DELETE'
           })
            .then(function (res){
                if (!res.ok) {
                    alert('Para deletar uma lista ela precisa estar vazia!')
                }
               print(tasksList)
            })


     
 }
 
 document.body.addEventListener('click', function (event) {

     const tasksListId = event.target.getAttribute('data-deleteList')    
 
     if(tasksListId){
         if (window.confirm("Você realmente quer deletar essa lista?")) {
             destroyTasksList(tasksListId)
         }
         
     }
 
 })


 // Done task

 function tasksDone(tasksCheckId, tasksCheckDone, tasksCheckDesc, tasksCheckList){

    let doneX

     if(tasksCheckDone === "true"){
        doneX = false
    }
    if(tasksCheckDone === "false"){
        doneX = true
    }
   
    fetch('http://localhost:8000/api/tasks/' + tasksCheckId, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json' // Indicates the content 
           },
        body: JSON.stringify(
            {
                "description": tasksCheckDesc,
                "done": doneX,
                "list_id": tasksCheckList
            }
        ) // We send data in JSON format
          
    })
     .then(res => print(tasksList)) 
  }
     
 

 document.body.addEventListener('click', function (event) {

        const tasksCheckId = event.target.getAttribute('data-checkbox')
        const tasksCheckDone = event.target.getAttribute('data-done')
        const tasksCheckDesc = event.target.getAttribute('data-checkboxDesc')
        const tasksCheckList = event.target.getAttribute('data-checkboxList')
    
         if (tasksCheckId) {
            tasksDone(tasksCheckId, tasksCheckDone, tasksCheckDesc, tasksCheckList)
        }
    }) 

// Chama a function que renderiza o corpo da pagina
print(tasksList)
