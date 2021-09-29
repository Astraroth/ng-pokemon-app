import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';


import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemons";

@Injectable()

export class PokemonsService {

    constructor(private http:HttpClient){ }

    private pokemonsUrl = 'api/pokemons';

    private log(log: string){
        console.info(log);
    }

    private handleError<T>(operation='operation', result?: T){
        return (error: any): Observable<T> => {
            console.log(error);
            console.log(`${operation} failed : ${error.message}`);

        return of(result as T);
        };
    }

    searchPokemons(term: string): Observable<Pokemon[]>{
        if(!term.trim()){
            return of([]);
        }
        
        return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found pokemons matching "${term}"`)),
            catchError(this.handleError<Pokemon[]>(`searchPokemon`, []))
        );
    }

    deletePokemon(pokemon: Pokemon): Observable<Pokemon>{
        const url = `${this.pokemonsUrl}/${pokemon.id}`;

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.http.delete(url, httpOptions).pipe(
            tap(_ => this.log(`deleted pokemon id = ${pokemon.id}`)),
            catchError(this.handleError<any>(`deletePokemon`))
        );
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
            tap(_ => this.log(`updated pokemon id = ${pokemon.id}`)),
            catchError(this.handleError<any>(`updatePokemon`))
        );
    }

    //retourne tous les pokémons
    getPokemons(): Observable<Pokemon[]>{

       return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
           tap(_ => this.log(`fetched pokemons`)),
           catchError(this.handleError(`getPokemons`, []))
       );
    }

    //retourne le pokémon correspondant à l'id passé en paramètre
    getPokemon(id: number): Observable<Pokemon>{

        const url = `${this.pokemonsUrl}/${id}`;

        return this.http.get<Pokemon>(url).pipe(
            tap(_ => this.log(`fetched pokemons`)),
            catchError(this.handleError<Pokemon>(`getPokemons id = ${id}`))
        );        
    }

    getPokemonTypes(): string[]{
        return ['Plante', 'Feu', 'Insecte', 'Normal', 'Electrik', 'Vol', 'Eau', 'Poison', 'Fée']
    }
}