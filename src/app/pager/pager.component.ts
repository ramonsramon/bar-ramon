import { Component, Inject, OnInit, Signal, computed } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { DOCUMENT, NgClass } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { BarRamonService } from "../bar-ramon.service"

@Component({
    selector: "pager",
    standalone: true,
    imports: [MatIconModule, NgClass, MatButtonModule],
    templateUrl: "./pager.component.html",
    styleUrls: ["./pager.component.css"],
})
export class PagerComponent implements OnInit {
    currentPage = 1
    pageSize = 10
    totalPages: Signal<number[]> = computed(() => {
        let lastPage = Math.ceil(
            this.barRamonService.totalCocktails().length / this.pageSize
        )
        let pages = []
        for (let i = 1; i <= lastPage; i++) {
            pages.push(i)
        }
        return pages.sort()
    })

    constructor(
        private barRamonService: BarRamonService,
        @Inject(DOCUMENT) private _document: Document
    ) {}

    ngOnInit(): void {
        this.selectPage(1)
    }

    nextPage() {
        if (this.currentPage < this.totalPages().length) {
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
        this.barRamonService.updateFilter((_, i) => {
            if (this.currentPage === 1) {
                return i >= 0 && i < this.pageSize
            } else {
                return (
                    i >= this.pageSize * (this.currentPage - 1) &&
                    i < this.pageSize * this.currentPage
                )
            }
        })
        this._document.defaultView?.scrollTo(0, 0)
    }
}
