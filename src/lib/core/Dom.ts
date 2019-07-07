import Model from './Model'
import View from './View'
import { createOrGetElement } from '../elementKit'

export interface RegionMap<T extends Model<U>, U> {
	[cssLikeSelector: string]: (parent: Element) => View<T, U>
}

export interface NodeMap {
	[cssLikeSelector: string]: Element
}

export default class Dom {
	static render = <T extends Model<U>, U>(parentSelector: string, regions: RegionMap<T, U>): void => {
		const parent = createOrGetElement(parentSelector)
		const childSelectors = Object.keys(regions)
		const children = Dom.createChildNodes(parent, childSelectors)

		Dom.insertAtRoot(parent)

		for (const [selector, parent] of Object.entries(children)) {
			const initializeView = regions[selector]
			initializeView(parent).renderDOM()
		}
	}

	static createChildNodes = (parent: Element, selectors: string[]): NodeMap => {
		const elementNodeMap: NodeMap = {}
		for (const selector of selectors) {
			const child = createOrGetElement(selector)
			elementNodeMap[selector] = child
			parent.append(child)
		}
		return elementNodeMap
	}

	static insertAtRoot = (element: Element): void => {
		const bodyNode = document.querySelector('body') as HTMLBodyElement
		const [firstScriptNode] = Array.from(bodyNode.querySelectorAll('script'))

		bodyNode.insertBefore(element, firstScriptNode)
	}
}