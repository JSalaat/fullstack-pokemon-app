# Pokémon full-stack challenge (all steps done)

### Step 1
- In `/pages/api/api.js` create an endpoint that pulls down the first 151 Pokémon from https://pokeapi.co/ and serves it to the user.

- The API returns a little too much data for each Pokémon than we'd like. We're only interested in the 'name', 'id', 'stats' and 'types' fields. Modify your endpoint to remove all other fields on each Pokémon and serve the reduced data to your application.

### Step 2
- Create a front-end to display all Pokémon on the webpage using the reduced data from your API function. You are free to use any layout you like.

- The API returns many different sprites for each Pokémon, but we'd like you to use the relevant image for each Pokémon from the `/public/sprites` directory instead.

### Step 3
Bad news! The PokéAPI team are shutting down the free service! As we can no longer trust the long term availability of the PokéAPI, we'd like you to create a local solution. Install [Prisma](https://www.prisma.io/) and generate a SQLite database for it to connect to. We want you to store the 151 Pokémon in the SQLite file. It's up to you which fields to store in the database. We then want you to modify the API call to consume data from the newly created Prisma client instead of the PokéAPI.

### Step 4
Incorporate a search function to the application so someone can find a Pokémon quickly by typing its name into a search box. It's up to you to decide if you want to do this on the client or backend.

### Step 5
Extend the search functionality with filters/sorting:

- Users should be able to sort Pokémon by stats such as `attack`, `defense` etc.
