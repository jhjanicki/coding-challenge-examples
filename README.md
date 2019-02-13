## Checklist by Julia

* Fetches photos data from an URL and displays them on a grid of cards --> yes
* Photo title, a link to the large version and a thumbnail --> yes
* All photos are of same height --> yes
* Button that lets you sort by title in ascending/descending order --> yes
* Display current order --> yes
* Use ES6+ syntax --> yes
* Use React or any other library of your choice (even no library at all) as long as you demonstrate a component oriented architecture.  --> yes (React)
* Use Redux or any other state management library or approach of your choice. --> yes (Redux)
* Use the Container-Component pattern to connect the state from the store with the components. --> yes (Redux, though I only had time to store some of the state in the store)
* Use some form of modular/scoped css or CSS-in-JS solution. --> yes
* Include a loading spinner or placeholder. --> yes
* Describe any bottleneck or difficulties you might find. --> yes

## Description of process by Julia

Overall it was a good learning experience. I had used React before but it was my first time setting up a project from scratch, and it was my first time using data fetching in React, Redux as well as Thunk.  It was also my first time using Material UI though I had been wanting to use it for a while, this was a good opportunity.

At first I put together a version in React only (without Redux) and it was functional. Since Redux was a requirement I ended up converting the application into Redux, though I didn't have enough time to put all the state in the store (which defeats the purpose) since it took me some time to figure out how to use Redux.

The toughest part for me was figuring out the asynchronous data loading while fetching data and figuring out how to use Redux.
