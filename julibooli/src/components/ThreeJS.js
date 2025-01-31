import React, { useEffect, useRef, useState } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.146.0";
import './css/game-of-life.css';

const ThreeScene = () => {
    const containerRef = useRef();
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const colorUniformRef = useRef(null);
    const [colorLoop, setColorLoop] = useState(null);
    const [loopButtonText, setLoopButtonText] = useState("Start Color Loop");

    useEffect(() => {
        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        /**
         * Shaders
         */
        const vertexShader = `
      varying vec2 vUvs;

      void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUvs = uv;
      }
    `;

        const fragmentShaderScreen = `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform vec3 uColor; // New uniform for pixel color
      varying vec2 vUvs;

      void main() {
          vec4 textureColor = texture2D(uTexture, vUvs);

          if (textureColor.r > 0.5) {
              gl_FragColor = vec4(uColor, 1.0); // Use custom color for alive pixels
          } else {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Dead pixels remain black
          }
      }
    `;

        const fragmentShaderBuffer = `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;

      varying vec2 vUvs;

      float GetNeighbours(vec2 p) {
          float count = 0.0;

          for (float y = -1.0; y <= 1.0; y++) {
              for (float x = -1.0; x <= 1.0; x++) {
                  if (x == 0.0 && y == 0.0) continue;
                  vec2 offset = vec2(x, y) / uResolution.xy;
                  vec4 lookup = texture2D(uTexture, p + offset);
                  count += lookup.r > 0.5 ? 1.0 : 0.0;
              }
          }

          return count;
      }

      void main() {
          vec3 color = vec3(0.0);
          float neighbors = GetNeighbours(vUvs);
          bool alive = texture2D(uTexture, vUvs).r > 0.5;

          if (alive && (neighbors == 2.0 || neighbors == 3.0)) {
              color = vec3(1.0, 0.0, 0.0);
          } else if (!alive && neighbors == 3.0) {
              color = vec3(1.0, 0.0, 0.0);
          }

          gl_FragColor = vec4(color, 1.0);
      }
    `;

        /**
         * Scenes and Materials
         */
        const scene = new THREE.Scene();
        const bufferScene = new THREE.Scene();

        const resolution = new THREE.Vector3(
            sizes.width,
            sizes.height,
            window.devicePixelRatio
        );

        const createDataTexture = () => {
            const size = sizes.width * sizes.height;
            const data = new Uint8Array(4 * size);

            for (let i = 0; i < size; i++) {
                const stride = i * 4;

                if (Math.random() < 0.5) {
                    data[stride] = 255;
                    data[stride + 1] = 255;
                    data[stride + 2] = 255;
                    data[stride + 3] = 255;
                } else {
                    data[stride] = 0;
                    data[stride + 1] = 0;
                    data[stride + 2] = 0;
                    data[stride + 3] = 255;
                }
            }

            const texture = new THREE.DataTexture(
                data,
                sizes.width,
                sizes.height,
                THREE.RGBAFormat
            );
            texture.needsUpdate = true;
            return texture;
        };

        const dataTexture = createDataTexture();

        const bufferMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: dataTexture },
                uResolution: { value: resolution },
            },
            vertexShader,
            fragmentShader: fragmentShaderBuffer,
        });

        const quadMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uResolution: { value: resolution },
                uColor: { value: new THREE.Color(1.0, 1.0, 1.0) }, // Initial color
            },
            vertexShader,
            fragmentShader: fragmentShaderScreen,
        });

        // Initialize colorUniformRef with the uColor uniform
        colorUniformRef.current = quadMaterial.uniforms.uColor;

        const geometry = new THREE.PlaneGeometry(2, 2);

        const mesh = new THREE.Mesh(geometry, quadMaterial);
        scene.add(mesh);

        const bufferMesh = new THREE.Mesh(geometry, bufferMaterial);
        bufferScene.add(bufferMesh);

        /**
         * Render Buffers
         */
        let renderBufferA = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            stencilBuffer: false,
        });

        let renderBufferB = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            stencilBuffer: false,
        });

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const onWindowResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            quadMaterial.uniforms.uResolution.value.x = sizes.width;
            quadMaterial.uniforms.uResolution.value.y = sizes.height;
        };

        window.addEventListener("resize", onWindowResize);

        const animate = () => {
            renderer.setRenderTarget(renderBufferA);
            renderer.render(bufferScene, camera);

            mesh.material.uniforms.uTexture.value = renderBufferA.texture;

            renderer.setRenderTarget(null);
            renderer.render(scene, camera);

            const temp = renderBufferA;
            renderBufferA = renderBufferB;
            renderBufferB = temp;

            bufferMaterial.uniforms.uTexture.value = renderBufferB.texture;

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", onWindowResize);
            renderer.dispose();
        };
    }, []);

    // Color Change Handler
    const handleColorChange = () => {
        if (colorUniformRef.current) {
            const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
            colorUniformRef.current.value = newColor;
        }
    };

    // Start/Stop Color Loop
    const toggleColorLoop = () => {
        if (colorLoop) {
            clearInterval(colorLoop);
            setColorLoop(null);
            setLoopButtonText("Start Color Loop");
        } else {
            const interval = setInterval(handleColorChange, 1000);
            setColorLoop(interval);
            setLoopButtonText("Stop Color Loop");
        }
    };

    // Keybinding to toggle button visibility
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "h" || event.key === "H") {
                document.querySelectorAll("button, form, .info-message").forEach(el => {
                    el.style.display = el.style.display === "none" ? "block" : "none";
                });
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div ref={containerRef} className="three-container">
            <button className="ui-button" id="colorButton" onClick={handleColorChange}>Change Color</button>
            <button className="ui-button" id="loopButton" onClick={toggleColorLoop}>{loopButtonText}</button>
            <button className="ui-button" id="reloadButton" onClick={() => window.location.reload()}>Reload</button>
            <form action="/projects">
                <input className="ui-button" id="homeButton" type="submit" value="Go back to Projects"/>
            </form>
            <p className="info-message">Press <strong>H</strong> to toggle button visibility.</p>
        </div>
    );
};

export default ThreeScene;