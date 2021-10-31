# deck-sandbox

to get the warning simply run `yarn start`, please read deck-sandbox.js to see the workaround. I discovered that it's only happening on zoom, because deck is much faster now (which is a good thing) It could help to have event filtering (like cap it to 60 fps or something like that) so it doesn't fire events as fast as possible and bug the React. I've included recording of it. Works fine when I pan or rotate, but get warning as soon as I start zooming. Can be replicated with both mouse and touchpad. Tried on two different laptops running Ubuntu 20.04 and brave-browser.

![](deck-warning.gif)
