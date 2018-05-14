# Pint Slider

##### Smallest damn carousel Bodybuilding.com has ever seen.
<br />

## Features

* Choose container to append new carousel to
* Toggle Arrows On/Off
* Toggle Dots On/Off
* Autoplay (coming soon)
* Use your own class to choose what cells are called
* Slides To Move Per Click
* Variable Cell Amount Per Slide
* Adjustable Max-Width
* Auto FadeIn
* Auto Height
* Auto Cell Width
* Choose When To Switch To Mobile Version
* Variable Speed Of Slide Movement
* Images can be constrained in size (Supplements usually) or can expand to fill whole image container


<br />

## Usage
**1. Add script and css tags as high on the page as you are able**

```javascript
<link rel="stylesheet" href="https://www.bodybuilding.com/scripts/pint-slider.min.css" />
<script type="text/javascript" src="https://www.bodybuilding.com/scripts/pint-slider.min.js"></script>
```

**2. Add a container around the elements that you want to pint-sliderer..er**
   
   Container should have class for only Javascript to target, no styling attached to it. "js-carousel-append" is recommended if only one carousel on page.
```html
<div class="js-carousel-append">
  <!-- Elements go here -->
</div>
```

**3. Create and Initialize New Carousel**

```javascript
var exampleCarousel = new Carousel({
    appendTo : ".js-carousel-append",
    mobileAt: "900px"
});
```

<br />

## Options


### Initialization Options

Options | Default | Description
------------ | ------------- | -------------
appendTo: | ".js-carousel-append" | Name of the carousel container that contains the elements to be pint-sliderded.
arrows: | true | Should carousel have arrows?
autoplay: | false | Automatically have the slides move each X seconds. **Feature Coming Soon**
cellClass: | ".product" | Class name of the 'cells' inside your container, if they are targeters then default is fine.
cellsToShow: | 5 | How many cells should show per slide?
desktopPadding: | 15 | Padding for each cell on Desktop, left and right.  **Feature Coming Soon**
dots: | false | Should carousel have dots on bottom for nav?
fadeIn: | true | Should carousel Fade In?
images: | "restrict" | Can be set to "loose" in order for product image to fill whole image container, other wise image is restricted in height and width (restricted for use with supplement bottles)
mobile: | "touch" | In future will add option here to have arrows instead of "touch", doesn't need to be set now. **Feature Coming Soon**
mobileAt: | "1000px" | Where should carousel switch to swipe friendly carousel?
mobilePadding: | 5 | Padding for each cell on Mobile, left and right.  **Feature Coming Soon**
slidesPerClick: | 5 | How many slides should carousel move per click on nav buttons?
transitionSpeed: | 300 | How fast should the slides be? In Milliseconds.

### After Initialization Options

Options | Option | Description
------------ | ------------- | -------------
Destroy | exampleCarousel.destroy(); | Destroys built elements and all cells within it; good for carousels like the Store Index.
Future | | In the Future I'll be adding rebuild options and more robust mobile options. 

<br />

## Other Considerations
* **- CSS contains markup to change native targeters on the site, no need to do it first.**
* **- Don't set the width of the cells within the carousel (automatically done)**
