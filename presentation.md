# VUEX - STATE MANAGEMENT FOR VUE JS

---

##  Introduction

### What is Vuex?
* A central state management system for all your Vue components
* Similar to ember store


### What it does NOT do

* Vuex is **not** the magic bullet the the Vue guide *(sometimes)* made it out to be
* It pretty much only do what you are already capable of in “vanilla” Vue
* I.e. it won’t solve all your problems, like parent-child or siblings communication *(kinda)*

### What it DOES solve

* Mostly the same thing as putting data on the Root component and keep passing it down
* If you do this, your components may be out of sync if you forget to keep passing the props on. Also templates get pretty verbose if you have lots of data - **Solved with Vuex!**
* You will also have to keep bubbling the event up since you can only do child-parent communication and only the Root can edit the data (since it owns the data) - **ALSO solved with Vuex!**

### Setting up Vuex

* A Vuex store have 4 parts: state, getters, mutations, and actions

### Registering Vuex

* Register the Vuex store with store option on your root component, this will be available to all of its descendants
* Access store inside a components with `this.$store`

---

## Defining State

### State

* Where you define all the keys and their initial values
* Just like data in Vue components!
* Access them with `this.$store.state.propName`

### mapState

* Shorthand definition for your state access
* Defined as an object or an array

### Caveats

* If you're going to reuse the store as separate store for multiple components, define the state as a function.
* Otherwise, your state will be passed as a pointer and will be shared between roots. *(This is the reason `data` is required to be a function)*
* As with components data, if your state include an object, it is best to define props up front so that they will be reactive
* If you ignore the above point (because there are many cases where that is not possible), either use `Vue.set(prop, key, value)` to update your Object with new key (or completely replace it with new object)

### Modules

* Your store can get verbose in bigger app, you can divide this up into smaller modules for easier management
* You can access the state of modules by `this.$store.state.moduleName.propName`
* Modules can also register their own getters, mutations, actions. These will be registered under the global namespace by default (so you invoke them just like you invoke getters/mutations/actions registered directly on the main store)

---

## Accessing State

### Getters

* When you need to return computations on the state values
* Think of these like computed properties in components
* Take in `state` as argument and return value based on that
* Access with `this.$store.getters.getterName`

### More on getters

* A second and third params (`getters`, `rootState`) can also be passed to the getters.
* Use `getters` to access other getters within the store
* `rootState` is the state defined by the root store if you're in a module’s getter

* These are cached just like computed properties, except across all components! *(Usually)*

### Getters function

* Getters can also return a function!
* **Caveat:** These are NOT cached.
* However, if you wrap these in a computed property inside your component, that should be cached for each component

### mapGetters

* Like `mapState`, this is just a short-hand for comment syntax to pull getters into your computed

---

## Modifying State

### Updating state

* You can change the state just by invoking the following in your component: `this.$store.state.topic.unread = true;`
* This is NOT recommended! (Make your code logic more confusing, harder to test, etc.)
* Use mutations instead!

### Mutations

* Mutation take in two arguments: `state` and `payload` *(optional)* and perform change on that state
* Invoke by calling `this.$store.commit('mutationName', payload)`

### mapMutations

* Shorthand for commit mutation syntax

### Strict mode

* Enabled when `strict` is set to `true` in your store
* This make Vue throws error if you try to modify state outside of mutations
* It's **highly recommended** that you enable this in dev
* Do **NOT** enable on production (this **will** affect performance)

* `v-model` in strict mode: Since you can’t directly change state, `v-model` will throw an error. You can either:
  * Not use `v-model` and define explicit `:value` and `@input` bindings
  * **OR** write custom `get` and `set` for your computed property (This is the better approach, IMHO, since it utilizes all feature of Vue)

### Caveats

* Mutations do **not** have access to getters *(as of Vuex version 3.0.1)*
* Mutations must **always** be synchronous
* See next section on how to get around these limitations

---

## Modifying State II: Electric Boogaloo

### Actions
* Action is one step of indirection from mutations. You `dispatch` the action, which then `commit` the mutation.
* Take in two arguments: context (not state) and payload (optional)
* `context` is an object which give you access to things like `commit`, `state`, `getters`, `rootState`, etc.

### Asynchronous Actions

* Unlike mutations, actions **can** be asynchronous!
* Usually used for expensive/async operations like API calls
* They can commit different mutations depending on situation
* They can return `Promise` too!

### mapActions

* Shorthand for dispatch action syntax

---

## On communications

### Non child => parent communication

* *Sometimes* you can also communicate between non child-parent components through a `state` property
* Reminder that you **can** call `watch` on your computed properties, including ones pulled in by `mapGetters`. Use this to trigger actions when the state is changed by some other component.
* However, there’s no one-size-fits-all solution even with Vuex and you may still have to use global event bus in some cases

---

## Testing

### Testing the Store

* Testing store is simple and straight forward: test `getters`, `mutations`, and `actions` separately
* No need to set up Vuex
* Since they are all functions that take in the `state` as an argument, just define your own `state` and pass it in then test the outcome
* **Tips:** If you define your `getters`, `mutations`, and `actions` separately and export them along with the store, you import them into the test (so you don’t have to use the Vuex object)
* **OR** a benefit of separating your store into module: you can just import the module and test on that
* For `actions` that make API calls, stub those the API call then test

### Testing the Component

* Approach one: Define context for state, then set up the actual Vuex object and pass that as the `store` option when setting up component for testing
* This is the method used in the Vuex testing example on vue-test-utils guide

### Testing the component - Take 2

* **OR** you can just stub out the `$store` directly
* **Reminder:** `mapState` and `mapGetters` are straightforward, but `mapMutations` and `mapActions` are actually shorthand for calls to commit/dispatch respectively, so you will have to stub those instead

### Async Testing (jest)

* You *can* test asynchronous actions within components, just need to make sure you stub and setup the tests correctly
* If the action is expected to return a `Promise`, use `mockReturnValue` or `mockImplementation` and make make sure you return a `Promise`
* Use jest’s `done`/`async`/`await` to test expectations after the promise `resolve`/`reject`

---

## Conclusions

### Pros

* Better organization
* Better debugging
* Easier testing

### Cons

* Add more code to library
* Requires some setup

### What was not covered

* Namespaced modules
* Dynamic module registration
* Using Vuex’s async/await for composing actions
* Plugins
* More in-depth explanations on the distinction between Mutations and Actions
* And probably some other stuffs too...

### Sources

* [Vuex guide](https://vuex.vuejs.org/en/)
* [vue-test-utils with Vuex](https://vue-test-utils.vuejs.org/en/guides/using-with-vuex.html)
* [Jest asynchronous testing](https://facebook.github.io/jest/docs/en/asynchronous.html)
* [Flushing promise queue](https://kentor.me/posts/testing-promise-all-side-effects-with-async-await/)

Demo stuffs:

* [Demo code](https://gitlab.spice.spiceworks.com/jordant/vuex-demo)
* [Vuetify](https://vuetifyjs.com/en/)
