import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "recipeTime",
})
export class RecipeTimePipe implements PipeTransform {
    transform(value: string): string {
        const time = value.replaceAll(/[^0-9]/g, "")
        if (Number(time) < 2) {
            return `${time} minute`
        }
        return `${time} minutes`
    }
}
