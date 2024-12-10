let level1 = createNewLevel();


function createNewLevel() {
  return new Level(
  [
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"),
    new Chicken("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"),
    new Endboss("img/3_enemies_chicken/chicken_small/1_walk/1_w.png"),
  ],
  [
    new Cloud("img/5_background/layers/4_clouds/2.png", 500),
    new Cloud("img/5_background/layers/4_clouds/1.png", 800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 1250),
    new Cloud("img/5_background/layers/4_clouds/1.png", 1400),
    new Cloud("img/5_background/layers/4_clouds/2.png", 1800),
    new Cloud("img/5_background/layers/4_clouds/1.png", 2100),
    new Cloud("img/5_background/layers/4_clouds/2.png", 2500),
    new Cloud("img/5_background/layers/4_clouds/1.png", 2800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 3100),
    new Cloud("img/5_background/layers/4_clouds/1.png", 3400),
    new Cloud("img/5_background/layers/4_clouds/1.png", 3800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 4000),
    new Cloud("img/5_background/layers/4_clouds/2.png", 4500),
    new Cloud("img/5_background/layers/4_clouds/1.png", 4800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 5100),
    new Cloud("img/5_background/layers/4_clouds/1.png", 5400),
    new Cloud("img/5_background/layers/4_clouds/1.png", 6800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 7000),
  ],
  [
    new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 780),
    new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 1300),
    new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 1800),
    new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 2550),
    new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 3000),
    new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 3465),
    new Bottle("img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 4000),
    new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 4200),
  ],
  [
    new Coin(500, 150),
    new Coin(600, 100),
    new Coin(700, 80),
    new Coin(800, 100),
    new Coin(900, 150),
    new Coin(1150, 330),
    new Coin(1400, 150),
    new Coin(1500, 100),
    new Coin(1600, 80),
    new Coin(1700, 100),
    new Coin(1800, 150),
    new Coin(2150, 330),
    new Coin(2500, 150),
    new Coin(2600, 80),
    new Coin(2600, 240),
    new Coin(2600, 150),
    new Coin(2700, 150),
    new Coin(2800, 150),
    new Coin(2900, 150),
    new Coin(3200, 330),
    new Coin(3500, 150),
    new Coin(3600, 100),
    new Coin(3700, 80),
    new Coin(3800, 100),
    new Coin(3900, 150),
  ],
  [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 4
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 4
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 4
    ),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 5
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 5
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 5
    ),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 6
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 6
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 6
    ),
  ]
  );
}
