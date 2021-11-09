# <center> Development Process </center>

## **Table of Contents:**

- [Workflow](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#workflow)
- [Structure](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#structure)
- [Backend](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#backend)
- [Overlay (Client)](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#overlay)
- [Settings (Client)](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#settings)
- [Weather (Client)](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#weather)
- [Player (Client)](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#player)
- [Misc](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#misc)
- [Known Bugs](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#known-bugs)
- [Future Plans](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#future-plans)
- [Conclusion](https://github.com/ohadosnat/main-hub/blob/main/DEV.md#conclusion)
- Read the [Design Process](./DESIGN.md)

## **Workflow**

<img width="1648" alt="Workflow Diagram" src="https://user-images.githubusercontent.com/79900761/140955219-d75b5f40-e3b1-4f9c-8ae4-05d30623accc.png">


### **Early Stage (Understanding):**

● **Features** - deciding what is going to be in the app (based on the design).

<details>
<summary> <b>Flow</b> - figuring out how the features are going to work.</summary>
	
<img width="1536" alt="App's Flow Diagram" src="https://user-images.githubusercontent.com/79900761/140955310-5077678e-68a8-43cc-ae06-fcb4c8ccbcfa.png">

**Overlay**

- **Visible** on every page.
- Current local **time & Temperature** (based on user's location)
- **Mini Player** - Control the music from other pages.
- **Navigation Bar** - Navigate between pages.

**Content**

- **Navigation** - Search places or get directions to places.
- **Music** - A music player with Spotify support.
- **Home -** Navigate between three apps:
  - **Weather** - Weather report with a daily and hourly forecast.
  - **Space** - View photographs from NASA's API and Favorite them.
  - **Settings** - Change location, Theme, Logout, Spotify account management.

</details>

<details>
<summary><b>Structure</b> - Planning the structure of certain features and components (including CSS).</summary>

- Overall project
- Database structure planning
- Backend server
- Client & Components

</details>

● **Technologies** - Deciding which technologies I want/need to use to achieve my goals.

### **Development**

<details>
<summary><b>Work Plan</b> - Writing a clear work plan to guide me during the development.</summary>

My work plan is a simple to-do list that goes step by step on what to do. Additionally, I add comments if I have any.

  <details>
  <summary>General  Example</summary>

    ```jsx
    /*
    **Guide:
    [] To be done
    [x] Finished
    [-] Skip
    - Info**

    **General - ONLY SMALL PART OF THE WHOLE WORK PLAN**
    [x] loading state implementation (page/component, animation, might use Lottie or even React Spring/Framer Motion to animate the svg)
      - used Framer Motion
    [x] logged out state (initial welcome)
    	- Gate
    	[x] protected routes
      [x] empty/logged out states for weather/player
      [-] on main page all the same (can add locks to the icons to let the user know that he must login to continue)
      [x] can also add a "It seems you're new here, create an account to enjoy all of the app's features" (know through localStorage count key)
      [x] if the user is not logged in and it's not the first time, than do nothing (can maybe add a "it seems you're not logged in - LOGIN BUTTON")

    [x] logout/login buttons in settings
      [x] logout
      [x] login
    */
    ```

  </details>

  <details>
  <summary>Component Specific Example</summary>

    ```jsx
    /* **Overlay - Component
    TODO:**
    [x] general styling
    [x] change divs to buttons
    [x] display current time from local time
    [x] display degrees from the current weather data (global state).
    [x] mini player
    	[x] mini play buttons (prev, next, play/pause)
      [x] connect to the real player.
    	[x] mini player state (open/closed)
    			- Will mount based on the page/global state.
    [x] links to different pages
        [x] music
        [x] nav
        [x] home
    [x] current page indicator
    */
    ```

  </details>

</details>

● **Developing Features** - Developing features based on the work plan I wrote.

<details>
<summary><b>Features Changes</b> - Making changes to the work plan as some features changes during development.</summary>

- During development, I might add/remove or change some features and update the work plan according to these changes.
</details>

● **Repeat** - repeating the development cycle (re-factor code if needed) until the code is ready.

### **Maintenance**

● **Ship Code** - when everything is ready, push code to the production.

● **Users Reports** - users send bugs/issues/ideas/feedback.

● **Reviewing/Implementing** - I will go through the reports and fix any issues/bugs.

● **Code Review** - Making sure the new code works and does not ruin other features.

● **Repeat** - repeating the maintenance cycle.

<br/>

## **Structure**

### **Challenges**

- How to structure the project's files in both backend and frontend?
- How and where to store the users' data and states?
- Choosing Database and State Management Library

### **Solutions**

<details>
<summary>I decided to go with this file structure:</summary>

- In terms of styling, I tried to follow the Airbnb Style Guide as much as possible

```
backend
├── @types
│   └── (.d.ts files)
├── routes
│   ├── spotify.ts
│   ├── spotifyAuth.ts
│   └── weather.ts
├── utils
├── server.ts
└── (other config files)

client
├── dist (build folder)
├── public
│   └── assets
│       ├── icons
│       └── (other images)
├── src
│   ├── components
│   │   └── components files
│   ├── context
│   │   └── context API files
│   ├── redux
│   │   └── redux files (store + slices)
│   ├── types
│   │   └── (.d.ts files)
│   ├── utils
│   │   ├── api
│   │   │   └── any API requests related files (to the backend)
│   │   ├── firebase
│   │   │   └── any Firebase/Firestore related files (config and utils functions)
│   │   ├── hooks
│   │   │   └── custom hooks files
│   │   └── (other utils functions)
│   ├── views
│   │   └── Each page main component file (e.g., Player, Login, Settings and such).
│   └── (default src files such as App.tsx/css and index.tsx/css)
└── (config files)
```

</details>

<details>
<summary>I stored the users' data in <b>Firestore</b>, and the structure was similar to the user structure I did on my previous project <a href="https://github.com/ohadosnat/langDesh">LangDesh</a>.</summary>

- I followed the rule of storing only necessary data and trying to keep it minimal.
- This structure allowed me to update the user info quickly and scale if needed (add more properties).

```tsx
// Database: Firestore
// Collection: Users

interface User {
  uid: string;
  name: string;
  theme: "light" | "dark";
  weather: {
    locationByName: string;
    locationByCoords: [number, number] | [];
  };
  spotify: {
    refresh_token: string;
    isLogged: boolean;
  };
}
```

</details>

<details>
<summary>I used <b>Redux Toolkit</b> as my <b>State Management</b> to store all the states in the app (that needed to be global).</summary>

- Each feature has a separate Redux Slice with different functions to update the slice's state.
- By separating the states into different slices, I can keep everything organized and scale with ease.

<details>
<summary>Diagram</summary>

<img width="784" alt="Redux Diagram" src="https://user-images.githubusercontent.com/79900761/140955455-110a763d-d9db-445a-9248-a05201fd116f.png">

</details>

<details>
<summary>Code</summary>

```tsx
/* The Slices */

/* ---User--- */

/**
 * `User` Slice State.
 * @param uid - The user ID, generated from `Firebase`.
 * @param name - The user name, provided on sign up.
 * @param theme - The user preference, can be either `light` or `dark`. Default is `light`.
 * @param weather - Stores information about the user's weather location.
 * @param spotify - Stores information about the user's spotify auth status and tokens.
 */
interface User {
  uid: string;
  name: string;
  theme: "light" | "dark";
  weather: {
    locationByName: string;
    locationByCoords: [number, number] | [];
  };
  spotify: Spotify.Auth & { isLogged: boolean };
}

/* ---Global--- */

/**
 * `Global` Slice State.
 * @param pageTheme - Current page theme, changes based on the current page.
 * @param containerHeight - The App's `height` value that changes based on the current page/device orientation (`landscape` `portrait`)
 * @param isNight - indicates whether or not the current time is night based on the user's local time.
 * @param message - used to set any message to display to the user (`error`, `warring` and such).
 * @param isLoading - global loading state
 * @param showModal - global state for the popup modal at home page to make sure it won't appear again when closing.
 */
interface IGlobalState {
  pageTheme: string;
  containerHeight: string;
  isNight: boolean;
  message: string;
  isLoading: boolean;
  showModal: boolean;
}

/* ---Spotify--- */

/**
 * `Spotify` Slice State
 * @param authorizeURL - Gets a authorization URL for logging in to the Spotify API.
 * @param code - The authorization code returned in the callback in the Authorization Code flow.
 * @param isReady - The state of `Spotify WebPlayback SDK`
 * @param name - The current user's Spotify display name
 * @param deviceList - The current user's available devices
 * @param player - the current `Playback State` of the user's spotify player.
 * @param currentProgress - used to store the current track progress.
 */
interface ISpotifySliceState {
  authorizeURL: string;
  code: string;
  isReady: boolean;
  name: string;
  deviceList: SpotifyApi.UserDevice[];
  player: Spotify.PlaybackState | undefined;
  currentProgress: number;
  search: {
    results: Player.SearchResults | undefined;
    detailedView: Player.DetailedView | undefined;
  };
}

/* ---Weather-- */

/** `Weather` Slice State - used in Redux Global State  */
interface WeatherSliceState {
  forecast: Weather.OneCallDataResponse | undefined;
}
```

</details>

</details>

<br/>

## **Backend**

### **Challenges**

- Routes Design
- How to handle Spotify's authentication?

### **Solutions**

<details>
<summary>The routes design I choose is simple:</summary>

- the route for making API requests is `/api/`
- Each feature has a separate route.

```markdown
/api
├── /spotify
│ └── /auth
└── /weather
```

</details>

<details>
<summary>Handling Spotify's authentication</summary>

- Inside `/api/spotify`, I added the `auth` route to handle the authentication/authorization requests.
- To tackle this challenge, I used a node-wrapper package called `spotify-web-api-node`.
- This package allowed me to follow [Spotify's Authorization Flow](https://developer.spotify.com/documentation/general/guides/authorization/) without any problems.
- The code below is part of `spotifyAuth.ts` - initial setup with two requests examples (URL creation and access token refresh).

```tsx
// Setting up the Client ID and the Client Secret Key.
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Which scopes I'm going to need the user to accept
const scopes: string[] = [
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
  "user-library-modify",
  "streaming",
];

//Retrieve a URL where the user can give the application permissions.
router.get("/createURL", (req, res) => {
  spotifyApi.setRedirectURI(`https://main-hub.netlify.app/settings`);
  const url = spotifyApi.createAuthorizeURL(scopes, generateRandomString(16));
  res.json({ url });
});

// Request a new Access Token with the provided Refresh Token
router.post("/refresh", async (req, res) => {
  try {
    const refreshtoken = req.body.refreshToken;
    spotifyApi.setRefreshToken(refreshtoken);
    const token = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = token.body;

    res.json({ access_token, expires_in });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
```

</details>

<br/>

## Overlay (Client)

The Overlay component acts as a guide for the user. It allows the user to see the current time, weather, control the player and navigate between pages.

### Challenges

- The Overlay should be present no matter the page.

### Solutions

<details>
<summary>To make this component present on every page, I separated the app into two sections:</summary>

- **Overlay** - Will be present on every page.
- **Content** - Has a Switch (React-Router-DOM) component to handle the page's routes.

<!-- ![App Structure Diagram (Overlay & Content)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/faafd3e2-826a-4401-b578-73ffa9f7d7e3/Untitled.png) -->

```tsx
// App.tsx
<div>
    <Overlay />
    <Content />
</div>

// Content.tsx
<Switch location={location} key={location.pathname}>
    <Route path="/" exact component={Home} />
    <Route path="/player" exact component={Player} />
    <Route path="/weather" exact component={Weather} />
    <Route path="/settings" exact component={Settings} />
    <ProtectedRoute
        {...protectedProps}
        exact
        component={Login}
        path="/login"
    />
    <ProtectedRoute
        {...protectedProps}
        component={Signup}
        exact
        path="/signup"
    />
    <Route path="/">
        ⚒ This page might be under constructions or it doesn't exists ⚒
    </Route>
</Switch>
```

</details>

<br/>

## Settings (Client)

### Challenges

- Handle different state cases.
- Handle user action that updates the global state.

### Solutions

<details>
<summary>Different state cases:</summary>

- I used **conditional rendering** to make sure I only displayed the things I needed.
- When there's no user - display the Login and Signup button.
- When the Spotify account is not linked - show the Spotify Login button.
- When the Spotify account is linked - show the Spotify Logout button.
- When there's no weather location - display an input field.
- When there's a weather location - display a change button.
- **_The code below includes only the related parts._**

```tsx
<div>
  <div>
    {/* Check for Active User */}
    {!uid ? (
      <>
        <Link to="/login">
          <Button title="Login" startIcon={<UserIcon />} />
        </Link>
        <p>OR</p>
        <Link to="/signup">
          <Button title="signup" startIcon={<WaveIcon />} />
        </Link>
      </>
    ) : (
      <>
        {/* Check for Spotify Account */}
        {spotify.isLogged ? (
          <div>
            <SpotifyIcon />
            <p>{name}</p>
            <Button title="logout" onClick={spotifyLogout} />
          </div>
        ) : (
          <a href={authorizeURL}>
            <Button title="spotify login" startIcon={<SpotifyIcon />} />
          </a>
        )}
        {/* Check for Location */}
        {showInput ? (
          <form onSubmit={(e) => locationFormHandle(e, values)}>
            <Input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={values.location}
              onChange={changeHandle}
              startIcon={<EarthIcon />}
            />
            <Button type="submit" title="change" />
          </form>
        ) : (
          <div>
            <EarthIcon />
            <p>{weather.locationByName}</p>
            <Button title="Change" onClick={() => setShowInput(!showInput)} />
          </div>
        )}
        <Button
          title="logout"
          startIcon={<UserIcon />}
          onClick={() => logout()}
        />
      </>
    )}
  </div>
  {/* Error Message */}
  {message && <p className="mt-4">{message}</p>}
</div>
```

</details>

<details>
<summary>Updating global states (user actions)</summary>
<br/>

● **Login/Signup** - The **Login/Signup** buttons navigate the user to the desired page based on the button. **I'll explain how I handle Login/Signup under the Misc section.**

<details>
<summary><b>Link a Spotify account</b> - If a user clicks on the "Spotify Login" button, a couple of things happen (by order):</summary>

● It directs the user to a Spotify authorization link with a request dialog (generated by the backend).
● The user can **accept** or **reject** the request. Either way, it redirects the user back to the **Settings** page.
● If the user **rejects** the request, an error message will appear, and the process ends.
● If the user **accepts** the request, a unique authorization code will be in the URL that triggers an effect.

<details>
<summary>The effect dispatches an action to update the Spotify slice state with the user's code.</summary>

```tsx
// Settings.tsx
const { search } = useLocation();

// happens after clicking on the spotify login button
useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    if (code) dispatch(setCode(code));
}, [search]);

// **setCode** Function
/**
     * Sets the authorization code returned in the callback in the Authorization Code flow.
     * @param action - the `code` value
     * @returns an updated state with a valid `code` value.
     */
setCode: (state, action: PayloadAction<string>) => {
    return { ...state, code: action.payload };
},
```

</details>
<details>
<summary>After the state updates, It will trigger an effect in the <code>useSpotifyAuth.ts</code> hook to perform a login request (Spotify).</summary>

```tsx
// Global State
const { spotify, uid } = useSelector(selectUser);
const { code } = useSelector(selectSpotify); // the auth code
const { access_token, refresh_token, expires_in, isLogged } = spotify;
const dispatch = useDispatch();

// After the user clicks the authorization url, send a login request to the server.
useEffect(() => {
  if (!code || !uid) return;
  spotifyLogin(code);
}, [code, uid]);

// spotifyLogin Function

/**
 * Perfom a login request to Spotify API.
 * @param **code** - The authorization code returned in the callback in the Authorization Code flow.
 * @fires `updateUserDoc` - updates the `Firebase` user doc with the user's `Refresh Token` and login state.
 */
const spotifyLogin = async (code: string): Promise<void> => {
  try {
    const userCreds: Spotify.AuthRequired = await getInitialTokens(code);
    updateUserDoc(uid, {
      spotify: { isLogged: true, refresh_token: userCreds.refresh_token },
    });
    window.history.pushState(null, "", window.location.pathname);
  } catch (error) {
    const errorMessage = {
      message: "an error occurred while logging in to your Spotify account",
      error,
    };
    console.error(errorMessage);
    window.history.pushState(null, "", window.location.pathname);
  }
};
```

</details>

<hr/>

</details>

<details>
<summary><b>Unlink a Spotify account</b> - Users can log out of their Spotify accounts using the "Spotify Logout" button that triggers:</summary>

```tsx
// Clears the Spotify Global State & The users tokens (global & Firestore)
const spotifyLogout = (): void => {
  dispatch(clearSpotifyCredentials(uid)); // removes any Spotify Creds in Firestore & User Redux Slice
  dispatch(clearSpotifyState()); // Spotify Reudx Slice - return to initial state
};

// User Reducer

/**
 * Clears the user's spotify credentials from both the local state and database (`Firestore`).
 * @param action - the user's `uid`, used to for a reference to update the document.
 * @returns the state and a "default" values for the `spotify` property.
 */
clearSpotifyCredentials: (state, action: PayloadAction<string>) => {
const uid = action.payload;
updateUserDoc(uid, { spotify: { isLogged: false, refresh_token: "" } });
  return {
      ...state,
      spotify: { isLogged: false, access_token: "", refresh_token: "" },
  };
},

// Spotify Reducer

/**
 * Resets the `state` to the `initialState`
 * @returns the origial `initialState` value
 */
clearSpotifyState: (state) => {
  return { ...initialState, authorizeURL: state.authorizeURL };
},

```

</details>

<details>
<summary><b>Set/Change Location</b> - Users can use the text input field to set a new location:</summary>

<br/>
<details>
<summary>When a user adds a new location, a function named <code>locationFormHandle</code> triggers on form submit.</summary>

- **Note:** I use `locationFormHandle` on two pages (**Settings** and **Weather**), and I didn't want to repeat myself. Therefore I made this function a utility function.

```tsx
// Location Settings States - Settings.tsx

{showInput ? (
    <form onSubmit={(e) => locationFormHandle(e, values)} >
    <Input
        type="text"
        name="location"
        placeholder="Enter Location"
        value={values.location}
        onChange={changeHandle}
        startIcon={<EarthIcon />}
    />
    <Button type="submit" title="change" />
    </form>
) : (
    <div>
    <EarthIcon />
    <p>{weather.locationByName}</p>
    <Button title="Change" onClick={() => setShowInput(!showInput)} />
    </div>
)}

**// weather.ts (locationFormHandle)**

/**
 * Form Handler, prevents page refresh, fires the change handler and resets the input field value.
 * @param e - the `form` event object. used to prevent page refresh.
 * @param values - the useForm values object (e.g., `values: {location: "london"}`)
 */
export const locationFormHandle = async (
    e: React.FormEvent<HTMLFormElement>,
    values: Record<string, string>
): Promise<void> => {
    e.preventDefault();
    locationChangeHandle(values.location);
    values.location = "";
};

```

</details>

<details>
<summary>This function triggers <code>locationChangeHandle</code>:</summary>

```tsx
// locationChangeHandle.tsx

/**
 * Handles the user's location value (locally and on Firestore).
 * @param location - the input value.
 */
const locationChangeHandle = async (location: string): Promise<void> => {
  const { locationByName } = store.getState().user.weather;
  if (!location) {
    store.dispatch(setMessage("Please enter a location 🌎"));
    setTimeout(() => store.dispatch(setMessage("")), 2000);
    return;
  } else if (location.toLowerCase() === locationByName.toLowerCase()) {
    store.dispatch(setMessage("Please a different location 🌎"));
    setTimeout(() => store.dispatch(setMessage("")), 2000);
    return;
  } else {
    store.dispatch(setLocationName(location));
    store.dispatch(setMessage(""));
  }
};
```

</details>

● **Why two functions?** To **isolate** them and have one handle the form itself and one to the change event (Redux State & Firestore)

<hr/>

</details>

<details>
<summary><b>Logout</b> - Clicking the Logout button triggers the <code>logout</code> utility function.</summary>

```tsx
/**
 * Perform a `logout` request to `Firestore`, setting `auth.currentUser` to `null` and clears the `User` Global State.
 * @fires - this function fires the `Firebase` `onAuthStateChanged` which will clear the `user` local state (back to initial state).
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    store.dispatch(setUser(null));
  } catch (error) {
    const errorMessage: ErrorMessage = { message: "Failed to logout😢", error };
    store.dispatch(setMessage(errorMessage.message));
    console.error(error);
    setTimeout(() => store.dispatch(setMessage("")), 2000);
  }
};

// User Slice Reducer

/**
 * Sets the `user`'s LOCAL state based on the provided data.
 * @param action a `user` object that matches the `UserSliceState` type. If the payload is null, the state will reset.
 * @returns an updated state of the `user` state.
 */
setUser: (
  state,
  action: PayloadAction<IUserSliceState | null>
): IUserSliceState => {
  if (action.payload)
    return {
      ...action.payload,
      spotify: {
        ...action.payload.spotify,
        access_token: state.spotify.access_token,
        expires_in: 3600,
      },
    };
  return { ...initialState }; // reset to initial state when logout/payload is null.
};
```

</details>

<details>
<summary><b>Theme Change</b> - Users can choose between two themes, <b>Dark</b> or <b>Light</b></summary>

```tsx
// Inside Settings.tsx
<div className="flex justify-between space-x-2">
  <Button
    onClick={() => dispatch(setTheme("dark"))}
    className={`${theme === "dark" && "current"} flex-grow`}
    title="dark"
    startIcon={<MoonIcon className="w-7 h-7 stroke-current" />}
  />
  <Button
    onClick={() => dispatch(setTheme("light"))}
    className={`${theme === "light" && "current"} flex-grow`}
    title="light"
    startIcon={<SunIcon className="w-7 h-7 stroke-current" />}
  />
</div>

// User Slice Reducer

/**
* Sets the `user`'s doc theme value and the global CSS variable `--color-indicator` based on the `payload`'s value.
* @param payload - the theme type can be either `light` or `dark` - `string`
* @example setTheme("light")
*/
setTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
	const theme = action.payload;
	const cssVariable = "--color-indicator";
	setCSSVariable(cssVariable, theme === "light" ? "#006666" : "#ee9ce1");
	if (state.uid) return updateUserDoc(state.uid, { theme: action.payload });
	return { ...state, theme: action.payload };
},
```

</details>

</details>

<br/>

## Weather (Client)

### Challenges

- OpenWeather offers a `One Call API` that fetches the data I need in a single call, but it accepts `latitude` and `longitude` coordinates to make the call, and **there is no Search API**.
- Backend Routes.
- Frontend Data Handle.
- Scroll on the forecast data.

### Solutions

<details>
<summary>To tackle this problem, I have to use the <b>Current Weather API</b> that returns a weather object that includes the geographical coordinates I need for the <b>One Call API</b>.</summary>
<br/>

- And to reduce future calls, I save the coordinates in the user's document on Firestore. This way, I only have to fetch the location's coordinates a single time.

</details>

<details>
<summary><b>Backend Routes</b></summary>
<br/>

- The weather's routes are `/location` and `/forecast`.

```tsx
/** Fetches the current weather for the given location
 * @returns the `lat` and `lon` values of the given location that can be used to fetch additional data about the location (forecast, historical data, and more)
 */
router.post("/location", async (req, res) => {
  const locationName = req.body.location;
  const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${process.env.OPENWEATHER_API_KEY}`;
  try {
    const resp = await axios.get(url);
    const data = resp.data as Weather.CurrentWeatherDataResponse;
    res.status(200).json({
      message: "location fetched!",
      data: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    });
  } catch (error) {
    res.json({
      message: "there was a problem fetching the weather for this location",
      error,
    });
    res.status(400).end();
  }
});

/** Fetches weather information from `OpenWeather API One Call`
 * @returns an object with the following data:
 *  - Current weather
 *  - Hourly forecast for 48 hours
 *  - Daily forecast for 7 days
 *
 * @see https://openweathermap.org/api/one-call-api
 */
router.post("/forecast", async (req, res) => {
  const { lat, lon } = req.body.coords as Weather.Coord;
  const exclude: string = "minutely, alerts";
  const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${process.env.OPENWEATHER_API_KEY}`;

  try {
    const resp = await axios.get(url);
    const data = resp.data as Weather.OneCallDataResponse;

    const forecastResponse: Weather.OneCallResponse = {
      message: "forecast fetched successfully",
      data,
    };
    res.status(200).json(forecastResponse);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      message: "there was a problem fetching forecast for this location",
      error,
    };
    res.status(400).json(errorResponse);
  }
});
```

</details>

<details>
<summary><b>Frontend Data Handle</b></summary>

<br/>

<details>
<summary><b><code>weatherRequests.ts</code></b> handles any weather-related requests to the </summary>

```tsx
/**
 * Fetches a location's coordinates based on the location's `name`
 * @param location - the location's `name` - `string`
 * @returns an object with `latitude` and `longitude` values.
 */
export const getLocationCoords = async (location: string) => {
  const res: AxiosResponse<Weather.LocationCoordsResponse, any> =
    await axios.post(
      "https://main-hub-backend.herokuapp.com/api/weather/location",
      {
        location,
      }
    );
  const data = res.data;
  return data.data;
};

/**
 * Fetches the location's full forecast using the given `coordinates`
 * @param coords - coordinates values (`lat`, `lon`)
 * @returns a forecast object with weather information.
 */
export const getForecast = async (coords: Weather.Coord) => {
  const res: AxiosResponse<Weather.OneCallResponse, any> = await axios.post(
    "https://main-hub-backend.herokuapp.com/api/weather/forecast",
    { coords }
  );
  const data = res.data;
  return data.data;
};
```

</details>

<details>
<summary><b><code>useWeather</code></b> is a custom hook that fires requests and sets states.</summary>

```tsx
// React
import { useEffect } from "react";
// Redux
import { selectUser } from "../../redux/store";
import { setForecast } from "../../redux/weather";
import { useDispatch, useSelector } from "react-redux";
// Utils & Components
import {
  generateTimestamp,
  getLocationCoordsHandle,
  setForecastHandle,
} from "../weather";

/**
 * Hook used for the App's Weather API - handles requests and setting states.
 */
export const useWeather = () => {
  // States
  const { weather } = useSelector(selectUser);
  const { locationByCoords, locationByName } = weather;
  const dispatch = useDispatch();

  // Location Name - gets coordinates
  useEffect(() => {
    if (!locationByName || locationByCoords.length === 0) return;
    else getLocationCoordsHandle(locationByName);
  }, [locationByName]);

  // Coords & Data Handling
  useEffect(() => {
    if (locationByCoords.length === 0) return;
    const [lat, lon] = locationByCoords;

    const forecastSave = localStorage.getItem("save"); // Local Storage
    if (forecastSave) {
      const data: Weather.WeatherLocalSave = JSON.parse(forecastSave);

      // checks if the coords are the same, if they're not the same, it means the save is not relevant
      if (data.save.lat !== lat && data.save.lon !== lon)
        setForecastHandle(lat, lon);
      else {
        const currentTime = generateTimestamp();
        currentTime - data.time < 18000
          ? dispatch(setForecast(data.save))
          : setForecastHandle(lat, lon);
      }
    } else {
      setForecastHandle(lat, lon);
    }
  }, [locationByCoords]);
};
```

</details>

● `/utils/weather.ts` holds all of the weather-related utility functions
● To reduce API calls, I decided to save the weather data in **local storage** with a timestamp. Storing data in local storage allows me to check if it is outdated and fetch when needed.

<hr/>
</details>

<details>
<summary><b>Scroll</b></summary>

<br/>

● On mobile, scrolling through the data was easy since it's a native behavior. But on desktop devices, it was a bit tricky.
● I had two options, use **Framer-Motion to enable drag property on the x-axis** or **create a custom scroll feature with animation**.
● Of course, I went with the second option since I thought about the first option at the end of the project. 🥴

<details>
<summary>To implement this feature, I had to do a few things:</summary>

<details>
<summary>Update which arrows should be displayed:</summary>

```tsx
// ForecastItemsWrapper.tsx

// Custom hook
const [arrowsDirection, setArrowsDirection] = useScrollArrows(ref.current);

// Media Query Hooks
const isSmall = useIsSmall();
const isMedium = useIsMedium();
const isLarge = useIsLarge();

// Change the arrow directions based on the type (daily/hourly) and media query.
useEffect(() => {
  if (type === "daily") {
    if (isSmall || isMedium || isLarge)
      return setArrowsDirection({ left: false, right: false });
  }
  setArrowsDirection({ left: false, right: true }); // set to the initial state
}, [isSmall, isMedium, isLarge]);

// Inside the hook useScrollArrows:

const initialArrows: IArrowDirection = { left: false, right: true };

/**
 * Handles the arrow changes based on the scroll position of the provided `element`
 * @param element - the element that is being used during the scroll event `HTMLDivElement`
 * @returns a stateful value, and a function to update it (`arrowsDirection`, `setArrowsDirection`)
 *
 * - `arrowsDirection` `state` which is a `boolean` object with `left` and `right` to determine if to display them. `{ left: boolean, right: boolean }`.
 * - `setArrowsDirection` to set new conditions if needed (for example, based on screen size)
 * @example
 * const ref = useRef(null)
 * const [arrowsDirection, setArrowsDirection] = useScrollArrows(ref.current); // makes a reference to a HTMLDivElement from the DOM.
 * ...
 * return <div ref={ref}>scroll div element</div>
 *  */
export const useScrollArrows = (
  element: HTMLDivElement | null
): useScrollArrowsReturn => {
  const [position, setPosition] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [arrowsDirection, setArrowsDirection] =
    useState<IArrowDirection>(initialArrows);

  const listener = () => {
    if (element) {
      const { scrollLeft, clientWidth, scrollWidth } = element;
      setPosition(scrollWidth - scrollLeft - clientWidth);
      setStartPosition(scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (!element) return;
    element.addEventListener("scroll", listener);
    return () => element.removeEventListener("scroll", listener);
  }, [element]);

  useEffect(() => {
    if (position === startPosition)
      return setArrowsDirection({ left: false, right: true });
    if (position < 1) return setArrowsDirection({ left: true, right: false });
    if (position > 0 && position < startPosition)
      return setArrowsDirection({ left: true, right: true });
  }, [position]);

  return [arrowsDirection, setArrowsDirection];
};
```

</details>

<details>
<summary>Handle the scroll click itself:</summary>

```tsx
/**
 * Handles a `scroll` event on elements that need to have scroll buttons manually.
 *
 * @param element - the element you want the scroll to be `HTMLElement`
 * @param change - determines how much you want to scroll each click `number`
 * @param duration - the duration of the scroll animation `number`
 * @example
 *  handleScrollClick(myElement, 100, 350); // will move 100px to the left during 350ms
 *  handleScrollClick(myElement, -100, 350); // will move 100px to the right during 350ms
 */
export const handleScrollClick = (
  element: HTMLElement,
  change: number,
  duration: number
): void => {
  const start = element.scrollLeft;
  let currentTime = 0,
    increment = 20;

  const animateScroll = (): any => {
    currentTime += increment;
    const value = easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = value;
    if (currentTime < duration) return setTimeout(animateScroll, increment);
  };
  animateScroll();
};
```

</details>

<details>
<summary>Animate the scroll:</summary>

```tsx
/**
 * Creates a `ease-in-out-quad` animation effect.
 *
 * @param currentTime
 * @param start
 * @param change
 * @param duration
 * @returns the current position `number`
 * @example
 * easeInOutQuad(0, 0, 100, 350);
 */
const easeInOutQuad = (
  currentTime: number,
  start: number,
  change: number,
  duration: number
): number => {
  currentTime /= duration / 2;
  if (currentTime < 1) return (change / 2) * currentTime * currentTime + start;
  currentTime--;
  return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
};
```

</details>

</details>

</details>

<br/>

## Player (Client)

### Challenges

- Turn the player component into a fully functional Spotify Player using Spotify Web Playback SDK with Spotify Web API
- State Management
- Menu

### Solutions

● The Player component was the most challenging part of this project.

<details>
<summary><b>Spotify Web Playback SDK</b></summary>
<br/>

- `useSpotifyWebPlayback` is a custom hook that handles the initialization of the SDK in the app.

```tsx
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsReady, clearSpotifyState } from "../../redux/spotify";

/**
 * Initialize a Spotify WebPlayback SDK Client to steam audio on.
 */
export const useSpotifyWebPlayback = () => {
  // Local State
  const [player, setPlayer] = useState<SpotifySDK.Player | undefined>(
    undefined
  );
  // Gloabal State
  const { spotify, uid } = useSelector(selectUser);
  const dispatch = useDispatch();

  // Init Client
  useEffect(() => {
    if (!spotify.access_token || player) return;

    // Loads the SDK from Spotify's CDN
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appaendChild(script);

    // Iinit SDK when ready
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const player: SpotifySDK.Player = new window.Spotify.Player({
        name: "Main Hub",
        getOAuthToken: (cb: any) => {
          cb(spotify.access_token);
        },
        volume: 0.5,
      });

      setPlayer(player); // sets the local state
    };
  }, [spotify.access_token]);

  // Connect Client
  useEffect(() => {
    if (!player) return;
    player
      .connect()
      .then((success: boolean) => {
        if (success) {
          dispatch(setIsReady(success)); // when the player is ready, update isReady in player global state
        }
      })
      .catch((err) => console.error(err));
  }, [player]);

  // Disconnect Client
  useEffect(() => {
    if ((player && !uid) || !spotify.isLogged) {
      player?.disconnect();
      dispatch(clearSpotifyState());
    }
  }, [uid, spotify.isLogged]);
};
```

</details>

● The SDK provides all sorts of listeners and methods to control the player, but It doesn't work well (from my experience). Because of this, I used the Spotify Web API to fetch data and control the player.

<details>
<summary><b>Spotify Web API</b></summary>
<br/>

● To use this Web API, I used a client wrapper called spotify-web-api-js.

● This package helped me to make API requests without the need to define new functions or backend routes.

● The only functions I defined were handlers that make the request and dispatch an action to update the global state.

● These handlers are in the useSpotifyWebApi hook that uses the Context API.

<details>
<summary>This Context is responsible for a couple of things:</summary>

- Instantiate the wrapper and set an active Access Token to make requests.
- Get the user's current display name.
- Get the user's current playback state.
- Handlers that make requests to the API and update the global state.

```tsx
// An example for a couple of handlers and fetching the current playback state.

// Get User's Current Playback every 1 second.
useEffect(() => {
  if (!playerHasAccessToken || !isLogged) return;
  const interval = setInterval(() => {
    getPlaybackState();
  }, 1000);

  return () => clearInterval(interval);
}, [playerHasAccessToken, isLogged]);

/* ---Handlers--- */

/** Get Current Playback State and sets it in `Spotify` Global State. */
const getPlaybackState: SpotifyWebApiContext["getPlaybackState"] = async () => {
  try {
    const state = await spotify.getMyCurrentPlaybackState();
    state && dispatch(setPlayer(state));
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message: "Failed to fetch current playback state",
      error,
    };
    console.error(errorMessage);
  }
};

/**
 * Toggles the player between `play` state to `pause` state
 * @param type - type of action `play` or `pause`
 * @param isContext - `optional` - is it from a context? `boolean`
 * @param context_uri - `optional` - the context that will be played.
 * @param uri - `optional` - the track that will be played.
 */
const togglePlayerState: SpotifyWebApiContext["togglePlayerState"] = async (
  type,
  isContext,
  context_uri,
  uri
) => {
  try {
    const playerDeviceID = player?.device.id;
    const mainHubID = deviceList[0].id;

    // finds if the active device is in the device list.
    const activeDevice = deviceList.find(({ id }) => playerDeviceID === id);

    // if there is no active device, select the app's device.
    !activeDevice && player && (await selectDevice(mainHubID!)); // select the app's device

    // Player States
    if (type === "pause") await spotify.pause();
    else {
      const isSameTrack = player?.item.uri === uri;
      // Play Command
      spotify.play({
        context_uri: isContext ? context_uri : player?.context?.uri!,
        device_id: !player ? mainHubID! : playerDeviceID!,
        offset: { uri: uri ? uri : player?.item?.uri },
        position_ms: isSameTrack ? player?.progress_ms! : undefined,
      });
    }
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message: "Failed to toggle playback state",
      error,
    };
    console.error(errorMessage);
  }
};
```

</details>

<hr/>

</details>

<details>
<summary><b>Generate a color palette based on the current track's artwork</b></summary>
<br/>

● I implemented this feature in my previous project, [music-player](https://github.com/ohadosnat/musicPlayer), Where I extracted the primary color of an image and generated a color palette.

● I converted this process into React (the previous project was in vanilla JavaScript).

<details>
<summary>I decided to create a custom hook that handles this process (<code>useGenerateColors</code>)</summary>

```tsx
/**
 * Generates a color palette based on `imgURL`.
 *
 * The colors will be set in a global CSS variables
 * (`--color-player-main` and `--color-player-secondary`)
 * @param imgURL - the image url address
 * @example
 * useGenerateColors("https://via.placeholder.com/150")
 */
export const useGenerateColors = (imgURL: string): void => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );
  const [colorPalette, setColorPalette] = useState<TcolorPalette | undefined>(
    undefined
  );

  // each time the image url changes, create a new palette and set it.
  useEffect(() => {
    if (!imgUR) return;
    createImage(imgURL)
      .then((element) => setImageElement(element))
      .catch((error) => console.error(error));
  }, [imgURL]);

  // when the image changes, generate a color palette based on that
  useEffect(() => {
    if (!imageElement) return;
    const generatedColors = generateColorPalette(imageElement);
    setColorPalette(generatedColors);
  }, [imageElement]);

  // when color palette changes, set the new colors to the global CSS variables
  useEffect(() => {
    if (!colorPalette) return;
    setCSSVariable("--color-player-main", colorPalette.main);
    setCSSVariable("--color-player-secondary", colorPalette.secondary);
    setCSSVariable("--color-indicator", colorPalette.indicator);
    setCSSVariable("--color-skin", colorPalette.main);
  }, [colorPalette]);
};
```

</details>

<details>
<summary>The hook creates a new image using <code>createImage</code></summary>

```tsx

/**
* Creates a new image and wait for it to loads before resolving the promise.
* @param imageURL - the image URL, used for the source `string`
* @returns a loaded image element
* @example createImage("https://via.placeholder.com/150")
*/
export const createImage = (imageURL: string): Promise<HTMLImageElement> => {
return new Promise((resolve, reject) => {
  const trackImg = new Image();
  trackImg.crossOrigin = "Anonymous";
  trackImg.src = imageURL;
  trackImg.onload = () => resolve(trackImg);
  trackImg.onerror = () => reject("⛔ ☝ something went wrong ☝ ⛔");
});

```

</details>

<details>
<summary>Which triggers an effect that fires <code>generateColorPalette</code></summary>

- `generateColorPalette` first creates a new canvas context (`createCanvasContext`)
- Resize the image to 1x1 and gets the image data (RGB values).
- It uses these values in `getColors` to create a new color palette.
- Finally, it returns the new color palette.
- **_These functions are from `colors.ts`._**

```tsx
/** (1)
 * Generating a color palette based on the `image` element.
 *
 * This function creates a new canvas 2D context that is being used to get the main color of the image
 * using `getColors` function.
 * @param image a HTML Image Element `HTMLImageElement`
 * @returns a color palettes object with `main` and `secondary` colors.
 */
export const generateColorPalette = (
  image: HTMLImageElement
): TcolorPalette => {
  const context = createCanvasContext();
  if (context) {
    context.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 1);
    const rgba = context.getImageData(0, 0, 1, 1).data;
    const palette = getColors(rgba[0], rgba[1], rgba[2]);
    return palette;
  }
  return { main: "#000", secondary: "#000", indicator: "#fff" };
};

/** (2)
 * Creates a new `canvas` 1x1 and a 2D `context`
 * @returns a canvas 2d context object
 */
const createCanvasContext = (): CanvasRenderingContext2D | null => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  return ctx;
};

/** (3)
 * Getting the correct colors based on the main color.
 *
 * Takes RGB values as the arguments
 * @param r - Red `number`
 * @param g - Green `number`
 * @param b - Blue `number`
 * @returns a color palettes object with `main` and `secondary` colors
 */
const getColors = (r: number, g: number, b: number): TcolorPalette => {
  const { h, s } = RGBToHSL(r, g, b);
  return {
    main: HSLToHex(h, s, 70),
    secondary: HSLToHex(h, s, 40),
    indicator: HSLToHex(h, 90, 50),
  };
};
```

</details>

<hr/>

</details>

<details>
<summary><b>Player Bar (Progress Bar)</b></summary>

- Get the click position inside the progress bar container and update it.
- `setPosition` is a simple function that requests Spotify Web API to seek the given position.
- **Known Bug**: You can't seek a position from the app's player if your active device is not the same. It'll reset the track.

```tsx
const setSeekPosition: Player.SeekPosition = (e) => {
  const { clientWidth } = e.currentTarget;
  const duration = player.item.duration_ms;
  const seekPosition = (e.nativeEvent.offsetX / clientWidth) * duration!;
  setPosition(seekPosition, player.device.id!);
};

/**
 * Seeks to the given position in the user’s currently playing track.
 * @param position - The position in milliseconds to seek to. Must be a positive number.
 */
const setPosition: SpotifyWebApiContext["setPosition"] = async (
  position,
  device_id
) => {
  try {
    await spotify.seek(Math.floor(position), { device_id });
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message: "Failed to set seek position",
      error,
    };
    console.error(errorMessage);
  }
};
```

</details>

<details>
<summary><b>Player Controls</b></summary>

● Allows the user to play/pause, toggle shuffle/repeat, skip tracks, select device, change the volume, and open the player menu (next section).

● Most controls call handlers from the Spotify Web API context.

<details>
<summary>Device List</summary>
<br/>

- The component will fetch the initial user devices and then again every 2 secs to ensure the device list is up to date **only when the SDK is ready.**

```tsx
// Part of the DeviceList.tsx Component

// Global States
const { isReady, deviceList } = useSelector(selectSpotify); // redux
const { selectDevice, getMyDevices } = useSpotifyWebApi(); // context
const dispatch = useDispatch();

// Select Device Handle - switch device & close the modal.
const selectDeviceHandle: Player.SelectDeviceHandle = (id) => {
  selectDevice(id);
  toggleListOpen();
};

//  Get the user's active devices
useEffect(() => {
  if (!isReady) return;
  // if the SDK is not ready, don't do anything.
  // get initial device list, when the device list is empty.
  else if (deviceList.length === 0) {
    const timer = setTimeout(() => {
      getMyDevices().then(
        (devices) => devices && dispatch(setDeviceList(devices))
      );
    }, 1000);
    return () => clearTimeout(timer);
  } else {
    // get the current device list every 2secs
    const interval = setInterval(() => {
      getMyDevices().then(
        (devices) => devices && dispatch(setDeviceList(devices))
      );
    }, 2000);

    return () => clearInterval(interval);
  }
}, [isReady, deviceList]);

// Part of the return:

{
  deviceList.length === 0 ? (
    <p>No Devices Found</p>
  ) : (
    deviceList.map((device) => (
      <button
        key={device.id}
        onClick={() => device.id && selectDeviceHandle(device.id)}
        className={`flex justify-between items-center text-left ${
          device.is_active && "text-indicator"
        }`}
      >
        <p className="flex-grow">{device.name}</p>
        <MusicNoteIcon className="flex-none w-6 fill-current" />
      </button>
    ))
  );
}
```

</details>

<hr/>

</details>

<details>
<summary><b>Player Menu</b></summary>
<br/>

● The player's menu gives the user the ability to search (albums, tracks, playlists), see recently played history, and load an album or playlist from a link.

<details>
<summary><b>Recently Played</b></summary>
<br/>

- When the user enters the menu, an effect gets triggered and fetches the recently played tracks from Spotify Web API.
- **Note**: This route doesn't fetch the latest changes, but it works. I thought to add my own recently played by saving an array of tracks in a global state. Maybe in the future.

</details>

<details>
<summary><b>Load Playlist/Album</b></summary>
<br/>

● This feature allows the user to paste into the input field a Spotify link and see the album/playlist in a detailed view.

<details>
<summary>Validation & Data Fetching</summary>

```tsx
// Formats the URL, fetches data and sets it.
const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // prevents a page refresh
  const { url } = values;

  // Stops the form submit if the field is empty/contains a track url or if it doesn't start with the spotify url.
  const regex: RegExp = /(https:\/\/open.spotify.com\/)(album|playlist)\//g;
  if (!url || !url.match(regex)) {
    dispatch(setMessage("please enter a valid link 😬"));
    setTimeout(() => dispatch(setMessage("")), 3000);
    return;
  }

  // formats the url to uri
  const uri = extractURI(url);
  // valid uri must be 22 characters
  if (uri.length < 22) {
    dispatch(setMessage("ID is too short, please enter a valid link 😬"));
    setTimeout(() => dispatch(setMessage("")), 3000);
    return;
  } else {
    // if the uri is valid, fetch data
    if (url.includes("album")) {
      const album = await fetchAlbum(uri);
      album && dispatch(setDetailedView({ type: "album", payload: album }));
    } else {
      const playlist = await fetchPlaylist(uri);
      playlist &&
        dispatch(setDetailedView({ type: "playlist", payload: playlist }));
    }
    values.url = ""; // Resets the text field.
  }
};
```

</details>

● After dispatching `setDetailedView`, It will display the data in a new component called `DetailedView`.

This component shows the following data: name, artist, artwork, type, tracks, total tracks, and duration.

It also allows the user to play tracks from the playlist/album and load the remaining tracks (if needed).

<hr/>

</details>

<details>
<summary><b>Search</b></summary>
<br/>

- The search component fetches albums, tracks, and playlists based on the user's search term.
- The results are saved in the Spotify slice state since I use them in different components.
- Similar to the **Load** feature, when a user clicks an album/playlist. It sets the Detailed View state to that item and shows the data.

</details>

</details>

<br/>

## Misc

<details>
<summary><b>Login/Signup & Firebase/Firestore</b></summary>
<br/>

There are a few utility functions that handle the User Slice state and Firestore authentication state.

<details>
<summary>Login</summary>
<br/>

```tsx
/**
 * Logs the user in with the provided credential.
 * @param email - the user's email address.
 * @param password - the user's password.
 * @fires - this function fires the `Firebase` `onAuthStateChanged` which will set the `user` local state with the fetched's data.
 */
export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage: ErrorMessage = { message: "Failed to login😢", error };
    store.dispatch(setMessage(errorMessage.message));
    console.error(errorMessage);
    setTimeout(() => store.dispatch(setMessage("")), 2000);
  }
};
```

</details>

<details>
<summary>Signup</summary>
<br/>

- After the user signs up, I create a new document in Firestore with the user's uid.

```tsx
/**
 * Creates a new user in `Firestore` auth database, creates a new document for the user.
 * @param email - the user's email address
 * @param password - the user's password
 * @param name - the user first name
 * @fires - this function fires the `Firebase` `onAuthStateChanged` which sets the `user` local state with the fetched's data.
 * @returns Creates a new `document` (under the user's `uid`) inside `Firestore` with the initial state.
 */
export const signup = async (
  email: string,
  password: string,
  name: string
): Promise<void> => {
  if (auth.currentUser) return; // prevents from creating a new account during an active session
  try {
    const userCreds: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCreds.user;
    const newUserData: IUserSliceState = { ...initialUserDoc, uid, name };
    const docRef = doc(database, "users", uid);
    await setDoc(docRef, newUserData);
  } catch (error) {
    const errorMessage: ErrorMessage = { message: "Failed to signup😢", error };
    store.dispatch(setMessage(errorMessage.message));
    console.error(error);
    setTimeout(() => store.dispatch(setMessage("")), 2000);
  }
};
```

</details>

<details>
<summary>Update User Document</summary>

- I created a simple function that updates a user's document to avoid repeating myself in different files.

```tsx
/**
 * Updates a document inside the `users` collection in `Firestore` database with the provided data.
 * @param reference - the document ID that will be updated (usually the user's `uid`)
 * @param data - the data that will be updated.
 * @example updateUserDoc(uid, {theme: "dark"})
 */
export const updateUserDoc = (reference: string, data: any): void => {
  const dofRef = doc(database, "users", reference);
  updateDoc(dofRef, data).catch((err) => console.log(err));
};
```

</details>

<hr/>

</details>

<details>
<summary><b>Animation</b></summary>
<br/>

- I used Framer-Motion to create the animations.
- All the animation variants are in a single file `/utils/animationVariants.ts`.

</details>

<details>
<summary><b>Protected Routes</b></summary>
<br/>

- I use Protected Routes on the **Login** and **Signup** pages.

```tsx
interface Props extends RouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
}

const ProtectedRoute = ({ isAuthenticated, redirectPath, ...props }: Props) => {
  if (!isAuthenticated) return <Route {...props} />;

  return <Redirect to={{ pathname: redirectPath }} />;
};

// Implementation: (Context.tsx)

const [protectedProps, setProtectedProps] = useState({
  isAuthenticated: false,
  redirectPath: "/",
});

const { uid } = useSelector(selectUser); // redux

// change the state when a use is authenticated.
useEffect(() => {
  setProtectedProps((state) => ({
    ...state,
    isAuthenticated: uid ? true : false,
  }));
}, [uid]);

// Component Implementation
<ProtectedRoute
  {...protectedProps}
  exact
  component={Login}
  path="/login"
/>
<ProtectedRoute
  {...protectedProps}
  component={Signup}
  exact
  path="/signup"
/>
```

</details>

<details>
<summary><b>Popup Modal</b></summary>
<br/>

- I had the idea of creating a popup modal to let the user know they're are not logged in.
- If the user closes the modal, I update it in the global state to not show the modal again.

```tsx
const PopupModal = () => {
  const dispatch = useDispatch();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  const handleClose = () => dispatch(setShowModal(false));

  useEffect(() => {
    const isVisited = localStorage.getItem("visited");
    if (isVisited === "true") return setIsFirstTime(false);

    localStorage.setItem("visited", "false"); // sets the initial value
    setIsFirstTime(true);
    localStorage.setItem("visited", "true"); // sets to visited.
  }, []);

  return (
    <motion.div
      initial="start"
      animate="end"
      variants={PopupModalVariants}
      className="fixed top-20 md:top-auto md:bottom-28 xl:bottom-6 2xl:bottom-10 py-3 px-9 text-white bg-indicator rounded-xl font-light"
    >
      <button
        onClick={handleClose}
        className="w-7 h-7 text-black bg-white rounded-full absolute -top-2 -right-2 transform hover:scale-110 global-transition cursor-pointer"
      >
        <ExitIcon className="stroke-current" />
      </button>
      {isFirstTime ? (
        <p>
          ✨ It Seems you're new here! ✨ <br />
          <Link to="/signup" className="underline font-normal">
            Create an account
          </Link> to enjoy the app's features
        </p>
      ) : (
        <p>
          It seems you're not logged in, <br />
          <Link to="/login" className="underline font-normal">
            Login
          </Link> to continue enjoying the app.
        </p>
      )}
    </motion.div>
  );
};
```

</details>

<details>
<summary><b>TypeScript Types</b></summary>
<br/>

- Everything in this project uses TypeScript.
- In the `types` folder, I have `.d.ts` files for each feature.
- It was important for me to use `namespace` to organize the types.

```
types
├── context.d.ts - Context API related
├── index.d.ts - Global Types
├── player.d.ts - Player-related
├── redux.d.ts - Redux-related
├── spotify.d.ts - Spotify API related (Web API/SDK/Auth)
├── weather.d.ts - Weather-related
└── vite-env.d.ts - Vite environment variables types
```

</details>

<details>
<summary><b>Deployment</b></summary>
<br/>

- From the beginning, I wanted to use Netlify to deploy my site, and I did.
- For the backend, I ended up using Heroku, which was simple to configure.

</details>

<br/>

## Known Bugs

- You can't seek a position from the app's player if your active device is different. It'll reset the track (Spotify Web API Bug).
- The track's artwork disappears on some mobile devices when switching pages/track changes. But this bug fixes itself when rotating the device.
- Chrome Media Session doesn't work due to Spotify's Playback SDK (If you have a solution for this, let me know!).

<br/>

## Future Plans

- Create/modify Spotify playlists - with artwork upload.
- Have more than one location for the weather.
- Ambiance Sounds (e.g., rain, river, wind).
- Space App.
- Navigation App.

<br/>

## Conclusion

This project turned out to be bigger than I thought (as always), but I learned new concepts and ways to approach all sorts of challenges.

An essential part of the project was the planning stage that I took the time to understand the app and build a work plan that I used during development.

I learned how to structure a full-stack application and make it fully typed with TypeScript.

<br/>

**As always, If you got any suggestions/feedback/tips about my code. Feel free to reach out and help me learn!** 😄

That's all for today! See you next time!
