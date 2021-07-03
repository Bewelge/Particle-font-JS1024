let distance = (p1, p2) => Math.hypot(p2[0] - p1[0], p2[1] - p1[1]),
	angle = (p1, p2) => Math.atan2(p2[1] - p1[1], p2[0] - p1[0]),
	ctx = a.getContext("2d"),
	drawLine = (p1, p2) => {
		ctx.moveTo(p1[0], p1[1])
		ctx.lineTo(p2[0], p2[1])
	},
	getOriginalPos = z => z.slice(2, 4),
	fontSize = 26,
	width = 300,
	windowWidth = a.width,
	windowHeight = a.height,
	dots = [],
	mousePos = [0, 0],
	ticker = 0,
	applyForce = (point, point2, force) => {
		let ang = angle(point, point2)
		point[4] -= Math.cos(ang) * force
		point[5] -= Math.sin(ang) * force
	},
	i = 3
//Mouse listener to keep track of mouse pos
a.addEventListener("mousemove", e => (mousePos = [e.clientX, e.clientY]))
//text to draw
a = "JS1024"
ctx.font = fontSize + "px Arial"
ctx.fillText(a, 0, 20)
let x = windowWidth / 2 - (ctx.measureText(a).width * 7) / 2
//get image data from the top left of the canvas, where we just drew the text
let dt = ctx.getImageData(0, 0, width, fontSize).data
/**
 * iterate over image data. We start at 3 (the first alpha value) and increase i by 4 every iteration. 
 * If the alpha value is above 0, it means the pixel is filled so we add a dot. Would be nicer in a for-loop but had to save
 * characters :-)
 * Dot structure:
 * [
 *  xPosition, yPosition  (random values at start),
 *  xOriginalPos,yOriginalPos (position where the dot will return to. Calculated by getting the pixels row/column index, scaling and centering it)
 *  motionX,
 *  motionY,
 *  nearbyDots (array of dots whose originalPos is nearby to this dots originalPos)
 * ]

 * */
while (dt[(i += 4)] > -1) {
	dt[i] > 0
		? dots.push([
				Math.random() * windowHeight,
				Math.random() * windowHeight,
				x + 7 * ((i / 4) % width),
				windowHeight / 2 + 7 * (i / 4 / width),
				0,
				0,
				[]
		  ])
		: 0
}

//Fill the nearbyDots of each dot
dots.forEach(
	d =>
		(d[6] = dots.filter(
			p => d != p && distance(getOriginalPos(d), getOriginalPos(p)) < 15
		))
)
ctx.fillStyle = "#0000001a"
ctx.strokeStyle = "#ffffff1a"
const draw = () => {
	ticker++

	//fill rect with low alpha black instead of clearing to create fading effect
	ctx.fillRect(0, 0, windowWidth, windowHeight)

	ctx.beginPath()
	dots.forEach(dot => {
		let distanceMouse = distance(dot, mousePos),
			distanceToOriginalPos = distance(dot, getOriginalPos(dot))
		//If distance to mouse is smaller 150, we apply some force pushing the dot away
		distanceMouse < 150
			? applyForce(dot, mousePos, (ticker % 150) * Math.log10(distanceMouse))
			: 0
		//If dot isn't at original position, add some pullback force to the dot
		distanceToOriginalPos
			? applyForce(
					dot,
					getOriginalPos(dot),
					-((distanceToOriginalPos / 100) * ((ticker % 150) / 150))
			  )
			: 0

		// add motion to position and dampen motion
		dot[0] += dot[4] *= 0.85
		dot[1] += dot[5] *= 0.85

		//if dot isn't at original position, draw a line to each nearby Dot that's closer than 150px.
		distanceToOriginalPos > 1
			? dot[6]
					.filter(b => distance(b, dot) < 150)
					.forEach(q => drawLine(dot, q))
			: 0

		//Draw a rect at the dots' position. If the dot isn't at its original position, draw it two more times.
		//This is to give the dots a little more visibility when flying around. Costs less characters than
		//beginning another path and using a different strokestyle
		drawRect = () => ctx.rect(dot[0], dot[1], 3, 3)
		drawRect()
		distanceToOriginalPos > 1 ? (drawRect(), drawRect()) : 0
	})
	ctx.stroke()
	window.requestAnimationFrame(draw)
}
draw()
