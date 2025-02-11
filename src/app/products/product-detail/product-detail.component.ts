import { Component, OnInit,Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/core/Services/catalog.service';
import { Store } from '@ngrx/store';
import { ProductResDto } from 'src/app/core/Models/catalog';
import { BASE_API, BASE_IMAGE_API } from 'src/app/core/token/baseUrl.token';
import { AddToCart } from 'src/app/redux/cart/cart.action';
import { AppState } from 'src/app/redux/store';
import { AddToWishList } from 'src/app/redux/wishlist/wishlist.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!:ProductResDto;
  quantity:number=1;
  constructor(
    private _route: ActivatedRoute,
    private catalogService:CatalogService,
    private store:Store<AppState>,@Inject(BASE_IMAGE_API) public imageUrl: string,
  ){}
  
    
  
    addToWishList(productId:number){
      this.store.dispatch(AddToWishList({productId}))
    }

  ngOnInit(): void {
    const id=this._route.snapshot.paramMap.get('id');
    if(id){
      this.catalogService.getProductById(id).subscribe(res=>{
        if(res.data) this.product=res.data;
      })
    }
  }

  updateQuantity(quantity:number){
    this.quantity=quantity;
  }

  addToCart(productId:number){
    this.store.dispatch(AddToCart({productId,quantity:this.quantity}))
}

}
