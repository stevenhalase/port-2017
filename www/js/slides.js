class Slides {
  constructor() {
    this._slides = [];
    this._el = this._findElements();
    if (this._el === null) {
      return;
    }
    this._currentSlideIndex = 0;
    this._init();
  }

  _init() {
    this._startSlides();
    this._loadSlides();
    this._placeSlides();
    this._initFirstSlide();
  }

  _initFirstSlide() {
    let slide = this._slides[this._currentSlideIndex];
    let nextSlideButtn = $(slide.el).find('.next-slide');
    $(nextSlideButtn).click(e => {
      this.nextSlide();
    });
  }

  nextSlide() {
    this._unloadSlide();
    this._currentSlideIndex = this._currentSlideIndex + 1;
    let nextSlide = this._slides[this._currentSlideIndex];
    this._loadSlide(nextSlide, nextSlide.directionIn);
  }

  _loadSlides() {
    for (let slide of this._slides) {
      slide.directionIn = $(slide.el).data('slide-direction-in');
      slide.directionOut = $(slide.el).data('slide-direction-out');
    }
  }

  _startSlides() {
    for (let slide of this._el) {
      this._slides.push({
        el: slide
      })
    }
  }

  _placeSlides() {
    for (let slide of this._slides) {
      if (slide !== this._slides[0]) {
        switch(slide.directionOut) {
          case 'top':
            $(slide.el).addClass('slide-out-top');
          break;
          case 'right':
            $(slide.el).addClass('slide-out-right');
          break;
          case 'bottom':
            $(slide.el).addClass('slide-out-bottom');
          break;
          case 'left':
            $(slide.el).addClass('slide-out-left');
          break;
        }
      }
    }
  }

  _findElements() {
    return $('.slide').length > 0 ? $('.slide') : null;
  }

  _unloadSlide() {
    let direction = this._slides[this._currentSlideIndex].directionOut;
    let currentSlide = this._slides[this._currentSlideIndex];
    switch(direction) {
      case 'top':
        $(currentSlide.el).addClass('slide-out-top');
        $(currentSlide.el).removeClass('slide-in');
      break;
      case 'right':
        $(currentSlide.el).addClass('slide-out-right');
        $(currentSlide.el).removeClass('slide-in');
      break;
      case 'bottom':
        $(currentSlide.el).addClass('slide-out-bottom');
        $(currentSlide.el).removeClass('slide-in');
      break;
      case 'left':
        $(currentSlide.el).addClass('slide-out-left');
        $(currentSlide.el).removeClass('slide-in');
      break;
    }
  }

  _loadSlide(slide) {
    $(slide.el).addClass('slide-in');
    let nextSlideButtn = $(slide.el).find('next-slide');
    $(nextSlideButtn).click(e => {
      this.nextSlide();
    });
  }
}