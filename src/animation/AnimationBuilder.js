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
          if (sceneEngine.eve) {
            sceneEngine.eve.position.set(1.2, sceneEngine.getTerrainHeight(1.2, 1.4), 1.4);
            sceneEngine.eve.lookAt(0, sceneEngine.eve.position.y, 0);
          }
          if (sceneEngine.adam) {
            sceneEngine.adam.position.set(-1.2, sceneEngine.getTerrainHeight(-1.2, 1.4), 1.4);
            sceneEngine.adam.lookAt(0, sceneEngine.adam.position.y, 0);
          }
          
          if (camPos) {
            gsap.to(camPos, {
              x: 0, y: 2.2, z: 6.8, duration: 3.5, ease: 'power2.inOut',
              onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 1.6, 0.5); }
            });
          }
        }, null, 0);
        break;

      case 34: // Serpent speaks: "Yea, hath God said..."
        tl.call(() => {
          if (sceneEngine.eve) sceneEngine.eve.lookAt(0, sceneEngine.eve.position.y, 0);
          if (sceneEngine.adam) sceneEngine.adam.lookAt(0, sceneEngine.adam.position.y, 0);
        }, null, 0);
        break;

      case 35: // Eve speaks: "We may eat of the fruit..."
        tl.call(() => {
          if (sceneEngine.eveCharacter) {
            sceneEngine.eveCharacter.playAnimation('talking');
          }
          if (sceneEngine.eve) sceneEngine.eve.lookAt(0, sceneEngine.eve.position.y, 0);
        }, null, 0);
        break;

      case 36: // Serpent speaks: "Ye shall not surely die..."
        tl.call(() => {
          if (sceneEngine.eveCharacter) {
            sceneEngine.eveCharacter.playAnimation('idle');
          }
        }, null, 0);
        break;

      case 37: // "And when the woman saw..." Eve reaching
        tl.call(() => {
          if (sceneEngine.eveArmR && sceneEngine.eveArmR.rotation) {
            gsap.to(sceneEngine.eveArmR.rotation, { x: -Math.PI / 2.2, duration: 1.2 });
          }
          const fruit = sceneEngine.forbiddenFruits ? sceneEngine.forbiddenFruits.children[0] : null;
          if (fruit) {
            gsap.to(fruit.position, { x: 1.2, y: 0.95, z: 1.5, duration: 1.8, ease: 'bounce.out' });
          }
        }, null, 0);
        break;

      case 38: // "...she took of the fruit thereof, and did eat..."
        tl.call(() => {
          if (sceneEngine.eveArmR && sceneEngine.eveArmR.rotation) {
            gsap.to(sceneEngine.eveArmR.rotation, { x: -Math.PI / 1.5, duration: 0.8 });
          }
        }, null, 0);
        tl.call(() => {
          if (sceneEngine.eveArmR && sceneEngine.eveArmR.rotation) {
            gsap.to(sceneEngine.eveArmR.rotation, { x: 0, duration: 0.6 });
          }
        }, null, 0.9);

        // Eve walks to Adam
        tl.call(() => {
          if (sceneEngine.eveCharacter && sceneEngine.eveCharacter.playAnimation) {
            sceneEngine.eveCharacter.playAnimation('Walk');
          }
          if (sceneEngine.eve) {
            gsap.to(sceneEngine.eve.position, {
              x: -0.4, z: 1.4, duration: 2.0,
              onComplete: () => {
                if (sceneEngine.eveCharacter && sceneEngine.eveCharacter.playAnimation) {
                  sceneEngine.eveCharacter.playAnimation('Idle');
                }
              }
            });
            sceneEngine.eve.lookAt(-1.2, sceneEngine.eve.position.y, 1.4);
          }

          const fruit = sceneEngine.forbiddenFruits ? sceneEngine.forbiddenFruits.children[0] : null;
          if (fruit) {
            gsap.to(fruit.position, { x: -0.8, y: 0.95, z: 1.4, duration: 2.0 });
          }
        }, null, 1.5);
        break;

      case 40: // "...and gave also unto her husband..." Adam eating
        tl.call(() => {
          if (sceneEngine.adamArmR && sceneEngine.adamArmR.rotation) {
            gsap.to(sceneEngine.adamArmR.rotation, { x: -Math.PI / 2.2, duration: 1.0 });
          }
          const fruit = sceneEngine.forbiddenFruits ? sceneEngine.forbiddenFruits.children[0] : null;
          if (fruit) {
            gsap.to(fruit.position, { x: -1.2, y: 0.95, z: 1.4, duration: 0.8 });
          }
        }, null, 0);

        tl.call(() => {
          if (sceneEngine.adamArmR && sceneEngine.adamArmR.rotation) {
            gsap.to(sceneEngine.adamArmR.rotation, { x: -Math.PI / 1.5, duration: 0.8 });
          }
          const fruit = sceneEngine.forbiddenFruits ? sceneEngine.forbiddenFruits.children[0] : null;
          if (fruit) {
            gsap.to(fruit.position, { x: -1.2, y: 1.6, z: 1.3, duration: 0.6 });
            gsap.to(fruit.scale, { x: 0, y: 0, z: 0, duration: 0.6, delay: 0.2 });
          }
        }, null, 1.1);

        tl.call(() => {
          if (sceneEngine.adamArmR && sceneEngine.adamArmR.rotation) {
            gsap.to(sceneEngine.adamArmR.rotation, { x: 0, duration: 0.8 });
          }
          if (sceneEngine.eveArmR && sceneEngine.eveArmR.rotation) {
            gsap.to(sceneEngine.eveArmR.rotation, { x: 0, duration: 0.8 });
          }
          if (sceneEngine.triggerTheFall) {
            sceneEngine.triggerTheFall();
          }
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

      case 43: // "...and Adam and his wife hid themselves..."
        tl.call(() => {
          if (sceneEngine.animateHiding) {
            sceneEngine.animateHiding();
          }
        }, null, 0);
        break;

      case 44: // "Where art thou?"
        tl.call(() => {
          if (sceneEngine.animateGodCalling) {
            sceneEngine.animateGodCalling();
          }
        }, null, 0);
        break;

      case 53: // "...expulsion... Therefore the LORD God sent him forth..."
      case 54: // "...placed Cherubims and a flaming sword..."
        tl.call(() => {
          if (sceneEngine.animateExpulsion) {
            sceneEngine.animateExpulsion();
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
    const text = (scene.text || '').toLowerCase();
    const id = scene.id;

    if (id === 55 || text.includes('bare cain')) { // Intro birth
      tl.call(() => {
        if (camPos) {
          camPos.set(-11, 2.5, 14);
          sceneEngine.camera.lookAt(-15.0, 1.3, 11.5);
        }
        // Show infants, hide grown Cain/Abel
        if (sceneEngine.crib) sceneEngine.crib.visible = true;
        if (sceneEngine.cain) sceneEngine.cain.visible = false;
        if (sceneEngine.abel) sceneEngine.abel.visible = false;
      }, null, 0);
    }
    else if (id === 58 || text.includes('keeper of sheep')) { // Grown up
      tl.call(() => {
        if (camPos) {
          gsap.to(camPos, {
            x: -3, y: 3.0, z: 6, duration: 4.5,
            onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 1.0, 0); }
          });
        }
        if (sceneEngine.crib) sceneEngine.crib.visible = false;
        if (sceneEngine.cain) sceneEngine.cain.visible = true;
        if (sceneEngine.abel) sceneEngine.abel.visible = true;

        // Set positions
        if (sceneEngine.cain) {
          sceneEngine.cain.position.set(-12, sceneEngine.getTerrainHeight(-12, -2), -2);
          sceneEngine.cain.lookAt(-2.8, sceneEngine.cain.position.y, 0.0);
        }
        if (sceneEngine.abel) {
          sceneEngine.abel.position.set(14, sceneEngine.getTerrainHeight(14, 6), 6);
          sceneEngine.abel.lookAt(2.8, sceneEngine.abel.position.y, 0.0);
        }
      }, null, 0);
    }
    else if (id === 62 || text.includes('respect unto abel')) { // Respect to Abel
      tl.call(() => {
        sceneEngine.movementEnabled = false;
        if (sceneEngine.cain) sceneEngine.cain.lookAt(-2.8, sceneEngine.cain.position.y, 0.0);
        if (sceneEngine.abel) sceneEngine.abel.lookAt(2.8, sceneEngine.abel.position.y, 0.0);
        
        if (sceneEngine.cainCharacter && sceneEngine.cainCharacter.playAnimation) {
          sceneEngine.cainCharacter.playAnimation('pray', { force: true });
        }
        if (sceneEngine.abelCharacter && sceneEngine.abelCharacter.playAnimation) {
          sceneEngine.abelCharacter.playAnimation('pray', { force: true });
        }

        if (camPos) {
          gsap.to(camPos, {
            x: 0, y: 2.2, z: 5.5, duration: 3.5,
            onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 1.1, 0); }
          });
        }

        // Move offerings to altar safely
        if (sceneEngine.cainOffering && sceneEngine.cainOffering.position) {
          gsap.to(sceneEngine.cainOffering.position, { x: -0.7, y: 1.05, z: 0.0, duration: 1.5 });
        }
        if (sceneEngine.abelOffering && sceneEngine.abelOffering.position) {
          gsap.to(sceneEngine.abelOffering.position, { x: 0.7, y: 1.05, z: 0.0, duration: 1.5 });
        }
      }, null, 0);

      tl.call(() => {
        if (typeof sceneEngine.igniteAbelOffering === 'function') {
          sceneEngine.igniteAbelOffering();
        }
      }, null, 1.8);
    }
    else if (id === 63 || text.includes('unto cain and to his offering he had not respect')) { // But Cain offering no respect
      tl.call(() => {
        if (typeof sceneEngine.smolderCainOffering === 'function') {
          sceneEngine.smolderCainOffering();
        }
        if (sceneEngine.cainCharacter && sceneEngine.cainCharacter.playAnimation) {
          sceneEngine.cainCharacter.playAnimation('angry', { force: true });
        }
      }, null, 0);
    }
    else if (id === 68 || text.includes('slew him') || text.includes('rose up against abel')) { // Murder
      tl.call(() => {
        if (sceneEngine.cain && sceneEngine.abel) {
          sceneEngine.cain.lookAt(sceneEngine.abel.position.x, sceneEngine.cain.position.y, sceneEngine.abel.position.z);
        }
        if (sceneEngine.cainCharacter && sceneEngine.cainCharacter.playAnimation) {
          sceneEngine.cainCharacter.playAnimation('hook_punch', { loop: false, force: true });
        } else if (sceneEngine.cainArmR && sceneEngine.cainArmR.rotation) {
          gsap.to(sceneEngine.cainArmR.rotation, { x: -Math.PI / 1.1, duration: 0.7 });
        }
      }, null, 0.5);

      // Strike down
      tl.call(() => {
        if (sceneEngine.abelCharacter && sceneEngine.abelCharacter.playAnimation) {
          sceneEngine.abelCharacter.playAnimation('dying', { loop: false, clampWhenFinished: true, force: true });
        } else if (sceneEngine.abel) {
          gsap.to(sceneEngine.abel.rotation, { x: Math.PI / 2, duration: 0.5 });
          gsap.to(sceneEngine.abel.position, { y: sceneEngine.getTerrainHeight(0.6, -12.0) + 0.1, duration: 0.5 });
        }

        if (veilEl) {
          veilEl.style.transition = 'background 0.05s ease';
          veilEl.style.background = '#4a0808';
        }
      }, null, 1.3);

      tl.call(() => {
        if (veilEl) {
          veilEl.style.transition = 'background 2.5s ease';
          veilEl.style.background = 'rgba(0,0,0,0)';
        }
      }, null, 1.4);
    }
    else if (id === 74 || text.includes('greater than i can bear')) { // Cain falls to knees / confronted
      tl.call(() => {
        if (sceneEngine.cainCharacter && sceneEngine.cainCharacter.playAnimation) {
          sceneEngine.cainCharacter.playAnimation('male_laying', { loop: false, clampWhenFinished: true, force: true });
        } else if (sceneEngine.cain) {
          gsap.to(sceneEngine.cain.position, { y: sceneEngine.getTerrainHeight(-0.6, -12.0) - 0.45, duration: 1.0 });
        }
      }, null, 0);
    }
    else if (id === 76 || text.includes('mark upon cain')) { // Set Mark on Cain
      tl.call(() => {
        if (sceneEngine.cainMark && sceneEngine.cainMark.material) {
          gsap.to(sceneEngine.cainMark.material, { opacity: 0.9, duration: 1.5 });
        }
      }, null, 0);
    }
    else if (id === 77 || text.includes('land of nod')) { // Wander away NOD
      tl.call(() => {
        if (sceneEngine.cain) sceneEngine.cain.lookAt(20, sceneEngine.cain.position.y, -30);
        if (sceneEngine.cainCharacter && sceneEngine.cainCharacter.playAnimation) {
          sceneEngine.cainCharacter.playAnimation('walk', { force: true });
        }
      }, null, 0);

      tl.call(() => {
        if (sceneEngine.cain) {
          gsap.to(sceneEngine.cain.position, {
            x: 20, z: -30, duration: 6.0,
            onUpdate: () => { sceneEngine.cain.position.y = sceneEngine.getTerrainHeight(sceneEngine.cain.position.x, sceneEngine.cain.position.z); },
            onComplete: () => {
              if (sceneEngine.cainCharacter && sceneEngine.cainCharacter.playAnimation) {
                sceneEngine.cainCharacter.playAnimation('idle', { force: true });
              }
            }
          });
        }

        if (veilEl) {
          veilEl.style.transition = 'background 5.0s ease';
          veilEl.style.background = '#000000';
        }
      }, null, 0.9);
    }
    else if (id === 78 || text.includes('called his name seth')) { // Seth Transition
      tl.call(() => {
        if (sceneEngine.cain) sceneEngine.cain.visible = false;
        if (sceneEngine.abel) sceneEngine.abel.visible = false;
        if (sceneEngine.seth) sceneEngine.seth.visible = true;

        if (sceneEngine.adam) {
          sceneEngine.adam.position.set(-14.5, sceneEngine.getTerrainHeight(-14.5, 10.0), 10.0);
          sceneEngine.adam.lookAt(-15.0, sceneEngine.adam.position.y, 11.5);
        }
        if (sceneEngine.eve) {
          sceneEngine.eve.position.set(-15.5, sceneEngine.getTerrainHeight(-15.5, 10.0), 10.0);
          sceneEngine.eve.lookAt(-15.0, sceneEngine.eve.position.y, 11.5);
        }

        if (camPos) {
          camPos.set(-11, 2.5, 14);
          sceneEngine.camera.lookAt(-15.0, 1.3, 11.5);
        }

        if (veilEl) {
          veilEl.style.transition = 'background 1.5s ease';
          veilEl.style.background = 'rgba(0,0,0,0)';
        }
      }, null, 0);
    }
    else if (id === 81 || text.includes('wickedness of man was great')) { // Wickedness of man
      tl.call(() => {
        if (sceneEngine.adam) sceneEngine.adam.visible = false;
        if (sceneEngine.eve) sceneEngine.eve.visible = false;
        if (sceneEngine.seth) sceneEngine.seth.visible = false;
        if (sceneEngine.shelterGroup) sceneEngine.shelterGroup.visible = false;
        if (sceneEngine.wickedPeople) sceneEngine.wickedPeople.visible = true;

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
    }
    else if (id === 84 || text.includes('noah found grace')) { // Fade to black for Noah grace
      tl.call(() => {
        if (veilEl) {
          veilEl.style.transition = 'background 3.5s ease';
          veilEl.style.background = '#000000';
        }
      }, null, 0);
    }
  }

  // ==========================================
  // NOAH ANIMATIONS
  // ==========================================
  else if (scene.chapterId === 'noah') {
    const text = (scene.text || '').toLowerCase();
    const id = scene.id;

    if (id === 85 || text.includes('end of all flesh')) { // Init Command
      tl.call(() => {
        if (veilEl) {
          veilEl.style.transition = 'background 1.5s ease';
          veilEl.style.background = 'rgba(0,0,0,0)';
        }
        if (camPos) {
          camPos.set(-5, 4.2, 17);
          sceneEngine.camera.lookAt(0, 1.3, 0);
        }
        if (sceneEngine.arkPreBuilt) sceneEngine.arkPreBuilt.visible = true;
        if (sceneEngine.arkPostBuilt) sceneEngine.arkPostBuilt.visible = false;
        if (sceneEngine.noah) {
          sceneEngine.noah.visible = true;
          sceneEngine.noah.position.set(-1.0, sceneEngine.getTerrainHeight(-1.0, 6.0), 6.0);
        }
      }, null, 0);
    }
    else if (id === 87 || id === 88 || text.includes('thus did noah')) { // Ark Building Complete
      tl.call(() => {
        if (camPos) {
          gsap.to(camPos, {
            x: 10, y: 7.2, z: 12, duration: 6.0,
            onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 2.5, 0); }
          });
        }
        if (sceneEngine.arkPreBuilt) sceneEngine.arkPreBuilt.visible = false;
        if (sceneEngine.arkPostBuilt) sceneEngine.arkPostBuilt.visible = true;
      }, null, 0);
    }
    else if (id === 93 || text.includes('fountains of the great deep')) { // Flood Rain starts
      tl.call(() => {
        sceneEngine.movementEnabled = false;
        if (typeof sceneEngine.animateRain === 'function') sceneEngine.animateRain();
      }, null, 0);
    }
    else if (id === 95 || text.includes('flood was forty days')) { // Flood Rise
      tl.call(() => {
        if (typeof sceneEngine.animateFloodRise === 'function') sceneEngine.animateFloodRise();
      }, null, 0);
    }
    else if (id === 97 || text.includes('god remembered noah')) { // God remembered Noah
      tl.call(() => {
        if (typeof sceneEngine.stopRain === 'function') sceneEngine.stopRain();
      }, null, 0);
    }
    else if (id === 99 || text.includes('mountains of ararat')) { // Mount Ararat mountain transition
      tl.call(() => {
        if (typeof sceneEngine.animateArarat === 'function') sceneEngine.animateArarat();
      }, null, 0);
    }
    else if (id === 100 || text.includes('sent forth a dove')) { // Dove released
      tl.call(() => {
        if (typeof sceneEngine.animateDove === 'function') sceneEngine.animateDove();
      }, null, 0);
    }
    else if (id === 104 || text.includes('bow in the cloud')) { // Rainbow Covenant
      tl.call(() => {
        if (typeof sceneEngine.animateRainbow === 'function') sceneEngine.animateRainbow();
      }, null, 0);
    }
  }

  // ==========================================
  // BABEL ANIMATIONS
  // ==========================================
  else if (scene.chapterId === 'babel') {
    const text = (scene.text || '').toLowerCase();
    const id = scene.id;

    if (id === 106 || text.includes('whole earth was of one language')) { // Shinar plain view
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
    }
    else if (id === 107 || text.includes('let us build us a city')) { // Construction time lapse starts
      tl.call(() => {
        if (camPos) {
          gsap.to(camPos, {
            x: -12.0, y: 8.5, z: 12.0, duration: 7.5,
            onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 3.0, 0); }
          });
        }
        if (typeof sceneEngine.growTowerTier === 'function') sceneEngine.growTowerTier(0);
      }, null, 0);

      tl.call(() => {
        if (typeof sceneEngine.growTowerTier === 'function') sceneEngine.growTowerTier(1);
      }, null, 2.5);

      tl.call(() => {
        if (typeof sceneEngine.growTowerTier === 'function') sceneEngine.growTowerTier(2);
      }, null, 5.0);
    }
    else if (id === 110 || text.includes('lord came down to see')) { // Divine Intervention
      tl.call(() => {
        if (camPos) {
          gsap.to(camPos, {
            x: 0.1, y: 16.0, z: 5.5, duration: 4.5,
            onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 11.5, 0); }
          });
        }
        if (typeof sceneEngine.growTowerTier === 'function') sceneEngine.growTowerTier(3);
        
        if (veilEl) {
          veilEl.style.transition = 'background 0.15s ease';
          veilEl.style.background = '#e6f0ff';
          setTimeout(() => {
            veilEl.style.transition = 'background 4.0s ease';
            veilEl.style.background = 'rgba(0,0,0,0)';
          }, 150);
        }
      }, null, 0.5);
    }
    else if (id === 112 || text.includes('δόξα') || text.includes('quid agis') || text.includes('baga bo pi do')) { // Language confusion starts
      tl.call(() => {
        if (camPos) {
          gsap.to(camPos, {
            x: -4.5, y: 2.2, z: 5.0, duration: 4.5,
            onUpdate: () => { if (sceneEngine.camera && sceneEngine.builder) sceneEngine.camera.lookAt(sceneEngine.builder.position); }
          });
        }
        if (typeof sceneEngine.confoundLanguages === 'function') sceneEngine.confoundLanguages();
      }, null, 0);
    }
    else if (id === 116 || text.includes('scattered them abroad')) { // Fleeing and scattering
      tl.call(() => {
        if (typeof sceneEngine.scatterWorkers === 'function') sceneEngine.scatterWorkers();
        if (camPos) {
          gsap.to(camPos, {
            x: 0, y: 14.0, z: 22.0, duration: 4.5,
            onUpdate: () => { if (sceneEngine.camera) sceneEngine.camera.lookAt(0, 4.0, 0); }
          });
        }
      }, null, 0);
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
