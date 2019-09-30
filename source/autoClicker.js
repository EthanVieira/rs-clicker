export class AutoClicker {
	scene;
	dps = 0;
	level = 0;
	type = '';
	damageInterval = 0;
	pause = false;
	constructor(data){
		console.log("Creating " + data.type + " autoclicker with " + data.dps + " dps");
		// Pull into local objects
		this.scene = data.scene;
		this.dps = data.dps;
		this.level = data.level;
		this.type = data.type;

		// Damage every .1 second
		this.damageInterval = .1;
		setInterval(this.clickEnemy.bind(this), this.damageInterval * 1000);
	}
	clickEnemy(){
		if (!this.pause) {
			let damagePerTick = this.dps * this.damageInterval;
			this.scene.enemy.damageEnemy(damagePerTick);
			this.scene.updateAutoClickDamageStat(damagePerTick);
		}
	}
	getDps(){
		return this.dps;
	}
	getLevel(){
		return this.level;
	}

}