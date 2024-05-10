import Dog3D from './component/Dog3D'

function App() {
	return (
		<div class="h-screen w-screen overflow-hidden bg-pink-100">
			{/* <h1 class="text-sm text-red-300">Hello World</h1> */}
			<div class="flex flex-row h-full">
				<Dog3D />
				<Dog3D />
			</div>
		</div>
	)
}

export default App
