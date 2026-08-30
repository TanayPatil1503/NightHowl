// Audio system - stores placeholder for audio files
// In production, replace these with actual audio files

export const AUDIO_ASSETS = {
  // Background music
  bgm_twilight: 'audio/bgm_twilight.mp3',
  bgm_midnight: 'audio/bgm_midnight.mp3',
  bgm_deep_night: 'audio/bgm_deep_night.mp3',
  bgm_blood_moon: 'audio/bgm_blood_moon.mp3',
  bgm_final_hunt: 'audio/bgm_final_hunt.mp3',
  bgm_menu: 'audio/bgm_menu.mp3',

  // Gameplay sounds
  sfx_howl: 'audio/sfx_howl.mp3',
  sfx_dash: 'audio/sfx_dash.mp3',
  sfx_footstep: 'audio/sfx_footstep.mp3',
  sfx_enemy_attack: 'audio/sfx_enemy_attack.mp3',
  sfx_enemy_defeat: 'audio/sfx_enemy_defeat.mp3',
  sfx_collect_bone: 'audio/sfx_collect_bone.mp3',
  sfx_collect_crystal: 'audio/sfx_collect_crystal.mp3',
  sfx_ui_click: 'audio/sfx_ui_click.mp3',
  sfx_game_over: 'audio/sfx_game_over.mp3',
  sfx_victory: 'audio/sfx_victory.mp3',
  sfx_combo: 'audio/sfx_combo.mp3',
  sfx_stun: 'audio/sfx_stun.mp3',
  
  // Ambient
  ambient_forest: 'audio/ambient_forest.mp3',
  ambient_wind: 'audio/ambient_wind.mp3',
};

class AudioManager {
  constructor() {
    this.enabled = true;
    this.masterVolume = 0.7;
    this.musicVolume = 0.5;
    this.sfxVolume = 0.7;
    this.audioContexts = new Map();
    this.currentBGM = null;
  }

  playSound(audioKey, volume = 1) {
    if (!this.enabled) return;

    // In a real implementation, create and play an audio element
    const totalVolume = this.sfxVolume * this.masterVolume * volume;
    console.log(`Playing: ${audioKey} at volume ${totalVolume}`);
    
    // Placeholder: actual implementation would use Web Audio API or HTMLAudioElement
  }

  playBGM(audioKey, volume = 1, loop = true) {
    if (!this.enabled) return;

    const totalVolume = this.musicVolume * this.masterVolume * volume;
    console.log(`Playing BGM: ${audioKey} at volume ${totalVolume}`);
    this.currentBGM = audioKey;
    
    // Placeholder: actual implementation would use Web Audio API or HTMLAudioElement
  }

  stopBGM() {
    if (this.currentBGM) {
      console.log(`Stopping BGM: ${this.currentBGM}`);
      this.currentBGM = null;
    }
  }

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }
}

export const audioManager = new AudioManager();
