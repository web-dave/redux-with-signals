import { computed, Injectable, Signal, signal } from '@angular/core';

export interface IItem {
  id: number;
  name: string;
}
export interface IState {
  liste: IItem[];
}

export namespace Actions {
  export enum Types {
    ADD = 'ADD ITEM',
    UPDATE = 'UPDATE ITEM',
    DELETE = 'DELETE ITEM',
    SET = 'SET STATE',
  }

  export class Add {
    type = Types.ADD;
    constructor(public value: IItem) {}
  }
  export class Update {
    type = Types.UPDATE;
    constructor(public value: IItem) {}
  }
  export class Delete {
    type = Types.DELETE;
    constructor(public value: IItem) {}
  }
  export class SET {
    type = Types.SET;
    constructor(public value: IState) {}
  }
  export type IAction = Add | Update | Delete | SET;
}

const initialState: IState = { liste: [] };

@Injectable({ providedIn: 'root' })
export class StateService {
  // state
  private state = signal(initialState);

  // select returns a signal
  select<T>(selector: (state: IState) => T): Signal<T> {
    return computed(() => selector(this.state()));
  }

  dispatch(a: Actions.IAction) {
    switch (a.type) {
      case Actions.Types.SET:
        this.state.set((a as Actions.SET).value);
        break;
      case Actions.Types.ADD:
        const newAddState: IState = {
          ...this.state(),
          liste: [...this.state().liste, (a as Actions.Add).value],
        };
        this.state.set(newAddState);
        break;
      case Actions.Types.UPDATE:
        const newliste: IItem[] = this.state().liste.map((item) => {
          const action = a as Actions.Update;
          return item.id === action.value.id ? action.value : item;
        });
        const newUpdateState: IState = {
          liste: [...newliste],
        };
        this.state.set(newUpdateState);
        break;
      case Actions.Types.DELETE:
        const filteredliste: IItem[] = this.state().liste.filter((item) => {
          const action = a as Actions.Delete;
          return item.id !== action.value.id;
        });
        const newDeleteState: IState = {
          liste: [...filteredliste],
        };
        this.state.set(newDeleteState);
        break;
    }
  }
}
