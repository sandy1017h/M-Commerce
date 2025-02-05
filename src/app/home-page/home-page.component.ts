import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, OnInit, HostListener  } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as owlCarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/store';
import { map, Observable } from 'rxjs';
import { CategoryResDto, ProductResDto } from '../core/Models/catalog';
import { selectCategories } from '../redux/catalog/catalog.selector';
import { BASE_IMAGE_API } from '../core/token/baseUrl.token';
import { ProductsModule } from '../products/products.module';
import { CatalogService } from '../core/Services/catalog.service';


@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [
    CommonModule,
    CarouselModule,
    owlCarouselModule,
    MatCardModule,
    ProductsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomePageComponent implements OnInit {
  categories$: Observable<CategoryResDto[]>;
  products$: Observable<ProductResDto[]>;

  showScrollUp: boolean = false;
  showScrollDown: boolean = true;

  constructor(
    private store: Store<AppState>,
    @Inject(BASE_IMAGE_API) public serveApi: string,
    private catalogService: CatalogService
  ) {
    this.categories$ = this.store.select(selectCategories);
    this.products$ = this.catalogService.getProducts({ pageSize: 8, pageIndex: 1, sort: 'rating' }).pipe(
      map((res) => res.data?.data !== undefined ? res.data?.data : [])
    );
  }



  bannerOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false,
    autoplay: true,
    autoplaySpeed: 2500
  }
  bannerStore: any[] = [
    {
      id: '1',
      src: 'assets/Banner_1.png'
    },
    {
      id: '2',
      src: 'assets/Banner_2.png'
    },
    {
      id: '3',
      src: 'assets/Banner_3.png'
    },
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false,
    autoplay: true,
    autoplaySpeed: 1000
  }
  slidesStore: any[] = [
    {
      id: '1',
      src: 'assets/Audio & Home Theater.png',
      alt: 'Audio & Home Theater',
      title: 'Audio & Home Theater'
    },
    {
      id: '2',
      src: 'assets/Camera.png',
      alt: 'Camera',
      title: 'Camera'
    },
    {
      id: '3',
      src: 'assets/Computers.png',
      alt: 'Computers',
      title: 'Computers'
    },
    {
      id: '4',
      src: 'assets/mobile.png',
      alt: 'Mobile',
      title: 'Mobile'
    },
    {
      id: '5',
      src: 'assets/TV & Video.png',
      alt: 'TV & Video',
      title: 'TV & Video'
    },
    {
      id: '6',
      src: 'assets/Wearable Technology.png',
      alt: 'Wearable Technology',
      title: 'Wearable Technology'
    }
  ]


  slides = [
    {
        src: 'https://illuminationconsulting.com/wp-content/uploads/2023/12/ecommerce-success-and-website-design.png',
        alt: 'Image 1',
        heading: 'Big Sale!',
        description: 'Get up to 50% off on selected items.'
    },
    {
        src: 'https://justclickshop.com.sg/wp-content/uploads/2023/08/best-ecommerce-website-templates.jpg',
        alt: 'Image 2',
        heading: 'Exclusive Offers',
        description: 'Hurry, offers valid until midnight!'
    },
    {
        src: 'https://1realtour.com/wp-content/uploads/2024/03/Best-E-commerce-Web-Design-Company.png',
        alt: 'Image 3',
        heading: 'New Arrivals',
        description: 'Shop the latest trends now.'
    }
];

currentSlide = 0;

navigate(direction: string) {
    if (direction === 'left') {
        this.currentSlide =
            (this.currentSlide - 1 + this.slides.length) %
            this.slides.length;
    } else if (direction === 'right') {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }
}

goToSlide(index: number) {
    this.currentSlide = index;
}
  // Auto-slide every 3 seconds
  ngOnInit() {
    setInterval(() => {
      this.navigate('right');
    }, 3000);
  }



  updateCSSVariable(): void {
    document.documentElement.style.setProperty(
      '--current-slide',
      `${this.currentSlide}`
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    this.showScrollUp = scrollPosition > 200;
    this.showScrollDown = scrollPosition < maxScroll - 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               


  activate(e: Event): void {
    const slider = document.querySelector(".slider");
    const items = document.querySelectorAll(".item");
    if (e.target instanceof HTMLElement) {
      if (e.target.matches(".next")) {
        slider?.append(items[0]);
      } else if (e.target.matches(".prev")) {
        slider?.prepend(items[items.length - 1]);
      }
    }
  }
}
