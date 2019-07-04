const rootNode = document.getElementById('root') as Element
const scriptNode = rootNode.querySelector('script')


export const createOrGetElement = (elementSelector: string, parentSelector?: string): Element => {
	let element = document.querySelector(elementSelector)

	let parentElement: Element | undefined
	if (parentSelector) {
		parentElement = createOrGetElement(parentSelector)
	}

	if (!element) {
		const [tag, selector, selectorType] = parseSelector(elementSelector)

		element = document.createElement(tag)

		const addSelectorToElement = (element: Element): void => {
			const selectorName = selector.substring(1)

			selectorType === 'id'
				? element.id = selectorName
				: element.classList.add(selectorName)
		}

		if (selector) {
			addSelectorToElement(element)
		}

		parentElement ? parentElement.append(element) : insertAtRoot(element)
	}

	return element
}

const insertAtRoot = (element: Element): void => {
	rootNode.insertBefore(element, scriptNode)
}

const parseSelector = (tagAndOrSelector: string): string[] => {
	const [selector] = tagAndOrSelector.match(/[.#].+/g) || ['']
	const [tag] = tagAndOrSelector.match(/.+(?=\.|#)/g) || ['div']
	const classOrId = /^#/.test(selector) ? 'id' : 'class'
	const selectorType = selector ? classOrId : selector
	return [tag, selector, selectorType]
}