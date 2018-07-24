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
|onFocus, onChange(required), onBlur|function| Functions that gets called by input events. Function recieves object,  see [Input event](#input-event) for more details.|

###  Field object
```jsx
key:  PropTypes.string.isRequired, // firstName
label:  PropTypes.string.isRequired, // i18n('firstName')
component:  PropTypes.element.isRequired, // TextInput
required:  PropTypes.bool, // true
formatter:  PropTypes.func, // () => {field , documentData}
validators:  PropTypes.object, // { presence: true, email: true } // https://validatejs.org/#validators,
placeholde: PropTypes.string,
// And you can add here everything and your field will get this object
```

### validate type

This will handle the visibility of the error state in each input when to show the user an error message, options:
- **none** : hide all error messages
- **all** : show all error messages
- **onFocus**: show only after the user Focus on this input at least one time
- **onBlur**: show only after the user blur from this input at least one time
- **onChange**: show only after the user change the input value 


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
- onFocus
- onChanged
- onBlur
The parent needs to handle these events, the onChanged is required.
you can use it like that:
```jsx
return (
	<DocForm
		data={this.state.form}
		fields={FORM_FIELDS}
		onChange={({key, value, updateData}) => {
			let form = {...this.state.form, [key]: value}
			this.setState({form})
			// or just use the updateData:
			// this.setState({form: updateData})
		}}
	/>
)
```
The Functions will be call with object that be includes:
-	key - this value if from the [Field object](#field-object)
- updateData (only when onChange is called)
- initialValue - this is the inital value of your field from componentDidmount
- isValid - boolean value base of your validators from  [Field object](#field-object)
-	value - this is the new value from your input
*when you call the onChange() from your input the first parameter is the new value
-	event - input event 
*when you call the onChange() from your input the first input is the seconde parameter is the event (optional)
-	resParameters -all other info that your input will be passing thru the event call back
*when you call the onChange() from your input the third
 parameter can be waht ever you wan and will pass to parent component


What you need to do inside your input conponents:
```jsx
const  MyTextInput  = ({value, onChange}) => {
	return (
		<Input
			value={value}
			onChange={(event) => {
				let newValue = event.target.value
				onChange(newValue, event)	
			}}
		/>
	)
}
```
react-cross-form will handle all your input needs:
-	value - find the value from form data by key
-	validate - validate by your parameters, using validate.js
	- The parent will know about all the fields with error
	-  Each input will get validator message and flag if we want to display this message or not




