# Floodfill

HTML5 Canvas Floodfill via JavaScript

## How to use it:

Include it old-school

```<script type="text/javascript" src="floodfill.js"></script>```

Or use the minified version

```<script type="text/javascript" src="floodfill.min.js"></script>```

This adds the ```floodfill``` method to the global window context, and the method ```CanvasRenderingContext2d.prototype.fillFlood``` for idiomatic context invocation.

## context.fillFlood

Like other context fill methods (such as context.fillRect), set the context.fillStyle beforehand to a color.  Patterns and gradients are currently unsupported, but any color supported by CSS can be used.  For example:

 - ```context.fillStyle = 'blue';```
 - ```context.fillStyle = '#0000FF';```
 - ```context.fillStyle = 'rgb(0,0,255)';```
 - ```context.fillStyle = 'rgba(0,0,255,1.0)';```

When the fillStyle is set, call the method with the following arguments: (x , y [,tolerance=0] [,left=0] [,top=0] [,right=context.width] [,bottom=context.height]).

The method signature is:

```CanvasRenderingContext2.prototype.fillFlood = function(uint x, uint y, byte tolerance, uint left, uint top, uint right, uint bottom)```

Here is an example of filling a canvas using the method above, using red as the color and starting the fill algorithm at (x=50,y=75) with a tolerance of 32:

```javascript
var canvas = document.getElementById('canvas_circle');
var context = canvas.getContext('2d');
context.fillStyle = "rgba(255,0,0,1.0)";
context.fillFlood(50, 75, 32);
```

The method arguments are documented below:

#### uint x, uint y (required)
The x,y coordinates are the origin point in which to begin the fill operation.  On an arbitrary canvas the coordinates 10,50 will be the 10th pixel from the left and the 50th pixel from the top.  They must fit within the following boundaries: ```0 <= x < width``` and ```0 <= y < height```

#### byte tolerance (optional, default=0)
The tolerance, which allows for the algorithm to fill similar pixels.  The default is 0, which fills pixels exactly matching that of the starting x,y coordinate.  The maximum of 254 bleeds the fill over all other pixels.  Tip: A typical fill tolerance for anti-alias is 128.

#### uint left (optional, default=0)
It is possible to set a bounding box smaller than the full context area.  The ```left``` argument will prevent the fill from occuring at any pixel coordinate with x less than this left value.

#### uint top (optional, default=0)
It is possible to set a bounding box smaller than the full context area.  The ```top``` argument will prevent the fill from occuring at any pixel coordinate with y less than this top value.

#### uint right (optional, default=context.width)
It is possible to set a bounding box smaller than the full context area.  The ```right``` argument will prevent the fill from occuring at any pixel coordinate with x greater than this right value.

#### uint bottom (optional, default=context.height)
It is possible to set a bounding box smaller than the full context area.  The ```bottom``` argument will prevent the fill from occuring at any pixel coordinate with y greater than this bottom value.


## floodfill

The global floodfill method is available to be called by passing in any Uint8ClampedArray of bytes to be filled.  This allows for asyncronous operations on the data itself (for example in a webworker), without requiring the browser context object.

When calling the method above with a coordinate, color, context, boundaries, and tolerance, the context area starting at the coordinate will be filled with the color in an area of colors similar to that of the coordinate.  The similarity is determined by the tolerance parameter.

Call the method with the following arguments: (data, x , y, color, ,tolerance ,width, height).

Note that this method has no defaults, and all values must be supplied.  Additionally, width and height must match the dimensions of the data object, in the ratio data.length===width*height*4.

The method signature is:

```function floodfill(Uint8ClampedArray data, uint x, uint y, rgba color, byte tolerance, uint width, uint height)```

All the arguments are described below in detail:

#### Uint8ClampedArray data (required)
The data object is an Uint8ClampedArray view of a Typed Array.  The array is one-dimensional, but is treated as a two-dimensional array of blocks of 4 bytes (each byte representing an RGBA color object).  The two dimensions are demarcated by using the width and height arguments as described below.

#### uint x, uint y (required)
The x,y coordinates are the origin point in which to begin the fill operation.  On an arbitrary canvas the coordinates 10,50 will be the 10th pixel from the left and the 50th pixel from the top.  They must fit within the following boundaries: ```0 <= x < width``` and ```0 <= y < height```

#### rgba color (required)
The rgba color argument, represented as ```{r:BYTE,g:BYTE,b:BYTE,a:BYTE}``` where BYTE is a number from 0 to 255, is the color that will be used to fill the data object.

#### byte tolerance (required)
The tolerance, which allows for the algorithm to fill similar pixels.  The default is 0, which fills pixels exactly matching that of the starting x,y coordinate.  The maximum of 254 bleeds the fill over all other pixels.  Tip: A typical fill tolerance for anti-alias is 128.

#### uint width, uint height
The width and height of the two-dimensional construct that is bound to the data object.  As the data object is a two dimensional array of 4 byte blocks representing RGBA pixels, the width and height must match the dimensions of the data object.  The values are validated during method call to ensure the ratio ```data.length===width*height*4```.  A mismatch will result in an error being thrown.

## Examples 

See the code in examples/tests.html

