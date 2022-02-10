# svemlr
a port of [mlr](https://github.com/monome-community/mlr) for the web (just chromium-based browsers for now e.g. chrome, edge).

## compatibility
svemlr has been tested on the latest monome grid (128). it should be compatible with older devices (excluding 40h), once [this issue](https://github.com/taperinstruments/svemlr/issues/22) is fixed.

it also requires that **serialosc is disabled**. on macos open terminal and execute:
```
launchctl unload /library/launchagents/org.monome.serialosc.plist
```

to re-enable:
```
launchctl load /library/launchagents/org.monome.serialosc.plist
```

## development
### running svemlr locally
requires nodejs.

```
git clone https://github.com/taperinstruments/svemlr.git
cd svemlr
npm i
npm run dev
```

### architecture overview
svemlr is built using [svelte](https://svelte.dev) as it simplifies writing reactive javascript. it makes heavy (/unconventional?) use of svelte stores because application state is largely manipulated using external devices (rather than browser ui). most of the application logic is contained within `models`, which often contain of svelte stores.

_routes_ define the conditions for handling monome grid button presses. they map button presses to _controller actions_. the _router_ listens out for button presses, looks for a route that matches a given press, then calls the associated controller actions . controller actions access _models_ and manipulate the state as needed.
