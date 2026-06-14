// Web Audio API Synthesized Audio Engine
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API not supported/blocked in this environment");
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem("pit_game_muted", muted ? "true" : "false");
  }

  getMuted() {
    return this.isMuted;
  }

  constructor() {
    this.isMuted = localStorage.getItem("pit_game_muted") === "true";
  }

  private playTone(
    freqs: number[],
    durations: number[],
    type: OscillatorType = "sine",
    gains: number[] = [0.1]
  ) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    // Resume context if suspended (common browser security constraint)
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    try {
      let time = this.ctx.currentTime;
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        o.type = type;
        o.frequency.setValueAtTime(freq, time);

        const currentGain = gains[idx] !== undefined ? gains[idx] : 0.1;
        const duration = durations[idx] !== undefined ? durations[idx] : 0.15;

        g.gain.setValueAtTime(currentGain, time);
        // Fade out
        g.gain.exponentialRampToValueAtTime(0.001, time + duration);

        o.connect(g);
        g.connect(this.ctx.destination);

        o.start(time);
        o.stop(time + duration);

        // Stagger next tone slightly
        time += duration * 0.7;
      });
    } catch (e) {
      console.error("Audio playback error caught:", e);
    }
  }

  playCorrect() {
    // Delightful retro chime chord
    this.playTone([523.25, 659.25, 783.99, 1046.50], [0.1, 0.1, 0.1, 0.25], "sine", [0.08, 0.08, 0.08, 0.15]);
  }

  playWrong() {
    // Sad falling buzz tone
    this.playTone([220.00, 180.00, 140.00], [0.15, 0.15, 0.25], "triangle", [0.15, 0.15, 0.2]);
  }

  playLevelUp() {
    // Big ascending celebratory synth arpeggio
    this.playTone(
      [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00],
      [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.1, 0.3],
      "square",
      [0.05, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06, 0.07, 0.08, 0.15]
    );
  }

  playAchievement() {
    // Radiant fanfare chirp
    this.playTone([587.33, 587.33, 587.33, 880.00, 1174.66], [0.1, 0.1, 0.1, 0.12, 0.3], "sawtooth", [0.06, 0.06, 0.06, 0.1, 0.15]);
  }

  playClick() {
    // Simple soft tick
    this.playTone([800.00], [0.05], "sine", [0.05]);
  }
}

export const audio = new AudioEngine();
