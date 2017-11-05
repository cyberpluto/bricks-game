## Bricks game from "Bez kanału" youtube chanel

[Link to video](https://www.youtube.com/watch?v=f-h0G1y5pdk)

## setActivePixels:
1. Filter blocks which Xposition is x > 2 or x < 10
3. Create a Pixels set based on current active pixels
4. Remmove previous brick from Pixels
5. Add current brick to Pixels
	A. if in aming mode (pixel.y === 1) just add new brick to the set (there is no risk of colision)
	B. if in drop mode (pixel.y > 0) check if there is a colision
		a. if setBrickPixel.y === curBrickPixel.y + 1 and setBrickPixel.x === curBrickPixel.x add pixel to set, quit the set loop and test another curPixel.
		b. if setBrickPixel.y !== curBrickPixel.y + 1 add pixel to set, quit the set loop and test another curPixel.
6. Save in state: current brick as prevBrick, Pixels as activePixels
7. If (pixel.y > 13) startAiming()
## detectColision: 
return true if there is colision with the stack
1. Check if pixel.y + 1 is contained in Pixels set

## startAiming:
// should be triggered at start, if brdck hit the flor or if there is a colision
1. Clear drop interval
2. Reset Xposition, Yposition, prevBrick
3. Start aiming in intervals

## aim (3 blocks):
variables: Xposition, startLeft, moveRight, counter, brickLength

1. Change X position depending on direction
	if moveRight Xposition + 1
	if !moveRight Xposition - 1
2. Save changed X position in state
3. Check if direction should be changed 
	If Xposition is 9, change direction to left
	If Xposition is 1, change direction to right
4. Add 3 blocks to the newBrick array (first bolock X position is equal to current X position, two other are moved by +1 and +2)
5. setActivePixels


## drop (3 blocks):
variables: Xposition, Yposition, brickLength

1. Clear drop interval when Y > 13
2. Change Y position by + 1
3. Save changed Y position in state
4. Add 3 blocks to the brick array (first bolock X position is equal to current X position, two other are moved by +1 and +2. Y positon is equal to current Y positon)
x. Detect colision
	a. If set
5. setActivePixels


Behaviour

Brick Pixels should fall untill each of them collide with either bottom or pixels from stack. I it is level 0 all pixels should be added to the stack.
Add to the stack pixels that colide with the highest pixel of the stack

DetectColision should return:
1. pixels that should be added to the stack
2. pixels that ahould be set as a brick in state

1 2 | 3 4 5 6 7 8 9 | 
