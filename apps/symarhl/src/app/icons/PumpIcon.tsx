import React from "react";
import { SvgIcon } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

class PumpIcon extends React.PureComponent<SvgIconProps> {
  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M 23.117188 2.777344 C 23.601562 2.777344 24 2.382812 24 1.894531 L 24 0.882812 C 24 0.398438 23.601562 0 23.117188 0 L 17.558594 0 C 17.070312 0 16.671875 0.398438 16.671875 0.882812 L 16.671875 1.894531 C 16.671875 2.382812 17.070312 2.777344 17.558594 2.777344 L 17.683594 2.777344 L 17.683594 5.050781 L 17.347656 5.050781 C 17.203125 4.753906 16.898438 4.546875 16.546875 4.546875 L 15.535156 4.546875 C 15.050781 4.546875 14.652344 4.945312 14.652344 5.429688 L 14.652344 5.558594 L 14.019531 5.558594 C 13.535156 5.558594 13.136719 5.953125 13.136719 6.441406 L 13.136719 6.949219 C 13.136719 7.433594 13.535156 7.832031 14.019531 7.832031 L 14.652344 7.832031 L 14.652344 8.589844 L 12.378906 8.589844 L 12.378906 7.957031 C 12.378906 7.191406 11.753906 6.570312 10.988281 6.570312 L 1.390625 6.570312 C 0.625 6.570312 0 7.191406 0 7.957031 L 0 16.042969 C 0 16.808594 0.625 17.429688 1.390625 17.429688 L 10.988281 17.429688 C 11.753906 17.429688 12.378906 16.808594 12.378906 16.042969 L 12.378906 15.410156 L 14.652344 15.410156 L 14.652344 16.167969 L 14.019531 16.167969 C 13.535156 16.167969 13.136719 16.566406 13.136719 17.050781 L 13.136719 17.558594 C 13.136719 18.046875 13.535156 18.441406 14.019531 18.441406 L 14.652344 18.441406 L 14.652344 18.570312 C 14.652344 19.054688 15.050781 19.453125 15.535156 19.453125 L 16.546875 19.453125 C 16.898438 19.453125 17.203125 19.246094 17.347656 18.949219 L 17.683594 18.949219 L 17.683594 21.222656 L 17.558594 21.222656 C 17.070312 21.222656 16.671875 21.617188 16.671875 22.105469 L 16.671875 23.117188 C 16.671875 23.601562 17.070312 24 17.558594 24 L 23.117188 24 C 23.601562 24 24 23.601562 24 23.117188 L 24 22.105469 C 24 21.617188 23.601562 21.222656 23.117188 21.222656 L 22.988281 21.222656 L 22.988281 18.949219 L 23.117188 18.949219 C 23.601562 18.949219 24 18.550781 24 18.0625 L 24 5.9375 C 24 5.449219 23.601562 5.050781 23.117188 5.050781 L 22.988281 5.050781 L 22.988281 2.777344 Z M 11.621094 16.042969 C 11.621094 16.390625 11.335938 16.671875 10.988281 16.671875 L 2.777344 16.671875 L 2.777344 15.410156 L 11.621094 15.410156 Z M 11.621094 14.652344 L 2.777344 14.652344 L 2.777344 13.390625 L 11.621094 13.390625 Z M 11.621094 12.632812 L 2.777344 12.632812 L 2.777344 11.367188 L 11.621094 11.367188 Z M 11.621094 10.609375 L 2.777344 10.609375 L 2.777344 10.484375 C 2.777344 10.273438 2.609375 10.105469 2.398438 10.105469 C 2.191406 10.105469 2.019531 10.273438 2.019531 10.484375 L 2.019531 16.671875 L 1.390625 16.671875 C 1.042969 16.671875 0.757812 16.390625 0.757812 16.042969 L 0.757812 7.957031 C 0.757812 7.609375 1.042969 7.328125 1.390625 7.328125 L 2.019531 7.328125 L 2.019531 8.96875 C 2.019531 9.175781 2.191406 9.347656 2.398438 9.347656 L 11.621094 9.347656 Z M 11.621094 8.589844 L 2.777344 8.589844 L 2.777344 7.328125 L 10.988281 7.328125 C 11.335938 7.328125 11.621094 7.609375 11.621094 7.957031 Z M 14.652344 17.683594 L 14.019531 17.683594 C 13.953125 17.683594 13.894531 17.628906 13.894531 17.558594 L 13.894531 17.050781 C 13.894531 16.984375 13.953125 16.925781 14.019531 16.925781 L 14.652344 16.925781 Z M 14.652344 14.652344 L 12.378906 14.652344 L 12.378906 9.347656 L 14.652344 9.347656 Z M 14.652344 7.074219 L 14.019531 7.074219 C 13.953125 7.074219 13.894531 7.015625 13.894531 6.949219 L 13.894531 6.441406 C 13.894531 6.371094 13.953125 6.316406 14.019531 6.316406 L 14.652344 6.316406 Z M 23.117188 21.980469 C 23.183594 21.980469 23.242188 22.035156 23.242188 22.105469 L 23.242188 23.117188 C 23.242188 23.183594 23.183594 23.242188 23.117188 23.242188 L 17.558594 23.242188 C 17.488281 23.242188 17.429688 23.183594 17.429688 23.117188 L 17.429688 22.105469 C 17.429688 22.035156 17.488281 21.980469 17.558594 21.980469 L 19.074219 21.980469 C 19.28125 21.980469 19.453125 21.808594 19.453125 21.601562 C 19.453125 21.390625 19.28125 21.222656 19.074219 21.222656 L 18.441406 21.222656 L 18.441406 18.949219 L 22.230469 18.949219 L 22.230469 21.222656 L 20.589844 21.222656 C 20.378906 21.222656 20.210938 21.390625 20.210938 21.601562 C 20.210938 21.808594 20.378906 21.980469 20.589844 21.980469 Z M 23.117188 5.808594 C 23.183594 5.808594 23.242188 5.867188 23.242188 5.9375 L 23.242188 18.0625 C 23.242188 18.132812 23.183594 18.191406 23.117188 18.191406 L 17.429688 18.191406 L 17.429688 9.472656 C 17.429688 9.265625 17.261719 9.09375 17.050781 9.09375 C 16.84375 9.09375 16.671875 9.265625 16.671875 9.472656 L 16.671875 18.570312 C 16.671875 18.636719 16.617188 18.695312 16.546875 18.695312 L 15.535156 18.695312 C 15.46875 18.695312 15.410156 18.636719 15.410156 18.570312 L 15.410156 5.429688 C 15.410156 5.363281 15.46875 5.304688 15.535156 5.304688 L 16.546875 5.304688 C 16.617188 5.304688 16.671875 5.363281 16.671875 5.429688 L 16.671875 7.957031 C 16.671875 8.167969 16.84375 8.335938 17.050781 8.335938 C 17.261719 8.335938 17.429688 8.167969 17.429688 7.957031 L 17.429688 5.808594 Z M 20.589844 2.777344 L 22.230469 2.777344 L 22.230469 5.050781 L 18.441406 5.050781 L 18.441406 2.777344 L 19.074219 2.777344 C 19.28125 2.777344 19.453125 2.609375 19.453125 2.398438 C 19.453125 2.191406 19.28125 2.019531 19.074219 2.019531 L 17.558594 2.019531 C 17.488281 2.019531 17.429688 1.964844 17.429688 1.894531 L 17.429688 0.882812 C 17.429688 0.816406 17.488281 0.757812 17.558594 0.757812 L 23.117188 0.757812 C 23.183594 0.757812 23.242188 0.816406 23.242188 0.882812 L 23.242188 1.894531 C 23.242188 1.964844 23.183594 2.019531 23.117188 2.019531 L 20.589844 2.019531 C 20.378906 2.019531 20.210938 2.191406 20.210938 2.398438 C 20.210938 2.609375 20.378906 2.777344 20.589844 2.777344 Z M 20.589844 2.777344 " />
      </SvgIcon>
    );
  }
}

export default PumpIcon;
