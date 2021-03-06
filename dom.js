// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  var state = [
    
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function (todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description

    // this adds the delete button
    var buttonDiv=document.createElement('div');
    buttonDiv.className = "button-container";

    var text = todo.description;
    var spanElement = document.createElement("span");
    spanElement.appendChild(document.createTextNode(text));
    todoNode.appendChild(spanElement);

    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    })
    todoNode.appendChild(deleteButtonNode);
    deleteButtonNode.className = "deleteButton";


    buttonDiv.appendChild(deleteButtonNode);
    deleteButtonNode.appendChild(document.createTextNode("Delete"));

    // add markTodo button
   var markTodobtn =document.createElement("button");
   markTodobtn.addEventListener('click', function(event){
     var newstate =todoFunctions.markTodo(state, todo.id);
     state = newstate;
     // Add Color class 
     todoNode.classList.toggle("mark");
   });
   todoNode.appendChild(markTodobtn);
   markTodobtn.className = "deleteButton";

   buttonDiv.appendChild(markTodobtn);

   markTodobtn.appendChild(document.createTextNode("Mark"));
todoNode.appendChild(buttonDiv);

   
   // add classes for css


    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      var description = event.target.elements["description"].value;// event.target ....
      var newTask = { id: 0, description: description, done: false }
      var newState = todoFunctions.addTodo(state, newTask);// ?? change this!
      let input = document.getElementById("task")
      update(newState);
      input.value = "" 
    });
  }
  // you should not need to change this function
  var update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function (state) {
    var todoListNode = document.createElement('ul');
    var storedstate = JSON.parse(localStorage.getItem("key"));
    storedstate.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();