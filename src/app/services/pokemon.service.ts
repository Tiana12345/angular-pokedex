import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Pokemon} from '../models/pokemon.model';
import { BehaviorSubject, Observable, skip, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon'
  private readonly apiUrlType = 'https://pokeapi.co/api/v2/type'
  private readonly apiUrlGen =  'https://pokeapi.co/api/v2/generation'

  constructor(private readonly http: HttpClient) { }

  getListPokemons(pageIndex: number, limit: number): Observable<Pokemon[]> {
    const result  = new BehaviorSubject<Pokemon[]>([]); 
    this.http.get<PaginedPokemonList>(`${this.apiUrl}/?offset=${pageIndex*limit}&limit=${limit}`).subscribe({
      next: (paginedPokemonList: PaginedPokemonList) => {
        let listPokemons: Pokemon[] = [];
        paginedPokemonList.results.forEach((pokemonPagined) => {
          this.http.get<Pokemon>(pokemonPagined.url).subscribe({
            next: (pokemon: Pokemon) => {
              listPokemons.push(pokemon);
              listPokemons = listPokemons.sort((a: Pokemon, b: Pokemon) => {return a.id - b.id;})
              result.next(listPokemons);
            },
            error: () => {
              console.error(`Erreur de récupération sur l'endpoint ${pokemonPagined.url}`)
            }
          });
        });
      },
      error: () => {
        console.error(`Erreur de récupération de la page ${pageIndex} des Pokémons (taille de page ${limit})`)
      }
    });
    return result;
  }

  
  getListPokemonsByType(pageIndex: number, limit: number, idTypes: string): Observable<Pokemon[]> {
    const result  = new BehaviorSubject<Pokemon[]>([]); 
    this.http.get<any>(`${this.apiUrlType}/${idTypes}?offset=${pageIndex*limit}&limit=${limit}`).subscribe({
      next: (typeInformation: any) => 
        {
        let listPokemons: Pokemon[] = [];
        typeInformation.pokemon.forEach((pokemonPagined: { pokemon: any; }) => {
          this.http.get<Pokemon>(pokemonPagined.pokemon.url)
          .subscribe({
            next: (pokemon: Pokemon) => {
              listPokemons.push(pokemon);
              listPokemons = listPokemons.sort((a: Pokemon, b: Pokemon) => {return a.id - b.id;})
              result.next(listPokemons);
            },
            error: () => {
              console.error(`Erreur de récupération sur l'endpoint ${pokemonPagined.pokemon.url}`)
            }
          });
        });
      },
      error: () => {
        console.error(`Erreur de récupération de la page ${pageIndex} des Pokémons (taille de page ${limit})`)
      }
    });
    return result;
  }

  getListPokemonsTypes(): Observable<string[]> {
    const result = new BehaviorSubject<string[]>([]);
  
    this.http.get<any>(`${this.apiUrlType}`).subscribe({
      next: (paginedPokemonList: any) => {
        console.log(paginedPokemonList)
        if (paginedPokemonList && paginedPokemonList.results) {
          const pokemonTypes = paginedPokemonList.results.map((type: { name: string }) => type.name);
          console.log(pokemonTypes)
          result.next(pokemonTypes);
        } else {
          console.warn('Aucun type trouvé dans la réponse.');
        }
      },
      error: (err) => {
        console.error('Erreur de récupération des types :', err);
        result.error(err);
      },
    });
  
    return result.asObservable();
  }

  getListPokemonsGenerations(): Observable<string[]> {
    const result = new BehaviorSubject<string[]>([]);
  
    this.http.get<any>(`${this.apiUrlGen}`).subscribe({
      next: (paginedPokemonList: any) => {
        console.log(paginedPokemonList)
        if (paginedPokemonList && paginedPokemonList.results) {
          const pokemonGens = paginedPokemonList.results.map((gens: { name: string }) => gens.name);
          console.log(pokemonGens)
          result.next(pokemonGens);
        } else {
          console.warn('Aucune génération trouvée dans la réponse.');
        }
      },
      error: (err) => {
        console.error('Erreur de récupération des générations :', err);
        result.error(err);
      },
    });
  
    return result.asObservable();
  }


  isPokemonOfType(pokemon: Pokemon ,typeP: string):boolean {
    let result: boolean = false;
    pokemon.types.forEach(type => {
      if(type.type.name == typeP)
        result = true;
    });
    return result;
  }

  getListPokemonsByGeneration(genFilter: string): BehaviorSubject<Pokemon[]> {
    let filterPageIndex = 0;
    let listPokemonsMatchingGen: Pokemon[] = [];
    const result  = new BehaviorSubject<Pokemon[]>([]); 
      this.http.get<any>(`https://pokeapi.co/api/v2/generation/${genFilter}`).subscribe({
        next: (generation) => {
          generation.pokemon_species.forEach((pokemonMatchingGen: {name: string}) => {
            this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonMatchingGen.name}`).subscribe({
              next: (pokemon: Pokemon) => {        
                listPokemonsMatchingGen.push(pokemon);
                listPokemonsMatchingGen = listPokemonsMatchingGen.sort((a: Pokemon, b: Pokemon) => {return a.id - b.id;})
                result.next(listPokemonsMatchingGen);
              },
              error: () => {
                console.error(`Erreur de récupération sur l'endpoint https://pokeapi.co/api/v2/pokemon/${pokemonMatchingGen.name}`)
              }
            });
          });
        },
        error: () => {
          console.error(`Erreur de récupération de la génération spécifiée`)
        }
      });
      filterPageIndex++;
    return result;
  }

  getPokemon(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

 

  
 

}







export interface PaginedPokemonList {
  results: {
    name: string;
    url: string;
  }[];
}
 