import User from './User'
import { it, expect } from '../../testSuite'

const initialUserProps = {
	name: 'Johnny',
	age: 20
}
const user = new User(initialUserProps)

// Properties
const getAge = () => user.get('age')
const getName = () => user.get('name')
const setNewAge: (age: number) => void = age => user.set({ age })
const setNewName: (name: string) => void = name => user.set({ name })

it('Gets the name', () => {
	const { name } = initialUserProps
	return expect(getName()).toBe(name)
})
it('Gets the age', () => {
	const { age } = initialUserProps
	return expect(getAge()).toBe(age)
})
it('Sets a new age correctly', () => {
	const newAge = 9999
	setNewAge(newAge)
	return expect(getAge()).toBe(newAge)
})
it('Sets a new name correctly', () => {
	const newName = "New Name"
	setNewName(newName)
	return expect(getName()).toBe(newName)
})

// Events
const eventName = 'change'
const callback = () => console.log('%c changed', 'color: black;')

it('Registers event handlers', () => {
	user.on(eventName, callback)
	return expect(user.events[eventName]).toBe(callback)
})
it('Triggers event handlers', () => {
	return expect(user.trigger(eventName)).toBe(callback())
})