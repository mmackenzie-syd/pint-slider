# Pint Slider

##### Smallest damn carousel Bodybuilding.com has ever seen.
<br />

## Features

* Slides Per Click
* Variable Cells Per Slide
* Auto FadeIn
* Auto Height
* Auto Cell Width
* Choose When To Switch To Mobile Carousel
* Variable Speed Of Slides
* Variable Padding Of Cells
* Customize Classes Of Container And Cells

<br />

## Usage
**1. Add script and css tags as high on the page as you are able**

```javascript
<link rel="stylesheet" href="https://www.bodybuilding.com/scripts/pint-slider.min.css" />
<script type="text/javascript" src="https://www.bodybuilding.com/scripts/pint-slider.min.js"></script>
```

**2. Add a container around the elements that you want to pint-slider..er**
   
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
    mobileAt: 900
});
exampleCarousel.initialize();
```

<br />

## Options


### Initialization Options

Options | Default | Description
------------ | ------------- | -------------
appendTo: | ".js-carousel-append" | Name of the carousel container that contains the elements to be pint-sliderded.
arrows: | true | Should carousel have arrows?
cellClass: | ".product" | Class name of the 'cells' inside your container, if they are targeters then default is fine.
cellsToShow: | 5 | How many cells should show per slide?
desktopPadding: | 15 | Padding for each cell on Desktop, left and right.
dots: | false | Should carousel have dots?
fadeIn: | true | Should carousel Fade In?
mobile: | "touch" | In future will add option here to have arrows instead of "touch"
mobileAt: | 1000 | Where should carousel switch to swipe friendly carousel?
mobilePadding: | 5 | Padding for each cell on Mobile, left and right.
slidesPerClick: | 5 | How many slides should carousel move per click on nav buttons?
transitionSpeed: | 300 | How fast should the slides be? In Milliseconds.

### After Initialization Options

Options | Option | Description
------------ | ------------- | -------------
Destroy | exampleCarousel.destroy(); | Destroys built elements and all cells within it; good for carousels like the Store Index.
Future | | In the Future I'll be adding a rebuild options and better mobile options. 

<br />

## Other Considerations
- Carousel works best at a set width that stays the same until breakpoint for mobile is reached.
  - This shouldn't be a huge issue as no customers ever resize thier browser, but it will be addressed none-the-less in the near future.
- CSS contains markup to change native targeters on the site, no need to do it first.
- Don't set the width of the cells within the carousel (automatically done)
