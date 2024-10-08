// script.js

document.addEventListener('DOMContentLoaded', function() {
    // ===== 2D Geometry Explorer ===== //
    const shapeSelector2d = document.getElementById('shape2d');
    const inputsContainer2d = document.getElementById('inputs2d');
    const canvas2d = document.getElementById('canvas2d');
    const ctx2d = canvas2d.getContext('2d');
    const areaDisplay2d = document.getElementById('area2d');
    const perimeterDisplay2d = document.getElementById('perimeter2d');
  
    // Update inputs based on 2D shape selection
    function updateInputs2d() {
      inputsContainer2d.innerHTML = '';
      const shape = shapeSelector2d.value;
  
      if (shape === 'circle') {
        inputsContainer2d.innerHTML = '<label for="radius2d">Radius:</label><input id="radius2d" type="number" min="0" value="50">';
      } else if (shape === 'square') {
        inputsContainer2d.innerHTML = '<label for="side2d">Side:</label><input id="side2d" type="number" min="0" value="100">';
      } else if (shape === 'rectangle') {
        inputsContainer2d.innerHTML = '<label for="width2d">Width:</label><input id="width2d" type="number" min="0" value="100"><br><label for="height2d">Height:</label><input id="height2d" type="number" min="0" value="50">';
      } else if (shape === 'triangle') {
        inputsContainer2d.innerHTML = '<label for="base2d">Base:</label><input id="base2d" type="number" min="0" value="100"><br><label for="height2d">Height:</label><input id="height2d" type="number" min="0" value="80">';
      }
    }
  
    // Draw 2D shape and calculate area/perimeter
    function drawShape2d() {
      ctx2d.clearRect(0, 0, canvas2d.width, canvas2d.height);  // Clear canvas
      let area = 0, perimeter = 0;
      const shape = shapeSelector2d.value;
  
      if (shape === 'circle') {
        const radius = parseFloat(document.getElementById('radius2d').value);
        ctx2d.beginPath();
        ctx2d.arc(canvas2d.width / 2, canvas2d.height / 2, radius, 0, Math.PI * 2);
        ctx2d.strokeStyle = '#f54242';
        ctx2d.stroke();
        area = Math.PI * Math.pow(radius, 2);
        perimeter = 2 * Math.PI * radius;
      } else if (shape === 'square') {
        const side = parseFloat(document.getElementById('side2d').value);
        ctx2d.strokeRect((canvas2d.width - side) / 2, (canvas2d.height - side) / 2, side, side);
        area = Math.pow(side, 2);
        perimeter = 4 * side;
      } else if (shape === 'rectangle') {
        const width = parseFloat(document.getElementById('width2d').value);
        const height = parseFloat(document.getElementById('height2d').value);
        ctx2d.strokeRect((canvas2d.width - width) / 2, (canvas2d.height - height) / 2, width, height);
        area = width * height;
        perimeter = 2 * (width + height);
      } else if (shape === 'triangle') {
        const base = parseFloat(document.getElementById('base2d').value);
        const height = parseFloat(document.getElementById('height2d').value);
        ctx2d.beginPath();
        ctx2d.moveTo((canvas2d.width - base) / 2, canvas2d.height / 2 + height / 2);
        ctx2d.lineTo(canvas2d.width / 2, canvas2d.height / 2 - height / 2);
        ctx2d.lineTo((canvas2d.width + base) / 2, canvas2d.height / 2 + height / 2);
        ctx2d.closePath();
        ctx2d.stroke();
        area = 0.5 * base * height;
        perimeter = base + 2 * Math.sqrt(Math.pow(height, 2) + Math.pow(base / 2, 2)); // Isosceles triangle perimeter
      }
  
      areaDisplay2d.textContent = `Area: ${area.toFixed(2)}`;
      perimeterDisplay2d.textContent = `Perimeter: ${perimeter.toFixed(2)}`;
    }
  
    // Event listeners for 2D shape selector and calculation
    shapeSelector2d.addEventListener('change', updateInputs2d);
    document.getElementById('calculate2d').addEventListener('click', drawShape2d);
    updateInputs2d();  // Initialize inputs for default shape
  
    // ===== 3D Geometry Explorer remains unchanged from previous version ===== //
    // ... [3D code stays the same]
  });

// ===== 3D Geometry Explorer ===== //
document.addEventListener('DOMContentLoaded', function() {
    const shapeSelector = document.getElementById('shape');
    const inputsContainer = document.getElementById('inputs');
    const volumeDisplay = document.getElementById('volume');
    const surfaceAreaDisplay = document.getElementById('surface-area');
    const container = document.getElementById('three-container');
  
    let scene, camera, renderer, shapeMesh, controls, light, ambientLight;
  
    // Initialize Three.js scene with better lighting and shadows
    function initThree() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
  
      // Setup lighting
      light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      light.castShadow = true;
      scene.add(light);
  
      // Ambient light
      ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
  
      // OrbitControls for rotation/zoom/pan
      controls = new THREE.OrbitControls(camera, renderer.domElement);
  
      camera.position.set(3, 3, 7);
      controls.update();
  
      // Add lighting controls to dynamically change light properties
      addLightingControls();
  
      // Add background color controls
      addBackgroundControls();
  
      animate();
    }
  
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      if (shapeMesh) {
        shapeMesh.rotation.x += 0.005;
        shapeMesh.rotation.y += 0.005;
      }
      controls.update();
      renderer.render(scene, camera);
    }
  
    // Handle shape change and inputs
    shapeSelector.addEventListener('change', function() {
      updateInputs();
      updateShape();
    });
  
    // Dynamically update input fields based on selected shape
    function updateInputs() {
      inputsContainer.innerHTML = '';
  
      if (shapeSelector.value === 'sphere') {
        inputsContainer.innerHTML = '<label for="radius">Radius:</label><input id="radius" type="number" min="0" value="1" />';
      } else if (shapeSelector.value === 'cube') {
        inputsContainer.innerHTML = '<label for="side">Side:</label><input id="side" type="number" min="0" value="1" />';
      } else if (shapeSelector.value === 'cylinder') {
        inputsContainer.innerHTML = '<label for="radius">Radius:</label><input id="radius" type="number" min="0" value="1" /><br><label for="height">Height:</label><input id="height" type="number" min="0" value="2" />';
      } else if (shapeSelector.value === 'cone') {
        inputsContainer.innerHTML = '<label for="radius">Radius:</label><input id="radius" type="number" min="0" value="1" /><br><label for="height">Height:</label><input id="height" type="number" min="0" value="2" />';
      } else if (shapeSelector.value === 'torus') {
        inputsContainer.innerHTML = '<label for="radius">Radius:</label><input id="radius" type="number" min="0" value="1" /><br><label for="tubeRadius">Tube Radius:</label><input id="tubeRadius" type="number" min="0" value="0.3" />';
      }
      // No inputs for platonic solids (tetrahedron, octahedron, dodecahedron, knot, icosahedron)
    }
  
    // Update the 3D shape in the scene
    function updateShape() {
      if (shapeMesh) {
        scene.remove(shapeMesh);  // Remove previous shape
        shapeMesh.geometry.dispose(); // Dispose of old geometry
      }
  
      const shape = shapeSelector.value;
      let geometry;
  
      // Geometry creation based on shape
      if (shape === 'sphere') {
        const radius = parseFloat(document.getElementById('radius').value) || 1;
        geometry = new THREE.SphereGeometry(radius, 32, 32); // Higher segment counts for smooth sphere
      } else if (shape === 'cube') {
        const side = parseFloat(document.getElementById('side').value) || 1;
        geometry = new THREE.BoxGeometry(side, side, side);
      } else if (shape === 'cylinder') {
        const radius = parseFloat(document.getElementById('radius').value) || 1;
        const height = parseFloat(document.getElementById('height').value) || 2;
        geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
      } else if (shape === 'cone') {
        const radius = parseFloat(document.getElementById('radius').value) || 1;
        const height = parseFloat(document.getElementById('height').value) || 2;
        geometry = new THREE.ConeGeometry(radius, height, 32);
      } else if (shape === 'torus') {
        const radius = parseFloat(document.getElementById('radius').value) || 1;
        const tubeRadius = parseFloat(document.getElementById('tubeRadius').value) || 0.3;
        geometry = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
      } else if (shape === 'tetrahedron') {
        geometry = new THREE.TetrahedronGeometry(1);
      } else if (shape === 'octahedron') {
        geometry = new THREE.OctahedronGeometry(1); // Octahedron shape
      } else if (shape === 'dodecahedron') {
        geometry = new THREE.DodecahedronGeometry(1); // Dodecahedron shape
      } else if (shape === 'icosahedron') {
        geometry = new THREE.IcosahedronGeometry(1, 0); // Icosahedron
      } else if (shape === 'tube') {
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1, 0, 1),
          new THREE.Vector3(1, 0, -1),
          new THREE.Vector3(1, 1, 1),
          new THREE.Vector3(-1, 1, -1)
        ]);
        geometry = new THREE.TubeGeometry(path, 20, 0.2, 8, false); // Tube geometry
      } else if (shape === 'knot') {
        geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16); // Knot geometry
      }
  
      // Create mesh with realistic material and shadows
      const material = new THREE.MeshStandardMaterial({ color: 0xf54242, roughness: 0.5, metalness: 0.2 });
      shapeMesh = new THREE.Mesh(geometry, material);
      shapeMesh.castShadow = true;
      shapeMesh.receiveShadow = true;
      scene.add(shapeMesh);
    }
  
    // Calculate and display volume & surface area (simplified)
    document.getElementById('calculate').addEventListener('click', function() {
      let volume = 0, surfaceArea = 0;
  
      if (shapeSelector.value === 'sphere') {
        const radius = parseFloat(document.getElementById('radius').value);
        volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
        surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
      } else if (shapeSelector.value === 'cube') {
        const side = parseFloat(document.getElementById('side').value);
        volume = Math.pow(side, 3);
        surfaceArea = 6 * Math.pow(side, 2);
      } else if (shapeSelector.value === 'cylinder') {
        const radius = parseFloat(document.getElementById('radius').value);
        const height = parseFloat(document.getElementById('height').value);
        volume = Math.PI * Math.pow(radius, 2) * height;
        surfaceArea = 2 * Math.PI * radius * (radius + height);
      } else if (shapeSelector.value === 'cone') {
        const radius = parseFloat(document.getElementById('radius').value);
        const height = parseFloat(document.getElementById('height').value);
        volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
        surfaceArea = Math.PI * radius * (radius + Math.sqrt(Math.pow(height, 2) + Math.pow(radius, 2)));
      } else if (shapeSelector.value === 'torus') {
        const radius = parseFloat(document.getElementById('radius').value);
        const tubeRadius = parseFloat(document.getElementById('tubeRadius').value);
        volume = (2 * Math.PI * radius) * (Math.PI * Math.pow(tubeRadius, 2));
        surfaceArea = 4 * Math.PI * Math.PI * radius * tubeRadius;
      }
  
      volumeDisplay.textContent = `Volume: ${volume.toFixed(2)}`;
      surfaceAreaDisplay.textContent = `Surface Area: ${surfaceArea.toFixed(2)}`;
    });
  
    // Add lighting controls to dynamically change light properties
    function addLightingControls() {
      const lightColorInput = document.createElement('input');
      lightColorInput.type = 'color';
      lightColorInput.value = '#ffffff';
      lightColorInput.id = 'lightColor';
  
      const lightIntensityInput = document.createElement('input');
      lightIntensityInput.type = 'range';
      lightIntensityInput.min = '0';
      lightIntensityInput.max = '2';
      lightIntensityInput.step = '0.01';
      lightIntensityInput.value = '1';
      lightIntensityInput.id = 'lightIntensity';
  
      inputsContainer.appendChild(lightColorInput);
      inputsContainer.appendChild(lightIntensityInput);
  
      // Handle color change
      lightColorInput.addEventListener('input', function() {
        light.color.set(lightColorInput.value);
      });
  
      // Handle intensity change
      lightIntensityInput.addEventListener('input', function() {
        light.intensity = parseFloat(lightIntensityInput.value);
      });
    }
  
    // Add background color controls
    function addBackgroundControls() {
      const backgroundColorInput = document.createElement('input');
      backgroundColorInput.type = 'color';
      backgroundColorInput.value = '#222222';
      backgroundColorInput.id = 'backgroundColor';
  
      inputsContainer.appendChild(backgroundColorInput);
  
      // Handle background color change
      backgroundColorInput.addEventListener('input', function() {
        renderer.setClearColor(backgroundColorInput.value);
      });
    }
  
    // Initialize the scene
    initThree();
    updateInputs();
  });
  