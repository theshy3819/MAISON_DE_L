"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

/*
 * Two curves carry the whole site (see --ease-out / --ease-wipe in globals.css):
 *  - silk: expo-out settle used for text, fades and image zoom-outs
 *  - wipe: slow-in/slow-out for curtains, clip-path wipes and the intro doors
 */
CustomEase.create("silk", "0.16, 1, 0.3, 1");
CustomEase.create("wipe", "0.77, 0, 0.18, 1");

gsap.defaults({ ease: "silk", duration: 0.9 });

export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
