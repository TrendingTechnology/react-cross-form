
# React cross Form

Easy form for React and react-native app with validation.
We use the great [validate.js](https://validatejs.org/) library but you can use a custom validator.
Inputs didn't include, we just render your inputs but we help you with validation and the flow of the form with focus next input out of the box.

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
|showSkippingFieldsWarnings|boolean|Set true if you want to display validation error even if user skip on the input|
|onFocus, onChange(required), onBlur|function| Functions that gets called by input events. Function recieves an object, see [Input event](#input-event) for more details.|
|onValidateStateChanged|function| Functions that gets called when the validation state was changed |
|requiredPrefix|string|Default is '*'|
|disabledAll|boolean|Set true if you want to disable all fields|
|focusNext|boolean|Set true if you want to focus on the next input.(don't forget ti pass the inout ref, us this.props.onRef)|
|enableOpenPickerOnFocusNext|boolean|Some of the input are modal or dropdown, in this case, you can enable this option and we will open this modal for you,  you need to pass on the onRef an object with an openPicker method, you can do something like that [open picker example](#open-picker-example)|
|focusNextOnlyIfEmpty|boolean|Set true if you want to focus on the next input only if is empty| 
### Field object

|key |type|info |
|---|---|---|
|key|string(required)|Key of for the value in the data
|component|element(required)|Any component that you want to render, see what your componant will get [Component props](#component-props)|
|formatter|function|If you want to format the value, you can pass a function the received (field, documentData) and return the input value|
|validators|object|For example: { presence: true, email: true }, you can learn more in https://validatejs.org/#validators and see [More validate examples](#validate.js-examples))|
|disabled|boolean| Input disabled value|
|placeholder|string| Input placeholder value|
|label|string| Input label value
```jsx
// fields example
import  DocForm  from  'react-cross-form'
import TextInput from  './TextInput'
....
return (
	<DocForm
		data={{firstName: ''}}
		fields={[
			{
				key:  'firstName',
				label:  i18n.t('First Name'),
				component:  TextInput,
				validators: { presence:  true, length: { minimum:  2 }},
				autoFocus:  true
				// And you can add here everything and your field will get this as props
			}
		]}
)
```
* [CustomValidation exmple](#customvalidation-exmple)



 ### Component props
  ```jsx
  class MyInput extends React.Component {
  render() {
	  const {
		  id, // the field.key
		  value, // input value
		  onFocus, // function
		  onChange, // function
		  onBlur, // function
		  isValid, // bollean
		  showWarnings, // bollean
		  validatorMessage, // array of errors
		  required, // bollean
		  placeholder, // string
		  label, // string
		  disabled, // bollean
		  autoFocus, // bollean
		  requiredPrefix, // string
		  onRef // function
		  // and all the rest from your field config
	  } = this.props
	  const _requiredPrefix = required ? requiredPrefix : ''
	  return (
		<div>
			<label>{_requiredPrefix }{label}</label>
			<input
				value={value}
				onFocus={onFocus}
				onChange={e => onChange(e.target.value)}
				onBlur={onBlur}
				disabled={disabled}
			/>	
			{showWarnings && <p>{validatorMessage}</p>}
		</div>
	)
  ```

### validate type

  

This will handle the visibility of the error state in each input when to show the user an error message, options:

-  **none** : hide all error messages

-  **all** : show all error messages

-  **onFocus**: show only after the user Focus on this input at least one time

-  **onBlur**: show only after the user blur from this input at least one time

-  **onChange**: show only after the user change the input value

  
  

### Validate.js examples

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
|onFocus|Just run the funtion , you didn't need to pass any value|Your callback will get {key, value, isValid, initialValue, info}
|onChanged|onChange(value)|Your callback will get {key, value, isValid, initialValue, updateData, info}
|onBlur|Just run the funtion , you didn't need to pass any value|Your callback will get {key, value, isValid, initialValue, updateData, info}

*info- you can pass to call back any parameters you want, when you call onBlur or onFocus this is the first value, you can do something like that onBlue({userName: 'Dan', event: e}) and the perent can find this when inside callback params, when you call onCahnge, the info is the second , onChange(value, {userName: 'Dan', event: e}) 


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

### customValidation exmple
```jsx
import { isValidNumber } from  'libphonenumber-js'

const  formFields  = [
{
	key: 'mobile',
	label: i18n.t('Mobile'),
	component: MobileInput,
	customValidation : function (field, value){
		let  errors  = []
		if(value  ===  ''){
			errors.push('can\'t be blank')
		} else  if(!isValidNumber(value)){
			errors.push('Please enter a valid phone number')
			}
			return  errors
	}}
]
```
### open picker example
```jsx
export  default  class  CountryChooser  extends  React.Component {
	constructor(props){
		super(props)
		this.state={
			showPicker: false
		}
		this.openPicker = this.openPicker .bind(this)
	}

	openPicker (){
		this.setState({showPicker: true})
	}

	render() {
		const onRef= this.props.onRef;
		return (
	        <CountryPicker
		      showPicker={this.state.showPicker}
		      openPicker ={this.openPicker}
	          ref={(ref) => {
	            if(onRef && ref){
	              onRef({root: ref, openPicker: this.openPicker })
	            }
	          }}
.
.
.
```			