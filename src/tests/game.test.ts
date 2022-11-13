import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Game from '../components/Game.vue';
describe('Game', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(Game);
  });
  it('renders a 3x3 grid', async () => {
    const grid = wrapper.find('[data-test="grid"]');
    expect(grid.classes()).toContain('grid-rows-3');
    expect(grid.classes()).toContain('grid-cols-3');
    const children = grid.findAll('[data-test="grid-child"]');
    expect(children.length).toBe(9);
  });
});
