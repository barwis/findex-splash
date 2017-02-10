// oh snap!
/* jshint loopfunc:true */

'use strict';

function SignupForm(svgRef, container) {
	this.svgRef = svgRef;

	this.container = document.getElementsByClassName(container).length > 0 ? document.getElementsByClassName(container)[0] : null;
}


window.SignupForm.prototype = {
	originalSize: {},
	size: {},
	padding: .1,
	snap: null,

	init: function() {
		if (this.container != null) {
			this.setSize();
			var svg = document.getElementById(this.svgRef);
			svg.setAttribute('width', this.originalSize.width);
			svg.setAttribute('height', this.originalSize.height);
		} else {
			return false;
		}

	},

	setSize: function() {
		this.originalSize = {
			width: this.container.offsetWidth,
			height: this.container.offsetHeight
		};
		this.size = {
			width: this.originalSize.width * .8,
			height: this.originalSize.height * .8
		};
	},
	getSize: function() {
		return this.size;
	},

	createMask: function() {
		this.snap = Snap('#' + this.svgRef);

		// add first circle
		var c0x = this.size.width * .58,
			c0y = this.size.height * .5,
			c0r = this.size.width * .414,
			c1x = this.size.width * .174,
			c1y = this.size.height * .215,
			c1r = c1x,
			c2x = this.size.width * .392,
			c2y = this.size.height * .095,
			c2r = this.size.width * .09,
			c3x = this.size.width * .607,
			c3y = this.size.height * .91,
			c3r = this.size.width * .085,
			c4x = this.size.width * .8,
			c4y = this.size.height * .863,
			c4r = this.size.width * .115,
			c5x = c1x,
			c5y = c1y, 
			c5r = c1r - 10,
			circles = [
				this.snap.circle(c0x, c0y, 0).attr('id', 'circle0'), 																//0
				this.snap.circle(c2x, c2y + c2r, 0).attr('id', 'circle2'),															//1
				this.snap.circle(c1x, c1y, 0).attr({'fill': '#ed5153', 'id': 'circle1', 'stroke': '#ffffff', 'stroke-width' : 20}), //2
				this.snap.circle(c3x, c3y, 0).attr('id', 'circle3'),																//3
				this.snap.circle(c4x, c4y, 0).attr('id', 'circle4')																	//4
			],
			mask = this.snap.circle(c1x, c1y, 0),
			maskG = this.snap.group(mask),
			image = this.snap.image('/images/pop_img.png'),
			imageWidth = 564,
			scale = imageWidth / c1r /5,

			imageGroup = this.snap.group(image).attr({mask: maskG});//

			image.transform(new Snap.Matrix().scale(scale, scale));


				// this.snap.circle(c5x, c5y, 0).attr({'fill': '#ed5153', 'id': 'circle5'})

		// var t = new Snap.Matrix().translate(this.originalSize.width * this.padding, this.originalSize.height * this.padding);

		this.maskGroup = this
							.snap
							.group(circles[0], circles[1], circles[2], circles[3], circles[4], imageGroup)
							.transform(new Snap.Matrix().translate(this.originalSize.width * this.padding, this.originalSize.height * this.padding))
							.attr('id', 'myGroup')
							.attr('filter', 'url(#dropshadow)');


		mask.animate({
			r: c1r
		}, 2000, mina.backout);

		var animations = [
			{r: c0r},
			{r: c2r, cy: c2y},
			{r: c1r, cx: c1x, cy: c1y},
			{r: c3r, cy: c3y},
			{r: c4r},
			// {r: c5r}
		];

		for (var i = 0; i < animations.length; i++) {
			(function(index) {
				var c = i;
				window.setTimeout(function() {
					circles[c].animate(animations[c], 250, mina.backout);
				}, c * 150);
			})(i);

		}

		// circle1.animate({r: c1r}, 500, mina.backout);

		// window.setTimeout(function() {
		// 	circle2.animate({
		// 		r: c2r,
		// 		cx: c2x,
		// 		cy: c2y
		// 	}, 500, mina.backout);
		// }, 500);

		// window.setTimeout(function() {
		// 	circle3.animate({
		// 		r: c3r, 
		// 		cy: c3y
		// 	}, 500, mina.backout);
		// }, 1000)

		// this.snap.use()
		// 	.attr({
		// 		'xlink:href': '#myGroup',
		// 		'width': this.size.width,
		// 		'height': this.size.height
		// 	});


		// return this.snap;


	}

};

$('button').click(function() {
	$('.overlay').fadeIn(700, function() {
		var signupForm = new SignupForm('bubbles', 'signup_form');
		signupForm.init();
		signupForm.createMask();
	});
});

(function(){
	
})();
