import {
    Component,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Output,
    Signal,
    computed,
} from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { DOCUMENT, NgClass } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { BarRamonService } from "../bar-ramon.service"
import { Cursor } from "../models/cursor"
import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"

@Component({
    selector: "pager",
    standalone: true,
    imports: [MatIconModule, NgClass, MatButtonModule],
    templateUrl: "./pager.component.html",
    styleUrls: ["./pager.component.css"],
})
export class PagerComponent implements OnInit, OnDestroy {
    currentPage = 1
    pageSize = 10
    totalPages: Signal<number[]> = computed(() => {
        let lastPage = Math.ceil(
            this.barRamonService.filteredCocktails().length / this.pageSize
        )
        let pages = []
        for (let i = 1; i <= lastPage; i++) {
            pages.push(i)
        }
        return pages.sort()
    })
    subscriptions: Subscription = new Subscription()
    @Output() cursor: EventEmitter<Cursor> = new EventEmitter()

    constructor(
        private barRamonService: BarRamonService,
        @Inject(DOCUMENT) private _document: Document,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const queryParamSub = this.route.queryParamMap.subscribe((params) => {
            const cursorEndValue = params.get("end")
            if (cursorEndValue) {
                const page = Number(cursorEndValue) / this.pageSize
                this.selectPage(page)
            } else {
                this.selectPage(1)
            }
        })
        this.subscriptions.add(queryParamSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
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
        this.cursor.emit({
            start: (this.currentPage - 1) * this.pageSize,
            end: this.currentPage * this.pageSize,
        })
        this._document.defaultView?.scrollTo(0, 0)
    }
}
