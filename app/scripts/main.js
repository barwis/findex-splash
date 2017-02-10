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
	borderRadius: 0,
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
		this.borderRadius = Math.min(this.originalSize.width, this.originalSize.height) / 100;

	},
	getSize: function() {
		return this.size;
	},

	createMask: function() {
		this.snap = Snap('#' + this.svgRef);

		// add first circle
		var centerX = this.size.width / 2,
			centerY = this.size.height / 2,
			borderRadius = this.borderRadius,
			minCenter = Math.min(centerX, centerY),
			c0x = centerX + minCenter * 0.1734197731,
			c0y = centerY, 
			c0r = minCenter * 0.8265802269,
			c1x = centerX - minCenter * 0.2000850746,
			c1y = centerY - minCenter * 0.7817504052,
			c1r = minCenter * 0.1641791045,
			c2x = centerX - minCenter * 0.6531604538,
			c2y = centerY - minCenter * 0.5316045381,
			c2r = minCenter * 0.3468395462,
			c3x = centerX + minCenter * 0.2126623377,
			c3y = centerY + minCenter * 0.7795786062,
			c3r = minCenter * 0.1588330632,
			c4x = centerX + minCenter * 0.5867098865,
			c4y = centerY + minCenter * 0.6969205835,
			c4r = minCenter * 0.2188006483,
			imgMask = this.snap.circle(c2x, c2y, 0).attr({'fill': 'white'}),
			circles = [
				this.snap.circle(c0x, c0y, 0).attr({'id': 'circle0', 'fill': '#d8eaf6'}),
				this.snap.group(
					this.snap.circle(c1x, c1y, c1r).attr({'fill': 'none', 'stroke': '#d8eaf6', 'stroke-width': this.borderRadius}),
					this.snap.image('/images/logo_full.svg', (c1x - c1r + this.borderRadius / 4), (c1y - c1r + this.borderRadius /4), c1r * 2 - this.borderRadius / 2, c1r * 2 - this.borderRadius /2)
				).attr('id', 'circle1').transform('s0,0'),
				this.snap.group(
					this.snap.circle(c2x, c2y, 0).attr({'fill': '#ed5153', 'stroke': '#d8eaf6', 'stroke-width': this.borderRadius}),
					this.snap.image('/images/pop_img.png', (c2x - c2r + this.borderRadius/2), (c2y - c2r + this.borderRadius/2), c2r * 2 -  this.borderRadius, c2r * 2 - this.borderRadius).attr({mask: imgMask})
				).attr('id', 'circle2'),//.transform('s0,0'),
				this.snap.group(
					this.snap.circle(c3x, c3y, c3r).attr({'fill': '#ef4721', 'stroke': '#d8eaf6', 'stroke-width': this.borderRadius}),
					this.snap.text(c3x, c3y, 'Close').attr({'text-anchor': 'middle', 'font-size': minCenter/100 + 'rem', 'dominant-baseline' : 'central'})
				).transform('s0,0'),
				this.snap.group(
					this.snap.circle(c4x, c4y, c4r).attr({'fill': '#d5d9db', 'stroke': '#d8eaf6', 'stroke-width': this.borderRadius}),
					this.snap.text(c4x, c4y, 'Send').attr({'text-anchor': 'middle', 'font-size': minCenter/80 +'4rem', 'dominant-baseline' : 'central'})

				).transform('s0,0')
			];

		this
			.snap
			.group(circles[0], circles[1], circles[2], circles[3], circles[4])//, circles[3], circles[4])
			.transform(new Snap.Matrix().translate(this.originalSize.width * this.padding, this.originalSize.height * this.padding))
			.attr('id', 'myGroup')
			.attr('filter', 'url(#black-glow)');

		var animations = [
			{r: c0r},
			{transform:'s1,1'},
			{r: c2r},
			{transform:'s1,1'},
			{transform:'s1,1'}

			//{r: c1r},
			//{transform:'s1,1'},
			//{transform:'s1,1'}
			// {r: c5r}
		];

		for (var i = 0; i < animations.length; i++) {

			if (i === 2) {
				(function(index) {
					var c = i;
					window.setTimeout(function() {
						circles[c][0].animate(animations[c], 250, mina.backout);
						console.log(c2r, borderRadius);
						imgMask.animate({r: c2r - borderRadius /2 }, 250, mina.backout);
					}, c * 150);
				})(i);

			} else {
				(function(index) {
					var c = i;
					window.setTimeout(function() {
						circles[c].animate(animations[c], 250, mina.backout);
					}, c * 150);
				})(i);
			}
		}
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
