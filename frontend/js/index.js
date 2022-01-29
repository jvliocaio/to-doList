

const listName = document.querySelector('#listName')
const tasksList = document.querySelector('#tasksList')
const task = document.querySelector('#task')
const main = document.querySelector('#main')

async function print (){
    const tasksAll = await fetch(`http://localhost:8000/api/tasks`)
    const tasksData = await tasksAll.json()
    const tasksListAll = await fetch(`http://localhost:8000/api/tasksList`)
    const tasksListData = await tasksListAll.json()

    let container = ''

    tasksListData.forEach((tasksListData, index) => {
        container += 
        `
        <article class="tasksList" id="tasksList">
            
            <h3 id="listName"> ${tasksListData.name} </h3>
                ${component(tasksListData.id)}
                
        </article>

        `
    });

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
                <span class="material-icons">edit</span>
                <span class="material-icons" data-remove="${tasksData.id}" >delete</span>
            </div>

        `
        })

        return container

    }


    main.innerHTML = container
}

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
        destroyTask(taskId)
    }
})


print(tasksList)
