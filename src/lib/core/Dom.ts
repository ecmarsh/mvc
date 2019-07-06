import { createOrGetElement } from '../elementKit'
import Model from './Model'
import View from './View'

export interface NodeMap<T extends Model<U>, U> {
	[cssLikeSelector: string]: (cssLikeSelector: string) => View<T, U>
}

export default class Dom {
	static renderAll = (...renderables: Renderable[]): void => {
		renderables.forEach(renderable => renderable.renderDOM())
	}

	static renderNodeMap = <T extends Model<U>, U>(parentSelector: string, nodeMap: NodeMap<T, U>): void => {
		Dom.createContainer(parentSelector)
		Dom.createChildNodes(parentSelector, Object.keys(nodeMap))

		for (const [selector, initView] of Object.entries(nodeMap)) {
			initView(selector).renderDOM()
		}
	}

	static createContainer = (containerSelector: string): void => {
		createOrGetElement(containerSelector)
	}

	static createChildNodes = (containerSelector: string, selectors: string[]): void => {
		for (const selector of selectors) {
			createOrGetElement(selector, containerSelector)
		}
	}
}