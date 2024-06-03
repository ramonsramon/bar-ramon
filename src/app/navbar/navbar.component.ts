import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    afterNextRender,
} from "@angular/core"
import { NavLink } from "../models/nav-link"
import { NavigationEnd, Router, RouterLink } from "@angular/router"
import { filter } from "rxjs/operators"
import { Observable, Subscription, of } from "rxjs"
import { MatIconModule } from "@angular/material/icon"
import { AsyncPipe, NgClass } from "@angular/common"
import { BarRamonService } from "../bar-ramon.service"
import { User } from "firebase/auth"

@Component({
    selector: "navbar",
    standalone: true,
    imports: [MatIconModule, RouterLink, NgClass, AsyncPipe],
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() navLinks: NavLink[] = []
    isHidden = true
    subscriptions: Subscription = new Subscription()
    user$: Observable<User | null> = of(null)

    constructor(
        private router: Router,
        private barRamonService: BarRamonService
    ) {
        afterNextRender(() => {
            this.user$ = this.barRamonService.getUser()
        })
    }

    ngOnInit(): void {
        const routerSub = this.router.events
            .pipe(filter((value) => value instanceof NavigationEnd))
            .subscribe(() => {
                if (!this.isHidden) {
                    this.togglePopout()
                }
            })
        this.subscriptions.add(routerSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    togglePopout() {
        this.isHidden = !this.isHidden
    }

    logout() {
        this.barRamonService.logout().then(() => {
            this.router.navigate(["login"])
        })
    }
}
