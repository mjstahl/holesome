export class StateMachine {
  constructor(possible = [], args = {}) {
    if (possible.length < 1) throw Error('At least one state must be specified')

    this._args = args
    this._state = undefined

    this._possible = {}
    this.states = {}
    for (const state of possible) {
      if (!state.name) throw Error('Each state much specify a "name"')
      // this gives access to the StateMachine instance from within
      // the state via this.machine
      state.machine = this

      // here we can transition without using strings, for example
      // if a State's name is 'MOVE' we can transition with
      // `<machine>.transition(<machine>.states.MOVE)`
      this.states[state.name] = state.name
      this._possible[state.name] = state
    }
  }

  get state() {
    return this._state
  }

  to(state = '', args = {}) {
    if (!state) throw Error('A state to transition to must be specified')

    this._state = state
    // we want to be able to destructure out args in the state
    // functions so we will pass in objects to make the code
    // more readable.
    //
    // Args passed in at the time of execution should overwrite
    // any of the same named arguments received from construction
    this._possible[this._state].on({ ...this._args, ...args })
    return this
  }

  do(args = {}) {
    if (this._state === null) {
      throw Error('The machine must be transitioned before stepping')
    }

    // Args passed in at the time of execution should overwrite
    // any of the same named arguments received from construction
    this._possible[this._state].do({ ...this._args, ...args })
    return this
  }
}

export class State {
  name = ''
  on() { }
  do() { throw Error('An "do" method must be specified in the child object') }
}
