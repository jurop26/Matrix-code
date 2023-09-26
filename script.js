const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width, canvas.height)

class Symbol {
	constructor(x, y, fontSize){
		this.x = x
		this.y = y
		this.fontSize = fontSize
		this.character = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		this.text = ''
		this.opacity = 1
	}
	draw() {	
		this.text = this.character.charAt(Math.floor(Math.random() * this.character.length))
		if(/*this.y * this.fontSize > canvas.height &&*/ Math.random() > 0.98) this.y = 0
		this.y += 1
		ctx.fillStyle = '#0aff0a'
		ctx.font = this.fontSize + 'px monospace'
		ctx.fillText(this.text,this.x * this.fontSize, this.y * this.fontSize)
	}
}

class Effect{
	constructor() {
		this.fontSize = 25
		this.columns = window.innerWidth / this.fontSize
		this.symbols = []
		this.#initialize()
	}
	#initialize(){
		for(let i = 0; i < this.columns; i++){
			this.symbols[i] = new Symbol(i, 0, this.fontSize)
		}
	}
}

const effect = new Effect()
const fps = 30
let lastTime = 0
const nextFrame = 1000 / fps
let timer = 0

function animate(timestamp){
	const deltaTime = timestamp - lastTime
	lastTime = timestamp
	if (timer > nextFrame){
		ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		effect.symbols.forEach(symbol => {symbol.draw()})
		timer = 0	
	}else{
		timer += deltaTime
	}
	
	
	requestAnimationFrame(animate)
	 
	
}

animate(0)