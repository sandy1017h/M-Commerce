import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-business-acc-dashboard',
  templateUrl: './business-acc-dashboard.component.html',
  styleUrls: ['./business-acc-dashboard.component.css']
})
export class BusinessAccDashboardComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumnsOrders: string[] = ['orderId', 'customer', 'product', 'amount', 'status'];
  displayedColumnsProducts: string[] = ['product', 'price', 'sold', 'revenue'];

  @ViewChild('paginator1', { static: true }) paginator1!: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;

  @ViewChild('salesChart', { static: false }) salesChartRef!: ElementRef;
  @ViewChild('userGrowthChart', { static: false }) userGrowthChartRef!: ElementRef;

  recentOrdersData = new MatTableDataSource([
    { orderId: 'ORD001', customer: 'John Doe', product: 'Laptop', amount: '$1200', status: 'Shipped' },
    { orderId: 'ORD002', customer: 'Jane Smith', product: 'Smartphone', amount: '$800', status: 'Pending' },
    { orderId: 'ORD003', customer: 'Michael Brown', product: 'Tablet', amount: '$600', status: 'Delivered' },
    { orderId: 'ORD004', customer: 'Emily Davis', product: 'Camera', amount: '$400', status: 'Shipped' },
    { orderId: 'ORD005', customer: 'Chris Wilson', product: 'Smartwatch', amount: '$300', status: 'Processing' },
    { orderId: 'ORD006', customer: 'Sophia Taylor', product: 'Monitor', amount: '$700', status: 'Pending' },
    { orderId: 'ORD007', customer: 'Daniel Moore', product: 'Keyboard', amount: '$50', status: 'Delivered' },
    { orderId: 'ORD008', customer: 'Olivia White', product: 'Mouse', amount: '$40', status: 'Shipped' },
    { orderId: 'ORD009', customer: 'Liam Harris', product: 'Headphones', amount: '$150', status: 'Processing' },
    { orderId: 'ORD010', customer: 'Emma Martin', product: 'Speaker', amount: '$200', status: 'Shipped' }
  ]);

  topProductsData = new MatTableDataSource([
    { product: 'Laptop', price: '$1200', sold: '500', revenue: '$600,000' },
    { product: 'Smartphone', price: '$800', sold: '700', revenue: '$560,000' },
    { product: 'Tablet', price: '$600', sold: '400', revenue: '$240,000' },
    { product: 'Camera', price: '$400', sold: '300', revenue: '$120,000' },
    { product: 'Smartwatch', price: '$300', sold: '200', revenue: '$60,000' },
    { product: 'Monitor', price: '$700', sold: '150', revenue: '$105,000' },
    { product: 'Keyboard', price: '$50', sold: '1000', revenue: '$50,000' },
    { product: 'Mouse', price: '$40', sold: '900', revenue: '$36,000' },
    { product: 'Headphones', price: '$150', sold: '600', revenue: '$90,000' },
    { product: 'Speaker', price: '$200', sold: '500', revenue: '$100,000' }
  ]);

  ngAfterViewInit(): void {
    this.initializeNavigation();
    this.initializeChart();
    this.recentOrdersData.paginator = this.paginator1;
    this.topProductsData.paginator = this.paginator2;
  }

  private initializeNavigation(): void {
    const navLinks: NodeListOf<HTMLLIElement> = document.querySelectorAll('.nav-links li');
    const pages: NodeListOf<HTMLElement> = document.querySelectorAll('.page-content');

    navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetPage = (link as HTMLElement).getAttribute('data-page');

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        pages.forEach(page => {
          page.classList.remove('active');
          if (page.id === targetPage) {
            page.classList.add('active');
          }
        });
      });
    });

    const userInfoDropdown = document.getElementById('userInfoDropdown') as HTMLElement;
    const profileDropdown = document.getElementById('profileDropdown') as HTMLElement;

    userInfoDropdown?.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      profileDropdown?.classList.toggle('show');
    });

    document.addEventListener('click', (e: MouseEvent) => {
      if (!userInfoDropdown?.contains(e.target as Node)) {
        profileDropdown?.classList.remove('show');
      }
    });

    profileDropdown?.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const action = (item as HTMLAnchorElement).getAttribute('href')?.substring(1) || '';
        this.showNotification('info', `${action.charAt(0).toUpperCase() + action.slice(1)} action triggered`);
        profileDropdown?.classList.remove('show');
      });
    });
  }

  private initializeChart(): void {
    const chartOptions: ApexCharts.ApexOptions = {
      chart: {
        type: 'area',
        height: 350,
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: { enabled: true, delay: 150 },
          dynamicAnimation: { enabled: true, speed: 350 }
        },
        toolbar: { show: false },
        background: 'transparent'
      },
      colors: ['#4a00e0', '#8e2de2', '#00fff0'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      tooltip: { theme: 'dark' }
    };

    if (this.salesChartRef?.nativeElement) {
      const salesChart = new ApexCharts(this.salesChartRef.nativeElement, {
        ...chartOptions,
        series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 200, 190] }]
      });
      salesChart.render();
    }

    if (this.userGrowthChartRef?.nativeElement) {
      const userGrowthChart = new ApexCharts(this.userGrowthChartRef.nativeElement, {
        ...chartOptions,
        series: [{ name: 'User Growth', data: [5, 10, 15, 25, 30, 45, 50, 60, 80, 100, 150, 180] }]
      });
      userGrowthChart.render();
    }
  }

  private showNotification(type: string, message: string): void {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
  
}
