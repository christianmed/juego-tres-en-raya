'use strict';

let cells = Array.prototype.slice.apply(document.querySelectorAll('.cell'));
let array = new Array(9);
let pX = document.getElementById('pX');
let pO = document.getElementById('pO');
let tX = document.getElementById('turnX');
let tO = document.getElementById('turnO');
let turn = 1;
let winner = false;
let modal = document.getElementById('modal');
let btnClose = document.getElementById('close');
let result = document.getElementById('result');

function setTurn(turn) {
  if (winner === false) {
    if (turn === 1 || turn === 3 || turn === 5 || turn === 7 || turn === 9) {
      tX.style.visibility = 'visible';
      tO.style.visibility = 'hidden';
      pX.classList.add('actual');
      pO.classList.remove('actual');
    } else {
      tO.style.visibility = 'visible';
      tX.style.visibility = 'hidden';
      pO.classList.add('actual');
      pX.classList.remove('actual');
    }
  }
}

function setWinner(index, letter) {
  array[index] = letter;
  if (
    array[0] === letter && array[1] === letter && array[2] === letter ||
    array[3] === letter && array[4] === letter && array[5] === letter ||
    array[6] === letter && array[7] === letter && array[8] === letter ||
    array[0] === letter && array[3] === letter && array[6] === letter ||
    array[1] === letter && array[4] === letter && array[7] === letter ||
    array[2] === letter && array[5] === letter && array[8] === letter ||
    array[0] === letter && array[4] === letter && array[8] === letter ||
    array[2] === letter && array[4] === letter && array[6] === letter
  ) {
    winner = true;
    modal.style.display = 'block';
    result.innerHTML = `Ganador ${letter}`;
  }
}

function tresEnRaya(e) {
  let indexCell = cells.indexOf(e.target);
  if (turn % 2 === 1) {
    cells[indexCell].innerHTML = 'X';
    cells[indexCell].style.color = '#444';
    setWinner(indexCell, 'X');
  } else {
    cells[indexCell].innerHTML = 'O';
    cells[indexCell].style.color = '#fff';
    setWinner(indexCell, 'O');
  }
  cells[indexCell].removeEventListener('click', tresEnRaya);
  if (turn === 9 && winner === false) {
    modal.style.display = 'block';
    result.innerHTML = 'Empate';
  } else {
    turn++;
    setTurn(turn);
  }
}

function closeModal() {
  modal.style.display = 'none';
  setTimeout(() => document.location.reload(), 1000);
}

function ready() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', tresEnRaya);
  }
  btnClose.addEventListener('click', closeModal);
  setTurn(turn);
}

window.addEventListener('load', ready);