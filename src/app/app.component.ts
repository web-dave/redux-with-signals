import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { Actions, IState, StateService } from './state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListComponent, ItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'v16rc3';

  store = inject(StateService);

  ngOnInit() {
    const data: IState = {
      liste: [
        { id: 1, name: '🐸' },
        { id: 2, name: '🦄' },
        { id: 3, name: '🐒' },
        { id: 4, name: '🐄' },
      ],
    };
    this.store.dispatch(new Actions.SET(data));
  }
}
