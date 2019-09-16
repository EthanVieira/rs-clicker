export class HealthBar {
	healthBar;
	maxHealth = 0;
	currentHealth = 0;
	x = 0;
	y = 0;
	height = 0;
	constructor(scene, x, y, maxHealth){
		// Get coordinates
		this.x = x/2 + 40 - (5*maxHealth/12);
		this.y = y/2 - 40;
		this.height = 12;

		// Get health
		this.maxHealth = maxHealth;
		this.currentHealth = maxHealth;

		// Construct health bar
		this.healthBar = scene.add.graphics();
        this.healthBar.fillStyle(0x000000); // Border (black)
        this.healthBar.fillRect(this.x, this.y, this.maxHealth+4, this.height+4);
        this.healthBar.fillStyle(0x00ff00);	// Health (green)
        this.healthBar.fillRect(this.x+2, this.y+2, this.maxHealth, this.height);
        scene.add.existing(this.healthBar);
	}
	updateHealth(damage){
		this.healthBar.clear();

		// Border (black)
        this.healthBar.fillStyle(0x000000);
        this.healthBar.fillRect(this.x, this.y, this.maxHealth+4, this.height+4);

        // Inner background (white)
        this.healthBar.fillStyle(0xffffff);
        this.healthBar.fillRect(this.x+2, this.y+2, this.maxHealth, this.height);

        // If dead, bring back to life
        if (this.currentHealth <= 0){
        	this.currentHealth = maxHealth;
        }

        // Make health red if below 1/3
		this.currentHealth -= damage;
        if (this.currentHealth < this.maxHealth/3){
        	this.healthBar.fillStyle(0xff0000);
        }
        else{
        	this.healthBar.fillStyle(0x00ff00);
        }
        
        this.healthBar.fillRect(this.x+2, this.y+2, this.currentHealth, this.height);
        return (this.currentHealth == 0);
	}

}