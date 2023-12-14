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
    @Output() onPageChange: EventEmitter<number> = new EventEmitter()

    constructor(
        private barRamonService: BarRamonService,
        @Inject(DOCUMENT) private _document: Document,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const queryParamSub = this.route.queryParamMap.subscribe((params) => {
            const page = params.get("page")
            if (page) {
                this.selectPage(Number(page))
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
        this.onPageChange.emit(this.currentPage)
        if (typeof this._document.defaultView?.scrollTo === "function") {
            this._document.defaultView?.scrollTo(0, 0)
        }
    }
}
