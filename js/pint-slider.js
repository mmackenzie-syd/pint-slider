(function () {
    var i,
        scrollAmount;
    function cellWidth(element, cells) {
        var styles = window.getComputedStyle(element),
            padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight),
            actualWidth = element.clientWidth - padding;
        return actualWidth / cells;
    }
    function containerWidth(element) {
        var styles = window.getComputedStyle(element),
            padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight),
            actualWidth = element.clientWidth - padding;
        return actualWidth;
    }
    function buildCarousel() {
        var element = document.querySelector(this.options.appendTo),
            options = this.options,
            cells,
            productPadding;
        this.carouselOuter = document.createElement('div');
        this.carouselOuter.classList.add('ps__carousel__outer');
        element.classList.add('ps__carousel__inner', 'ps__carousel-fade');
        element.parentNode.appendChild(this.carouselOuter);
        if (this.options.arrows === true) {
            this.leftArrow = document.createElement('div');
            this.rightArrow = document.createElement('div');
            this.leftArrow.classList.add('ps__carousel__arrow', 'ps__carousel__left__arrow');
            this.rightArrow.classList.add('ps__carousel__arrow', 'ps__carousel__right__arrow');
            this.carouselOuter.appendChild(this.leftArrow);
            element.parentNode.querySelector('.ps__carousel__outer').appendChild(element);
            this.carouselOuter.appendChild(this.rightArrow);
        } else {
            element.parentNode.querySelector('.ps__carousel__outer').appendChild(element);
        }
        cells = element.querySelectorAll(this.options.cellClass);
        var appendTo = document.querySelector(options.appendTo),
            carWidth = appendTo.clientWidth,
            width = cellWidth(element, options.cellsToShow) + "px";
        if (carWidth >= options.mobileAt) {
            productPadding = options.desktopPadding;
        } else {
            productPadding = options.mobilePadding;
        }
        for (i = 0; i < cells.length; i += 1) {
            cells[i].style.padding = "0 " + productPadding + "px";
            cells[i].style.width = width;
            cells[i].style.minWidth = width;
        }
        element.classList.remove('ps__carousel-fade');
    }
    function destroy() {
        document.querySelector(this.options.appendTo).parentElement.outerHTML = "";
    }
    function initializeType() {
        var appendTo = document.querySelector(this.options.appendTo),
            carWidth = containerWidth(appendTo),
            options = this.options;
        if (options.arrows) {
            var leftArrow = this.carouselOuter.querySelector('.ps__carousel__left__arrow'),
                rightArrow = this.carouselOuter.querySelector('.ps__carousel__right__arrow');
            leftArrow.addEventListener('click', this.left.bind(this));
            rightArrow.addEventListener('click', this.right.bind(this));
        }
        if (carWidth > options.mobileAt) {
            appendTo.parentElement.classList.remove('ps__carousel__mobile__touch');
        } else {
            appendTo.parentElement.classList.add('ps__carousel__mobile__touch');
        }
        window.addEventListener("resize", function(){
            if (containerWidth(appendTo) >= options.mobileAt - 1) {
                appendTo.parentElement.classList.remove('ps__carousel__mobile__touch');
            } else {
                appendTo.parentElement.classList.add('ps__carousel__mobile__touch');
            }
        });
    }
    this.Carousel = function () {
        this.appendTo = null;
        this.arrows = null;
        this.cellClass = null;
        this.cellsToShow = null;
        this.desktopPadding = null;
        this.dots = null;
        this.mobile = null;
        this.mobileAt = null;
        this.mobilePadding = null;
        this.slidesPerClick = null;
        this.transitionSpeed = null;
        this.fadeIn = null;
        this.responsive = null;
        var defaults = { //Default Options
            appendTo: ".js-carousel-append",
            arrows: true,
            cellClass: ".product",
            cellsToShow: 5,
            desktopPadding: 15,
            dots: false,
            fadeIn: true,
            mobile: "touch",
            mobileAt: 1000,
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
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
        
    };
    Carousel.prototype.initialize = function () {
        buildCarousel.call(this); //Build Carousel
        initializeType.call(this); //Initialize Click Events
    };
    Carousel.prototype.destroy = function () {
        destroy.call(this);
    };
    Carousel.prototype.left = function () {
        scrollAmount = 0;
        var container = this.options.appendTo,
            cellsToShow = this.options.cellsToShow,
            cellsToSlide = this.options.slidesPerClick,
            containWidth = cellWidth(document.querySelector(container), cellsToShow),
            totalSlide = cellsToSlide * containWidth,
            slideSpeed = this.options.transitionSpeed,
            slideTimer = setInterval(function () {
                document.querySelector(container).scrollLeft -= slideSpeed / 10;
                scrollAmount += slideSpeed / 10;
                if (scrollAmount >= totalSlide) {
                    window.clearInterval(slideTimer);
                }
            }, 10);
    };
    Carousel.prototype.right = function () {
        scrollAmount = 0;
        var container = this.options.appendTo,
            cellsToShow = this.options.cellsToShow,
            cellsToSlide = this.options.slidesPerClick,
            containWidth = cellWidth(document.querySelector(container), cellsToShow),
            totalSlide = cellsToSlide * containWidth,
            slideSpeed = this.options.transitionSpeed,
            slideTimer = setInterval(function () {
                document.querySelector(container).scrollLeft += slideSpeed / 10;
                scrollAmount += slideSpeed / 10;
                if (scrollAmount >= totalSlide) {
                    window.clearInterval(slideTimer);
                }
            }, 10);
    };
}());