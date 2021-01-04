

export function slugify(title: string): string {
  // title = "This is my first article"
  // return -> "this-is-my-first-article"

  let slugarr = []

  for (let i = 0; i < title.length; i++) {
    if (i >= 30) break;

    let char = title[i].toLowerCase()
    if (char >= "a" && char <= "z") {
      slugarr.push(char)
    } else {
      slugarr.push("-")
    }
  }
  return slugarr.join('')
}

console.log(slugify("This is a really really looooooong title here."))