import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { BarRamonService } from "./bar-ramon.service"
import { firstValueFrom } from "rxjs"

export const authGuard: CanActivateFn = async (route, state) => {
    const barRamonService = inject(BarRamonService)
    const router = inject(Router)
    const user = await firstValueFrom(barRamonService.getUser())
    if (user) {
        console.log("The guard was run")
        return true
    }

    router.navigate(["login"])
    return false
}
