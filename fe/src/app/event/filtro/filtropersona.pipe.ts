// import { Injectable, Pipe, PipeTransform } from '@angular/core';
//  @Pipe({
//      name: 'search'
//  })
//  @Injectable()
//  export class SearchPipe implements PipeTransform{
//     transform(items: any, term: any):any{//termino de busqueda
//         if(term === undefined){
//             return items;
//         }
//         return items.filter(function(item){
//             return item.name.toLowerCase().includes(term.toLowerCase());//texto que este incluido
//         });
//     }
//  }
 import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
        return items.filter( it => {
          return it.name.toLowerCase().includes(searchText);
        });
   } 
}