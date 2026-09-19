import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);

export { Draggable, gsap, ScrollTrigger, useGSAP };
