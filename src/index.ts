import User from './models/User'

const sampleProps = {
	name: 'USER_4',
	age: 44,
}

const userCollection = User.collection()

userCollection.on('change', (data: any) => {
	console.log(data)
})

userCollection.fetch()
