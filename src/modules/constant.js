export let canvas = document.querySelector("#canvas");
export let ctx = canvas.getContext("2d");

// PALETTE

export const COLORS = {
  blue: "#c7ecee",
  yellow: "#f6e58d",
  lightBlue: "#dff9fb",
  red: "#ff7675",
  darkBlue: "#053742",
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const WIDTH_CANVAS = canvas.width;
export const HEIGHT_CANVAS = canvas.height;
export const ROWS = 10;
export const COLS = 20;
export const n = ROWS * COLS;
export const size = Math.floor(HEIGHT_CANVAS / 10);
export const gap = 0;

export let matrix = [];
export let track = [];
export let lines = [];
//CANVAS IN CENTER SCREEN
export let pointBeginDrawX = WIDTH_CANVAS / 2 - (size * COLS) / 2;
export let pointBeginDrawY = HEIGHT_CANVAS / 2 - (size * ROWS) / 2;
