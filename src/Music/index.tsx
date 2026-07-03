import React, { useCallback, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { setAudioModeAsync, useAudioPlayer } from "expo-audio";
import type { AudioPlayer } from "expo-audio";
import type { MusicContextValue } from "./types";

const backgroundMusic = require("./background-music.mp4");
const soundEffect1 = require("./sound-effect-1.mp4");
const soundEffect2 = require("./sound-effect-2.mp4");
const soundEffect3 = require("./sound-effect-3.mp4");

export const MusicContext = React.createContext<MusicContextValue>({
  musicEnabled: false,
  setMusicEnabled: () => {},
  soundEffectsEnabled: false,
  setSoundEffectsEnabled: () => {},
  playSoundEffect1: () => {},
  playSoundEffect2: () => {},
  playSoundEffect3: () => {},
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);
  const { getItem: getAsyncMusicEnabled, setItem: setAsyncMusicEnabled } =
    useAsyncStorage("musicEnabled");
  const {
    getItem: getAsyncSoundEffectsEnabled,
    setItem: setAsyncSoundEffectsEnabled,
  } = useAsyncStorage("soundEffectsEnabled");

  const music = useAudioPlayer(backgroundMusic);
  const effect1 = useAudioPlayer(soundEffect1);
  const effect2 = useAudioPlayer(soundEffect2);
  const effect3 = useAudioPlayer(soundEffect3);

  useEffect(() => {
    // Game audio is nonprimary, so use the ambient category (Apple's guidance
    // for games): respect the ring/silent switch and mix with other apps'
    // audio instead of stopping it. No-op on web.
    setAudioModeAsync({
      playsInSilentMode: false,
      interruptionMode: "mixWithOthers",
    });
  }, []);

  // Hydrate the persisted settings once on mount. Audio is opt-in: both
  // stay muted unless the player has explicitly turned them on before.
  // Playback waits for `hydrated` so a toggle can't flicker mid-launch.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    Promise.all([getAsyncMusicEnabled(), getAsyncSoundEffectsEnabled()]).then(
      ([storedMusic, storedSoundEffects]) => {
        if (storedMusic === "true") {
          setMusicEnabled(true);
        }
        if (storedSoundEffects === "true") {
          setSoundEffectsEnabled(true);
        }
        setHydrated(true);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    music.loop = true;
    music.volume = 0.2;
  }, [music]);

  // Browsers block audio until the page is interacted with, so on web hold
  // off playing until the first interaction (which may well be the music
  // toggle itself)
  const [audioUnlocked, setAudioUnlocked] = useState(Platform.OS !== "web");
  useEffect(() => {
    if (audioUnlocked) {
      return;
    }
    const unlock = () => setAudioUnlocked(true);
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, [audioUnlocked]);

  useEffect(() => {
    if (hydrated && musicEnabled && audioUnlocked) {
      music.play();
    } else {
      music.pause();
    }
  }, [hydrated, musicEnabled, audioUnlocked, music]);

  const handleSetMusicEnabled = useCallback(
    (enabled: boolean) => {
      setMusicEnabled(enabled);
      setAsyncMusicEnabled(String(enabled));
    },
    [setAsyncMusicEnabled]
  );

  const handleSetSoundEffectsEnabled = useCallback(
    (enabled: boolean) => {
      setSoundEffectsEnabled(enabled);
      setAsyncSoundEffectsEnabled(String(enabled));
      if (enabled) {
        // Audible confirmation that sound effects are back on
        effect1.seekTo(0);
        effect1.play();
      }
    },
    [setAsyncSoundEffectsEnabled, effect1]
  );

  const playEffect = (player: AudioPlayer) => () => {
    if (!soundEffectsEnabled) {
      return;
    }
    // seekTo is async: after a clip finishes the player sits at the end, and a
    // play() issued before the rewind lands is silently swallowed. Wait for
    // the seek so back-to-back triggers play every time.
    player.seekTo(0).then(() => player.play());
  };

  return (
    <MusicContext.Provider
      value={{
        musicEnabled,
        setMusicEnabled: handleSetMusicEnabled,
        soundEffectsEnabled,
        setSoundEffectsEnabled: handleSetSoundEffectsEnabled,
        playSoundEffect1: playEffect(effect1),
        playSoundEffect2: playEffect(effect2),
        playSoundEffect3: playEffect(effect3),
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
