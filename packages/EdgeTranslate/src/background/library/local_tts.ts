import type { PronunciationSpeed } from "@edge_translate/translators";

/**
 * Local TTS service provider.
 */
export default class LocalTTS {
    private speaking: boolean;
    private synthesis: SpeechSynthesis;

    constructor() {
        this.speaking = false;
        this.synthesis = window.speechSynthesis;
    }

    /**
     * Speak given text.
     *
     * @param text text to pronounce
     * @param language language of text
     * @param speed "fast" or "slow"
     *
     * @returns is speaking succeeded?
     */
    speak(text: string, language: string, speed: PronunciationSpeed) {
        // Check if the language is supported.
        if (!this.synthesis.getVoices().find((voice) => voice.lang.startsWith(language))) {
            console.log(`No voice for language: "${language}"`);
            return false;
        }

        this.speaking = true;
        let utter = new SpeechSynthesisUtterance(text);
        utter.rate = speed === "fast" ? 1.0 : 0.6;

        // Set speaking to false when finished speaking.
        utter.onend = (() => (this.speaking = false)).bind(this);

        this.synthesis.speak(utter);
        return true;
    }

    /**
     * Pause speaking.
     */
    pause() {
        if (this.speaking) {
            this.synthesis.cancel();
            this.speaking = false;
        }
    }
}
