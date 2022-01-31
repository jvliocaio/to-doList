
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
                            <span class="material-icons" id="data-editList" onclick="myFun()">edit</span>
                            <span class="material-icons" id="data-deleteList">delete</span>
                        </div>

                    </div>
                </div>

            </div>
            
                ${component(tasksListData.id)}
                
        </article>

        `
    });

    // Esse "component" sao as tasks
    function component (list_id, description) {

        let container = ''

        let result = tasksData.filter(function(item, index) { 
            return String(item.list_id) === String(list_id) 

        }) 
        console.log(result)

        result.forEach((tasksData, index) =>{
            container += `
            <div class="task" id="task">
                <input type="checkbox" class="checkbox-round" name="checkbox" id="checkbox"> 
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
event.preventDefault()
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
    event.preventDefault()
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
        event.preventDefault()
            const tasksListId = event.target.getAttribute('data-add')
                          
            if(tasksListId){
                if (newTask = window.prompt("Descreva sua terefa:")) {
                        createTask(tasksListId, newTask)
                }
            }
        })

 /* TasksList HTTP requests */
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
        event.preventDefault()
            
           if(TasksListName = window.prompt("Qual nome da sua lista?")){
               if(TasksListDesc = window.prompt("Descreva sua lista")){
                   createTasksList(TasksListName, TasksListDesc)
               }
               
           }
           

        })

/*         document.body.addEventListener('click', function (event) {
            event.preventDefault()
                const options = event.target.getAttribute('data-optionsList')
                const content = event.target.getAttribute('data-contentList')

                content.style.display ="none"  

                if (options) {
                    content.style.display = "block"    
                }
                
                            
            
            }) */

// Chama a function que renderiza o corpo da pagina
print(tasksList)
