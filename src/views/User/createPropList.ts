interface GetsProps {
	constructor: { name: string }
	get: (prop: string) => string | number | undefined
}

export function createPropList<T extends GetsProps>(props: string[], model: T): string {
	let list = `<ul>`
	for (const prop of props) {
		const newListItem = createListItemFor(prop)
		appendListWith(newListItem)
	}
	closeList()
	return list

	function appendListWith(listItem: string): void {
		list += listItem
	}
	function createListItemFor(prop: string): string {
		return `
			<li>
				${model.constructor.name} ${prop}: ${model.get(prop)}
			</li>
		`
	}
	function closeList(): void {
		const closingTag = `</ul>`
		appendListWith(closingTag)
	}
}