import {createStore} from 'redux';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true,
            hidden: false
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false,
            hidden: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false,
            hidden: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false,
            hidden: false
        }
    ],
    filters: [
      {
        id: 'option1',
        text: 'Mostrar todos',
        checked: true
      },
      {
        id: 'option2',
        text: 'Somente abertos',
        checked: false
      },
      {
        id: 'option3',
        text: 'Somente fechados',
        checked: false
      }
    ]
};

function todoChangeHandler(state = initialState, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            localStorage.setItem("todos", JSON.stringify(state.todos));
            return state;
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            localStorage.setItem("todos", JSON.stringify(state.todos));
            return state;
            break;
        case 'SELECT_FILTER':
            state.filters.forEach(function(a, b){
                if(a.id === change.id){
                    a.checked = true;
                }else{
                    a.checked = false;
                }
            });
            localStorage.setItem("todos", JSON.stringify(state.todos));
            return state;
            break;
        default:
            return state;
    }
}

export const todos = createStore(todoChangeHandler, initialState);
