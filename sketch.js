var jugador;
var jugadorImg
var G_obstaculo,G_obstaculo2,G_obstaculo3,G_obstaculo4;
var flecha_derecha,flecha_izquierda,flecha_abajo,flecha_arriba;
var segundos = 0,tiempo_espera = 100,velocidad1 = -5,velocidad2 = 5;
var S_obstaculos = 1;
var gameState = "indicaciones";
function preload(){

}
function setup(){
  createCanvas(windowWidth,windowHeight);
  G_obstaculo = createGroup();
  G_obstaculo2 = createGroup();
  G_obstaculo3 = createGroup();
  G_obstaculo4 = createGroup();
  //jugador
  jugador = createSprite (width / 2, height / 2 ,width / 50,width / 50);
  jugador.shapeColor = "lime";

  //cargar animaciones, imagenes y sonidos
  flecha_derecha = loadImage ("flecha_derecha.png");
  flecha_izquierda = loadImage ("flecha_izquierda.png");
  flecha_abajo = loadImage ("flecha_abajo.png");
  flecha_arriba = loadImage ("flecha_arriba.png");
}
function draw(){
  background ("gray");

  if (gameState === "jugando"){
  obstaculos();
  }
  movimiento();
  accesos();
  indicaciones();
  drawSprites();
}
function movimiento(){
  if (jugador.x < 0 || jugador.x > width){
    gameState = "final";
  }
  if (jugador.y < -15 || jugador.y > height + 15){
    gameState = "final";
  }
  if (keyDown ("W") || keyDown ("up_arrow")){
    jugador.y = jugador.y - 10;
  }
  if (keyDown ("S") || keyDown ("down_arrow")){
    jugador.y = jugador.y + 10
  }

  //contador de segundos
  if (frameCount % 30 === 0){
    segundos = segundos + 1;
  }

  jugador.velocityX = 0;
  jugador.velocityY = 0;

  jugador.collide (G_obstaculo);
  jugador.collide (G_obstaculo2);
  jugador.collide (G_obstaculo3);
  jugador.collide (G_obstaculo4);
}

//acceso directo a fases
function accesos(){
  if (keyDown("1")){
    S_obstaculos = 1;
  }
  if (keyDown("2")){
    S_obstaculos = 2;
  }
  if (keyDown("3")){
    S_obstaculos = 3;
  }
  if (keyDown("4")){
    S_obstaculos = 4;
  }
}
//obstaculos
function obstaculos(){

  //disminuye tiempo de aparicion
  if (tiempo_espera > 10){
  if (segundos >= 5){
    segundos = 0;
    tiempo_espera = tiempo_espera - 10;
  }
}
//aumenta velocidad
if (tiempo_espera === 10){
  if (segundos === 5){
    segundos = 0;
    velocidad1 = velocidad1 - 5;
    velocidad2 = velocidad2 + 5;
  }
}

//reinicia el tiempo y velocidad [desbloquea siguientes obstaculos]
if (velocidad1 < -20){
  tiempo_espera = 100;
  velocidad1 = -5;
  velocidad2 = 5;
  S_obstaculos = S_obstaculos + 1;
  gameState = "indicaciones";
}

//obstaculo 1
if (frameCount % tiempo_espera === 0){
  var tamaño = Math.round (random (20,60));

  var obstaculo = createSprite (width + 10,random (10,height),tamaño,tamaño);
  obstaculo.shapeColor = "brown";
  obstaculo.velocityX = -5;
  obstaculo.lifetime = 500;

  G_obstaculo.add (obstaculo);

  obstaculo.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
  }
  G_obstaculo.setVelocityXEach(velocidad1);

//obstaculo 2
if (S_obstaculos >= 2){
  if (frameCount % tiempo_espera === 0){
  var obstaculo2 = createSprite (0 - 10,random (10,height),tamaño,tamaño);
  obstaculo2.shapeColor = "brown";
  obstaculo2.velocityX = 5;
  obstaculo2.lifetime = 300;

  G_obstaculo2.add (obstaculo2);

  obstaculo2.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo2.setVelocityXEach(velocidad2);
}
//obstaculo 3
if (S_obstaculos >= 3){
  if (frameCount % tiempo_espera === 0){
  var obstaculo3 = createSprite (random (10,width),0 - 10,tamaño,tamaño);
  obstaculo3.shapeColor = "brown";
  obstaculo3.velocityY = 5;
  obstaculo3.lifetime = 300;

  G_obstaculo3.add (obstaculo3);

  obstaculo3.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo3.setVelocityYEach(velocidad2);
}
//obstaculo 4
if (S_obstaculos === 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo4 = createSprite (random (10,width),height + 10,tamaño,tamaño);
  obstaculo4.shapeColor = "brown";
  obstaculo4.velocityY = -5;
  obstaculo4.lifetime = 300;

  G_obstaculo4.add (obstaculo4);

  obstaculo4.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo4.setVelocityYEach(velocidad1);
}
}
function indicaciones(){
  if (gameState === "indicaciones"){
//indicacion 1
  var ind_1 = createSprite (width + 10,height / 2 - 10,20,20);
  ind_1.addImage (flecha_izquierda);
  ind_1.scale = 2;
  ind_1.velocityX = -10;
  ind_1.lifetime = 300;

//indicacion 2
  if (S_obstaculos >= 2){
  var ind_2 = createSprite (0 - 10,height / 2 + 10,20,20);
  ind_2.addImage (flecha_derecha);
  ind_2.scale = 2;
  ind_2.velocityX = 10;
  ind_2.lifetime = 300;
  }

//indicacion 3
if (S_obstaculos >= 3){
  var ind_3 = createSprite (width / 2,0 - 10,20,20);
  ind_3.addImage (flecha_abajo);
  ind_3.scale = 2;
  ind_3.velocityY = 10;
  ind_3.lifetime = 300;
  }

//indicacion 4
if (S_obstaculos === 4){
  var ind_4 = createSprite (width / 2,0 - 10,20,20);
  ind_4.addImage (flecha_arriba);
  ind_4.scale = 2;
  ind_4.velocityY = 10;
  ind_4.lifetime = 300;
  }
  gameState = "esperando";
  }
  if (gameState === "esperando" && segundos >= 1){
    gameState = "jugando";
    }
}