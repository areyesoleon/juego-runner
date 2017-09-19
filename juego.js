var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var timerGasolina;
var gasolinas;
var puntos;
var txtPuntaje;
var Juego ={
  preload:function(){
    //load all images
    juego.load.image('bg','img/bg.png');
    juego.load.image('carro','img/carro.png');
    juego.load.image('carroMalo','img/carroMalo.png');
    juego.load.image('gas','img/gas.png');
  },
  create: function(){
    //create pints in 0
    puntos = 0;
    fondo = juego.add.tileSprite(0,0,290,540,'bg');
    //the sprite is a collection of images
    carro = juego.add.sprite(juego.width/2,490,'carro');
    //center img
    carro.anchor.setTo(0.5);
    //create a body car
    carro.enableBody = true;
    juego.physics.arcade.enable(carro);
    //create text
    txtPuntaje = juego.add.text(60,20, "0",{font:"35px Arial Bold", fill:"#990000"});
    //create cursor pointer
    cursores = juego.input.keyboard.createCursorKeys();
    //create a group of enemys
    enemigos = juego.add.group();
    juego.physics.arcade.enable(enemigos);
    enemigos.enableBody = true;
    enemigos.createMultiple(20,'carroMalo');
    enemigos.setAll('anchor.x',0.5);
    enemigos.setAll('anchor.y',0.5);
    enemigos.setAll('checkWorldBounds',true);
    enemigos.setAll('outOfBoundsKill',true);
    //create gas barrel
    gasolinas = juego.add.group();
    juego.physics.arcade.enable(gasolinas);
    gasolinas.enableBody = true;
    gasolinas.createMultiple(20,'gas');
    gasolinas.setAll('anchor.x',0.5);
    gasolinas.setAll('anchor.y',0.5);
    gasolinas.setAll('checkWorldBounds',true);
    gasolinas.setAll('outOfBoundsKill',true);
    //time of create bad cars and gas barrel
    timer = juego.time.events.loop(1500,this.crearCarroMalo,this);
    timerGasolina = juego.time.events.loop(2000,this.crearGasolina,this);
  },
  update: function(){
    //limit of highway
    fondo.tilePosition.y += 3;
    if(cursores.right.isDown && carro.position.x < 245){
      carro.position.x += 5;
    }
    else if(cursores.left.isDown && carro.position.x > 45){
      carro.position.x -= 5;
    }
    //function of crash
    juego.physics.arcade.overlap(carro, enemigos,this.choque,null,this);
    juego.physics.arcade.overlap(carro, gasolinas,this.cogerGas,null,this);
    //create new levels
    if(puntos > 4 && puntos <= 10){
      timer.delay = 1250;
    }
    else if(puntos > 10 && puntos <= 15){
      timer.delay = 1000;
    }
    else if(puntos > 15){
      timer.delay = 750;
    }
  },
  crearCarroMalo: function(){
    var pos = Math.floor(Math.random()*3) +1;
    var enemigo = enemigos.getFirstDead();
    enemigo.physicsBodyType = Phaser.Physics.ARCADE;
    enemigo.reset(pos*73, 0);
    enemigo.body.velocity.y = 200;
  },
  crearGasolina: function(){
    var pos = Math.floor(Math.random()*3) +1;
    var gasolina = gasolinas.getFirstDead();
    gasolina.physicsBodyType = Phaser.Physics.ARCADE;
    gasolina.reset(pos*73, 0);
    gasolina.body.velocity.y = 100;
  },
  choque: function(){
    enemigos.forEachAlive(function(e){
      e.body.velocity = 0;
    });
    juego.time.events.remove(timer);
    juego.state.start('Terminado');
  },
  cogerGas: function(car, gas){
    gas.kill();
    puntos += 1;
    txtPuntaje.text = puntos;
  }
}
