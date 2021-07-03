let k = (p, q) => n.hypot(q[0] - p[0], q[1] - p[1]),
	p = (p, q) => n.atan2(q[1] - p[1], q[0] - p[0]),
	c = a.getContext("2d"),
	o = p => c.moveTo(p[0], p[1]),
	l = (p, q) => {
		o(p)
		c.lineTo(q[0], q[1])
	},
	t = z => z.slice(2, 4),
	h = 26,
	w = 300,
	g = a.width,
	j = a.height,
	u = [],
	m = [0, 0],
	tk = 0,
	n = Math,
	r = () => n.random() * j,
	dn = (d, e, f) => {
		let a = p(d, e)
		d[4] -= n.cos(a) * f
		d[5] -= n.sin(a) * f
	},
	q = 150,
	i = 3

a.addEventListener("mousemove", e => (m = [e.clientX, e.clientY]))
a = "JS1024"
c.font = h + "px Arial"
c.fillText(a, 0, 20)
let x = g / 2 - (c.measureText(a).width * 7) / 2

let dt = c.getImageData(0, 0, w, h).data
while (dt[(i += 4)] > -1) {
	dt[i] > 0
		? u.push([
				r(),
				r(),
				x + 7 * ((i / 4) % w),
				j / 2 + 7 * (i / 4 / w),
				0,
				0,
				[]
		  ])
		: 0
}

u.forEach(d => (d[6] = u.filter(p => d != p && k(t(d), t(p)) < 15)))
c.fillStyle = "#0000001a"
c.strokeStyle = "#ffffff1a"
const dr = () => {
	tk++

	c.fillRect(0, 0, g, j)

	c.beginPath()
	u.forEach(d => {
		let dm = k(d, m),
			dO = k(d, t(d))
		dm < q ? dn(d, m, (tk % q) * n.log10(dm)) : 0
		dO ? dn(d, t(d), -((dO / 100) * ((tk % q) / q))) : 0

		d[0] += d[4] *= 0.85
		d[1] += d[5] *= 0.85

		dO > 1 ? d[6].filter(b => k(b, d) < q).forEach(q => l(d, q)) : 0
		o(d)
		r = () => c.rect(d[0], d[1], 3, 3)
		r()
		dO > 1 ? (r(), r()) : 0
	})
	c.stroke()
	window.requestAnimationFrame(dr)
}
dr()
