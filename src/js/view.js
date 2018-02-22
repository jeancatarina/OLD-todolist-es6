import {isEnabled} from './lib/feature';

export function render(el, state) {
    let todoStorage   = JSON.parse(localStorage.getItem("todos"));
    state.todos       = todoStorage != null ? todoStorage : state.todos;
    //Esconde as linhas de acordo com o filtro selecionado
    hideLine(state);
    const todoItems   = state.todos.map(renderTodoItem).join('');
    const filterItems = state.filters.map(renderFilterItems).join('');

    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderFilter(filterItems)
    );
}

function renderApp(input, todoList, filterItems) {
    let filterList = "";

    if(isEnabled('filter')) {
        filterList = filterItems;
    }
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList, filterList);
    } else {
        return renderAddTodoAtTop(input, todoList, filterList);
    }
}

function renderAddTodoAtTop(input, todoList, filterList) {
    return `<div id="app" class="container">
            ${input}
            ${todoList}
            ${filterList}
            </div>`;
}

function renderAddTodoAtBottom(input, todoList, filterList) {
    let text = '<div id="app" class="container">';
        text += isEnabled('filterTop') === true ? `${filterList} ${todoList} ${input}` : `${todoList} ${input} ${filterList}`;
        text += '</div>';
    return text;
}

function renderInput() {
    return `<div class="todo__input input-group col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <input type="text"
                     id="todoInput"
                     class="form-control"
                     placeholder="Digite alguma tarefa"
                     aria-label=""
                     aria-describedby="basic-addon1">
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary"
                          id="addTodo"
                          type="button">+</button>
              </div>
            </div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo col-sm-3 col-md-3 col-lg-3 col-xl-3">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<div class="${todoClass} custom-control custom-checkbox"
                        ${todo.hidden ? ' hidden' : ''}>
                <input type="checkbox"
                       class="custom-control-input js_toggle_todo"
                       id="${todo.id}"
                       data-id="${todo.id}"
                       ${todo.done ? ' checked' : ''}>
                <label class="custom-control-label"
                       for="${todo.id}">
                       ${todo.text}
                       </label>
            </div>`;
}

function renderFilter(filterItems){
    return ` <form class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
             ${filterItems}
             </form>`;
}

function renderFilterItems(filter){
    const text = `<div class="custom-control custom-radio">
                    <input type="radio"
                           id="${filter.id}"
                           class="custom-control-input js_select_filter"
                           value="${filter.id}" ${filter.checked ? 'checked' : ''}/>
                    <label class="custom-control-label" for="${filter.id}">
                    ${filter.text}
                    </label>
                  </div>`;
    return text;
}

function hideLine(state){
    //Verifica qual filtro está selecionado
    let change = state.filters.filter(function(obj){return obj.checked === true})[0];

    state.todos.forEach(function(todo, b){
        switch(change.id){
            case "option1":
                //mostrar todos
                todo.hidden = false;
            break;
            case "option2":
                //se aberto não esconde
                if(!todo.done)
                    todo.hidden = false;
                else
                    todo.hidden = true;
            break;
            case "option3":
                 //se fechado não esconde
                if(todo.done)
                    todo.hidden = false;
                else
                    todo.hidden = true;
            break;
        }
    });
}
