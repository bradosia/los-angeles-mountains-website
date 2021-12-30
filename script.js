/* Carousel Widget
 * Dynamic generation of listeners for a carousel
 */
class Carousel {
  constructor(carouselId, carouselNavId) {
		// dynamically find components
    this.carouselEle = document.getElementById(carouselId);
    if (this.carouselEle) {
      this.pageNumberEleList = document.getElementsByClassName("page-number");
      this.arrowLeftEleList = document.getElementsByClassName("arrow-left");
      this.arrowRightEleList = document.getElementsByClassName("arrow-right");
      this.slideEleList = document.getElementsByClassName("slide");
    }
    this.carouselNavEle = document.getElementById(carouselNavId);
    if (this.carouselNavEle) {
      this.NavButtonList = this.carouselNavEle.getElementsByTagName("button");
    }
    // If all components found, then set up
    if (this.pageNumberEleList.length > 0 &&
      this.arrowLeftEleList.length > 0 &&
      this.arrowRightEleList.length > 0 &&
      this.slideEleList.length > 0 &&
      this.NavButtonList.length > 0) {
      this.setUp();
      this.setUpNavListeners();
    }
  }

  setUpNavListeners() {
    let n = this.NavButtonList.length;
    for (let i = 0; i < n; i++) {
      this.NavButtonList[i].addEventListener("click", () => {
        this.changeSlide(i);
      });
    }
  }

  setUp() {
    this.pageNumberEle = this.pageNumberEleList[0];
    this.arrowLeftEleList[0].addEventListener("click", () => {
      this.changeSlide(this.slideNumCurrent - 1);
    });
    this.arrowRightEleList[0].addEventListener("click", () => {
      this.changeSlide(this.slideNumCurrent + 1);
    });

    this.slideNumTotal = this.slideEleList.length;

    // find the active slide. default = 0;
    this.slideNumCurrent = 0;
    let n = this.slideNumTotal;
    for (let i = 0; i < n; i++) {
      if (this.slideEleList[i].classList.contains("active")) {
        this.slideNumCurrent = i;
      }
    }
  }

  changeSlide(slideNum) {
    // handle end of rotation
    if (slideNum < 0) {
      slideNum = this.slideNumTotal - 1;
    } else if (slideNum >= this.slideNumTotal) {
      slideNum = 0;
    }
    this.slideNumCurrent = slideNum;
    // set active button
    let n = this.NavButtonList.length;
    for (let i = 0; i < n; i++) {
      this.NavButtonList[i].className = "";
      if (i == this.slideNumCurrent) {
        this.NavButtonList[i].classList.add("active");
      }
    }
    // set active slide
    n = this.slideEleList.length;
    for (let i = 0; i < n; i++) {
      this.slideEleList[i].classList.remove("active");
      if (i == this.slideNumCurrent) {
        this.slideEleList[i].classList.add("active");
      }
    }
    // set page number display
    this.pageNumberEleList[0].textContent = (this.slideNumCurrent + 1) + " / " + this.slideNumTotal;
  }
}

// Initialize
let myCarousel = new Carousel("myCarousel", "myCarouselNav");

// Counter Widget
setInterval(function() {
  // get current counter number
  let counterNumber = document.getElementById("counter").textContent;
  // strip commas
  counterNumber = counterNumber.replace(/,/g, "");
  // decrement
  counterNumber = parseInt(counterNumber) - 1;
  // add commas
  counterNumber = counterNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // set counter number
  document.getElementById("counter").textContent = counterNumber;
}, 1000);
