import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Pokemon } from './pokemon'
import { PokemonsService } from './pokemons.service';
  
@Component({
  selector: 'list-pokemon',
  templateUrl: `./list-pokemon.component.html`,
})

export class ListPokemonComponent implements OnInit { 
  
  pokemons: Pokemon[] = null;

  constructor(
    private router: Router, 
    private pokemonsService: PokemonsService){

  }

  ngOnInit() {
    this.pokemonsService.getPokemons() //renvoie un observable
    .subscribe(pokemons => this.pokemons = pokemons) // (parametre) => {fonction}
  }

  selectPokemon(pokemon: Pokemon){
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
   
}