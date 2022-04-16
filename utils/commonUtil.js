const random = require("random")

const rand = (from,to) => {
    return random.int(
        (min = from),
        (max = to)
      )
}

module.exports = {rand}