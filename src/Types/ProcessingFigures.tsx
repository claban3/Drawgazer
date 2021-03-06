import P5 from 'p5';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
//import useSound from 'use-sound';
//import '*.mp3';
import bounceSFX from '../Sounds/bounce.mp3';
import popSFX from '../Sounds/pop.mp3';
import thudSFX from '../Sounds/thud.mp3'; 
import kickSFX from '../Sounds/Drumset/Kick.wav';
import snareSFX from '../Sounds/Drumset/Snare.wav';
import highhatSFX from '../Sounds/Drumset/Highhat.wav';
import scurrySFX from '../Sounds/scurry.mp3';
import * as Collides from 'p5collide';
import { CustomFigureStyles, SketchData } from './Figures';
import './Animations/ColorSampling';

const MAX_SPEED = 10;
const WALL_PADDING = 5;
export class AnimatedFigure {
  p5: P5
  pos: P5.Vector
  force: P5.Vector
  acceleration: P5.Vector
  velocity: P5.Vector
  mass: number
  angle: number
  timer: number
  dead: boolean
  spin: number
  dim: number
  bounce: HTMLAudioElement = new Audio(bounceSFX)
  pop: HTMLAudioElement = new Audio(popSFX)
  thud: HTMLAudioElement = new Audio(thudSFX)
  drumBeat: HTMLAudioElement
  scurry: HTMLAudioElement = new Audio(scurrySFX)
  rotAngle: number
  color: string
  opacity: number
  startPos: P5.Vector
  // Return -1 or 1 randomly
  randSign() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  constructor(x, y, c, p5) {
      this.p5 = p5;
      this.pos = p5.createVector(x, y);
      this.velocity = p5.createVector(3 * this.randSign(), 3 * this.randSign());
      this.force = p5.createVector(0, 0); 
      this.mass = Math.random() * 0.03 + 0.003;
      this.acceleration = p5.createVector(0, 0.5);
      this.angle = 0.0;
      this.timer = 60;
      this.spin = 0.02*this.randSign();
      this.dead = false;
      this.rotAngle = 0.0;
      this.color = c;
      this.opacity = 200;
      this.startPos = this.pos.copy();
  }

  static collidesWith(fig1: AnimatedFigure, fig2: AnimatedFigure) {
    let corners1 = fig1.getShapeDescriptor();
    let corners2 = fig2.getShapeDescriptor();
    return Collides.collideAll(corners1, corners2);
  }

  getShapeDescriptor() {
    return {};
  }
  
  collideWithLine(x1, y1, x2, y2) {
    return false;
  }

  collideWithMouse() {
    return false;
  }
  
  collideCanvasBottom(canvasWidth, canvasHeight) {
    return false;
  }
  
  collideCanvasTop(canvasWidth, canvasHeight) {
    return false;
  }
  
  collideCanvasLeft(canvasWidth, canvasHeight) {
    return false;
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return false;
  }

  static mouseOnCanvas(p: P5, canvasWidth, canvasHeight) {
    return (
      p.mouseX <= canvasWidth && p.mouseX >= 0 && 
      p.mouseY <= canvasHeight && p.mouseY >= 0
    );
  }

  display() {}

  displayCustomStyles(customStyles: CustomFigureStyles) {}

  posToCell(xpos, ypos) {
    let numCellColumns = 10;
    let numCellRows = 5;

    let cellWidth = this.p5.width / numCellColumns;
    let cellHeight = this.p5.height / numCellRows;

    return (Math.floor(ypos / cellHeight) * numCellColumns) + Math.floor(xpos / cellWidth) 
  }

  cellToPos(cellNum) {
    let id: string = "cell".concat(cellNum.toString());
    let element = document.getElementById(id);
    let xpos = element.offsetTop + (element.offsetHeight / 2);
    let ypos = element.offsetLeft + (element.offsetWidth / 2);

    return {x: xpos, y: ypos}
  }

}

export class CircleFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, d, c, p5: P5) {
    super(x, y, c, p5);
    this.dim = d;
    this.drumBeat = new Audio(kickSFX);
  }

  toJSON() {
      return {
        type: 'circle',
        x: this.pos.x,
        y: this.pos.y,
        cellNum: this.posToCell(this.pos.x, this.pos.y),
        d: this.dim,
        color: this.color
      }
  }

  getShapeDescriptor() {
    return {
      type: "CIRCLE",
      data: [this.pos.x, this.pos.y, this.dim],
    };
  }

  collideWithLine(x1, y1, x2, y2) {
    return Collides.collideLineCircle(x1, y1, x2, y2, this.pos.x, this.pos.y, this.dim);
  }
  
  collideWithMouse() {
    return Collides.collidePointCircle(this.p5.mouseX, this.p5.mouseY, this.pos.x, this.pos.y, this.dim);
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(0, canvasHeight - WALL_PADDING, canvasWidth, canvasHeight - WALL_PADDING, this.pos.x, this.pos.y, this.dim);
  }
  
  collideCanvasTop(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(0, WALL_PADDING, canvasWidth, WALL_PADDING, this.pos.x, this.pos.y, this.dim);
  }

  collideCanvasLeft(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(WALL_PADDING, 0, WALL_PADDING, canvasHeight, this.pos.x, this.pos.y, this.dim);
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(canvasWidth - WALL_PADDING, 0, canvasWidth - WALL_PADDING, canvasHeight, this.pos.x, this.pos.y, this.dim);
  }

  display() {
    this.p5.push();
    
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
    this.p5.stroke(255);

    let color = this.p5.color(this.color);
    color.setAlpha(this.opacity);
    this.p5.fill(color);

    this.p5.ellipse(this.pos.x, this.pos.y, this.dim, this.dim);
    this.p5.pop();
  }

  displayCustomStyles(customStyles: CustomFigureStyles) {
    this.p5.push();
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
    
    customStyles.stroke ? this.p5.stroke(1) : this.p5.noStroke();
    let color = this.p5.color(this.color);
    color.setAlpha(customStyles.opacity);
    this.p5.fill(color);

    this.p5.ellipse(this.pos.x, this.pos.y, this.dim, this.dim);
    this.p5.pop();
  }
}

export class SquareFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, d, c, p5) {
    super(x, y, c, p5);
    this.dim = d;
    this.drumBeat = new Audio(snareSFX);
  }

  toJSON() {
    return {
        type: 'square',
        x: this.pos.x,
        y: this.pos.y,
        cellNum: this.posToCell(this.pos.x, this.pos.y),
        d: this.dim,
        color: this.color
      }
  }

  getShapeDescriptor() {
    return {
      type: "RECT",
      data: [this.pos.x, this.pos.y, this.dim, this.dim],
    };
  }

  collideWithMouse() {
    return Collides.collidePointRect(this.p5.mouseX, this.p5.mouseY, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideWithLine(x1, y1, x2, y2) {
    return Collides.collideLineRect(x1, y1, x2, y2, this.pos.x, this.pos.y, this.dim, this.dim);
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(0, canvasHeight - WALL_PADDING, canvasWidth, canvasHeight - WALL_PADDING, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasTop(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(0, WALL_PADDING, canvasWidth, WALL_PADDING, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasLeft(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(WALL_PADDING, 0, WALL_PADDING, canvasHeight, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(canvasWidth - WALL_PADDING, 0, canvasWidth - WALL_PADDING, canvasHeight, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  display() {
    this.p5.push();
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
    this.p5.stroke(255);
    
    let color = this.p5.color(this.color);
    color.setAlpha((this.opacity));

    this.p5.fill(color);
    this.p5.rectMode(this.p5.CENTER);
    this.p5.square(this.pos.x, this.pos.y, this.dim);
    this.p5.pop();
  }

  displayCustomStyles(customStyles: CustomFigureStyles) {
    this.p5.push();
    
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
    
    customStyles.stroke ? this.p5.stroke(1) : this.p5.noStroke();
    
    let color = this.p5.color(this.color);
    color.setAlpha(customStyles.opacity);
    this.p5.fill(color);
    
    this.p5.square(this.pos.x, this.pos.y, this.dim);
    this.p5.pop();
  }
}

export class TriangleFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, d, c, p5) {
    super(x, y, c, p5);
    this.dim = d;
    this.drumBeat = new Audio(highhatSFX);
  }

  toJSON() {
    return {
        type: 'triangle',
        x: this.pos.x,
        y: this.pos.y,
        cellNum: this.posToCell(this.pos.x, this.pos.y),
        d: this.dim,
        color: this.color
      }
  }

  getShapeDescriptor() {
    let cornersObject = [];
    this.corners().forEach(pos => {
      let x = pos.x;
      let y = pos.y
      cornersObject.push({ x, y });  
    });

    return {
      type: "POLY",
      data: cornersObject,
    };
  }

  corners(): P5.Vector[] {
    let base_half = (this.dim / 2) * this.p5.cos(30);
    let x1 = this.pos.x - base_half;
    let y1 = this.pos.y - (this.dim / 2);
    
    let x2 = this.pos.x;
    let y2 = this.pos.y + this.dim / 2;
    
    let x3 = this.pos.x + base_half;
    let y3 = this.pos.y + this.dim / 2;

    return [this.p5.createVector(x1,y1), this.p5.createVector(x2,y2), this.p5.createVector(x3,y3)];
  }

  collideWithLine(x1, y1, x2, y2) {
    return Collides.collideLinePoly(x1, y1, x2, y2, this.corners());
  }
  
  collideWithMouse() {
    return Collides.collidePointPoly(this.p5.mouseX, this.p5.mouseY, this.corners());
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(0, canvasHeight - WALL_PADDING, canvasWidth, canvasHeight - WALL_PADDING, this.corners());
  }

  collideCanvasTop(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(0, WALL_PADDING, canvasWidth, WALL_PADDING, this.corners());
  }
  
  collideCanvasLeft(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(WALL_PADDING, 0, WALL_PADDING, canvasHeight, this.corners());
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(canvasWidth - WALL_PADDING, 0, canvasWidth - WALL_PADDING, canvasHeight, this.corners());
  }

  display() {
    this.p5.push();
    // if (this.velocity.mag() > MAX_SPEED) {
    //   this.velocity.normalize().mult(MAX_SPEED);
    // }
    
    this.p5.stroke(255);
    
    let color = this.p5.color(this.color);
    color.setAlpha(this.opacity);
    this.p5.fill(color);

    this.p5.angleMode(this.p5.DEGREES);
    let base_half = (this.dim / 2) * this.p5.cos(15);
    let x1 = this.pos.x - base_half;
    let y1 = this.pos.y + (this.dim / 2);
    
    let x2 = this.pos.x;
    let y2 = this.pos.y - (this.dim / 2);
    
    let x3 = this.pos.x + base_half;
    let y3 = this.pos.y + (this.dim / 2);

    this.p5.triangle(x1, y1, x2, y2, x3, y3);
    this.p5.pop();
  }

  displayCustomStyles(customStyles: CustomFigureStyles) {
    this.p5.push();
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
    
    customStyles.stroke ? this.p5.stroke(1) : this.p5.noStroke();
    
    let color = this.p5.color(this.color);
    color.setAlpha(customStyles.opacity);
    this.p5.fill(color);

    this.p5.angleMode(this.p5.DEGREES);
    
    let base_half = (this.dim / 2) * this.p5.cos(15);
    let x1 = this.pos.x - base_half;
    let y1 = this.pos.y + (this.dim / 2);
    
    let x2 = this.pos.x;
    let y2 = this.pos.y - (this.dim / 2);
    
    let x3 = this.pos.x + base_half;
    let y3 = this.pos.y + (this.dim / 2);

    this.p5.triangle(x1, y1, x2, y2, x3, y3);
    this.p5.pop();
  }
}
