import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "OrderBy"
})
export class OrderByPipe  implements PipeTransform {
  transform(array: any, field: string, direction: number): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1 * direction;
      } else if (a[field] > b[field]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }
}
