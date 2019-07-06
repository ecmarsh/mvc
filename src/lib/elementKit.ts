type ElementAbstractFactory = (
	elementSelector: string,
	parentSelector?: string
) => Element

export let createOrGetElement: ElementAbstractFactory
createOrGetElement = function (elementSelector, parentSelector) {
	let parentElement: Element | undefined
	let element = document.querySelector(elementSelector)

	if (parentSelector) {
		parentElement = createOrGetElement(parentSelector)
	}

	if (parentElement && element) {
		parentElement.append(element)
	}

	if (!element) {
		const [tagName, attrDescriptor] = parseSelector(elementSelector)
		const isAttribute: boolean = !!attrDescriptor.value

		element = document.createElement(tagName)

		if (isAttribute) {
			addAttributeToElement(element, attrDescriptor)
		}

		parentElement
			? parentElement.append(element)
			: insertAtRoot(element)
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

function insertAtRoot(insertedElement: Element): void {
	bodyNode.insertBefore(insertedElement, firstScriptNode)
}

const bodyNode = document.querySelector('body') as HTMLBodyElement
const [firstScriptNode] = Array.from(bodyNode.querySelectorAll('script'))

type ParsedSelector = [string, AttributeDescriptor]

interface AttributeDescriptor {
	type: string
	value: string
}

function parseSelector(cssLikeSelector: string): ParsedSelector {
	const htmlTagName = matchTagName(cssLikeSelector) || 'div'
	const attrSelector = matchAttribute(cssLikeSelector)
	const attrDescriptor: AttributeDescriptor = {
		type: attrSelector ? classOrId(attrSelector) : '',
		value: attrSelector ? attrSelector.substring(1) : ''
	}

	return [htmlTagName, attrDescriptor]
}

function matchTagName(cssLikeSelector: string): string | null {
	const { anythingBeforeSelectorChar: tagMatch } = regexes
	const [htmlTag] = cssLikeSelector.match(tagMatch) || [null]
	return htmlTag
}

function matchAttribute(cssLikeSelector: string): string | null {
	const { selectorCharAndTrailing: attrMatch } = regexes
	const [attrSelector] = cssLikeSelector.match(attrMatch) || [null]
	return attrSelector
}

const regexes = {
	anythingBeforeSelectorChar: /.+(?=\.|#)/g,
	selectorCharAndTrailing: / [.#].+ /g,
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
