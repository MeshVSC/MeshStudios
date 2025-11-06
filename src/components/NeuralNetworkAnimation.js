// High-tech Neural Network Animation
// Based on proven algorithms, enhanced for futuristic UI

export class NeuralNetworkAnimation {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Configuration
    this.config = {
      layers: options.layers || [4, 6, 4, 2], // Network topology
      nodeRadius: options.nodeRadius || 8,
      connectionOpacity: options.connectionOpacity || 0.6,
      pulseSpeed: options.pulseSpeed || 0.02,
      glowIntensity: options.glowIntensity || 15,
      backgroundColor: options.backgroundColor || 'rgba(0, 0, 0, 0.1)',
      nodeColor: options.nodeColor || '#00ffff',
      connectionColor: options.connectionColor || '#ffffff',
      activationColor: options.activationColor || '#ff6b35',
      ...options
    };
    
    this.nodes = [];
    this.connections = [];
    this.activations = new Map();
    this.time = 0;
    
    this.initializeNetwork();
  }
  
  initializeNetwork() {
    this.nodes = [];
    this.connections = [];
    
    const layerSpacing = this.canvas.width / (this.config.layers.length + 1);
    
    // Create nodes for each layer
    this.config.layers.forEach((layerSize, layerIndex) => {
      const nodeSpacing = this.canvas.height / (layerSize + 1);
      
      for (let nodeIndex = 0; nodeIndex < layerSize; nodeIndex++) {
        const node = {
          x: layerSpacing * (layerIndex + 1),
          y: nodeSpacing * (nodeIndex + 1),
          layer: layerIndex,
          index: nodeIndex,
          activation: Math.random(),
          targetActivation: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2
        };
        
        this.nodes.push(node);
        this.activations.set(`${layerIndex}-${nodeIndex}`, node.activation);
      }
    });
    
    // Create connections between adjacent layers
    for (let layerIndex = 0; layerIndex < this.config.layers.length - 1; layerIndex++) {
      const currentLayerNodes = this.nodes.filter(n => n.layer === layerIndex);
      const nextLayerNodes = this.nodes.filter(n => n.layer === layerIndex + 1);
      
      currentLayerNodes.forEach(fromNode => {
        nextLayerNodes.forEach(toNode => {
          this.connections.push({
            from: fromNode,
            to: toNode,
            weight: (Math.random() - 0.5) * 2,
            activity: 0,
            targetActivity: 0
          });
        });
      });
    }
  }
  
  updateActivations() {
    // Simulate forward propagation with random variations
    this.config.layers.forEach((_, layerIndex) => {
      if (layerIndex === 0) {
        // Input layer - random stimulation
        this.nodes.filter(n => n.layer === 0).forEach(node => {
          node.targetActivation = Math.random() * 0.8 + 0.2;
        });
      } else {
        // Hidden and output layers
        const currentLayerNodes = this.nodes.filter(n => n.layer === layerIndex);
        const prevLayerNodes = this.nodes.filter(n => n.layer === layerIndex - 1);
        
        currentLayerNodes.forEach(node => {
          let sum = 0;
          prevLayerNodes.forEach(prevNode => {
            const connection = this.connections.find(c => c.from === prevNode && c.to === node);
            if (connection) {
              sum += prevNode.activation * connection.weight;
            }
          });
          
          // Sigmoid activation function
          node.targetActivation = 1 / (1 + Math.exp(-sum));
        });
      }
    });
    
    // Update connection activities
    this.connections.forEach(connection => {
      connection.targetActivity = connection.from.activation * Math.abs(connection.weight);
    });
  }
  
  interpolateValues() {
    // Smooth interpolation for activation values
    this.nodes.forEach(node => {
      node.activation += (node.targetActivation - node.activation) * 0.05;
      node.pulsePhase += this.config.pulseSpeed;
    });
    
    // Smooth interpolation for connection activities
    this.connections.forEach(connection => {
      connection.activity += (connection.targetActivity - connection.activity) * 0.03;
    });
  }
  
  drawConnections() {
    this.connections.forEach(connection => {
      const opacity = connection.activity * this.config.connectionOpacity;
      const weight = Math.abs(connection.weight);
      
      if (opacity > 0.1) {
        // Glow effect
        this.ctx.shadowColor = this.config.connectionColor;
        this.ctx.shadowBlur = this.config.glowIntensity * weight;
        
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.lineWidth = weight * 2 + 0.5;
        
        this.ctx.beginPath();
        this.ctx.moveTo(connection.from.x, connection.from.y);
        this.ctx.lineTo(connection.to.x, connection.to.y);
        this.ctx.stroke();
        
        this.ctx.shadowBlur = 0;
      }
    });
  }
  
  drawNodes() {
    this.nodes.forEach(node => {
      const pulseIntensity = Math.sin(node.pulsePhase) * 0.3 + 0.7;
      const radius = this.config.nodeRadius * (0.8 + node.activation * 0.4);
      
      // Outer glow
      this.ctx.shadowColor = this.config.nodeColor;
      this.ctx.shadowBlur = this.config.glowIntensity * pulseIntensity;
      
      // Node body
      this.ctx.fillStyle = `rgba(0, 255, 255, ${node.activation * 0.8 + 0.2})`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Inner core (highly active nodes)
      if (node.activation > 0.7) {
        this.ctx.shadowColor = this.config.activationColor;
        this.ctx.shadowBlur = this.config.glowIntensity * 0.5;
        this.ctx.fillStyle = this.config.activationColor;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, radius * 0.4, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.shadowBlur = 0;
    });
  }
  
  animate() {
    // Clear with fade effect for trails
    this.ctx.fillStyle = this.config.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update network state
    if (this.time % 60 === 0) { // Update every second at 60fps
      this.updateActivations();
    }
    
    this.interpolateValues();
    
    // Draw network
    this.drawConnections();
    this.drawNodes();
    
    this.time++;
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
  
  start() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.initializeNetwork();
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.initializeNetwork();
  }
}