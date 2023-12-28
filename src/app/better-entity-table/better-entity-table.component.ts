import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CitiesNgrxModule, allCityNames, city, upsertCity } from '../cities.ngrx';
import { City } from '../city';

@Component({
  selector: 'app-better-entity-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CitiesNgrxModule,
  ],
  templateUrl: './better-entity-table.component.html',
  styleUrl: './better-entity-table.component.scss'
})
export class BetterEntityTableComponent {

  keys$: Observable<string[]>;

  constructor(private store: Store) {
    this.keys$ = store.select(allCityNames);
  }

  city$(key: string) {
    return this.store.select(city(key));
  }

  updatePopulation(item: City, population: number) {
    this.store.dispatch(upsertCity({ city: { name: item.name, population } }));
  }

}
