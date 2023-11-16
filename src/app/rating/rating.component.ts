import { Component, Input, OnInit } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"

@Component({
    selector: "rating",
    standalone: true,
    imports: [MatIconModule],
    templateUrl: "./rating.component.html",
    styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
    @Input() rating: number = 3
    @Input() starCount: number = 5
    ratingArr: number[] = []

    ngOnInit() {
        for (let index = 0; index < this.starCount; index++) {
            this.ratingArr.push(index)
        }
    }

    showIcon(index: number) {
        if (this.rating >= index + 1) {
            return "star"
        } else {
            return "star_border"
        }
    }
}
