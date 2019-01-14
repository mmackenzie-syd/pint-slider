(function () {
    var i;
    function checkForSale() {
        if (this.options.vios) {
            var cells = document.querySelector(this.options.appendTo).children;
            for (i = 0; i < cells.length; i += 1) { 
                var p = cells[i];
                if (!p.querySelector('.vio-text') && p.querySelector('.top10__product-inner')) {
                    var v = document.createElement('div');
                    v.classList.add('vio-text');
                    p.querySelector('.product__img-wrapper').parentNode.insertBefore(v, p.querySelector('.product__img-wrapper').nextSibling);
                }
            }
        }
    }
    function cellWidth(element, cells) {
        var styles = window.getComputedStyle(element),
            padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight),
            actualWidth = element.clientWidth - padding;
        return actualWidth / cells;
    }
    function checkArrows(el, direction) {
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
    function buildArrows(container, element, options) {
        var leftArrow = document.createElement('div'),
            leftArrowInner = document.createElement('div'),
            rightArrow = document.createElement('div'),
            rightArrowInner = document.createElement('div'),
            widths = "calc(100% - " + (parseInt(options.arrowWidth.split('px')[0] * 2) + 10) + "px)";
        leftArrow.classList.add('ps__carousel__arrow', 'ps__carousel__arrow__faded');
        leftArrow.classList.add('ps__carousel__left__arrow');
        leftArrow.style.width = options.arrowWidth;
        leftArrowInner.classList.add('ps__carousel__left__arrow__inner', 'ps__carousel__arrow__inner');
        leftArrow.appendChild(leftArrowInner);
        rightArrow.style.width = options.arrowWidth;
        rightArrow.classList.add('ps__carousel__arrow');
        rightArrow.classList.add('ps__carousel__right__arrow');
        rightArrowInner.classList.add('ps__carousel__right__arrow__inner', 'ps__carousel__arrow__inner');
        rightArrow.appendChild(rightArrowInner);
        container.appendChild(leftArrow);
        container.appendChild(element);
        container.appendChild(rightArrow);
        container.querySelector('.ps__carousel__inner').style.width = widths;
        container.querySelector('.ps__carousel__inner').style.minWidth = widths;
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
            cells = element.children,
            numOfDots = Math.ceil(cells.length / options.cellsToShow),
            td,
            t,
            d,
            cellWidth = (100 / options.cellsToShow) + "%";
        this.carouselOuter = document.createElement('div');
        var carouselOuter = this.carouselOuter;
        carouselOuter.classList.add('ps__carousel__outer');
        if (options.price) {
            carouselOuter.classList.add('ps__carousel--show--price');
        }
        if (options.brand === "above") {
            carouselOuter.classList.add('ps__carousel--brand--above');
        } else if (options.brand === "below") {
            carouselOuter.classList.add('ps__carousel--brand--below');
        }
        if (options.oneLineName) {
            carouselOuter.classList.add('ps__carousel--one--line--brand');
        }
        carouselOuter.style.maxWidth = options.maxWidth;
        element.classList.add('ps__carousel__inner');
        element.classList.add('ps__carousel-fade');
        element.parentNode.appendChild(carouselOuter);
        carContainer = element.parentNode.querySelector('.ps__carousel__outer');
        for (i = 0; i < cells.length; i += 1) {
            cells[i].style.width = cellWidth;
            cells[i].style.minWidth = cellWidth;
            cells[i].classList.add('ps__carousel__inner__cell');
            if (options.images === "loose" && cells[i].querySelector('.product__img-wrapper')) {
                cells[i].querySelector('.product__img-wrapper').getElementsByTagName('img')[0].classList.add('ps__carousel--loose--images');
            }
        }
        if (options.arrows) {
            buildArrows(carContainer, element, options);
            initializeArrows(options);
        } else {
            element.style.width = "100%";
            element.style.minWidth = "100%";
            carContainer.appendChild(element);
        }
        if (options.dots) {
            buildDots(carContainer, numOfDots);
            initializeDots(options, numOfDots, carouselOuter);
        }
        setTimeout(function () {element.classList.remove('ps__carousel-fade')}, 350);
    }
    function mobileChange(mediaQuery, append) { //IF MOBILE OR NOT - ADD/REMOVE CLASS
        var appendHere = document.querySelector(append).parentElement.classList;
        mediaQuery.matches ? appendHere.remove('ps__carousel__mobile__touch') : appendHere.add('ps__carousel__mobile__touch');
    }
    function mobileCheck() { //CHECK IF MOBILE AND CHANGE IF SO
        var options = this.options,
            appendHere = document.querySelector(options.appendTo);
        if (matchMedia) { //IF BROWSER IS COMPATABLE WITH MATCHMEDIA
            var mediaQuery = window.matchMedia("(min-width: " + options.mobileAt + ")"); //MAKE MEDIA QUERY
            mediaQuery.addListener(mobileChange(mediaQuery, options.appendTo)); //LISTEN FOR MOBILE CHANGE
            mobileChange(mediaQuery, options.appendTo); //CHECK INITIAL IF BROWSER IS MOBILE
            window.addEventListener('resize', function () { //LISTEN FOR MOBILE CHANGE
                appendHere.scrollLeft -= 101 * appendHere.children.length; // MOVE CAROUSEL TO BEGINNING IF NOT THERE WHEN CHANGE OCCURS
                if (options.arrows) {
                    checkArrows(document.querySelector(options.appendTo).parentElement, "left"); //RESET ARROWS TO DEFAULT
                }
                if (options.dots) {
                    dotsChoose(false, options.appendTo, 0); //RESET DOT COUNT TO 0
                }
                mobileChange(mediaQuery, options.appendTo); //CHANGE TO MOBILE VIEW IF NEEDED
            });
        } else { //IF NOT COMPATABLE WITH MATCHMEDIA (IE 9 and below) THEN HIDE CAROUSEL
            appendHere.style.display = "none";
        }
    }
    function initializeArrows(options) {
        var arrows = document.querySelector(options.appendTo).parentElement;
        if (options.arrows) {
            var leftArrow = arrows.querySelector('.ps__carousel__left__arrow'),
                rightArrow = arrows.querySelector('.ps__carousel__right__arrow');
            leftArrow.addEventListener('click', function () {
                carouselMove("left", 1, options.appendTo, options.cellsToShow, options.transitionSpeed, options.slidesPerClick);
                options.dots ? dotsChoose("left", options.appendTo) : null;
            });
            rightArrow.addEventListener('click', function () {
                carouselMove("right", 1, options.appendTo, options.cellsToShow, options.transitionSpeed, options.slidesPerClick);
                options.dots ? dotsChoose("right", options.appendTo) : null;
            });
        }
    }
    function initializeDots(options, numOfDots, carouselOuter) {
        if (options.dots) {
            for (t = 0; t < numOfDots; t += 1) {
                var c = carouselOuter,
                    td = carouselOuter.querySelectorAll('.ps__carousel__outer__dot')[t];
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
                        if (options.arrows) {
                            if (clickedDotIndex == 0) {
                                checkArrows(c, "left");
                            } else if (clickedDotIndex == (c.querySelectorAll('.ps__carousel__outer__dot').length - 1)) {
                                checkArrows(c, "right");    
                            } else {
                                checkArrows(c, "neutral");           
                            }
                        }
                    });
                }(td));
            }
        } else {
            element.parentElement.querySelector('.ps__carousel__dots').style.display = 'none';
        }
    }
    this.Carousel = function () {
        var defaults = { //DEFAULT OPTIONS FOR CAROUSEL
            appendTo: ".js__carousel__append", //NAME OF CONTAINER TO APPEND NEW CAROUSEL TO
            arrows: true, //DO YOU WANT ARROWS
            arrowWidth: "30px", //HOW THINK SHOLD ARROW BANDS BE
            autoplay: false, //SHOULD CAROUSEL AUTOMATICALLY MOVE - NOT IN CODE YET
            brand: "above", //BBCOM ONLY - PUTS BRAND NAME ABOVE OR BELOW PRODUCT NAME
            cellClass: ".product", //NAME OF CELLS INSIDE CONTAINER
            cellsToShow: 5, //HOW MANY CELLS SHOULD CAROUSEL SHOW
            desktopPadding: 15, //PADDING FOR EACH CELL ON DESKTOP - NOT IN CODE YET
            dots: true, //SHOULD CAROUSEL HAVE DOTS UNDERNEATH FOR NAVIGATION
            fadeIn: true, //SHOULD CAROUSEL FADE IN (REDUCES FLASH OF CELLS SOMETIMES)
            images: "restrict", //BBCOM ONLY - RESTRICTS HEIGHT AND WIDTH OF BOTTLES
            maxWidth: "100%", //MAX WIDTH OF CAROUSEL
            mobile: "touch", //CHANGE BETWEEN ARROWS AND TOUCH SLIDE - NOT IN CODE YET
            mobileAt: "1000px", //WHEN THE CAROUSEL SHOULD CHANGE TO MOBILE VIEW
            mobilePadding: 5, //PADDING FOR EACH CELL ON MOBILE - NOT IN CODE YET
            oneLineName: false, //BBCOM ONLY - RESTRICT PRODUCT NAME TO ONE LINE
            price: false, //BBCOM ONLY - SHOW PRICE OF PRODUCTS IN CAROUSEL
            slidesPerClick: 5, //HOW MANY SLIDES SHOULD CAROUSEL MOVE ON ARROW CLICK
            transitionSpeed: 300, //HOW FAST SHOULD CAROUSEL MOVE WHEN SLIDING
            vios: false //BBCOM ONLY - SHOW VIOLATOR/SALE TAGS ON PRODUCTS
        };
        function extendDefaults(source, properties) { //PUT OPTIONS ABOVE INTO AN OBJECT SO FUNCTIONS CAN USE DATA
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
        buildCarousel.call(this); //BUILD CAROUSEL PIECES
        mobileCheck.call(this); //CHECK IF DEVICE IS MOBILE OR NOT AND INITIALIZE LISTENERS
        checkForSale.call(this); //BBCOM SPECIFIC - CHECK IF PRODUCT HAS VIO TAG ALREADY
    };
    Carousel.prototype.destroy = function () { //DESTROY A CAROUSEL
        document.querySelector(this.options.appendTo).parentElement.outerHTML = "";
    };
}());