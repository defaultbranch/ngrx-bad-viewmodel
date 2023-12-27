import { NgModule } from "@angular/core";
import { StoreModule, createActionGroup, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { City } from "./city";

// NgRx feature key

const CITY_FEATURE_KEY = 'ciudades';

// NgRx actions

const actions = createActionGroup({
  source: CITY_FEATURE_KEY,
  events: {

    upsertCity: props<{ city: City }>(),
    removeCity: props<{ name: string }>(),
  }
});

// export public actions

export const {
  upsertCity,
  removeCity,
} = actions;

// NgRx entity adapter

const adapter = createEntityAdapter<City>({ selectId: city => city.name });

// NgRx reducer

const CITY_REDUCER = createReducer(
  adapter.getInitialState(),
  on(actions.upsertCity, (state: EntityState<City>, p: { city: City }): EntityState<City> => adapter.upsertOne(p.city, state)),
  on(actions.removeCity, (state: EntityState<City>, p: { name: string }): EntityState<City> => adapter.removeOne(p.name, state)),
);

// NgRx selectors

const selectFeature = createFeatureSelector<EntityState<City>>(CITY_FEATURE_KEY);

const {
  selectIds,
  selectAll,
} = adapter.getSelectors();

export const allCityNames = createSelector(selectFeature, selectIds);
export const allCities = createSelector(selectFeature, selectAll);
export const city = (name: string) => createSelector(selectFeature, (feature) => feature.entities[name]);

// Angular module

@NgModule({
  imports: [
    StoreModule.forFeature(CITY_FEATURE_KEY, CITY_REDUCER),
  ]
})
export class CitiesNgrxModule { }
