import { shallowMount } from '@vue/test-utils'
import SplAvatar from './SplAvatar';

describe('SplAvatar.vue', () => {
    it('check if SplAvatar is a vue instance', () => {
        const component = shallowMount(SplAvatar, {
            propsData: {
                name: ''
            }
        });
        expect(component.isVueInstance).toBeTruthy();
    });

    it('check if is short name', () => {
        const component = shallowMount(SplAvatar, {
            propsData: {
                name: 'John Doe'
            }
        });
        expect(component.vm.initials).toBe('JD');
    });

    it('check if is complete name', () => {
        const component = shallowMount(SplAvatar, {
            propsData: {
                name: 'John Mark Doe'
            }
        });
        expect(component.vm.initials).toBe('JD');
    });

    it('check if name is equal of lastname', () => {
        const component = shallowMount(SplAvatar, {
            propsData: {
                name: 'John John'
            }
        });
        expect(component.vm.initials).toBe('JO');
    });

    it('check if is single name', () => {
        const component = shallowMount(SplAvatar, {
            propsData: {
                name: 'John'
            }
        });
        expect(component.vm.initials).toBe('JO');
    });

    it('check if is single letter name', () => {
        const component = shallowMount(SplAvatar, {
            propsData: {
                name: 'J'
            }
        });
        expect(component.vm.initials).toBe('J');
    });
})
