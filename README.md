# timer-countdown

timer-countdown is a simple count down timer component using react, which takes time as an input in milliseconds with an optional input of which function to be invoked when the timer completes.
Input - 1) time in milliseconds
        2) a function passed as props that gets called when the counter is completed
        3) a function passed as props that gets called at every tick of a second

## Demo

https://stackblitz.com/edit/react-tjdsbw?file=CountdownTimer.css

## Installation

`yarn add timer-countdown`

## Usage

```jsx
import CountdownTimer from 'timer-countdown';
import ReactDOM from 'react-dom';
import React from 'react';

const completed = () => {
  console.log('Timer has completed')
}

const tick = (milliseconds) => {
  console.log(millsieconds);
}

const props = {
 timeLeft : 56000, // time in milliseconds
 completeCallback: completed(), //function to be invoked when the countdown timer finishes
 tickCallback: tick()
}

const Example = () => (
  <div>
    <CountdownTimer {...this.props} />
  </div>
)

ReactDOM.render(<Example />, document.getElementById('root'))
```

## Development
    yarn
    yarn dev

## Test
    yarn test

## Build
    yarn
    yarn build

## Publish
    npm login
    npm version patch
    git add -A
    git push origin master
    npm publish
