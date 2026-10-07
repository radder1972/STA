const fs = require('fs');
const artifactPath = '/Users/matthias/.gemini/antigravity/brain/74186955-4314-4a56-becd-8f8cb9684ebb/folding-box.html';

const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Vouwende Doos Animatie</title>
<style>
  body {
    margin: 0; padding: 0; height: 100vh;
    display: flex; justify-content: center; align-items: center;
    background: #f1f5f9; font-family: sans-serif;
    perspective: 1500px; overflow: hidden;
  }
  
  .scene {
    position: relative;
    width: 260px; height: 360px; /* Front face size */
    transform-style: preserve-3d;
    transform: rotateX(60deg) rotateZ(-45deg);
    animation: rotateScene 15s infinite linear;
  }

  @keyframes rotateScene {
    0% { transform: rotateX(60deg) rotateZ(0deg); }
    100% { transform: rotateX(60deg) rotateZ(360deg); }
  }

  .panel {
    position: absolute;
    transform-style: preserve-3d;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }

  /* The front panel is the root */
  .front {
    width: 260px; height: 360px;
    background: #fff radial-gradient(circle at center, #f0f9ff 0%, #fff 100%);
  }

  /* Left Spine */
  .spine-left {
    width: 72px; height: 360px;
    left: -72px; top: 0;
    transform-origin: right center;
    animation: foldLeftSpine 5s infinite alternate ease-in-out;
  }
  
  /* Back panel attached to left spine */
  .back {
    width: 260px; height: 360px;
    left: -260px; top: 0;
    transform-origin: right center;
    animation: foldBack 5s infinite alternate ease-in-out;
  }

  /* Right Spine */
  .spine-right {
    width: 72px; height: 360px;
    left: 260px; top: 0;
    transform-origin: left center;
    animation: foldRightSpine 5s infinite alternate ease-in-out;
  }

  /* Top Flap */
  .flap-top {
    width: 260px; height: 72px;
    left: 0; top: -72px;
    transform-origin: bottom center;
    animation: foldTopFlap 5s infinite alternate ease-in-out;
  }

  /* Bottom Flap */
  .flap-bottom {
    width: 260px; height: 72px;
    left: 0; top: 360px;
    transform-origin: top center;
    animation: foldBottomFlap 5s infinite alternate ease-in-out;
  }

  /* Keyframes for folding */
  @keyframes foldLeftSpine { 0%, 20% { transform: rotateY(0deg); } 80%, 100% { transform: rotateY(90deg); } }
  @keyframes foldBack { 0%, 30% { transform: rotateY(0deg); } 80%, 100% { transform: rotateY(90deg); } }
  @keyframes foldRightSpine { 0%, 40% { transform: rotateY(0deg); } 80%, 100% { transform: rotateY(-90deg); } }
  @keyframes foldTopFlap { 0%, 50% { transform: rotateX(0deg); } 80%, 100% { transform: rotateX(-90deg); } }
  @keyframes foldBottomFlap { 0%, 60% { transform: rotateX(0deg); } 80%, 100% { transform: rotateX(90deg); } }

  .content-text { color: #0ea5e9; font-weight: bold; font-size: 14px; text-align: center; }
  .logo-placeholder { width: 50px; height: 50px; background: #0ea5e9; border-radius: 50%; margin-bottom: 10px; }
  
</style>
</head>
<body>

<div class="scene">
  <!-- FRONT -->
  <div class="panel front">
    <div class="logo-placeholder"></div>
    <div class="content-text">Schematherapie<br>kaarten</div>
    
    <!-- LEFT SPINE -->
    <div class="panel spine-left">
      <div class="content-text" style="transform: rotate(180deg); writing-mode: vertical-rl;">VSt 2021 Update</div>
      
      <!-- BACK (attached to left spine) -->
      <div class="panel back">
        <div class="content-text">55 Theoriekaarten</div>
        <p style="font-size: 10px; text-align: center; color: #475569; padding: 20px;">Een actuele en complete referentieset voor gebruik in de klinische praktijk.</p>
      </div>
    </div>

    <!-- RIGHT SPINE -->
    <div class="panel spine-right">
      <div class="content-text" style="transform: rotate(180deg); writing-mode: vertical-rl;">Schematherapiekaarten</div>
    </div>

    <!-- TOP FLAP -->
    <div class="panel flap-top">
      <div class="content-text" style="transform: rotate(180deg); font-size: 10px;">DSP</div>
    </div>

    <!-- BOTTOM FLAP -->
    <div class="panel flap-bottom">
      <div class="content-text" style="font-size: 10px;">DSP</div>
    </div>
  </div>
</div>

</body>
</html>`;

fs.writeFileSync(artifactPath, html);
