import React, {Component} from 'react'

function getType (value) {
  const _type = typeof value
  if (_type !== 'object') return _type
  if (!value) return 'null'
  if (Array.isArray(value)) return 'array'
  return _type
}

class ObjectComponent extends Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  onToggle (key) {
    return (e) => {
      e.preventDefault()
      const _key = `${key}IsOpen`
      this.setState({[_key]: !this.state[_key]})
    }
  }
  render () {
    const {value} = this.props
    return (
        <span className='TypeComponents TypeComponents--object'>
          {Object.keys(value).map(key => {
            const _type = getType(value[key])
            const isOpen = this.state[`${key}IsOpen`]
            const Component = TypeComponents[_type]
            const isExpandable = _type === 'object' || _type === 'array'
            const label = (
              <span onClick={this.onToggle(key)} className={`${isOpen ? 'is-open' : ''} ${isExpandable ? 'is-expandable' : ''}`}>
                <span className='TypeComponents TypeComponents--key'>{key}</span>
                {isExpandable ?
                  (<span>{_type === 'object' ? 'Object' : `Array[${value[key].length}]`}</span>) :
                  null
                }
              </span>
            )
            return (
              <span key={key} className='TypeComponents TypeComponents--objectKey'>
                {label}
                {isExpandable ?
                  (isOpen ? <Component value={value[key]} />: null):
                  <Component value={value[key]} />
                }
              </span>
            )
          })}
        </span>
    )
  }
}

class ArrayComponent extends Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  onToggle (key) {
    return (e) => {
      e.preventDefault()
      const _key = `${key}IsOpen`
      this.setState({[_key]: !this.state[_key]})
    }
  }
  render () {
    const {value} = this.props
    return (
        <span className='TypeComponents TypeComponents--array'>
          {value.map((_value, i) => {
            const _type = getType(_value)
            const isOpen = this.state[`${i}IsOpen`]
            const Component = TypeComponents[_type]
            const isExpandable = _type === 'object' || _type === 'array'
            const label = (
              <span onClick={this.onToggle(i)} className={`${isOpen ? 'is-open' : ''} ${isExpandable ? 'is-expandable' : ''}`}>
                <span className='TypeComponents TypeComponents--key'>{i}</span>
                {isExpandable ?
                  (<span>{_type === 'object' ? 'Object' : `Array[${_value.length}]`}</span>) :
                  null
                }
              </span>
            )
            return (
              <span className='TypeComponents TypeComponents--arrayKey'>
                {label}
                {isExpandable ?
                  (isOpen ? <Component value={_value} />: null):
                    <Component value={_value} />
                }
              </span>
            )
          })}
        </span>
      )
  }
}


const TypeComponents = {
  'object': ObjectComponent,
  'array': ArrayComponent,
  'string': ({value}) => (<span className='TypeComponents TypeComponents--string'>"{value}"</span>),
  'number': ({value}) => (<span className='TypeComponents TypeComponents--number'>{value}</span>),
  'boolean': ({value}) => (<span className='TypeComponents TypeComponents--boolean'>{value.toString()}</span>),
  'function': () => (<span className='TypeComponents TypeComponents--function'>[Function]</span>),
  'null': () => (<span className='TypeComponents TypeComponents--null'>null</span>)
}

export {TypeComponents, getType, ObjectComponent, ArrayComponent}
