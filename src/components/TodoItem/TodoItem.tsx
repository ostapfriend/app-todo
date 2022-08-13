/* eslint-disable jsx-a11y/control-has-associated-label */
/* LIBRARIES */
import classnames from 'classnames';

import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  item: Todo,
  changeCompletedOneTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
  updateTodo: (todoId: number, title: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  item,
  changeCompletedOneTodo,
  deleteTodo,
  updateTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(item.title);

  const onCounterClickChange = (
    event: React.MouseEvent<HTMLLabelElement>,
  ): boolean => {
    return event.detail === 2;
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEditingTitle(value);
  };

  const onKeyDown = (event: any) => {
    const { value } = event.target;
    const { key } = event;

    if (key === 'Enter') {
      setEditing(false);
      setEditingTitle(value);
      updateTodo(item.id, editingTitle);

      if (!value) {
        deleteTodo(item.id);
      }
    }

    if (key === 'Escape') {
      setEditing(false);
      setEditingTitle(item.title);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!event.target.value.trim().length) {
      setEditing(false);
    } else {
      setEditing(false);
      setEditingTitle(event.target.value);
      updateTodo(item.id, editingTitle);
    }
  };

  return (
    <li
      className={classnames({
        completed: item.completed,
        editing: editing && !item.completed,
      })}
    >
      <div className="view">
        <input
          onChange={() => changeCompletedOneTodo(item.id)}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={item.completed}
        />
        <label
          role="presentation"
          onKeyDown={() => {}}
          onClick={(event) => setEditing(onCounterClickChange(event))}
        >
          {item.title}
        </label>
        <button
          onClick={() => deleteTodo(item.id)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={input => input?.focus()}
        type="text"
        className="edit"
        aria-label="Field name"
        value={editingTitle}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </li>
  );
};
