import { Component } from '@angular/core';
import { BadEntityTableComponent } from './bad-entity-table/bad-entity-table.component';
import { CitiesNgrxModule, upsertCity } from './cities.ngrx';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CitiesNgrxModule,
    BadEntityTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(store: Store) {
    store.dispatch(upsertCity({ city: { name: 'Zurich', population: 402_762 } }));
    store.dispatch(upsertCity({ city: { name: 'Copenhagen', population: 602_481 } }));
  }

}
