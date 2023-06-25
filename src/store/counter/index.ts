import { defineStore } from 'pinia';
export const countStore = defineStore('count', {
    state: () => {
        return {
            counter: 0,
        };
    },

    actions: {
        add() {
            this.counter++;
            this.counter++;
        },
        getContext() {
            return this.counter;
        },
    },
});
