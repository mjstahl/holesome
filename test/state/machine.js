import test from 'ava'
import { StateMachine, State } from '../../holesome/state/machine'

test('at least one state possible state must be provided', t => {
  try {
    new StateMachine()
    t.fail()
  } catch (e) {
    t.pass()
  }
})

test('each state must specify a name', t => {
  const state = new class extends State { }
  try {
    new StateMachine([state])
    t.fail()
  } catch (e) {
    t.pass()
  }
})

test('machine will include the name of each possible state', t => {
  const state = new class extends State { name = 'TEST' }
  const machine = new StateMachine([state])
  t.is(machine.states.TEST, 'TEST')
})

test('machine.state is initially undefined', t => {
  const state = new class extends State { name = 'TEST' }
  const machine = new StateMachine([state])
  t.is(machine.state, undefined)
})

test('the state getter of the machine returns the current state', t => {
  const state = new class extends State { name = 'TEST' }
  const machine = new StateMachine([state])
  machine.to(machine.states.TEST)
  t.is(machine.state, 'TEST')
})

test('must specify a state to transition to', t => {
  const state = new class extends State { name = 'TEST' }
  const machine = new StateMachine([state])
  try {
    machine.to()
    t.fail()
  } catch (e) {
    t.pass()
  }
})

test('calling machine.to will execute state.on', t => {
  let count = 1
  const initial = new class extends State {
    name = 'TEST'
    on({ by }) { count += by }
  }
  const machine = new StateMachine([initial])
  machine.to(machine.states.TEST, { by: 10 })
  t.is(count, 11)
})

test('machine.to returns a reference to the machine', t => {
  const initial = new class extends State {
    name = 'TEST'
    on() { }
  }
  const machine = new StateMachine([initial])
  const ref = machine.to(machine.states.TEST)
  t.is(ref, machine)
})

test('machine.do executes state.do', t => {
  let count = 1
  const initial = new class extends State {
    name = 'TEST'
    do({ by }) { count += by }
  }
  const machine = new StateMachine([initial])
  machine.to(machine.states.TEST).do({ by: 10 })
  t.is(count, 11)
})

test('machine.do returns a reference to the machine', t => {
  const initial = new class extends State {
    name = 'TEST'
    do() { }
  }
  const machine = new StateMachine([initial], { by: 5 })
  const ref = machine.to(machine.states.TEST).do()
  t.is(ref, machine)
})