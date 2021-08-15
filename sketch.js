const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var play = 1;
var start = 0;
var start_button;
var game_over_screen;
var You_Win_screen;
var game_state;
game_state = start;
var over = 3;
var win = 2;
var ground;
var air;
var eat2;
var rope_cut;
var sound1;
var button_active;
var rope;
var SAD_ADORBS_ANIME_HISS;
var FISH_WEIGHT;
var link;
var ANIME_HISS;
var DOUBLE_FISH_WEIGHT;
var brocolli_png;
var ADORBS_ANIME_HISS;
var image_Back;
var BANNANA;
var blink;
var eat;
var cry;
function preload() 
{
 ANIME_HISS = loadImage("images.png");
 DOUBLE_FISH_WEIGHT = loadImage("fish.png");
 BUTTON = loadImage("Button_cat.jpeg");
 
 over  = loadImage("Game_Over..jpeg");
 win = loadImage("You_Win.jpeg");
 blink = loadAnimation("Blinking_Cat1.jpg","Blinking_Cat2.jpg","Blinking_Cat3.jpg","Blinking_Cat4.jpg");
 eat = loadAnimation("Eating_Cat1.jpg","Eating_Cat2.jpg","Eating_Cat3.jpg","Eating_Cat4.jpg","Eating_Cat5.jpg");
 cry = loadAnimation("Crying_Cat1.jpg","Crying_Cat2.jpg","Crying_Cat3.jpg","Crying_Cat4.jpg","Crying_Cat5.jpg");
 air = loadSound("air.wav");
 eat2 = loadSound("eating_sound.mp3");
 rope_cut = loadSound("rope_cut.mp3");
 sound1 = loadSound("sound1.mp3");
 button_active = loadSound("rope_cut.mp3");
 SAD_ADORBS_ANIME_HISS = loadSound("sad.wav");
 blink.playing = true;
 eat.playing = true;
 eat.looping = false;
 cry.looping = false;
}
function setup() 
{
  sound1.play();
  sound1.setVolume(0.1);
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay = 20;
  eat.frameDelay = 20
  cry.frameDelay = 20;
  ground1 = new Ground(200,690,600,20);
  rope = new Rope(10,{x:250,y:50});
  FISH_WEIGHT = Bodies.circle(300,300,19,{density:0.001});
  Matter.Composite.add(rope.body, FISH_WEIGHT);
  link = new Link(rope, FISH_WEIGHT);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  ADORBS_ANIME_HISS = createSprite(250,620,100,100);
  ADORBS_ANIME_HISS.addAnimation('blinking',blink);
  ADORBS_ANIME_HISS.addAnimation('eating',eat);
  ADORBS_ANIME_HISS.addAnimation('crying',cry);
  ADORBS_ANIME_HISS.changeAnimation("blinking");
  ADORBS_ANIME_HISS.scale = 0.5;
  BANNANA = createImg("Button_cat.jpeg");
  BANNANA.position(220,30);
  BANNANA.size(100,100);
  BANNANA.mouseClicked(drop);
}

function draw() 
{
  background("black");
  if(game_state == play) {
   ground1.show();
   rope.show();
   console.log("play");
   if(FISH_WEIGHT!=null){
    image(DOUBLE_FISH_WEIGHT,FISH_WEIGHT.position.x, FISH_WEIGHT.position.y,60,60);
  }
  if(collide(FISH_WEIGHT,ADORBS_ANIME_HISS)==true)
    {
      ADORBS_ANIME_HISS.changeAnimation('eating');
    }
    if(collide(FISH_WEIGHT,ground1.body)==true )
  {
    ADORBS_ANIME_HISS.changeAnimation('crying');
   }
  }
  if(game_state == start) {
  start_button = createImg("Start_Line.jpeg");
  start_button.position(0,0);
  start_button.size(100,70);
  start_button.mouseClicked(Game);
  game_state = play;
  console.log("start");
  }
  Engine.update(engine);
  drawSprites();

 
   
  }
function drop(){
  rope.break();
  link.Detach();
  link = null;
  button_active.play();
  button_active.setVolume(0.7);
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,FISH_WEIGHT);
               FISH_WEIGHT = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function Game() {
if(game_state == start) {
  game_state = play;
  console.log("endgame");
  }
}









