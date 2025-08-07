import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel-component.html',
  styleUrls: ['./carousel-component.scss']
})
export class CarouselComponent implements AfterViewInit {
  images = [
    {
      url: '/assets/imgs/0.jpeg',
      title: 'Paysage Naturel',
      desc: 'Une vue magnifique sur la nature'
    },
    {
      url: '/assets/imgs/1.jpeg',
      title: 'Ville Moderne',
      desc: 'L\'architecture urbaine contemporaine'
    },
    {
      url: '/assets/imgs/2.jpeg',
      title: 'Montagnes',
      desc: 'Les sommets enneigés'
    },
    {
      url: '/assets/imgs/3.jpeg',
      title: 'Plage Tropicale',
      desc: 'Le sable fin et l\'eau turquoise'
    },
    {
      url: '/assets/imgs/4.jpeg',
      title: 'Forêt Mystérieuse',
      desc: 'La beauté des forêts anciennes'
    }
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const carousel = this.el.nativeElement.querySelector('#carousel') as HTMLElement;
    const indicators = this.el.nativeElement.querySelector('#indicators') as HTMLElement;
    const prevBtn = this.el.nativeElement.querySelector('#prevBtn') as HTMLButtonElement;
    const nextBtn = this.el.nativeElement.querySelector('#nextBtn') as HTMLButtonElement;

    let currentIndex = 0;
    const slideDuration = 3000;
    let autoScrollInterval: number;

    this.images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide w-full flex-shrink-0 relative fade-in';
      slide.innerHTML = `
        <img src="${image.url}" alt="${image.title}" class="w-full h-96 object-contain">
        
      `;
      carousel.appendChild(slide);

      const indicator = document.createElement('button');
      indicator.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-indigo-600' : 'bg-gray-300'} transition-all`;
      indicator.dataset['index'] = index.toString();
      indicator.addEventListener('click', () => goToSlide(index));
      indicators.appendChild(indicator);
    });

    carousel.style.width = `${this.images.length * 100}%`;

    prevBtn.addEventListener('click', () => {
      resetAutoScroll();
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      resetAutoScroll();
      goToSlide(currentIndex + 1);
    });

    const goToSlide = (index: number) => {
      if (index < 0) index = this.images.length - 1;
      else if (index >= this.images.length) index = 0;

      currentIndex = index;
      carousel.style.transform = `translateX(-${currentIndex * (100 / this.images.length)}%)`;

      const dots = indicators.querySelectorAll('button');
      dots.forEach((dot, i) => {
        dot.className = `w-3 h-3 rounded-full ${i === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'} transition-all`;
      });

      const slides = document.querySelectorAll('.carousel-slide');
      slides.forEach(slide => slide.classList.remove('fade-in'));
      setTimeout(() => {
        slides[currentIndex].classList.add('fade-in');
      }, 10);
    };

    const startAutoScroll = () => {
      autoScrollInterval = window.setInterval(() => {
        goToSlide(currentIndex + 1);
      }, slideDuration);
    };

    const resetAutoScroll = () => {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    };

    startAutoScroll();

    carousel.parentElement?.addEventListener('mouseenter', () => {
      clearInterval(autoScrollInterval);
    });

    carousel.parentElement?.addEventListener('mouseleave', () => {
      startAutoScroll();
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        resetAutoScroll();
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        resetAutoScroll();
        goToSlide(currentIndex + 1);
      }
    });
  }
}
