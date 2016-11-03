require("../sass/layout.sass");

console.log(process.env.NODE_ENV);

const bufferSize = 4096;

let audioCtx = new AudioContext();

audioCtx.suspend();

let whiteNoise = audioCtx.createScriptProcessor(bufferSize, 1, 1);
let brownNoise = audioCtx.createScriptProcessor(bufferSize, 1, 1);
let masterVolume = audioCtx.createGain();

masterVolume.gain.value = 0.3;

whiteNoise.onaudioprocess = (ev) => {
    let output = ev.outputBuffer.getChannelData(0);
    for(let i = 0; i < bufferSize; i++)
        output[i] = Math.random() * 2 - 1;
};

{
    let lastOut = 0.0;
    brownNoise.onaudioprocess = (ev) => {
        let input = ev.inputBuffer.getChannelData(0);
        let output = ev.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (lastOut + (0.02 * input[i])) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }
    };
}

whiteNoise.connect(brownNoise);

brownNoise.connect(masterVolume);

masterVolume.connect(audioCtx.destination);

document.addEventListener('mousedown', () => {
    audioCtx.resume();
});

document.addEventListener('mouseup', () => {
    audioCtx.suspend();
});