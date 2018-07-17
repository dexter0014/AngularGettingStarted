import { Component, OnInit, OnChanges } from '@angular/core'
import { IProduct } from './products.interface';
import { ProductService } from './product.service';
@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
    constructor(private _productService: ProductService) {
        this.listFilter = '';
    }
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    enableImage: boolean = false;
    errorMsg: string;
    _listFilter: string;
    get listFilter(): string { return this._listFilter; }
    set listFilter(val: string) { this._listFilter = val; this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products }
    filteredProducts: IProduct[];
    products: IProduct[];

    toggleImage(): void {
        this.enableImage = !this.enableImage;
    };

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter(products => products.productName.toLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    ngOnInit() {
        this._productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMsg = <any>error
        );
    }
    ngOnChanges() {
        console.log("Product List: On Change Called");
    }
}