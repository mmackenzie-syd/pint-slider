(function () {
    var i;
    function cellWidth(element, cells) {
        var styles = window.getComputedStyle(element),
            padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight),
            actualWidth = element.clientWidth - padding;
        return actualWidth / cells;
    }
    function checkArrows(el, direction, type) {
        var leftArrow = el.querySelector('.ps__carousel__left__arrow'),
            rightArrow = el.querySelector('.ps__carousel__right__arrow');
        if (direction === "left") {   
            leftArrow.classList.add('ps__carousel__arrow__faded');
            rightArrow.classList.remove('ps__carousel__arrow__faded');
        } else if (direction === "right") {
            leftArrow.classList.remove('ps__carousel__arrow__faded');
            rightArrow.classList.add('ps__carousel__arrow__faded');
        } else if (direction === "neutral") {
            leftArrow.classList.remove('ps__carousel__arrow__faded');
            rightArrow.classList.remove('ps__carousel__arrow__faded');
        }
    }
    function buildDots(container, numOfDots) {
        var containerDots = document.createElement('div');
        container.style.padding = "0 0 20px";
        containerDots.classList.add('ps__carousel__dots');
        container.appendChild(containerDots);
        for (i = 0; i < numOfDots; i += 1) {
            var outDot = document.createElement('div'),
                innDot = document.createElement('div');
            outDot.classList.add('ps__carousel__outer__dot');
            innDot.classList.add('ps__carousel__inner__dot');
            outDot.setAttribute('data-dot-number', i);
            outDot.appendChild(innDot);
            containerDots.appendChild(outDot);
        }
        container.querySelector('.ps__carousel__inner__dot').classList.add('ps__carousel__inner__dot--selected');
    }
    function dotsChoose(arrows, carousel, clicked) {
        var r,
            car = document.querySelector(carousel).parentElement;
        for (r = 0; r < car.querySelectorAll('.ps__carousel__inner__dot').length; r += 1) {
            var oldDotIndex;
            if (car.querySelectorAll('.ps__carousel__inner__dot')[r].classList.contains('ps__carousel__inner__dot--selected')) {
                oldDotIndex = r;
                break;
            }
        }
        var curr = car.querySelectorAll('.ps__carousel__inner__dot').length;
        if (arrows === "left") {
            if (typeof car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex + -1] !== 'undefined') {
                car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex + -1].classList.add('ps__carousel__inner__dot--selected');
                car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex].classList.remove('ps__carousel__inner__dot--selected');
                if (oldDotIndex <= 1) {
                    checkArrows(car, "left", "arrow");
                } else {
                    checkArrows(car, "neutral");
                }
            }
        } else if (arrows === "right") {
            if (typeof car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex + 1] !== 'undefined') {
                car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex + 1].classList.add('ps__carousel__inner__dot--selected');
                car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex].classList.remove('ps__carousel__inner__dot--selected');
                if (oldDotIndex === curr - 2) {
                    checkArrows(car, "right", "arrow");
                } else {
                    checkArrows(car, "neutral");
                }
                
            }
        } else {
            car.querySelectorAll('.ps__carousel__inner__dot')[oldDotIndex].classList.remove('ps__carousel__inner__dot--selected');
            car.querySelectorAll('.ps__carousel__inner__dot')[clicked].classList.add('ps__carousel__inner__dot--selected');
        }
    }
    function carouselMove(direction, slidesToMove, container, cellsToShow, transSpeed, slidesPerClick) {
        var scrollAmount = 0,
            containWidth = cellWidth(document.querySelector(container), cellsToShow),
            totalSlide = slidesPerClick * containWidth,
            slideSpeed = transSpeed,
            slideTimer = setInterval(function () {
                if (direction === "left") {
                    document.querySelector(container).scrollLeft -= slideSpeed / 10;
                } else if (direction === "right") {
                    document.querySelector(container).scrollLeft += slideSpeed / 10;
                }
                scrollAmount += slideSpeed / 10;
                if (scrollAmount >= totalSlide) {
                    window.clearInterval(slideTimer);
                }
            }, 10);
    }
    function buildCarousel() {
        var element = document.querySelector(this.options.appendTo),
            options = this.options,
            carContainer,
            cells = element.querySelectorAll(options.cellClass),
            numOfDots = Math.ceil(cells.length / options.cellsToShow),
            td,
            t,
            d,
            cellWidth = (100 / options.cellsToShow) + "%",
            leftArrow = document.createElement('div'),
            rightArrow = document.createElement('div');
        this.carouselOuter = document.createElement('div');
        this.carouselOuter.classList.add('ps__carousel__outer');
        this.carouselOuter.style.maxWidth = options.maxWidth;
        element.classList.add('ps__carousel__inner');
        element.classList.add('ps__carousel-fade');
        element.parentNode.appendChild(this.carouselOuter);
        carContainer = element.parentNode.querySelector('.ps__carousel__outer');
        leftArrow.classList.add('ps__carousel__arrow');
        leftArrow.classList.add('ps__carousel__left__arrow');
        rightArrow.classList.add('ps__carousel__arrow');
        rightArrow.classList.add('ps__carousel__right__arrow');
        if (options.arrows === false) {
            leftArrow.style.display = "none";
            rightArrow.style.display = "none";
        }
        this.carouselOuter.appendChild(leftArrow);
        carContainer.appendChild(element);
        this.carouselOuter.appendChild(rightArrow);
        for (i = 0; i < cells.length; i += 1) {
            cells[i].style.width = cellWidth;
            cells[i].style.minWidth = cellWidth;
            cells[i].classList.add('ps__carousel__inner__cell');
            if (options.images === "loose" && cells[i].querySelector('.product__img-wrapper')) {
                cells[i].querySelector('.product__img-wrapper').getElementsByTagName('img')[0].classList.add('ps__carousel--loose--images');
            }
        }
        buildDots(carContainer, numOfDots);
        if (options.dots === true) {
            for (t = 0; t < numOfDots; t += 1) {
                var c = this.carouselOuter;
                td = this.carouselOuter.querySelectorAll('.ps__carousel__outer__dot')[t];
                (function (tdr) {
                    td.addEventListener('click', function () {
                        var oldDotIndex;
                        for (d = 0; d < numOfDots; d += 1) {
                            if (document.querySelector(options.appendTo).parentElement.querySelectorAll('.ps__carousel__inner__dot')[d].classList.contains('ps__carousel__inner__dot--selected')) {
                                oldDotIndex = d;
                                break;
                            }
                        }
                        var clickedDotIndex = tdr.getAttribute('data-dot-number'),
                            slidesToMove = Math.abs(oldDotIndex - clickedDotIndex);
                        dotsChoose(false, options.appendTo, clickedDotIndex);
                        if (oldDotIndex > clickedDotIndex) {
                            carouselMove("left", slidesToMove, options.appendTo, options.cellsToShow, options.transitionSpeed, options.slidesPerClick);
                        } else if (oldDotIndex < clickedDotIndex) {
                            carouselMove("right", slidesToMove, options.appendTo, options.cellsToShow, options.transitionSpeed, options.slidesPerClick);
                        }
                        if (clickedDotIndex == 0) {
                            checkArrows(c, "left");
                        } else if (clickedDotIndex == (c.querySelectorAll('.ps__carousel__outer__dot').length - 1)) {
                            checkArrows(c, "right");    
                       } else {
                            checkArrows(c, "neutral");           
                        }
                    });
                }(td));
            }
            this.carouselOuter.querySelector('.ps__carousel__left__arrow').classList.add('ps__carousel__arrow__faded');
        } else {
            element.parentElement.querySelector('.ps__carousel__dots').style.display = 'none';
        }
        setTimeout(function () {
            element.classList.remove('ps__carousel-fade');
        }, 350);
    }
    function mobileChange(mediaQuery, append) {
        var appendHere = document.querySelector(append);
        if (mediaQuery.matches) { // window width is at least as large as mobile change
            appendHere.parentElement.classList.remove('ps__carousel__mobile__touch');
        } else { // window width is less than mobile change
            appendHere.parentElement.classList.add('ps__carousel__mobile__touch');
        }
    }
    function initializeType() {
        var options = this.options,
            appendHere = document.querySelector(options.appendTo),
            leftArrow = document.querySelector(options.appendTo).parentElement.querySelector('.ps__carousel__left__arrow'),
            rightArrow = document.querySelector(options.appendTo).parentElement.querySelector('.ps__carousel__right__arrow');
        leftArrow.addEventListener('click', function () {
            carouselMove("left", 1, options.appendTo, options.cellsToShow, options.transitionSpeed, options.slidesPerClick);
            if (options.dots === true) {
                dotsChoose("left", options.appendTo);
            }
        });
        rightArrow.addEventListener('click', function () {
            carouselMove("right", 1, options.appendTo, options.cellsToShow, options.transitionSpeed, options.slidesPerClick);
            if (options.dots === true) {
                dotsChoose("right", options.appendTo);
            }
        });
        try {
            if (matchMedia) {
                var mediaQuery = window.matchMedia("(min-width: " + options.mobileAt + ")");
                mediaQuery.addListener(mobileChange(mediaQuery, options.appendTo));
                mobileChange(mediaQuery, options.appendTo);
                window.addEventListener('resize', function () {
                    appendHere.scrollLeft -= 100 * document.querySelectorAll(options.cellClass).length;
                    dotsChoose(false, options.appendTo, 0);
                    mobileChange(mediaQuery, options.appendTo);
                });
            }
        } catch (e) {
            console.error('Browser Not Compatible With matchMedia Listener');
        }
    }
    this.Carousel = function () {
        this.appendTo = null;
        this.arrows = null;
        this.autoplay = null;
        this.cellClass = null;
        this.cellsToShow = null;
        this.desktopPadding = null;
        this.dots = null;
        this.fadeIn = null;
        this.images = null;
        this.maxWidth = null;
        this.mobile = null;
        this.mobileAt = null;
        this.mobilePadding = null;
        this.slidesPerClick = null;
        this.transitionSpeed = null;
        this.responsive = null;
        var defaults = { //Default Options
            appendTo: ".js__carousel__append",
            arrows: true,
            autoplay: false,
            cellClass: ".product",
            cellsToShow: 5,
            desktopPadding: 15,
            dots: true,
            fadeIn: true,
            images: "restrict",
            maxWidth: "100%",
            mobile: "touch",
            mobileAt: "1000px",
            mobilePadding: 5,
            slidesPerClick: 5,
            transitionSpeed: 300
        };
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
        if (arguments[0]) {
            if (typeof arguments[0] === "object") {
                this.options = extendDefaults(defaults, arguments[0]);
            }
        }
        buildCarousel.call(this); //Build Carousel
        initializeType.call(this); //Initialize Click Events
    };
    Carousel.prototype.destroy = function () {
        document.querySelector(this.options.appendTo).parentElement.outerHTML = "";
    };
}());