export class HealthBar {
    healthBar;
    maxHealth = 0;
    currentHealth = 0;
    x = 0;
    y = 0;
    height = 0;
    width = 0;

    constructor(scene, x, y, maxHealth) {
        // Offset coordinates based on width/height of health bar
        this.width = maxHealth + 20;
        this.height = 12;
        this.x = x - 4 - (5 * this.width) / 12;
        this.y = y - this.height;

        // Get health
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;

        // Construct health bar
        this.healthBar = scene.add.graphics();
        this.healthBar.setDepth(3);
        this.healthBar.fillStyle(0x000000); // Border (black)
        this.healthBar.fillRect(
            this.x,
            this.y,
            this.width + 4,
            this.height + 4
        );
        this.healthBar.fillStyle(0x00ff00); // Health (green)
        this.healthBar.fillRect(
            this.x + 2,
            this.y + 2,
            this.width,
            this.height
        );
        this.healthBar.visible = false;
    }

    updateHealth(damage) {
        this.healthBar.clear();

        // Border (black)
        this.healthBar.fillStyle(0x000000);
        this.healthBar.fillRect(
            this.x,
            this.y,
            this.width + 4,
            this.height + 4
        );

        // Inner background (white)
        this.healthBar.fillStyle(0xffffff);
        this.healthBar.fillRect(
            this.x + 2,
            this.y + 2,
            this.width,
            this.height
        );

        // Apply damage
        this.currentHealth -= damage;

        // If dead, bring back to life
        let wasDead = false;
        if (this.currentHealth <= 0) {
            wasDead = true;
            this.currentHealth = this.maxHealth;
        }

        // Make health red if below 1/3
        if (this.currentHealth < this.maxHealth / 3) {
            this.healthBar.fillStyle(0xff0000);
        } else {
            this.healthBar.fillStyle(0x00ff00);
        }

        this.healthBar.fillRect(
            this.x + 2,
            this.y + 2,
            this.currentHealth * (this.width / this.maxHealth),
            this.height
        );
        return wasDead;
    }

    show() {
        this.healthBar.visible = true;
    }

    hide() {
        this.healthBar.visible = false;
    }
}
