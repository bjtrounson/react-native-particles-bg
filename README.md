# react-native-particles-bg

[![npm version](http://img.shields.io/npm/v/react-native-particles-bg.svg?style=flat-square)](https://npmjs.org/package/react-native-particles-bg "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-native-particles-bg.svg?style=flat-square)](https://npmjs.org/package/react-native-particles-bg "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-native-particles-bg.svg?style=flat-square)](https://npmjs.org/package/react-native-particles-bg "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-particles-bg "View this project on npm")

> React Native (Web) component for particles backgrounds

This project refers to the source code of the [__Proton__](https://github.com/drawcall/Proton) official website, I packaged it into a component. You can use it casually in your own projects. Thanks to the great author.

#### This is `react-native` and `react-native-web` version
You can also compare it with [react-native-particles-webgl](https://github.com/flyskywhy/react-native-particles-webgl) which based on memory leaking [react-three-fiber](https://github.com/pmndrs/react-three-fiber).

#### A `vue.js` version of `particles-bg-vue` is here [https://github.com/lindelof/particles-bg-vue](https://github.com/lindelof/particles-bg-vue)

### Online demo
* demo1 [https://stackblitz.com/edit/react-a6pm3w](https://stackblitz.com/edit/react-a6pm3w?file=index.js)
* demo2 [https://stackblitz.com/edit/react-bpv9fc](https://stackblitz.com/edit/react-bpv9fc?file=index.js)
* custom1 [https://stackblitz.com/edit/react-sop6sx](https://stackblitz.com/edit/react-sop6sx?file=index.js)
* custom2 [https://stackblitz.com/edit/react-v1ou5e](https://stackblitz.com/edit/react-v1ou5e?file=index.js)

![](https://github.com/lindelof/particles-bg/blob/master/image/01.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/02.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/03.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/04.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/05.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/06.jpg?raw=true)

![](https://github.com/lindelof/particles-bg/blob/master/image/07.jpg?raw=true)

## Install

```bash
npm install react-native-particles-bg @flyskywhy/react-native-gcanvas
```

And follow [the steps to install @flyskywhy/react-native-browser-polyfill](https://github.com/flyskywhy/react-native-gcanvas#react-native).

## Usage

```jsx
import React, { Component } from 'react'

import ParticlesBg from 'react-native-particles-bg'

class Example extends Component {
  render () {
    return (
      <View style={{width: 360, height :700, flex: 1}}>
        <ParticlesBg type="circle" bg={true} />
        <TouchableOpacity>...</TouchableOpacity>
      </View>
    )
  }
}
```
On Web, you can also put `<ParticlesBg/>` after `<TouchableOpacity/>`, since need support Android, use above instead.

## Parameter Description
```jsx
<ParticlesBg color="#ff0000" num={200} type="circle" bg={true} />
```
#### * type - Is the type of particle animation
Is the type of particle animation, `random` is a random selection. You are also free to customize use `custom`.

```js
"color"
"ball"
"lines"
"thick"
"circle"
"cobweb"
"polygon"
"square"
"tadpole"
"fountain"
"random"
"custom"
```

#### * num - The number of particles emitted each time, generally not set

#### * color - The background color or particle color of the particle scene
Notice: which should be an array under type=`color`

#### * bg - Set to html background
Is set the following properties
```css
position: "absolute",
zIndex: -1,
top: 0,
left: 0
```

## About Custom

![](https://github.com/lindelof/particles-bg/blob/master/image/08.jpg?raw=true)

You can use type="custom" to achieve a higher degree of freedom for the particle background.

```jsx
  let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      // body: "./img/icon.png", // Whether to render pictures
      // rotate: [0, 20],
      alpha: [0.6, 0],
      scale: [1, 0.1],
      position: "center", // all or center or {x:1,y:1,width:100,height:100}
      color: ["random", "#ff0000"],
      cross: "dead", // cross or bround
      random: 15,  // or null,
      g: 5,    // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
      }
    };

    return (
      <View style={{width: 360, height :700, flex: 1}}>
        <ParticlesBg type="custom" config={config} bg={true} />
      </View>
    )
```

## Similar projects
Maybe you will like these two projects, they will also make your page flourish
* [https://github.com/lindelof/react-mouse-particles](https://github.com/lindelof/react-mouse-particles)
* [https://github.com/lindelof/power-mode-input](https://github.com/lindelof/power-mode-input)

## License

https://opensource.org/licenses/MIT
