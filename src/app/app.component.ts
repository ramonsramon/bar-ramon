import { Component } from "@angular/core"
import { NavLink } from "./models/nav-link"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    navLinks: NavLink[] = [{ title: "Home", path: "/" }]
}
