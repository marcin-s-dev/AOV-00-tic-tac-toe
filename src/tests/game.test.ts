import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Game from '../components/Game.vue';

const placeMark = async (wrapper, childIndex) => {
  const grid = wrapper.find('[data-test="grid"]');
  const children = grid.findAll('[data-test="grid-child"]');
  const child = children[childIndex];
  await child.trigger('click');
  return child;
};

describe('Game', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(Game);
  });
  it('renders a 3x3 grid', () => {
    const grid = wrapper.find('[data-test="grid"]');
    expect(grid.classes()).toContain('grid');
    expect(grid.classes()).toContain('grid-rows-3');
    expect(grid.classes()).toContain('grid-cols-3');
    const children = grid.findAll('[data-test="grid-child"]');
    expect(children.length).toBe(9);
  });

  it('renders the corrent sign when cell is clicked', async () => {
    const markedFirstChild = await placeMark(wrapper, 0);
    expect(markedFirstChild.text()).toBe('O');

    const markedSecondChild = await placeMark(wrapper, 1);
    expect(markedSecondChild.text()).toBe('X');
  });

  it('renders initial player turn information', async () => {
    //assuming O will always start first
    const playerTurnInfo = wrapper.find('[data-test="current-player"]');
    expect(playerTurnInfo.text()).to.eq('O turn');
  });

  it('renders a correct player turn information', async () => {
    //assuming O will always start first
    await placeMark(wrapper, 0);

    const playerTurnInfo = wrapper.find('[data-test="current-player"]');
    expect(playerTurnInfo.text()).to.eq('X turn');
  });

  it('does not allow to place a sign on a taken position', async () => {
    //assuming O will always start first
    const markedFirstChild = await placeMark(wrapper, 0);
    expect(markedFirstChild.text()).toBe('O');
    const remarkedFirstChild = await placeMark(wrapper, 0);
    expect(remarkedFirstChild.text()).toBe('O');
  });

  it('does not allow to place a sign when the game is over', async () => {
    //make "O" win
    await placeMark(wrapper, 0);
    await placeMark(wrapper, 4);
    await placeMark(wrapper, 1);
    await placeMark(wrapper, 5);
    await placeMark(wrapper, 2);

    //try to place a new mark
    const marked = await placeMark(wrapper, 6);
    expect(marked.text()).toBe('');
  });

  it('renders a game over text', async () => {
    //make "O" win
    await placeMark(wrapper, 0);
    await placeMark(wrapper, 4);
    await placeMark(wrapper, 1);
    await placeMark(wrapper, 5);
    await placeMark(wrapper, 2);

    //try to place a new mark
    const gameOverElement = wrapper.find('[data-test="game-over"]');
    expect(gameOverElement.text()).toBe('Game Over!');
  });
});
