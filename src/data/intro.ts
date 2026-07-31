/**
 * Configuration for the futuristic entry / gateway experience (PresentationIntro).
 * Kept separate from components so tone, timing and behaviour can be tuned
 * without touching animation code.
 */
export interface IntroConfig {
  title: string;
  supportingText: string;
  summitLine: string;
  activationLabel: string;
  hoverLabel: string;
  /** Total entry reveal duration in ms (used to schedule the hand-off to Slide 01). */
  animationDuration: number;
  /** Audio is DISABLED by default and only ever starts after a user gesture. */
  audioEnabled: boolean;
  requestFullscreen: boolean;
  showSkipIntro: boolean;
  /** 0..1 — scales density/opacity of the network background. */
  backgroundIntensity: number;
  /**
   * Whether the ILS logo asset is the official brand icon (true) or a
   * temporary placeholder symbol that must be replaced (false).
   */
  logoIsOfficial: boolean;
  logoSrc: string;
}

export const introConfig: IntroConfig = {
  title: 'ENTER THE ILS NETWORK',
  supportingText: 'International Logistic Services · Dubai, since 2002',
  summitLine: 'Freight Forwarders Summit · 2026',
  activationLabel: 'CLICK TO BEGIN',
  hoverLabel: 'INITIALIZE PRESENTATION',
  animationDuration: 2600,
  audioEnabled: false,
  requestFullscreen: true,
  showSkipIntro: true,
  backgroundIntensity: 0.85,
  logoIsOfficial: true,
  logoSrc: '/logo/ils-icon-white.png',
};
