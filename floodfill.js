var floodfill = (function() {

	//MIT License
	//Author: Max Irwin, 2011,2016

	//Floodfill functions
	function floodfill(x,y,fillcolor,ctx,width,height,tolerance) {

		//Defaults and type checks for width and height
		width = (!isNaN(width)&&width) ? Math.min(Math.abs(width),ctx.canvas.width) : ctx.canvas.width;
		height = (!isNaN(height)&&height) ? Math.min(Math.abs(height),ctx.canvas.height) : ctx.canvas.height;

		//Maximum tolerance of 254, Default to 0
		tolerance = (!isNaN(tolerance)) ? Math.min(Math.abs(tolerance),254) : 0;

		var img = ctx.getImageData(0,0,width,height);
		var data = img.data;
		var length = data.length;
		var Q = [];
		var i = (x+y*width)*4;
		var e = i, w = i, me, mw, w2 = width*4;
		var targetcolor = [data[i],data[i+1],data[i+2],data[i+3]];

		if(!pixelCompare(i,targetcolor,fillcolor,data,length,tolerance)) { return false; }
		Q.push(i);
		while(Q.length) {
			i = Q.pop();
			if(pixelCompareAndSet(i,targetcolor,fillcolor,data,length,tolerance)) {
				e = i;
				w = i;
				mw = parseInt(i/w2)*w2; //left bound
				me = mw+w2;             //right bound
				while(mw<w && mw<(w-=4) && pixelCompareAndSet(w,targetcolor,fillcolor,data,length,tolerance)); //go left until edge hit
				while(me>e && me>(e+=4) && pixelCompareAndSet(e,targetcolor,fillcolor,data,length,tolerance)); //go right until edge hit
				for(var j=w;j<e;j+=4) {
					if(j-w2>=0      && pixelCompare(j-w2,targetcolor,fillcolor,data,length,tolerance)) Q.push(j-w2); //queue y-1
					if(j+w2<length	&& pixelCompare(j+w2,targetcolor,fillcolor,data,length,tolerance)) Q.push(j+w2); //queue y+1
				}
			}
		}
		ctx.putImageData(img,0,0);
	}

	function pixelCompare(i,targetcolor,fillcolor,data,length,tolerance) {
		if (i<0||i>=length) return false; //out of bounds
		if (data[i+3]===0 && fillcolor.a>0) return true;  //surface is invisible and fill is visible

		if (
			(targetcolor[3] === fillcolor.a) &&
			(targetcolor[0] === fillcolor.r) &&
			(targetcolor[1] === fillcolor.g) &&
			(targetcolor[2] === fillcolor.b)
		) return false; //target is same as fill

		if (
			(targetcolor[3] === data[i+3]) &&
			(targetcolor[0] === data[i]  ) &&
			(targetcolor[1] === data[i+1]) &&
			(targetcolor[2] === data[i+2])
		) return true; //target matches surface

		if (
			Math.abs(targetcolor[3] - data[i+3])<=(255-tolerance) &&
			Math.abs(targetcolor[0] - data[i]  )<=tolerance &&
			Math.abs(targetcolor[1] - data[i+1])<=tolerance &&
			Math.abs(targetcolor[2] - data[i+2])<=tolerance
		) return true; //target to surface within tolerance

		return false; //no match
	}

	function pixelCompareAndSet(i,targetcolor,fillcolor,data,length,tolerance) {
		if(pixelCompare(i,targetcolor,fillcolor,data,length,tolerance)) {
			//fill the color
			data[i]   = fillcolor.r;
			data[i+1] = fillcolor.g;
			data[i+2] = fillcolor.b;
			data[i+3] = fillcolor.a;
			return true;
		}
		return false;
	}

	return floodfill;

})();