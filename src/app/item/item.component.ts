import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../state.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  item = inject(StateService).select((data) => {
    console.log('Item Gelesen', data.liste[2]);

    return data.liste.find((item) => item.id === 3);
  });
}
