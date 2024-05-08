import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

const draco = new DRACOLoader()
draco.setDecoderConfig({ type: 'js' })
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

export function loadGLTFModel({
	scene,
	glbPath,
	options = {
		receiveShadow: true,
		castShadow: true,
	},
}: {
	scene: THREE.Scene
	glbPath: string
	options: {
		receiveShadow: boolean
		castShadow: boolean
	}
}) {
	const { receiveShadow, castShadow } = options

	return new Promise((resolve, reject) => {
		const loader = new GLTFLoader()

		loader.setDRACOLoader(draco)

		loader.load(
			glbPath,
			(gltf: any) => {
				const model = gltf.scene
				model.name = 'dog'
				model.position.y = 0
				model.position.x = 0
				model.receiveShadow = receiveShadow
				model.castShadow = castShadow
				scene.add(model)

				model.traverse((child: THREE.Object3D) => {
					if ((child as THREE.Mesh).isMesh) {
						child.castShadow = castShadow
						child.receiveShadow = receiveShadow
					}
				})

				resolve(model)
			},
			undefined,
			(error: any) => {
				reject(error)
			}
		)
	})
}
