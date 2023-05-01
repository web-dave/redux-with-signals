import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Actions, IItem, StateService } from '../state.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  store = inject(StateService);
  liste = this.store.select((data) => {
    console.log('Liste gelesen', data);
    return data.liste;
  });
  updateItem(value: string, item: IItem) {
    this.store.dispatch(new Actions.Update({ ...item, name: value }));
  }

  addItem(value: string) {
    this.store.dispatch(
      new Actions.Add({ id: this.liste().length + 1, name: value })
    );
  }
  deleteItem(item: IItem) {
    this.store.dispatch(new Actions.Delete(item));
  }
}
