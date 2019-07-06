interface GetsProps {
	constructor: { name: string }
	get: (prop: string) => string | number | undefined
}

type CreatePropList = <T extends GetsProps>(props: string[], model: T) => string

export const createPropList: CreatePropList = (props, model) => {
	let list = `<ul>`

	for (const prop of props) {
		const newListItem = createListItemFor(prop)
		appendListWith(newListItem)
	}

	closeList()

	return list


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

	function appendListWith(listItem: string): void {
		list += listItem
	}

}