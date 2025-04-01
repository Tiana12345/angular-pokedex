import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { skip, take } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
[x: string]: any;

pokemonList: any[] = [];
currentPage: number = 0;
pageSize: number = 20;
totalPages: any;


types: any[] = [];
gens: any[] = [];

constructor(private pokemonService: PokemonService,

) {}

ngOnInit() {
  this.loadPokemon();
  this.pokemonService.getListPokemonsTypes().subscribe((data: any) => {
  this.types = data;
  console.log(data);
this.fetchPokemons();
this.pokemonService.getListPokemonsGenerations().subscribe((data: any) => {
  this.gens = data;
  console.log(this.gens);

})
  
  })
}

  onTypeChange(idTypes: string) {
    console.log(idTypes)
    this.pokemonService.getListPokemonsByType(this.currentPage, this.pageSize, idTypes)
    .pipe(
      skip(this.currentPage * this.pageSize),
      take(this.pageSize)
    )
    .subscribe((data: any) => {
      this.pokemonList = data;
      })
  }

  
  onGenerationChange(idGens: string) {
    console.log(idGens)
    this.pokemonService.getListPokemonsByGeneration(idGens)
    .pipe(
      skip(this.currentPage * this.pageSize),
      take(this.pageSize)
    )
    .subscribe((data: any) => {
      this.pokemonList = data;
      })

  }


  



  loadPokemon() {
    this.pokemonService.getListPokemons(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.pokemonList = data;
    });
  }

  nextPage() {
    this.currentPage++;
    this.loadPokemon();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPokemon();
    }
  }


 fetchPokemons(): void {
    this.pokemonService.getListPokemons(this.currentPage, this.pageSize).subscribe({
      next: (data: Pokemon[]) => {
        console.log('Données API :', data);
        this.pokemonList = data;
        this.totalPages = Math.ceil(1000 / this.pageSize); 
      },
      error: (err: any) => {
        console.error('Erreur API', err);
      }
    });
  }

  filtrerGenerationPokemon(genFilter: string): void {
    this.pokemonService.getListPokemonsByGeneration(genFilter).subscribe({
      next: (data: Pokemon[]) => {
        console.log('Données API : ', data);
        this.pokemonList = data;
      },
      error: (err: any) => {
        console.log('Erreur API', err);
      }
    });
  }


  
}