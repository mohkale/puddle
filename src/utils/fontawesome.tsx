import { IconDefinition } from '@fortawesome/fontawesome-common-types';

// taken from [[https://github.com/icons8/line-awesome/blob/master/svg/infinity-solid.svg][line-awesome]], the default fontawesome icon is too thick and
// the thin version is paid. I'm tempted to switch to line-awesome  for
// everything, but typescript support doesn't seem to be as advanced as
// fontawesome, so for now I'm just copying icon definitions and using
// the fontawesome interfaces.
export const faInfinity: IconDefinition = {
  "prefix": "fas",
  "iconName": "infinity",
  "icon": [
    32,
    32,
    [],
    "f0f9",
    "M 9 9 C 5.144531 9 2 12.144531 2 16 C 2 19.859375 5.140625 23 9 23 C 11.929688 23 13.71875 21.390625 15.09375 19.40625 C 14.683594 18.746094 14.339844 18.09375 14 17.46875 C 12.773438 19.496094 11.398438 21 9 21 C 6.242188 21 4 18.757813 4 16 C 4 13.226563 6.226563 11 9 11 C 10.617188 11 11.644531 11.578125 12.59375 12.5625 C 13.542969 13.546875 14.34375 14.96875 15.15625 16.46875 C 15.96875 17.96875 16.792969 19.546875 18 20.8125 C 19.207031 22.078125 20.871094 23 23 23 C 26.855469 23 30 19.855469 30 16 C 30 12.140625 26.859375 9 23 9 C 20.085938 9 18.285156 10.558594 16.90625 12.5 C 17.316406 13.148438 17.691406 13.785156 18.03125 14.40625 C 19.25 12.4375 20.609375 11 23 11 C 25.757813 11 28 13.242188 28 16 C 28 18.773438 25.773438 21 23 21 C 21.410156 21 20.410156 20.421875 19.46875 19.4375 C 18.527344 18.453125 17.722656 17.03125 16.90625 15.53125 C 16.089844 14.03125 15.25 12.453125 14.03125 11.1875 C 12.8125 9.921875 11.148438 9 9 9 Z"
  ]
}
