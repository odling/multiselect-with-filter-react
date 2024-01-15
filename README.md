# React Multiselect With Filter Implementation

This repository is published to demonstrate a dynamic multiselect componen implementation with React and Typescript. An example app is created and hosted which utilizes Rick and Morty API.

**For demonstration purposes, the example app is hosted [here](https://multiselect-with-filter-react.vercel.app/).**

The project is bootstrapped with Create React App. Run `npm install` and then `npm start` to test.

## Features

### General
- A resuable MultiSelect component is created and implemented such that is fetches data from Rick And Morty API.
- The component handles onScrollEnd events enabling pagination through the API.
- A configurable theme is applied to the component with styled-components.
- The component supports dark mode with the integrated theme object.
- Keyboard interactivity is integrated to the component with a custom hook.
- The component highlights the filter text on the list items. (**Note: since dangerouslySetInnerHTML attribute is used, the text is sanitized using sanitize-html package to avoid potential security risks.**)
- The component is able to handle loading state through isLoading prop.
- The component allows selection and deselection of items and displays the selected items in chips.


### API Integration
- RTK query is utilized for fetching data from the server and merging the results enabling pagination with a specific query.

### Design System
- styled-components is used for styling the component.
- A custom design system is created which provides dark theme support and compatible spacings, font sizes across the app.

### Mouse Interactivity
- The list items are highlighted and active index is updated based on the mouse over events.

### Keyboard Interactivity
- MultiSelect component uses the `<input />` element as the trigger element for the popover. The trigger keyboard interactions are summarized below.

| Key | Action |
| ----------- | ----------- |
| `ArrowDown` or `Enter` | Displays the popover and focuses on the first list item |
| `ArrowUp` or `Esc`| Closes the popover |

- MultiSelect component also handles keyboard interactions within the list items. The interactions are summarized below.

| Key | Action |
| ----------- | ----------- |
| `ArrowUp` or `Shift+Tab` | Focuses on the previous list item or on the trigger element if there is no other list item above |
| `ArrowDown` or `Tab`| Focuses on the next list item or on the first item if the end of the list is reached |
| `Esc` | Closes the popover |
| `PageUp` or `Home` | Focuses on the first list item |
| `PageDown` or `End` | Focuses on the last list item |
| `Enter` or `Space` | Selects or deselects the focused item |
