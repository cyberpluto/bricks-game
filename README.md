## Bricks game from "Bez kanału" youtube chanel

[Link to video](https://www.youtube.com/watch?v=f-h0G1y5pdk)

##Aiming (3 blocks):
variables: Xposition, startLeft, moveRight, counter, brickLength

1. Change X position depending on direction
	if moveRight Xposition + 1
	if !moveRight Xposition - 1
2. Save changed X position in state
3. Check if direction should be changed 
	If Xposition is 9, change direction to left
	If Xposition is 1, change direction to right
4. Add 3 blocks to the newBrick array (first bolock X position is equal to current X position, two other are moved by +1 and +2)
5. Filter from array blocks which x position is x > 2 or x < 10
6. Save visible pixels in state as prevBrick
7. Create a Pixels set based on current active pixels
8. Remmove previous brick from Pixels
9. Add current brick to Pixels
10. Save Pixels in state


##drop (3 blocks):
variables: Xposition, Yposition, brickLength

1. Clear drop interval when Y > 13
2. Change Y position by + 1
3. Save changed Y position in state
4. Add 3 blocks to the brick array (first bolock X position is equal to current X position, two other are moved by +1 and +2. Y positon is equal to current Y positon)
5. Filter from array blocks which x position is x > 2 or x < 10
6. Save visible pixels in state as prevBrick
7. Create a Pixels set based on current active pixels
8. Remmove previous brick from Pixels
9. Add current brick to Pixels
10. Save Pixels in state




