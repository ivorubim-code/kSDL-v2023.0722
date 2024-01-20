## kSDL - Select Dropdown List

>Languages: pure JavaScript + CSS<br/><br/>
>Version: kSDL v2023.0722<br/><br/>
>kSDL Oficial Page: https://appnexa.net/dev/kSDL/?f=fs37i<br/><br/>
>Author: Ivo Rubim - https://appnexa.net/dev/ivorubim/?f=fs37i<br/>

---

<b>Features:</b><br/>
- Functionality Options:<br/>
  - Multi-Select Mode: Enables selection of multiple items using checkboxes<br/>
  - Single-Select Mode: Allows selection of only one item using radio buttons<br/>

- `Control Bar` Contains:<br/>
  - Selection Control Button: Toggles selection/unselection of all items on `Item List`<br/>
  - Item Search Bar: Facilitates searching for specific items<br/>

- Right-Click (Under Container Link Trigger): Provides an alternative method to select/unselect all items<br/>

- Customizable `Control Bar` + `Item List`: Allowed customization of the appearance and behavior of both sections<br/>

- Container Overflow Prevention: Ensures proper display and prevents overflow on responsive pages<br/><br/>

---

<b>Basic Usage:</b><br/>

1) To add kSDL to your project, include the `kSDL.script.js` + `kSDL.style.js` files before all major elements on page are loaded. Place the inclusion inside the <head> section of your HTML.<br/>

2) Next, create your `Item List` using the `<ul>` element. Place each `<input>` item inside `<li>` tags. If you want a checkbox item to be selected by default, add the `checked` attribute to it.<br/>

3) Call `kSDL.NEW()` function after the page has fully loaded. It is recommended to place this call after the `</body>` tag closes. Pass any necessary identifiers and settings parameters as arguments to the function.<br/>

---
<b>Available Settings:</b>

- <b>`allItemChecked:`</b> When set to `true`, all checkboxes on the list will be automatically checked by default. <i>(default: false)</i><br/>

- <b>`containerHeight:`</b> Sets the height of the main container. <i>(default: "auto")</i><br/>
 

- <b>`containerHeightMax:`</b> Sets the maximum height of the main container. <i>(default: "350px")</i><br/>

- <b>`containerWidth:`</b> Sets the width of the main container. <i>(default: "300px")</i><br/>

- <b>`Ctrl:`</b> Enables/Disables the entire `Control Bar`. <i>(default: true)</i><br/>

- <b>`CtrlSelection:`</b> true/false: Enables/Disables the `Item List` selection control button. <i>(default: true)</i><br/>

- <b>`CtrlSearch:`</b> Enables/Disables the Item Search Bar. <i>(default: true)</i><br/>

- <b>`fontSize:`</b> Changes the font size of the `Item List`. <i>(default: "12px")</i><br/>

- <b>`onlySelectedCounter:`</b> Determines whether to display only the number of selected items in parentheses, instead of showing item values on the container trigger link. <i>(default: false)</i><br/>

- <b>`singleSelectMode:`</b> Enables/Disables Single-Select Mode (which changes the appearance to radio buttons). <i>(default: false)</i><br/><br/>

`An expansion of settings awaits in the next version`

---
