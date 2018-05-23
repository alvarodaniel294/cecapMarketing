import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Pipe, PipeTransform } from '@angular/core';
import { SearchPipe } from "./app/event/filtro/filtropersona.pipe";


// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './app/event/persona/filter.pipe';
// import { AppModule } from './app';
 
// platformBrowserDynamic().bootstrapModule(AppModule)

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
