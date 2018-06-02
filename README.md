To see the error do the following:

1. `yarn && yarn start`
2. Go to localhost:8080
3. Open the console (so you can see the errors
4. Drag one of the list items on top of another list item.

You should see an error stating:
> Uncaught Error: Cannot call endDrag while not dragging.

For contrast, in a different terminal window, run `yarn webpack:dev`. This is a slightly different config,
but the key seems to be the lack of minification.

Go back to the browser, and drag again. You should see console messages for hovering and dropping. 
