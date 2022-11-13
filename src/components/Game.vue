<template>
  <div class="flex flex-col">
    <div class="grid grid-rows-3 grid-cols-3 overflow-hidden" data-test="grid">
      <div
        v-for="cell in gameGridCells"
        :key="cell.idx"
        data-test="grid-child"
        class="outline outline-green h-20 md:h-32 lg:h-44 w-20 md:w-32 lg:w-44 text-6xl md:text-9xl grid place-content-center"
        @click="placeMark(cell.idx, player)"
      >
        {{ cell.sign }}
      </div>
    </div>
    <span v-if="!isGameOver" data-test="current-player" class="text-4xl mt-4">{{ player }} turn</span>
    <span v-if="isGameOver" data-test="game-over" class="text-4xl mt-4">Game Over!</span>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
type Player = 'O' | 'X';
interface GridCell {
  idx: number;
  sign: string;
}

const gameGridCells: Ref<GridCell[]> = ref([
  { idx: 0, sign: '' },
  { idx: 1, sign: '' },
  { idx: 2, sign: '' },
  { idx: 3, sign: '' },
  { idx: 4, sign: '' },
  { idx: 5, sign: '' },
  { idx: 6, sign: '' },
  { idx: 7, sign: '' },
  { idx: 8, sign: '' },
]);

const player: Ref<Player> = ref('O');
const isGameOver = computed(
  () => hasWinner(gameGridCells.value) || gameGridCells.value.every(cell => cell.sign !== '')
);

const placeMark = (idx: number, sign: Player): void => {
  if (isGameOver.value) {
    return;
  }
  const targetCell = gameGridCells.value.find(cell => cell.idx === idx);
  if (targetCell?.sign !== '') {
    return;
  }

  gameGridCells.value = gameGridCells.value.map(cell => (cell.idx === idx ? { ...cell, sign: sign } : cell));
  switchPlayerTurns();
};

const switchPlayerTurns = (): void => {
  if (player.value === 'O') {
    player.value = 'X';
    return;
  }

  player.value = 'O';
};

const hasWinner = (gameGridCells: GridCell[]) => {
  return (
    isWinner(gameGridCells[0], gameGridCells[1], gameGridCells[2]) || // check for 3-in-a-row horizontally
    isWinner(gameGridCells[3], gameGridCells[4], gameGridCells[5]) ||
    isWinner(gameGridCells[6], gameGridCells[7], gameGridCells[8]) ||
    isWinner(gameGridCells[0], gameGridCells[3], gameGridCells[6]) || // check for 3-in-a-row vertically
    isWinner(gameGridCells[1], gameGridCells[4], gameGridCells[7]) ||
    isWinner(gameGridCells[2], gameGridCells[5], gameGridCells[8]) ||
    isWinner(gameGridCells[0], gameGridCells[4], gameGridCells[8]) || // check for 3-in-a-row diagonally
    isWinner(gameGridCells[6], gameGridCells[4], gameGridCells[2])
  );
};

const isWinner = (p1: GridCell, p2: GridCell, p3: GridCell) => {
  if (!p1.sign || !p2.sign || !p3.sign) {
    return false;
  }
  return p1.sign === p2.sign && p2.sign === p3.sign;
};
</script>

<style></style>
