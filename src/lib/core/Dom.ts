import Model from './Model'
import View from './View'
import { createOrGetElement } from '../elementKit'
import { Renderable } from './types'


export interface RegionMap<T extends Model<U>, U> {
	[cssLikeSelector: string]: (parent: Element) => View<T, U>
}

export interface NodeMap {
	[cssLikeSelector: string]: Element
}

export default class Dom {
	static renderAll = (...renderables: Renderable[]): void => {
		renderables.forEach(renderable => renderable.renderDOM())
	}

	static renderNodeMap = <T extends Model<U>, U>(parentSelector: string, nodeMap: RegionMap<T, U>): void => {
		const parent = createOrGetElement(parentSelector)
		const children = Dom.createChildNodes(parent, Object.keys(nodeMap))

		Dom.insertAtRoot(parent)

		for (const [selector, parent] of Object.entries(children)) {
			const initializeView = nodeMap[selector]
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