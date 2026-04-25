/** Requis pour que les mises à jour de vue suivent HttpClient sans interaction utilisateur ; importer en premier. */
import 'zone.js';

import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

platformBrowser().bootstrapModule(AppModule).catch((err) => console.error(err));
