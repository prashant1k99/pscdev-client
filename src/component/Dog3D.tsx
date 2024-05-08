import { createSignal, createEffect, onCleanup, createMemo } from 'solid-js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { loadGLTFModel } from '../util/model'
import Spinner from '../util/Spinner'

function easeOutCircular(t: number) {
	return Math.sqrt(1 - Math.pow(t - 1, 4))
}

const Dog3D = () => {
	const [containerRef, setContainerRef] = createSignal<HTMLElement | null>(null)
	const [loading, setLoading] = createSignal(true)
	const [_camera, setCamera] = createSignal<THREE.OrthographicCamera | null>(
		null
	)
	const [renderer, setRenderer] = createSignal<THREE.WebGLRenderer | null>(null)
	const [scene, setScene] = createSignal(new THREE.Scene())
	const [dog] = createSignal(new THREE.Vector3(-0.5, 1.2, 0))
	const [initialCameraPosition] = createSignal(
		new THREE.Vector3(
			20 * Math.sin(0.2 * Math.PI),
			10,
			20 * Math.cos(0.2 * Math.PI)
		)
	)
	const [_controls, setControls] = createSignal()

	createEffect(() => {
		const container = containerRef()
		if (!container) return

		const scW = container.clientWidth
		const scH = container.clientHeight

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setSize(scW, scH)
		renderer.setPixelRatio(window.devicePixelRatio)
		container.appendChild(renderer.domElement)
		setContainerRef(container)

		setRenderer(renderer)

		// 640 ->240
		// 8 -> 6

		const scale = scH * 0.005 + 4.8
		const camera = new THREE.OrthographicCamera(
			-scale,
			scale,
			scale,
			-scale,
			0.0,
			50000
		)
		camera.position.copy(initialCameraPosition())
		camera.lookAt(dog())
		setCamera(camera)

		const ambientLight = new THREE.AmbientLight(0xffffff, 1)
		scene().add(ambientLight)

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.autoRotate = true
		controls.target = dog()
		setControls(controls)

		loadGLTFModel({
			scene: scene(),
			glbPath: '/dog.glb',
			options: {
				receiveShadow: true,
				castShadow: true,
			},
		}).then(() => {})
	})

	return (
		<div ref={containerRef} class="m-auto ">
			{loading() && (
				<div class="text-2xl text-red-300">
					<Spinner class="text-gray-500 h-8 w-8" />
				</div>
			)}
			Dog!!!
		</div>
	)
}

export default Dog3D
