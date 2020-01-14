import { shallowMount } from '@vue/test-utils'
import SplButton from './SplButton';

describe('SplButton.vue', () => {
    it('check if SplButton is a vue instance', () => {
        const component = shallowMount(SplButton, {
            propsData: {
                name: ''
            }
        });
        expect(component.isVueInstance).toBeTruthy();
    });
})
