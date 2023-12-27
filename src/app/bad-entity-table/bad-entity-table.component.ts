import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CitiesNgrxModule, allCities, upsertCity } from '../cities.ngrx';

type VM = {
  name: string,
  population?: number,
}

@Component({
  selector: 'app-bad-entity-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CitiesNgrxModule,
  ],
  templateUrl: './bad-entity-table.component.html',
  styleUrl: './bad-entity-table.component.scss'
})
export class BadEntityTableComponent {

  items$: Observable<VM[]>;

  constructor(private store: Store) {
    this.items$ = store.select(allCities);
  }

  updatePopulation(item: VM, population: number) {
    this.store.dispatch(upsertCity({ city: { name: item.name, population } }));
  }

}
