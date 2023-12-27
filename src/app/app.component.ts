import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { CitiesNgrxModule, upsertCity } from './cities.ngrx';
import { BadEntityTableComponent } from './bad-entity-table/bad-entity-table.component';
import { BetterEntityTableComponent } from './better-entity-table/better-entity-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CitiesNgrxModule,
    BadEntityTableComponent,
    BetterEntityTableComponent,
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
