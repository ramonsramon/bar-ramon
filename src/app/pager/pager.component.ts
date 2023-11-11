import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Cocktail } from "../models/cocktail"
import { Observable } from "rxjs"

@Component({
    selector: "pager",
    templateUrl: "./pager.component.html",
    styleUrls: ["./pager.component.css"],
})
export class PagerComponent implements OnInit {
    @Input() cocktails$!: Observable<Cocktail[]>
    @Input() pageSize = 10
    @Output() cocktailPage = new EventEmitter<Cocktail[]>()
    cocktails: Cocktail[] = []
    totalPages: number[] = []
    currentPage = 1

    ngOnInit(): void {
        this.cocktails$.subscribe((cocktails) => {
            this.cocktails = cocktails
            let lastPage = Math.ceil(cocktails.length / this.pageSize)
            this.totalPages = []
            while (lastPage > 0) {
                this.totalPages.push(lastPage)
                lastPage--
            }
            this.totalPages.sort()
            let shown = cocktails.filter((value, i) => {
                return i < this.pageSize
            })
            this.cocktailPage.emit(shown)
        })
    }

    nextPage() {
        if (this.currentPage < this.totalPages.length) {
            this.currentPage++
            this.pageChange()
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            this.pageChange()
        }
    }

    selectPage(page: number) {
        this.currentPage = page
        this.pageChange()
    }

    pageChange() {
        let shown = this.cocktails.filter((value, i) => {
            if (this.currentPage === 1) {
                return i >= 0 && i < this.pageSize
            } else {
                return (
                    i >= this.pageSize * (this.currentPage - 1) &&
                    i < this.pageSize * this.currentPage
                )
            }
        })
        this.cocktailPage.emit(shown)
    }
}