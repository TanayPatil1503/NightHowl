import { useEffect, useRef, useState } from 'react';

// Hook for managing keyboard input
export const useKeyboard = () => {
  const keys = useRef({});
  const [keyboardState, setKeyboardState] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!keys.current[e.key]) {
        keys.current[e.key] = true;
        // Trigger key press event
        setKeyboardState(prev => ({ ...prev, [e.key]: 'pressed' }));
      } else {
        keys.current[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
      setKeyboardState(prev => ({ ...prev, [e.key]: 'released' }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys.current;
};

// Hook for game loop
export const useGameLoop = (callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    let lastTime = Date.now();
    let frameId;

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      callback(deltaTime);
      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameId);
  }, [callback, enabled]);
};

// Hook for canvas rendering
export const useCanvas = (drawFunction) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    drawFunction(ctx, canvas);
  }, [drawFunction]);

  return canvasRef;
};

// Hook for touch controls on mobile
export const useTouch = () => {
  const touchState = useRef({
    leftJoystick: { x: 0, y: 0, active: false },
    rightButtons: { dash: false, howl: false },
  });

  useEffect(() => {
    const handleTouchStart = (e) => {
      const touches = e.touches;
      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const clientX = touch.clientX;
        const clientY = touch.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Left side - joystick
        if (clientX < windowWidth / 2) {
          touchState.current.leftJoystick.active = true;
          touchState.current.leftJoystick.x = clientX;
          touchState.current.leftJoystick.y = clientY;
        }
        // Right side - buttons
        else {
          if (clientY > windowHeight * 0.7) {
            touchState.current.rightButtons.dash = true;
          } else {
            touchState.current.rightButtons.howl = true;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      touchState.current.leftJoystick.active = false;
      touchState.current.rightButtons.dash = false;
      touchState.current.rightButtons.howl = false;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return touchState.current;
};
