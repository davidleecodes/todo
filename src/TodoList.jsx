import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import { todosRef } from "./firebase_config";

class TodoList extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  componentDidMount() {
    todosRef.on("value", snap => {
      this.setState({ todos: Object.values(snap.val()) });
    });
  }

  remove(id) {
    this.setState({
      todos: this.state.todos.filter(c => c.id !== id)
    });
    todosRef.child(id).remove();
  }

  create(newTodo) {
    this.setState({ todos: [...this.state.todos, newTodo] });
    todosRef.child(newTodo.id).set(newTodo);
  }

  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        let newTask = { ...todo, task: updatedTask };
        todosRef.child(id).set(newTask);
        return newTask;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        let newTask = { ...todo, completed: !todo.completed };

        todosRef.child(id).set(newTask);
        return newTask;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  render() {
    let displayTodos = this.state.todos.map(t => (
      <Todo
        id={t.id}
        key={t.id}
        task={t.task}
        completed={t.completed}
        removeTodo={this.remove}
        updateTodo={this.update}
        toggleTodo={this.toggleCompletion}
      />
    ));

    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>simple react todo list app</span>
        </h1>
        <ul>{displayTodos}</ul>
        <NewTodoForm create={this.create} />
      </div>
    );
  }
}

export default TodoList;
