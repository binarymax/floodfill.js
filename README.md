# Floodfill

HTML5 Canvas Floodfill via JavaScript

##How to use it:
Give the floodfill method a coordinate, color, context, boundaries, and tolerance

The context will be filled with the color following the given parameters

###Coordinates (required)
The first two arguments are an x,y coordinate.  On an arbitrary canvas the coordinates 10,50 will be the 10th pixel from the left and the 50th pixel from the top.  This is the point where the fill algorithm begins.

###Color (required)
The third argument is an rgba color object, represented as:
```{r:BYTE,g:BYTE,b:BYTE,a:BYTE}```
where BYTE is a number from 0 to 255.

###Context (required)
The fourth argument is the 2d context of the canvas object on which to execute the fill

###Width (default canvas.width)
The fifth argument is a optional width of the fill boundaries, from the absolute left.

###Height(default canvas.height)
The sixth argument is a optional width of the fill boundaries, from the absolute left.

###Tolerance (default 0)
The seventh argument is the optional tolerance, which allows for the algorithm to fill similar pixels.  The default is 0, which fills pixels exactly matching that of the starting x,y coordinate.

Tip: A typical fill tolerance for anti-alias is 128

##Examples 

See the code in examples/tests.html

