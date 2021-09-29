import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { PokemonRoutingModule } from './pokemons/pokemons-routing.module';
  
import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing';
  
@NgModule({
    imports: [ // L'odre de chargement des modules est très important pour l'ordre de déclaration des routes !
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation : false}),
        PokemonsModule,
        PokemonRoutingModule,                   
        FormsModule, 
        LoginRoutingModule,
        AppRoutingModule, 
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }