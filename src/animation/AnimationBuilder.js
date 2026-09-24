import gsap from 'gsap';

export function buildTimeline(scene, durationSec, sceneEngine) {
  const tl = gsap.timeline({ paused: true });

  if (!sceneEngine) return tl;

  const camPos = sceneEngine.camera ? sceneEngine.camera.position : null;
  const veilEl = document.getElementById('veil');
  const dayLabelEl = document.getElementById('day-label');

  // ==========================================
  // CREATION ANIMATIONS
  // ==========================================
  if (scene.chapterId === 'creation') {
    switch (scene.id) {
      case 3: // "Let there be light"
        // Screen flash
        tl.call(() => {
          if (veilEl) {
            veilEl.style.transition = 'background 0.1s ease';
            veilEl.style.background = '#fff9eb';
            setTimeout(() => {
              veilEl.style.transition = 'background 3.5s cubic-bezier(0.25, 1, 0.5, 1)';
              veilEl.style.background = 'rgba(0,0,0,0)';
            }, 120);
          }
        }, null, 0.2);

        // Transition Day One
        tl.call(() => {
          sceneEngine.transitionDayOne();
          if (window.adjustWindIntensity) window.adjustWindIntensity(0.06, 450, 3);
        }, null, 0.5);
        break;

      case 4: // Day One Narration
        tl.call(() => {
          showLabel('Day One');
        }, null, 0);
        break;

      case 5: // Day Two
        tl.call(() => {
          showLabel('Day Two');
          sceneEngine.transitionDayTwo();
        }, null, 0);
        break;

      case 6: // Day Three
        tl.call(() => {
          showLabel('Day Three');
          sceneEngine.transitionDayThree();
          if (window.adjustWindIntensity) window.adjustWindIntensity(0.02, 180, 5.0);
        }, null, 0);
        break;

      case 7: // Day Four
        tl.call(() => {
          showLabel('Day Four');
          sceneEngine.transitionDayFour();
        }, null, 0);
        break;

      case 8: // Day Five
        tl.call(() => {
          showLabel('Day Five');
          sceneEngine.transitionDayFive();
          window.enableBirdSounds = true;
        }, null, 0);
        break;

      case 9: // Day Six
        tl.call(() => {
          showLabel('Day Six');
          sceneEngine.transitionDaySix();
          window.enableAnimalSounds = true;
        }, null, 0);
        break;

      case 11: // "And God blessed them..." (Day 6 end / Adam formed)
        tl.call(() => {
          sceneEngine.formAdam();
        }, null, 0);
        break;
    }
  }

  // ==========================================
  // EDEN ANIMATIONS
  // ==========================================
  else if (scene.chapterId === 'eden') {
    switch (scene.id) {
      case 24: // "And brought them unto Adam..."
        tl.call(() => {
          sceneEngine.animateNamingAnimals();
        }, null, 0);
        break;

      case 27: // "caused a deep sleep..."
        tl.call(() => {
          sceneEngine.animateDeepSleep();
        }, null, 0);
        break;

      case 29: // "And the rib..." Eve Creation
        tl.call(() => {
          sceneEngine.animateCreationOfEve();
        }, null, 0);
        break;

      case 33: // "Now the serpent was more subtil..."
        // Pivot Eve and Adam to face the tree and serpent
        tl.call(() => {
          sceneEngine.movementEnabled = false;
          sceneEngine.eve.position.set(1.2, sceneEngine.getTerrainHeight(1.2, 1.4), 1.4);
          sceneEngine.eve.lookAt(0, sceneEngine.eve.position.y, 0);
          sceneEngine.adam.position.set(-1.2, sceneEngine.getTerrainHeight(-1.2, 1.4), 1.4);
          sceneEngine.adam.lookAt(0, sceneEngine.adam.position.y, 0);
          
          if (camPos) {
            gsap.to(camPos, {
              x: 0, y: 2.2, z: 6.8, duration: 3.5, ease: 'power2.inOut',
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 1.6, 0.5); }
            });
          }
        }, null, 0);
        break;

      case 37: // "And when the woman saw..." Eve reaching
        tl.call(() => {
          gsap.to(sceneEngine.eveArmR.rotation, { x: -Math.PI / 2.2, duration: 1.2 });
          const fruit = sceneEngine.forbiddenFruits.children[0];
          if (fruit) {
            gsap.to(fruit.position, { x: 1.2, y: 0.95, z: 1.5, duration: 1.8, ease: 'bounce.out' });
          }
        }, null, 0);
        break;

      case 38: // "...she took of the fruit thereof, and did eat..."
        tl.call(() => {
          gsap.to(sceneEngine.eveArmR.rotation, { x: -Math.PI / 1.5, duration: 0.8 });
        }, null, 0);
        tl.call(() => {
          gsap.to(sceneEngine.eveArmR.rotation, { x: 0, duration: 0.6 });
        }, null, 0.9);

        // Eve walks to Adam
        tl.call(() => {
          const swingInterval = setInterval(() => {
            if (window.sceneEngine && window.sceneEngine.eve) {
              const swing = Math.sin(performance.now() * 0.01) * 0.45;
              sceneEngine.eve.children[5].rotation.x = swing;
              sceneEngine.eve.children[6].rotation.x = -swing;
            } else {
              clearInterval(swingInterval);
            }
          }, 30);

          gsap.to(sceneEngine.eve.position, {
            x: -0.4, z: 1.4, duration: 2.0,
            onComplete: () => {
              clearInterval(swingInterval);
              sceneEngine.eve.children[5].rotation.x = 0;
              sceneEngine.eve.children[6].rotation.x = 0;
            }
          });

          const fruit = sceneEngine.forbiddenFruits.children[0];
          if (fruit) {
            gsap.to(fruit.position, { x: -0.8, y: 0.95, z: 1.4, duration: 2.0 });
          }
          sceneEngine.eve.lookAt(-1.2, sceneEngine.eve.position.y, 1.4);
        }, null, 1.5);
        break;

      case 40: // "...and gave also unto her husband..." Adam eating
        tl.call(() => {
          gsap.to(sceneEngine.adamArmR.rotation, { x: -Math.PI / 2.2, duration: 1.0 });
          const fruit = sceneEngine.forbiddenFruits.children[0];
          if (fruit) {
            gsap.to(fruit.position, { x: -1.2, y: 0.95, z: 1.4, duration: 0.8 });
          }
        }, null, 0);

        tl.call(() => {
          gsap.to(sceneEngine.adamArmR.rotation, { x: -Math.PI / 1.5, duration: 0.8 });
          const fruit = sceneEngine.forbiddenFruits.children[0];
          if (fruit) {
            gsap.to(fruit.position, { x: -1.2, y: 1.6, z: 1.3, duration: 0.6 });
            gsap.to(fruit.scale, { x: 0, y: 0, z: 0, duration: 0.6, delay: 0.2 });
          }
        }, null, 1.1);

        tl.call(() => {
          gsap.to(sceneEngine.adamArmR.rotation, { x: 0, duration: 0.8 });
          gsap.to(sceneEngine.eveArmR.rotation, { x: 0, duration: 0.8 });
        }, null, 2.1);

        // Flash of red
        tl.call(() => {
          if (veilEl) {
            veilEl.style.transition = 'background 0.15s ease';
            veilEl.style.background = '#300808';
            setTimeout(() => {
              veilEl.style.transition = 'background 4.5s ease';
              veilEl.style.background = 'rgba(0,0,0,0)';
            }, 200);
          }
        }, null, 2.9);
        break;

      case 53: // "...expulsion..."
        // Adam & Eve walk away East of Eden
        tl.call(() => {
          const walkAwayInterval = setInterval(() => {
            if (window.sceneEngine && window.sceneEngine.adam) {
              const swing = Math.sin(performance.now() * 0.01) * 0.45;
              sceneEngine.eve.children[5].rotation.x = swing;
              sceneEngine.eve.children[6].rotation.x = -swing;
              sceneEngine.adam.children[5].rotation.x = -swing;
              sceneEngine.adam.children[6].rotation.x = swing;
            } else {
              clearInterval(walkAwayInterval);
            }
          }, 30);

          sceneEngine.eve.lookAt(25, sceneEngine.eve.position.y, 0.5);
          sceneEngine.adam.lookAt(25, sceneEngine.adam.position.y, -0.5);

          gsap.to(sceneEngine.eve.position, {
            x: 25.0, z: 0.5, duration: 6.0,
            onUpdate: () => { sceneEngine.eve.position.y = sceneEngine.getTerrainHeight(sceneEngine.eve.position.x, sceneEngine.eve.position.z); }
          });
          gsap.to(sceneEngine.adam.position, {
            x: 25.0, z: -0.5, duration: 6.0,
            onUpdate: () => { sceneEngine.adam.position.y = sceneEngine.getTerrainHeight(sceneEngine.adam.position.x, sceneEngine.adam.position.z); },
            onComplete: () => { clearInterval(walkAwayInterval); }
          });

          // Camera pan
          if (camPos) {
            gsap.to(camPos, {
              x: 18.0, y: 3.5, z: 5.0, duration: 6.0,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(12.0, 1.2, 0); }
            });
          }

          if (veilEl) {
            veilEl.style.transition = 'background 5.0s ease';
            veilEl.style.background = '#000000';
          }
        }, null, 0);
        break;
    }
  }

  // ==========================================
  // CAIN & ABEL ANIMATIONS
  // ==========================================
  else if (scene.chapterId === 'cainabel') {
    switch (scene.id) {
      case 61: // Intro birth
        tl.call(() => {
          if (camPos) {
            camPos.set(-11, 2.5, 14);
            sceneEngine.camera.lookAt(-15.0, 1.3, 11.5);
          }
          // Show infants, hide grown Cain/Abel
          sceneEngine.crib.visible = true;
          sceneEngine.cain.visible = false;
          sceneEngine.abel.visible = false;
        }, null, 0);
        break;

      case 64: // Grown up
        tl.call(() => {
          if (camPos) {
            gsap.to(camPos, {
              x: -3, y: 3.0, z: 6, duration: 4.5,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 1.0, 0); }
            });
          }
          sceneEngine.crib.visible = false;
          sceneEngine.cain.visible = true;
          sceneEngine.abel.visible = true;

          // Set positions
          sceneEngine.cain.position.set(-12, sceneEngine.getTerrainHeight(-12, -2), -2);
          sceneEngine.cain.lookAt(-2.8, sceneEngine.cain.position.y, 0.0);
          sceneEngine.abel.position.set(14, sceneEngine.getTerrainHeight(14, 6), 6);
          sceneEngine.abel.lookAt(2.8, sceneEngine.abel.position.y, 0.0);
        }, null, 0);
        break;

      case 68: // Respect to Abel
        tl.call(() => {
          sceneEngine.movementEnabled = false;
          sceneEngine.cain.lookAt(-2.8, sceneEngine.cain.position.y, 0.0);
          sceneEngine.abel.lookAt(2.8, sceneEngine.abel.position.y, 0.0);
          
          if (camPos) {
            gsap.to(camPos, {
              x: 0, y: 2.2, z: 5.5, duration: 3.5,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 1.1, 0); }
            });
          }

          // Move offerings to altar
          gsap.to(sceneEngine.cainOffering.position, { x: -0.7, y: 1.05, z: 0.0, duration: 1.5 });
          gsap.to(sceneEngine.abelOffering.position, { x: 0.7, y: 1.05, z: 0.0, duration: 1.5 });
        }, null, 0);

        tl.call(() => {
          sceneEngine.igniteAbelOffering();
        }, null, 1.8);
        break;

      case 69: // But Cain offering no respect
        tl.call(() => {
          sceneEngine.smolderCainOffering();
        }, null, 0);
        break;

      case 74: // "Cain rose up against Abel..." Murder
        tl.call(() => {
          sceneEngine.cain.lookAt(sceneEngine.abel.position.x, sceneEngine.cain.position.y, sceneEngine.abel.position.z);
          gsap.to(sceneEngine.cainArmR.rotation, { x: -Math.PI / 1.1, duration: 0.7 });
        }, null, 0.5);

        // Strike down
        tl.call(() => {
          gsap.to(sceneEngine.cainArmR.rotation, { x: -Math.PI / 3.0, duration: 0.2, ease: 'power2.in' });
          if (veilEl) {
            veilEl.style.transition = 'background 0.05s ease';
            veilEl.style.background = '#4a0808';
          }
          gsap.to(sceneEngine.abel.rotation, { x: Math.PI / 2, duration: 0.5 });
          gsap.to(sceneEngine.abel.position, { y: sceneEngine.getTerrainHeight(0.6, -12.0) + 0.1, duration: 0.5 });
        }, null, 1.3);

        tl.call(() => {
          if (veilEl) {
            veilEl.style.transition = 'background 2.5s ease';
            veilEl.style.background = 'rgba(0,0,0,0)';
          }
          gsap.to(sceneEngine.cainArmR.rotation, { x: 0, duration: 0.8 });
        }, null, 1.4);
        break;

      case 80: // Cain falls to knees
        tl.call(() => {
          gsap.to(sceneEngine.cain.position, { y: sceneEngine.getTerrainHeight(-0.6, -12.0) - 0.45, duration: 1.0 });
        }, null, 0);
        break;

      case 82: // Set Mark on Cain
        tl.call(() => {
          gsap.to(sceneEngine.cainMark.material, { opacity: 0.9, duration: 1.5 });
        }, null, 0);
        break;

      case 83: // Wander away NOD
        tl.call(() => {
          gsap.to(sceneEngine.cain.position, { y: sceneEngine.getTerrainHeight(-0.6, -12.0), duration: 0.8 });
          sceneEngine.cain.lookAt(20, sceneEngine.cain.position.y, -30);
        }, null, 0);

        tl.call(() => {
          const walkAwayInterval = setInterval(() => {
            if (window.sceneEngine && window.sceneEngine.cain) {
              const swing = Math.sin(performance.now() * 0.01) * 0.45;
              sceneEngine.cain.children[5].rotation.x = swing;
              sceneEngine.cain.children[6].rotation.x = -swing;
            } else {
              clearInterval(walkAwayInterval);
            }
          }, 30);

          gsap.to(sceneEngine.cain.position, {
            x: 20, z: -30, duration: 6.0,
            onUpdate: () => { sceneEngine.cain.position.y = sceneEngine.getTerrainHeight(sceneEngine.cain.position.x, sceneEngine.cain.position.z); },
            onComplete: () => { clearInterval(walkAwayInterval); }
          });

          if (veilEl) {
            veilEl.style.transition = 'background 5.0s ease';
            veilEl.style.background = '#000000';
          }
        }, null, 0.9);
        break;

      case 84: // Seth Transition
        tl.call(() => {
          sceneEngine.cain.visible = false;
          sceneEngine.abel.visible = false;
          sceneEngine.seth.visible = true;

          sceneEngine.adam.position.set(-14.5, sceneEngine.getTerrainHeight(-14.5, 10.0), 10.0);
          sceneEngine.adam.lookAt(-15.0, sceneEngine.adam.position.y, 11.5);
          sceneEngine.eve.position.set(-15.5, sceneEngine.getTerrainHeight(-15.5, 10.0), 10.0);
          sceneEngine.eve.lookAt(-15.0, sceneEngine.eve.position.y, 11.5);

          if (camPos) {
            camPos.set(-11, 2.5, 14);
            sceneEngine.camera.lookAt(-15.0, 1.3, 11.5);
          }

          if (veilEl) {
            veilEl.style.transition = 'background 1.5s ease';
            veilEl.style.background = 'rgba(0,0,0,0)';
          }
        }, null, 0);
        break;

      case 86: // Wickedness of man
        tl.call(() => {
          sceneEngine.adam.visible = false;
          sceneEngine.eve.visible = false;
          sceneEngine.seth.visible = false;
          sceneEngine.shelterGroup.visible = false;
          sceneEngine.wickedPeople.visible = true;

          if (camPos) {
            camPos.set(-5.0, 2.0, -6.5);
            sceneEngine.camera.lookAt(-5.0, 1.3, -11.0);
          }

          if (veilEl) {
            veilEl.style.transition = 'background 1.5s ease';
            veilEl.style.background = 'rgba(0,0,0,0)';
          }
        }, null, 0);

        tl.call(() => {
          if (camPos) {
            gsap.to(camPos, {
              x: -3.0, duration: 5.0,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(-4.5, 1.3, -11.0); }
            });
          }
        }, null, 1.5);
        break;

      case 89: // Fade to black for Noah grace
        tl.call(() => {
          if (veilEl) {
            veilEl.style.transition = 'background 3.5s ease';
            veilEl.style.background = '#000000';
          }
        }, null, 0);
        break;
    }
  }

  // ==========================================
  // NOAH ANIMATIONS
  // ==========================================
  else if (scene.chapterId === 'noah') {
    switch (scene.id) {
      case 91: // Init Command
        tl.call(() => {
          if (veilEl) {
            veilEl.style.transition = 'background 1.5s ease';
            veilEl.style.background = 'rgba(0,0,0,0)';
          }
          if (camPos) {
            camPos.set(-5, 4.2, 17);
            sceneEngine.camera.lookAt(0, 1.3, 0);
          }
          sceneEngine.arkPreBuilt.visible = true;
          sceneEngine.arkPostBuilt.visible = false;
          sceneEngine.noah.visible = true;
          sceneEngine.noah.position.set(-1.0, sceneEngine.getTerrainHeight(-1.0, 6.0), 6.0);
        }, null, 0);
        break;

      case 93: // Ark Building Complete
        tl.call(() => {
          // Camera zooms around Ark
          if (camPos) {
            gsap.to(camPos, {
              x: 10, y: 7.2, z: 12, duration: 6.0,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 2.5, 0); }
            });
          }
          sceneEngine.arkPreBuilt.visible = false;
          sceneEngine.arkPostBuilt.visible = true;
        }, null, 0);
        break;

      case 97: // Flood Rain starts
        tl.call(() => {
          sceneEngine.movementEnabled = false;
          sceneEngine.animateRain();
        }, null, 0);
        break;

      case 99: // Flood Rise
        tl.call(() => {
          sceneEngine.animateFloodRise();
        }, null, 0);
        break;

      case 101: // God remembered Noah
        tl.call(() => {
          sceneEngine.stopRain();
        }, null, 0);
        break;

      case 103: // Mount Ararat mountain transition
        tl.call(() => {
          sceneEngine.animateArarat();
        }, null, 0);
        break;

      case 104: // Dove released
        tl.call(() => {
          sceneEngine.animateDove();
        }, null, 0);
        break;

      case 108: // Rainbow Covenant
        tl.call(() => {
          sceneEngine.animateRainbow();
        }, null, 0);
        break;
    }
  }

  // ==========================================
  // BABEL ANIMATIONS
  // ==========================================
  else if (scene.chapterId === 'babel') {
    switch (scene.id) {
      case 110: // Shinar plain view
        tl.call(() => {
          if (veilEl) {
            veilEl.style.transition = 'background 1.5s ease';
            veilEl.style.background = 'rgba(0,0,0,0)';
          }
          if (camPos) {
            camPos.set(-18, 3.2, 18);
            sceneEngine.camera.lookAt(0.0, 1.0, 0.0);
          }
        }, null, 0);
        break;

      case 112: // Construction time lapse starts
        tl.call(() => {
          if (camPos) {
            gsap.to(camPos, {
              x: -12.0, y: 8.5, z: 12.0, duration: 7.5,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 3.0, 0); }
            });
          }
          sceneEngine.growTowerTier(0);
        }, null, 0);

        tl.call(() => {
          sceneEngine.growTowerTier(1);
        }, null, 2.5);

        tl.call(() => {
          sceneEngine.growTowerTier(2);
        }, null, 5.0);
        break;

      case 114: // Divine Intervention
        tl.call(() => {
          if (camPos) {
            gsap.to(camPos, {
              x: 0.1, y: 16.0, z: 5.5, duration: 4.5,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 11.5, 0); }
            });
          }
          sceneEngine.growTowerTier(3);
          
          if (veilEl) {
            veilEl.style.transition = 'background 0.15s ease';
            veilEl.style.background = '#e6f0ff';
            setTimeout(() => {
              veilEl.style.transition = 'background 4.0s ease';
              veilEl.style.background = 'rgba(0,0,0,0)';
            }, 150);
          }
        }, null, 0.5);
        break;

      case 115: // Language confusion starts
        tl.call(() => {
          if (camPos) {
            gsap.to(camPos, {
              x: -4.5, y: 2.2, z: 5.0, duration: 4.5,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(sceneEngine.builder.position); }
            });
          }
          sceneEngine.confoundLanguages();
        }, null, 0);
        break;

      case 120: // Fleeing and scattering
        tl.call(() => {
          sceneEngine.scatterWorkers();
          if (camPos) {
            gsap.to(camPos, {
              x: 0, y: 14.0, z: 22.0, duration: 4.5,
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 4.0, 0); }
            });
          }
        }, null, 0);
        break;
    }
  }

  // ==========================================
  // WORD HIGHLIGHT SUBTITLE TIMELINES
  // ==========================================
  const words = scene.text ? scene.text.split(/\s+/) : [];
  if (words.length > 0) {
    const wordDur = durationSec / words.length;
    words.forEach((word, idx) => {
      tl.call(() => {
        highlightWordInDOM(word, idx);
      }, null, idx * wordDur);
    });
  }

  return tl;
}

function showLabel(txt) {
  const dayLabelEl = document.getElementById('day-label');
  if (dayLabelEl) {
    dayLabelEl.textContent = txt;
    dayLabelEl.classList.add('show');
    setTimeout(() => {
      dayLabelEl.classList.remove('show');
    }, 2000);
  }
}

function highlightWordInDOM(word, index) {
  const narrationEl = document.getElementById('narration');
  const speechBubbleEl = document.getElementById('speech-bubble');
  
  // Decide which text element is currently active and highlight the index-th word
  const activeEl = (speechBubbleEl && speechBubbleEl.style.display === 'block') ? speechBubbleEl : narrationEl;
  if (!activeEl) return;

  // Preserve the speaker prefix "Nimrod: " or "God: " if present
  let html = activeEl.innerHTML;
  let speakerPrefix = '';
  
  if (activeEl === speechBubbleEl) {
    const idx = html.indexOf('<br>');
    if (idx !== -1) {
      speakerPrefix = html.substring(0, idx + 4);
      html = html.substring(idx + 4);
    }
  }

  // Strip existing span tags
  const rawText = html.replace(/<span class="highlight">([^<]+)<\/span>/g, '$1');
  const words = rawText.split(/\s+/);
  
  if (index >= 0 && index < words.length) {
    words[index] = `<span class="highlight">${words[index]}</span>`;
    activeEl.innerHTML = speakerPrefix + words.join(' ');
  }
}
