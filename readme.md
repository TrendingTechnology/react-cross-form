
# React cross Form

Easy form for React and react-native with validation base validate.js
This is a form that renders your inputs with validation.

### Demo
[![Edit 4j2pj699q7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4j2pj699q7)

 
### Install
```bash

npm i react-cross-form --save

```


### Props

| key | type | info |
|--|--|--|
| data | object|The document data |
| fields| array| Array of fileds to render. see [Field object](#field-object) for more details.
| validateType| string| ``` 'none' | 'all' | 'onFocus' | 'onBlur' | 'onChange' ``` see [Validate Type](#validate-type) for more details.
|onFocus, onChange(required), onBlur|function| Functions that gets called by input events. Function recieves object, see [Input event](#input-event) for more details.|
|onValidateStateChanged|function| Functions that gets called when the validation state was changed |
|requiredPrefix|string|default is *|
|disabledAll|boolean|Set true if you want to disable all fields|
### Field object

```jsx

key: PropTypes.string.isRequired, // firstName

label: PropTypes.string.isRequired, // i18n('firstName')

component: PropTypes.element.isRequired, // TextInput

required: PropTypes.bool, // true

formatter: PropTypes.func, // () => {field , documentData}

validators: PropTypes.object, // { presence: true, email: true } // https://validatejs.org/#validators,

placeholde: PropTypes.string,

// And you can add here everything and your field will get this object

```

  

### validate type

  

This will handle the visibility of the error state in each input when to show the user an error message, options:

-  **none** : hide all error messages

-  **all** : show all error messages

-  **onFocus**: show only after the user Focus on this input at least one time

-  **onBlur**: show only after the user blur from this input at least one time

-  **onChange**: show only after the user change the input value

  
  

### validate.js

validate.js is great and simple solution

docs: https://validatejs.org/#validator

#### examples:

```jsx

// Email
{ email: true }

// Length
{length: {is: 3}}
{length: {minimum: 20}}
{length: {maximum: 3}}

// Numbers
{numericality: {noStrings: true}}

// Reuired
{presence: true}

// Custom message
{presence: {message: "is required"}}

```

  

### Input event

There are 3 events that will pass to your inputs:

| input side | input side(event) | parent side(callback)|
|--|--|--|
|onFocus|Just run the funtion , you didn't need to pass any value|Your callback will get {key, value, isValid, initialValue, resParameters}
|onChanged|onChange(value)|Your callback will get {key, value, isValid, initialValue, updateData, resParameters}
|onBlur|Just run the funtion , you didn't need to pass any value|Your callback will get {key, value, isValid, initialValue, updateData, resParameters}

*resParameters - you can pass to call back any parameters you want, when you call onBlur or onFocus this is the first value, you can do something like that onBlue({userName: 'Dan', event: e}) and the perent can find this when inside callback params, when you call onCahnge, the restParameters is the second , onChange(value, {userName: 'Dan', event: e}) 
The parent needs to handle these events, the onChanged is required.

## Parent call backs example

```jsx

return (

<DocForm
	data={this.state.form}
	fields={FORM_FIELDS}
	onChange={({key, value, updateData}) => {
	let  form = {...this.state.form, [key]: value}
	this.setState({form})
	// or just use the updateData:
	// this.setState({form: updateData})
	}}
	onBlur={res => {console.log(res.key, ' is blue')}}
	onFocus={res => {console.log(res.key, ' is focus')}}
/>

)

```

The Functions will be call with object that be includes:

- key - this value if from the [Field object](#field-object)

- updateData (only when onChange is called)

- initialValue - this is the inital value of your field from componentDidmount

- isValid - boolean value base of your validators from [Field object](#field-object)

- value - this is the new value from your input

*when you call the onChange() from your input the first parameter is the new value

- resParameters -all other info that your input will be passing thru the event call back

  

What you need to do inside your input conponents:

```jsx

const  MyTextInput = ({value, onChange, onBlur, onFocus}) => {
return (
	<Input
		value={value}
		onChange={(event) => {
			let  newValue = event.target.value
			onChange(newValue, {moreInfoToParnetExample: 123})
		}}
		onBlur={onBlur}
		onFocus={onFocus}
	/>
)}
```

react-cross-form will handle all your input needs:

- value - find the value from form data by key

- validate - validate by your parameters, using validate.js

- The parent will know about all the fields with error

- Each input will get validator message and flag if we want to display this message or not