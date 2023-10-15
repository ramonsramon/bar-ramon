import { Component, Input, OnDestroy, OnInit } from "@angular/core"
import { NavLink } from "../models/nav-link"
import { NavigationEnd, Router } from "@angular/router"
import { filter } from "rxjs/operators"
import { Subscription } from "rxjs"

@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() navLinks: NavLink[] = []
    isHidden = true
    subscriptions: Subscription = new Subscription()

    constructor(private router: Router) {}

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
}