import {todos, selectedOption} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, selectFilter} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        document.getElementById("todoInput").focus();
        event.stopPropagation();
    });

    listen('keydown', '#todoInput', event => {
      // ao clicar enter
      if (event.which == 13) {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        document.getElementById("todoInput").focus();
        event.stopPropagation();
      }
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

    listen('click', '.js_select_filter', event => {
        const id = event.target.getAttribute('value');
        todos.dispatch(selectFilter(id));
    });
}
