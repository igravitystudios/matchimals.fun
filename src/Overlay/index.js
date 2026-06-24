import React, { Fragment, useEffect, useId, useReducer } from "react";
import { StyleSheet, View } from "react-native";

// A dependency-free portal for native. RN has no createPortal for native, and
// its built-in Modal collapses its content frame on the New Architecture
// (Fabric), which breaks full-screen overlays. Instead we keep the mounted
// overlays in a tiny module-level store and render them in a single full-screen
// host at the app root. The store is deliberately OUTSIDE React state so that
// mounting/updating an overlay only re-renders the host- never the whole app
// (which previously caused an infinite render loop). Because the host lives
// below the app's providers, portaled content still sees PlayerProvider, Music,
// safe-area, etc.

let overlays = {};
const listeners = new Set();
const emit = () => listeners.forEach((notify) => notify());

const setOverlay = (id, node) => {
  overlays = { ...overlays, [id]: node };
  emit();
};

const removeOverlay = (id) => {
  const next = { ...overlays };
  delete next[id];
  overlays = next;
  emit();
};

const OverlayHost = () => {
  const [, force] = useReducer((n) => n + 1, 0);
  useEffect(() => {
    listeners.add(force);
    return () => {
      listeners.delete(force);
    };
  }, []);

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {Object.entries(overlays).map(([id, node]) => (
        <Fragment key={id}>{node}</Fragment>
      ))}
    </View>
  );
};

// Renders the host alongside the app. No React state here, so it never forces
// the app subtree to re-render.
export const OverlayProvider = ({ children }) => (
  <>
    {children}
    <OverlayHost />
  </>
);

// Renders nothing in place; mounts its children into the host instead. Children
// are refreshed on every render so their closures (and Animated values) stay
// current; this only re-renders the host, not this component's parent.
export const Portal = ({ children }) => {
  const id = useId();

  useEffect(() => {
    setOverlay(id, children);
  });

  useEffect(() => () => removeOverlay(id), [id]);

  return null;
};
