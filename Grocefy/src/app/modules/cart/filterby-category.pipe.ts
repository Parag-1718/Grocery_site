import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbyCategory'
})
export class FilterbyCategoryPipe implements PipeTransform {

  transform(cartItems: any[], category: string): any[] {
    return cartItems.filter(item => item.category === category);
  }
}
