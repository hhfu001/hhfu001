class State { 
    pressButton() { 
        throw Error('rewirte this function!!!')
    }
}
class OffLigtState extends State {
    constructor(light) {
        super();
        this.light = light
    }
    pressButton() {
        console.log('弱光')
        this.light.setState(this.light.weakLightState);
    }
}

class WeakLigtState extends State {
    constructor(light) {
        super();
        this.light = light
    }
    // pressButton() {
    //     console.log('强光')
    //     this.light.setState(this.light.strongLightState);
    // }
}

class StrongLigtState extends State {
    constructor(light) {
        super();
        this.light = light
    }
    pressButton() {
        console.log('关灯')
        this.light.setState(this.light.offLightState);
    }
}

class Light { 
    constructor(light) { 
        this.offLightState = new OffLigtState(this);
        this.weakLightState = new WeakLigtState(this)
        this.strongLightState = new StrongLigtState(this);


        this.currentState = this.offLightState;

        setInterval(() => { 
            this.currentState.pressButton();
        }, 2000)

    }

    setState(state) { 
        this.currentState = state;
    }
}

new Light();