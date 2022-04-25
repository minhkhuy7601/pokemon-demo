import {
  gap,
  pointBeginDrawX,
  pointBeginDrawY,
  size,
  ctx,
} from "./constant.js";

export default function Line(begin, end) {
  this.yBegin = begin.i * size + size / 2 + begin.i * gap + pointBeginDrawY;
  this.xBegin = begin.j * size + size / 2 + begin.j * gap + pointBeginDrawX;
  this.yEnd = end.i * size + size / 2 + end.i * gap + pointBeginDrawY;
  this.xEnd = end.j * size + size / 2 + end.j * gap + pointBeginDrawX;
  this.draw = function () {
    //draw line background
    ctx.beginPath();
    ctx.moveTo(this.xBegin, this.yBegin);
    ctx.lineTo(this.xEnd, this.yEnd);
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#0984e3";
    ctx.stroke();
    //draw line main
    ctx.beginPath();
    ctx.moveTo(this.xBegin, this.yBegin);
    ctx.lineTo(this.xEnd, this.yEnd);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#74b9ff";
    ctx.stroke();
  };
}
