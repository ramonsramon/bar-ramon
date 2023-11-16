import { Component, OnInit } from "@angular/core"
import { NavLink } from "./models/nav-link"
import { Analytics } from "@angular/fire/analytics"
import { NavigationEnd, Router, RouterOutlet } from "@angular/router"
import { logEvent } from "@angular/fire/analytics"
import { NavbarComponent } from "./navbar/navbar.component"
import { FooterComponent } from "./footer/footer.component"

@Component({
    selector: "app-root",
    standalone: true,
    imports: [NavbarComponent, RouterOutlet, FooterComponent],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    navLinks: NavLink[] = [{ title: "Home", path: "/" }]

    constructor(private ga: Analytics, private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((v) => {
            if (v instanceof NavigationEnd) {
                logEvent(this.ga, "screen_view", {
                    firebase_screen: v.url,
                    firebase_screen_class: "cocktail-page",
                })
            }
        })
    }
}
