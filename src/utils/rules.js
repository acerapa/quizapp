export const rules = {
  required (value, required) {
    if (required) return !!value
    return false
  },
  max (value, max) {
    return value <= max
  },
  min (value, min) {
    return value >= min
  },
  email (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  max_length (value, max) {
    return value.length <= max
  },
  min_length (value, min) {
    return value.length >= min
  }
}

export const messages = {
  required: 'This field is required',
  max: 'This field must be less than {max}',
  min: 'This field must be greater than {min}',
  email: 'This field must be a valid email address',
  max_length: 'This field must be less than {max_length} characters',
  min_length: 'This field must be greater than {min_length} characters'
}
