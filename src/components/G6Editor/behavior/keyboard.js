import eventBus from "../utils/eventBus";
export default {
    getDefaultCfg() {
        return {
            backKeyCode: 8,
            deleteKeyCode: 46
        };
    },
    getEvents() {
        return {
            keyup: 'onKeyUp',
            keydown: 'onKeyDown'
        };
    },

    onKeyDown(e) {
        const code = e.keyCode || e.which;
        switch (code) {
            case this.deleteKeyCode:
            case this.backKeyCode:
                if(e.target.tagName.toLowerCase()=='body'){
                    eventBus.$emit('deleteItem')
                }
                break
        }
    },
    onKeyUp() {
        this.keydown = false;
    }
};