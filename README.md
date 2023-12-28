This is a simple Angular project playing with different ways of NgRx data binding on tables.

## Lessons learned

### Avoid Coarse NgRx Selectors for Detail Data

_(or: use detail selectors for detail data)_

In the Angular component template:

```html
<!-- instead of:  -->
<tr *ngFor="let item of items$ | async">
  <td><input [ngModel]="item.x" (ngModelChange)="updateX(item, $event)"></td>
  <td><input [ngModel]="item.y" (ngModelChange)="updateY(item, $event)"></td>
  ...
</tr>

<!-- do this instead:  -->
<tr *ngFor="let key of keys$ | async">
  <ng-container *ngIf="item$(key) | async as item">
    <td><input [ngModel]="item.x" (ngModelChange)="updateX(item, $event)"></td>
    <td><input [ngModel]="item.y" (ngModelChange)="updateY(item, $event)"></td>
    ...
  </ng-container>
</tr>
```

In the Angular component backing code:

```typescript
// instead of:
class Bad{
  items$: Observable<Item[]>;
  constructor(store: Store) {
    this.items$ = store.select(allItems);
  }
}

// do this:
class Good{
  keys$: Observable<string[]>;
  constructor(private store: Store) {
    this.keys$ = store.select(allItemKeys);
  }
  item$(key: string) {
    return this.store.select(item(key));
  }
}
```

In the NgRx feature selectors:

```typescript
// boiler plate:
const adapter = createEntityAdapter<Item>({ selectId: item => item.name });
const selectFeature = createFeatureSelector<EntityState<Item>>(ITEM_FEATURE_KEY);
const {
  selectIds,
  selectAll,
} = adapter.getSelectors();

// instead of:
export const allItems = createSelector(selectFeature, selectAll);

// do this:
const allKeys = createSelector(selectFeature, selectIds);
export const allItemKeys = createSelector(allKeys, keys => keys.filter((key): key is string => true));
export const item = (key: string) => createSelector(selectFeature, (feature) => feature.entities[key]);
```

### Cast NgRx ID type `(string|number)[]` to `string[]`

Use type predicate as no-op filter:

```typescript
const allKeys = createSelector(selectFeature, selectIds);
// result type is (string|number)[]

export const allItemKeys = createSelector(allKeys, keys => keys.filter(key: key is string => true));
// result type is string[]
```

_(This project was initialized with `ng new --skip-tests --skip-git --style=scss ngrx-bad-viewmodel`)_
