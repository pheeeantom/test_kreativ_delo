export function highlightVowels(root = document.body) {
  const regex = /([аеёиоуыэюяaeiouy])/gi

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  let n
  while (n = walker.nextNode()) nodes.push(n)
    
  for (const node of nodes) {
    if (!regex.test(node.nodeValue)) continue
    const span = document.createElement('span')
    span.innerHTML = node.nodeValue.replace(regex, '<span class="vowel">$1</span>')
    node.parentNode.replaceChild(span, node)
  }
}

export function shuffle(array) {
  let currentIndex = array.length, randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}