const name = 'tom'
const gender = false
function myTagFunc (strings, name, gender) {
  console.log(strings)
  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}

const result = myTagFunc`hey, ${name} is a ${gender}`
console.log(result)