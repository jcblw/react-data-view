import React, {Component} from 'react'
import {getType} from './utils'

const TypeComponents = {
  'string': ({value}) => (<span className='TypeComponents TypeComponents--string'>"{value}"</span>),
  'number': ({value}) => (<span className='TypeComponents TypeComponents--number'>{value}</span>),
  'boolean': ({value}) => (<span className='TypeComponents TypeComponents--boolean'>{value.toString()}</span>),
  'function': () => (<span className='TypeComponents TypeComponents--function'>[Function]</span>),
  'null': () => (<span className='TypeComponents TypeComponents--null'>null</span>)
}

class ExpandableType extends Component {
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
  renderKeys (key, value, ogType) {
    const type = getType(value)
    const isOpen = this.isOpen(key)
    const Component = TypeComponents[type]
    const isExpandable = this.isExpandable(type)
    return (
      <span key={`key-${key}`} className={`TypeComponents TypeComponents--${ogType}Key`}>
        <span onClick={this.onToggle(key)} className={`${isOpen ? 'is-open' : ''} ${isExpandable ? 'is-expandable' : ''}`}>
          <span className='TypeComponents TypeComponents--key'>{key}</span>
          {isExpandable ?
            (<span>{type === 'object' ? 'Object' : `Array[${value.length}]`}</span>) :
            null
          }
        </span>
        {isExpandable ?
          (isOpen ? <Component value={value} />: null):
          <Component value={value} />
        }
      </span>
    )
  }
  isOpen (key) {
    return this.state[`${key}IsOpen`]
  }
  isExpandable (type) {
    return type === 'object' || type === 'array'
  }
  render () {
    const {value} = this.props
    const type = getType(value)
    return (
        <span className={`TypeComponents TypeComponents--${type}`}>
          {type === 'object' ?
            Object.keys(value).map(key => this.renderKeys(key, value[key], type)):
            value.map((_value, i) => this.renderKeys(i, _value, type))
          }
        </span>
    )
  }
}

TypeComponents.object = ExpandableType
TypeComponents.array = ExpandableType

export {ExpandableType, TypeComponents}
