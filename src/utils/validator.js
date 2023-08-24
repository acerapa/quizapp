import { messages, rules } from './rules'


/**
 * Validate model against rules
 *
 * @param {*} model model
 * @param {*} r     rules
 * @param {*} m     custom message
 * 
 */
export const validate = function (model, r, m=null) {
  const modelKeys = Object.keys(model)
  const ruleKeys = Object.keys(r)
  
  const errors = {}

  ruleKeys.forEach(key => {
    if (modelKeys.includes(key)) {
      const fieldRuleKeys = Object.keys(r[key])
      const value = model[key]
      
      errors[key] = []
      fieldRuleKeys.forEach(rule => {
        if (Object.keys(rules).includes(rule)) {
          if (!rules[rule](value, r[key][rule])) {
            const message = messages[rule].replace(`{${rule}}`, r[key][rule])

            // for getting custom messages
            if (m && m[key][rule]) {
              errors[key].push(m[key][rule])
            } else {
              errors[key].push(message)
            }
          }
        }
      })
    }
  })

  return errors
}

/**
 * Checks if there is rule validated
 * 
 * @param {*} errors 
 * @returns 
 */
export const hasError = function (errors) {
  let isError = false;
  const keys = Object.keys(errors);
  keys.forEach(key => {
    if (errors[key].length) {
      isError = true
    }
  })

  return isError;
}
