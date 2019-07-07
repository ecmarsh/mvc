type ElementAbstractFactory = (
	elementSelector: string,
	parentSelector?: string
) => Element

export let createOrGetElement: ElementAbstractFactory
createOrGetElement = function (selector) {
	let element = document.querySelector(selector)

	if (!element) {
		const [tagName, attrDescriptor] = parseSelector(selector)
		const isAttribute: boolean = !!attrDescriptor.value

		element = document.createElement(tagName)

		if (isAttribute) {
			addAttributeToElement(element, attrDescriptor)
		}
	}

	return element
}

function addAttributeToElement(element: Element, attrDescriptor: AttributeDescriptor): void {
	const { type, value } = attrDescriptor
	const addIdAttr = (): void => { element.id = value }
	const addClassAttr = (): void => { element.classList.add(value) }

	type === 'id'
		? addIdAttr()
		: addClassAttr()
}

type ParsedSelector = [string, AttributeDescriptor]

interface AttributeDescriptor {
	type: string
	value: string
}

function parseSelector(selector: string): ParsedSelector {
	const htmlTagName = matchTagName(selector) || 'div'
	const attrSelector = matchAttribute(selector)

	const attrDescriptor: AttributeDescriptor = {
		type: attrSelector ? classOrId(attrSelector) : '',
		value: attrSelector ? attrSelector.substring(1) : ''
	}

	return [htmlTagName, attrDescriptor]
}

function matchTagName(selector: string): string | null {
	const { anythingBeforeSelectorChar: tagMatch } = regexes
	const [htmlTag] = selector.match(tagMatch) || [null]
	return htmlTag
}

function matchAttribute(selector: string): string | null {
	const { selectorCharAndTrailing: attrMatch } = regexes
	const [attrSelector] = selector.match(attrMatch) || [null]
	return attrSelector
}

const regexes = {
	anythingBeforeSelectorChar: /.+(?=\.|#)/g,
	selectorCharAndTrailing: /[.#].+/g,
	beginsWithHash: / [.#].+ /g
}

enum AttrType {
	id = 'id',
	class = 'class'
}
function classOrId(attrSelector: string): AttrType {
	const { beginsWithHash } = regexes
	const isIdAttr = beginsWithHash.test(attrSelector)
	return isIdAttr ? AttrType.id : AttrType.class
}
