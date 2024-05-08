declare module 'three/examples/jsm/loaders/GLTFLoader' {
	export class GLTFLoader {
		load: (
			url: string,
			onLoad: Function,
			onProgress?: Function,
			onError?: Function
		) => void
		// Add other methods and properties as needed
	}
}
