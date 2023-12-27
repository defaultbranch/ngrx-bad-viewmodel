import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(StoreModule.forRoot())
  ]
};
